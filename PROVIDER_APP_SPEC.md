# EasyCare Provider App - Complete Specification

## 1. Project Overview

### 1.1 What is this?
A **web-focused** provider/agency dashboard for the EasyCare home care services platform. Agencies and independent providers use this app on desktop/tablet to:
- Receive service requests posted by users on the consumer app
- Browse incoming requirement details (care type, budget, schedule, location)
- Submit bids by selecting workers from their employee roster
- Manage their employee workforce (add, edit, availability)
- Track accepted bookings and ongoing services
- Communicate with users about bookings

### 1.2 How does it fit with the consumer app?
The **consumer (user) app** is mobile-first (React + Capacitor). The **provider app** is desktop/web-first since agencies operate from offices. Both apps share the same backend data layer and communicate through a shared data model.

**End-to-end flow:**
1. User posts a care requirement (via `PostRequirementFlow` on consumer app)
2. Provider/agency sees the request appear in their dashboard
3. Provider selects 1-3 workers from their roster and submits a bid
4. User sees incoming bids in `BidsSwipeScreen` (Tinder-style card swipe)
5. User accepts a bid, payment is processed on consumer side
6. Provider receives confirmation, worker assignment begins
7. Ongoing service tracking happens on both sides

### 1.3 Target Users
- **Care agencies** (primary): Companies with 5-200 employees (nurses, caregivers, nannies, cleaners, physiotherapists)
- **Independent providers**: Solo caregivers managing their own profile
- **Agency managers**: Non-field staff who handle operations, bidding, and scheduling

---

## 2. Tech Stack & Conventions

### 2.1 Framework & Build
| Layer | Choice |
|-------|--------|
| Framework | React 18.3.1 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | `react-router` with `createHashRouter` (GitHub Pages compatible) |
| Animation | `motion/react` (import from `motion` package) |
| Icons | `lucide-react` |
| Fonts | Lexend (headings), Inter (body) - loaded via `/src/styles/fonts.css` |
| Charts | `recharts` (for analytics dashboards) |

### 2.2 Design System
| Token | Value |
|-------|-------|
| Primary Blue | `#1975D2` |
| Primary Hover | `#1565C0` |
| Page BG (desktop) | `#F0F7FA` |
| Card BG | `#FFFFFF` |
| Heading text | `#0f172a` |
| Body text | `#334155` |
| Subtext | `#64748b` |
| Muted | `#94a3b8` |
| Border | `#E5E7EB` |
| Success | `#12B76A` / `#22C55E` |
| Warning | `#F79009` / `#D97706` |
| Error | `#F04438` / `#E53935` |
| Card radius | `20px` / `24px` |
| Button radius | `10px` / `14px` |
| Font heading | `'Lexend', sans-serif` |
| Font body | `'Inter', sans-serif` |
| Shadow card | `0 20px 60px rgba(0,0,0,0.15)` |
| Shadow button | `0px 4px 14px -2px rgba(25,117,210,0.35)` |

Full design tokens are defined in `/src/app/config/designTokens.ts`.
Figma color values are in `/src/imports/Colors.tsx`.

### 2.3 Code Conventions
- **Utility classes**: Use `clsx` and `tailwind-merge` imported directly (NOT from `@/lib/utils`)
- **Component structure**: Feature-based folders under `/src/app/components/`
- **API failures**: Log with `console.warn` (not `console.error`)
- **State persistence**: `sessionStorage` for ephemeral state, `localStorage` for persistent state
- **Data layer**: `localStorage`-based stubs (Firebase/Supabase fully removed)
- **Images**: Use `ImageWithFallback` component for any new images, or Unsplash URLs
- **No Tailwind config file**: Using Tailwind v4.0 with `/src/styles/theme.css` for tokens

---

## 3. Data Models (Shared with Consumer App)

### 3.1 RequirementRecord (User posts this)
```typescript
interface RequirementRecord {
  reqId: string;               // e.g. "00123"
  service: string;             // "Parental Care", "Elder Care", "Cleaning", etc.
  careFor: string;             // "Parent", "Spouse", "Self", "Child"
  duration: string;            // "4 Hours", "8 Hours", "12 Hours", "24 Hours"
  budget: string;              // "Basic", "Experienced", "Medical"
  language: string;            // "Hindi", "Bengali", "English", "No Preference"
  status: "active" | "pending" | "expired";
  createdAt?: string;          // ISO timestamp
  // Extended fields from CardQuestionnaire:
  urgency?: string;            // "Immediate", "Within a week", "Flexible"
  hoursPerDay?: string;
  days?: string[];             // ["Mon","Tue","Wed",...]
  specialRequirements?: string[];
  additionalNotes?: string;
  // Location info:
  location?: string;           // "Salt Lake, Kolkata"
  coords?: [number, number];
}
```

### 3.2 BidProfile (Provider submits this)
```typescript
interface BidProfile {
  id: string;                  // Unique bid ID
  name: string;                // Worker name
  age: number;
  photo: string;               // Unsplash URL
  service: string;             // Matched to requirement service
  experience: string;          // "5yrs Experience"
  rating: number;              // 4.0-5.0
  verified: boolean;           // Background check
  duration: string;            // "6hrs / day"
  expectedPay: string;         // "Rs. 2k-3k"
  agency?: string;             // Agency name
  bidAmount?: string;          // "Rs. 2,200" - actual bid price
}
```

### 3.3 BookingRecord (After user accepts bid)
```typescript
interface BookingRecord {
  bookingId: string;
  providerName: string;
  providerPhoto: string;
  service: string;
  rating: number;
  agency: string;
  verified: boolean;
  serviceType: string;
  startDate: string;
  startTime: string;
  duration: string;
  durationDays: number;
  location: string;
  dailyRate: number;
  totalPaid: number;
  paymentMethod: string;
  transactionId: string;
  status: "confirmed" | "ongoing" | "completed" | "cancelled";
  createdAt?: string;
}
```

### 3.4 BookedProvider (Consumer app context)
```typescript
interface BookedProvider {
  providerName: string;
  providerPhoto: string;
  service: string;
  rating: number;
  agency: string;
  timeSlot: string;
  bidAmount: string;
  isPackageBooking?: boolean;
  packageStage?: "confirming" | "assigning" | "assigned" | "ongoing";
  packageTitle?: string;
}
```

---

## 4. Service Categories (Must match consumer app)

The consumer app has the following service categories (from `QuickCategories.tsx`):
- Elder Care
- Cleaning
- Baby Care
- Cooking
- Medical Care
- Pet Care
- Tutoring
- Laundry
- Gardening
- Electrical
- Plumbing
- Painting

Each category has detailed sub-services (see `SERVICE_DATA` in `QuickCategories.tsx`).

---

## 5. Provider App - New Data Models

### 5.1 Agency Profile
```typescript
interface AgencyProfile {
  id: string;
  name: string;                    // "CareFirst Agency"
  logo?: string;
  email: string;
  phone: string;
  gstNumber?: string;
  address: string;
  city: string;
  state: string;
  establishedYear: string;         // "2018"
  description: string;
  rating: number;                  // Average across all workers
  totalWorkers: number;
  totalGigsCompleted: number;
  verificationStatus: "pending" | "verified" | "rejected";
  serviceCategories: string[];     // Which categories they serve
  operatingAreas: string[];        // ["Salt Lake", "Rajarhat", "New Town"]
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    ifsc: string;
    bankName: string;
  };
  documents?: {
    type: string;                  // "GST Certificate", "Trade License", etc.
    url: string;
    verified: boolean;
  }[];
  createdAt: string;
}
```

### 5.2 Worker (Employee)
```typescript
interface Worker {
  id: string;
  agencyId: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  photo: string;
  phone: string;
  aadharNumber?: string;          // Indian national ID
  services: string[];             // ["Elder Care", "Medical Care"]
  skills: string[];               // ["Medication Mgmt", "Physiotherapy", "First Aid"]
  languages: string[];            // ["Hindi", "Bengali", "English"]
  experience: string;             // "5yrs Experience"
  experienceYears: number;        // 5
  rating: number;
  verified: boolean;              // Background check done
  availability: WorkerAvailability;
  status: "available" | "on-assignment" | "on-leave" | "inactive";
  expectedPay: string;            // "Rs. 2k-3k"
  dailyRate: number;              // 2200
  bio: string;
  gigsCompleted: number;
  memberSince: string;
  location: string;
  responseTime: string;           // "< 30 min"
  repeatClients: number;
  currentAssignment?: {
    bookingId: string;
    clientName: string;
    service: string;
    startDate: string;
    endDate: string;
  };
  documents?: {
    type: string;                  // "Aadhar", "Police Verification", "Training Certificate"
    verified: boolean;
  }[];
  reviews?: {
    name: string;
    rating: number;
    date: string;
    text: string;
  }[];
}

interface WorkerAvailability {
  schedule: "full-time" | "part-time" | "flexible";
  preferredShifts: ("morning" | "afternoon" | "evening" | "night")[];
  availableDays: string[];        // ["Mon","Tue","Wed","Thu","Fri"]
  maxHoursPerDay: number;
  isQuickAdd: boolean;            // TRUE = flagged as available for instant matching
}
```

### 5.3 IncomingRequest (Provider's view of a user requirement)
```typescript
interface IncomingRequest {
  reqId: string;                   // Maps to RequirementRecord.reqId
  service: string;
  careFor: string;
  duration: string;
  budget: string;
  language: string;
  location: string;
  urgency: string;
  postedAt: string;                // ISO timestamp
  expiresAt: string;               // Auto-expire after 24h
  status: "new" | "viewed" | "bid-submitted" | "accepted" | "expired" | "declined";
  totalBids: number;               // How many agencies have bid so far
  userRating?: number;             // User's platform rating (trust signal)
  specialRequirements?: string[];
  additionalNotes?: string;
}
```

### 5.4 BidSubmission (What the provider sends)
```typescript
interface BidSubmission {
  bidId: string;
  reqId: string;                   // Links to the requirement
  agencyId: string;
  workers: BidWorkerEntry[];       // 1-3 workers offered
  bidAmount: string;               // Agency's total bid price
  estimatedStart: string;          // When they can start
  notes?: string;                  // "We can provide weekend coverage too"
  status: "pending" | "accepted" | "rejected" | "withdrawn";
  submittedAt: string;
  respondedAt?: string;
}

interface BidWorkerEntry {
  workerId: string;
  name: string;
  photo: string;
  experience: string;
  rating: number;
  verified: boolean;
  dailyRate: number;
  isPrimary: boolean;              // Primary worker recommendation
}
```

### 5.5 QuickAddPool (Workers flagged for instant matching)
```typescript
interface QuickAddEntry {
  workerId: string;
  agencyId: string;
  workerName: string;
  workerPhoto: string;
  services: string[];              // Which categories they're available for
  availableFrom: string;           // "Immediate" or ISO date
  availableHours: string;          // "8hrs/day"
  dailyRate: number;
  rating: number;
  verified: boolean;
  experience: string;
  addedAt: string;                 // When added to quick-add pool
  isActive: boolean;               // Can be toggled off
}
```

---

## 6. Provider App - Pages & Routes

```
/                          -> Dashboard (overview)
/requests                  -> Incoming Requests (live feed)
/requests/:reqId           -> Request Detail + Bid Submission
/bids                      -> My Bids (submitted bids, statuses)
/bids/:bidId               -> Bid Detail (track acceptance)
/employees                 -> Employee Roster (full workforce)
/employees/add             -> Add New Employee
/employees/:id             -> Employee Profile / Edit
/employees/:id/schedule    -> Employee Schedule Management
/quick-add                 -> Quick Add Pool Management
/bookings                  -> Active Bookings (confirmed jobs)
/bookings/:id              -> Booking Detail (ongoing service tracking)
/messages                  -> Messages (conversations with users)
/messages/:conversationId  -> Chat Thread
/analytics                 -> Analytics Dashboard
/settings                  -> Agency Settings
/settings/profile          -> Agency Profile Edit
/settings/documents        -> Document Management
/settings/bank             -> Bank & Payment Settings
/onboarding                -> Agency Registration Flow
```

---

## 7. Feature Specifications

### 7.1 Dashboard (Home - `/`)
**Purpose**: At-a-glance overview of agency operations.

**Sections:**
1. **Top Bar**: Agency name, logo, notification bell with badge count, profile avatar
2. **Stats Cards** (4-column grid):
   - New Requests (with live count + "View All" link)
   - Active Bids (pending responses)
   - Ongoing Bookings (in-progress services)
   - Revenue This Month (total earnings)
3. **Recent Incoming Requests** (list, max 5): Latest requirements with service type, budget, urgency badge, time posted. Each row is tappable -> `/requests/:reqId`
4. **Quick Add Status**: Show count of workers in the quick-add pool, their availability status. Link to `/quick-add`
5. **Active Bookings Timeline**: Compact view of today's and upcoming assignments with worker avatars and service details
6. **Performance Metrics**: Acceptance rate, avg response time, rating trend (small chart via recharts)

### 7.2 Incoming Requests (`/requests`)
**Purpose**: Live feed of user-posted care requirements that match the agency's service categories and operating areas.

**Layout**: 
- Desktop: 3-column Kanban-like view (New | Viewed | Bid Submitted)
- Tablet: 2-column
- Mobile: Single list with filter tabs

**Each Request Card Shows:**
- Service type with colored category badge
- Care recipient type (Parent, Child, Self)
- Duration & shift details
- Budget tier (Basic/Experienced/Medical) with corresponding rupee range
- Location with distance from agency
- Time posted (relative: "2h ago", "1d ago")
- Urgency badge (color-coded: red=immediate, orange=within a week, green=flexible)
- Number of bids already submitted (social proof pressure)
- Special requirements tags
- "Submit Bid" CTA button

**Filters:**
- Service category dropdown
- Budget range
- Urgency level
- Distance radius
- Sort by: Newest, Highest Budget, Nearest, Fewest Bids

**Real-time behavior**: New requests should appear at the top with a subtle slide-in animation and a "New" badge that fades after 30 seconds.

### 7.3 Request Detail + Bid Submission (`/requests/:reqId`)
**Purpose**: Full requirement details and bid submission interface.

**Layout - Left Panel (60%):**
- Full requirement details card
- Care recipient details (who the service is for)
- Schedule & duration breakdown
- Location with map snippet (optional)
- Special requirements listed as chips
- Additional notes from user
- User's profile summary (rating, member since, past bookings count)

**Layout - Right Panel (40%):**
- **Bid Submission Form:**
  1. **Worker Selection** (most important UX):
     - Search bar to find workers by name
     - Filterable by service type, availability, rating
     - Grid of available worker cards with:
       - Photo, name, rating, experience
       - Availability badge (green=free, yellow=finishing soon, red=busy)
       - Checkbox to select (max 3 workers)
     - Selected workers appear in a "Your Offer" summary strip at the top
     - **Quick Add workers** are highlighted with a lightning bolt icon and shown first (sorted to top)
  2. **Bid Amount Input**: Pre-calculated based on selected workers' daily rates, editable by agency
  3. **Estimated Start Date**: Date picker, defaults to requirement's urgency
  4. **Notes to User**: Optional textarea
  5. **Submit Bid** button (primary blue, with loading state)

**After submission**: Redirect to `/bids/:bidId` with a success animation

### 7.4 Employee Roster (`/employees`)
**Purpose**: Manage the agency's full workforce.

**Layout**: Responsive grid of employee cards with search + filters.

**Each Employee Card:**
- Large photo, name, age
- Service tags (color-coded chips)
- Rating (stars)
- Status badge: Available (green), On Assignment (blue), On Leave (orange), Inactive (gray)
- Current assignment info (if on-assignment)
- Quick actions: Edit, Toggle Quick-Add, View Schedule
- Verified badge (shield icon)

**Filters:**
- Status (Available, On Assignment, On Leave, Inactive)
- Service category
- Rating range
- Experience level
- Quick-Add pool (yes/no)

**Bulk Actions:**
- Mark multiple workers as available/on-leave
- Add multiple to Quick-Add pool
- Export roster as CSV

### 7.5 Add/Edit Employee (`/employees/add`, `/employees/:id`)
**Purpose**: Full employee profile creation and editing.

**Form Sections:**
1. **Personal Info**: Photo upload, name, age, gender, phone, Aadhar number
2. **Professional Info**: Services offered (multi-select from category list), skills (tag input), languages, experience years, bio
3. **Pay & Rates**: Expected pay range, daily rate
4. **Availability**: Schedule type (full-time/part-time/flexible), preferred shifts, available days, max hours/day
5. **Documents**: Upload Aadhar, Police Verification, Training Certificates (each with verified toggle)
6. **Quick-Add Toggle**: Mark as available for instant matching (with services they're available for)

### 7.6 Quick-Add Pool Management (`/quick-add`)
**Purpose**: Manage workers who are flagged as immediately available for instant user matching. When a user chooses "Quick Search" mode in the consumer app (`ChooseModePopup` -> `onQuickFind`), they see workers from this pool.

**CRITICAL CONCEPT**: 
- The consumer app has a "Choose Mode" step where users pick between:
  - **Quick Find** (lightning bolt icon): Instantly browse & book available workers (uses Quick-Add pool)
  - **Post & Get Bids** (megaphone icon): Post requirement and wait for agency bids
- Workers in the Quick-Add pool are the ones that appear in the `SwipeScreen` (Tinder-style cards) on the consumer side

**Layout:**
- **Active Pool** section: Workers currently in the quick-add pool
  - Each entry shows: Worker photo, name, services, daily rate, hours available, time in pool
  - Toggle to activate/deactivate
  - "Remove from pool" action
- **Add to Pool** section: Workers NOT in pool but available
  - Quick "Add" button for each
  - Bulk add option
- **Pool Stats**: Total active in pool, avg response time, bookings from quick-add this week

**Key UX**: 
- Drag-to-reorder workers by priority (who should appear first to users)
- Service category filter to manage pool per category
- Availability calendar overlay to see gaps

### 7.7 My Bids (`/bids`)
**Purpose**: Track all submitted bids and their statuses.

**Tabs:**
- **Pending**: Bids awaiting user response (timer showing time remaining)
- **Accepted**: Bids that were accepted by users (celebrate with subtle animation)
- **Rejected**: Bids that were passed on
- **Withdrawn**: Bids the agency withdrew

**Each Bid Card:**
- Requirement summary (service, duration, budget)
- Workers offered (photo thumbnails)
- Bid amount
- Submitted time
- Status badge with color
- If accepted: Link to booking, payment confirmation details
- If pending: "Withdraw Bid" option, time remaining before expiry

### 7.8 Active Bookings (`/bookings`)
**Purpose**: Manage confirmed and ongoing service assignments.

**Views:**
- **Calendar View**: Weekly/monthly calendar showing worker assignments
- **List View**: Sortable table of all bookings

**Each Booking Entry:**
- Client name and service type
- Assigned worker (photo, name)
- Start/end dates
- Daily rate and total value
- Status: Confirmed (awaiting start), Ongoing, Completed
- Actions: View details, Reassign worker, Mark complete, Raise issue

**Booking Detail (`/bookings/:id`):**
- Full booking information matching consumer's `BookingRecord`
- Worker profile summary
- Client details
- Payment history (daily rate x days = total)
- Timeline of events (booked -> started -> daily check-ins -> completed)
- Communication thread with user
- Option to file an issue
- Live location tracking placeholder (for mobile-aware workers)

### 7.9 Messages (`/messages`)
**Purpose**: Communication with users about bookings and bids.

**Layout**: Matches the consumer app's messaging pattern:
- Left sidebar: Conversation list with last message preview, unread badge, online status
- Right panel: Active chat thread

**Conversation types:**
- Bid discussions (pre-booking)
- Active booking communication
- Support threads

**Message features:**
- Text messages
- Quick reply templates ("Worker is on the way", "Service completed", etc.)
- Arrival status cards (same as consumer side)
- Booking summary attachments

### 7.10 Analytics Dashboard (`/analytics`)
**Purpose**: Business intelligence for agency operations.

**Charts & Metrics (use `recharts`):**
1. **Revenue Over Time**: Line chart (daily/weekly/monthly toggle)
2. **Bookings by Category**: Pie/donut chart of services provided
3. **Bid Success Rate**: Bar chart showing bids submitted vs accepted per week
4. **Worker Utilization**: Horizontal bar chart showing each worker's utilization %
5. **Top Performing Workers**: Ranked list by rating + gigs completed
6. **Average Response Time**: Trend line (target < 30 min)
7. **Client Satisfaction**: Rating distribution histogram
8. **Quick-Add Conversion**: What % of quick-add pool entries lead to bookings

### 7.11 Agency Settings (`/settings`)
**Sections:**
- **Agency Profile**: Name, logo, description, contact info, operating areas
- **Documents**: Upload/manage GST certificate, Trade License, etc.
- **Bank & Payments**: Bank account details for payouts, transaction history
- **Notifications**: Email/push notification preferences
- **Team Access**: Invite other staff members to use the dashboard (roles: admin, manager, viewer)
- **Service Preferences**: Which categories to receive requests for, min/max budget, operating hours

### 7.12 Agency Onboarding (`/onboarding`)
**Multi-step registration flow (mirrors consumer app pattern):**
1. **Phone Verification** (OTP - same pattern as consumer `PhoneStep` + `OtpStep`)
2. **Agency Registration**: Name, email, GST number, address, description
3. **Service Selection**: Pick which categories the agency serves
4. **Document Upload**: GST certificate, Trade License (at least 1 required)
5. **Add First Employees**: Add at least 2 workers with basic info
6. **Bank Details**: Payment account setup
7. **Review & Submit**: Summary of all info, submit for verification

---

## 8. Interaction Flows

### 8.1 Complete Bid Flow (Provider Perspective)
```
1. New request notification appears on dashboard
2. Provider clicks request -> navigates to /requests/:reqId
3. Provider reviews requirement details
4. Provider opens Worker Selection panel
5. Provider searches/filters available workers
6. Provider selects 1-3 workers (Quick-Add workers highlighted at top)
7. System auto-calculates bid amount based on workers' daily rates
8. Provider adjusts bid amount if needed
9. Provider optionally adds a note
10. Provider clicks "Submit Bid"
11. System validates bid and shows success
12. Bid appears in /bids as "Pending"
13. If user accepts -> status changes to "Accepted" + booking created
14. Provider assigns confirmed worker -> booking goes "Ongoing"
```

### 8.2 Quick-Add Flow (Instant Matching)
```
1. Provider adds available workers to Quick-Add pool (/quick-add)
2. Sets their services, rates, and hours
3. Consumer user opens app, starts PostRequirementFlow
4. User fills questionnaire, reaches ChooseModePopup
5. User selects "Quick Find" (lightning bolt)
6. Consumer app shows SwipeScreen with Quick-Add pool workers
7. User swipes right on a worker -> Checkout -> Payment
8. Provider receives instant booking notification
9. Quick-Add worker status changes to "On Assignment"
10. Worker auto-removed from Quick-Add pool (or flagged as busy)
```

### 8.3 Consumer App User Flow (For Context)
```
PostRequirementFlow steps:
  1. CardQuestionnaire (careFor, careType, urgency, hoursPerDay, days, specialRequirements, budget)
  2. ChooseModePopup: Quick Find OR Post & Get Bids

If Quick Find:
  3. SwipeScreen -> provider profiles from Quick-Add pool
  4. BookingCheckout (service items, promo code, contact verification)
  5. PaymentFlow (UPI/card/netbanking/COD, receipt generation)
  6. Booking confirmed, OngoingServiceCard shown on homepage

If Post & Get Bids:
  3. BidSuccessScreen (requirement persisted, gig ID shown)
  4. Wait for bids to arrive (visible in /bookings tab as "Active Request")
  5. Navigate to /bookings/:id/bids -> BidsSwipeScreen
  6. Swipe through agency bids (Tinder-style cards)
  7. Accept a bid -> BookingCheckout -> PaymentFlow
  8. Booking confirmed
```

---

## 9. UI Component Patterns (Follow Consumer App)

### 9.1 Shared UI Patterns
- **Bottom sheets**: Use `motion/react` spring animation `{ type: "spring", damping: 28, stiffness: 300 }`, `rounded-t-[28px]`, backdrop with `bg-black/40`
- **Cards**: `rounded-[20px]` or `rounded-[24px]`, `bg-white`, subtle shadow `0 2px 8px rgba(0,0,0,0.06)`
- **Primary Button**: `bg-[#1975D2]`, `rounded-[14px]`, white text, shadow `0px 4px 14px -2px rgba(25,117,210,0.35)`, active state `scale-[0.98]`
- **Section Headers**: Lexend bold 14px uppercase tracking-[0.7px] text-[#64748b] with "See All" link in primary blue
- **Status Badges**: Rounded-full pills with bg/text color pairs (green=success, orange=warning, red=error, blue=info, gray=neutral)
- **Empty States**: Centered illustration + heading + description + CTA button
- **Loading States**: Skeleton pulse animations or spinner with "Loading..." text
- **Pull to Refresh**: Implemented via `PullToRefresh` component pattern
- **Page transitions**: `motion.div` with `initial={{ opacity: 0, y: 20 }}` animate to `{ opacity: 1, y: 0 }`
- **Modal overlay**: Use `useModalOverlay(open)` hook pattern to hide nav bars when modals are open

### 9.2 Desktop-Specific Patterns (Provider App)
Since this is web-focused for agencies:
- **Sidebar Navigation**: Persistent left sidebar (collapsible) with icon + label nav items
- **Breadcrumbs**: Top of each page for navigation context
- **Data Tables**: Sortable columns, pagination, bulk actions toolbar
- **Split Panels**: Master-detail views (list on left, detail on right)
- **Toasts**: Top-right notification toasts for real-time events (new request, bid accepted, etc.)
- **Keyboard Shortcuts**: `Ctrl+K` for global search, `Esc` to close modals

### 9.3 Responsive Breakpoints
```
Mobile:  < 768px   (unlikely for agency use but should work)
Tablet:  768-1024px
Desktop: > 1024px  (primary target)
```

---

## 10. State Management

### 10.1 Context Providers (Mirror consumer app pattern)
```
AgencyAuthContext    - Agency login session + profile (localStorage persistence)
WorkerContext        - Employee roster state
RequestContext       - Incoming requests cache
BidContext           - Submitted bids state
BookingContext       - Active bookings (reuses consumer pattern)
NotificationContext  - Real-time notification state
ModalContext         - Modal overlay state (reuse from consumer)
```

### 10.2 localStorage Keys (Namespaced to avoid collision with consumer app)
```
ecp_session          - Agency auth session
ecp_profile          - Agency profile
ecp_workers          - Worker roster
ecp_bids             - Submitted bids
ecp_bookings         - Active bookings
ecp_requests_cache   - Cached incoming requests
ecp_quick_add_pool   - Quick-add pool entries
ecp_conversations    - Message threads
ecp_notifications    - Notification history
```

---

## 11. Mock Data Requirements

Since the app uses localStorage stubs (no real backend), generate realistic Indian mock data:

### 11.1 Mock Agency
```
CareFirst Agency - Est. 2018, Salt Lake Sector V, Kolkata
Rating: 4.8, 45 workers, 1,200+ gigs completed
Services: Elder Care, Medical Care, Baby Care, Cleaning
```

### 11.2 Mock Workers (Generate 15-20)
Indian names, Unsplash photos, varied:
- Mix of male/female
- Experience: 1-10 years
- Services: Spread across categories
- Ratings: 4.0-4.9
- Status: Mix of available, on-assignment, on-leave
- 5-6 should be in the Quick-Add pool

### 11.3 Mock Incoming Requests (Generate 8-10)
Matching the consumer app's requirement format:
- Varied services (Elder Care, Baby Care, Cleaning, Medical)
- Different budgets (Basic, Experienced, Medical)
- Different urgencies
- Different locations within Kolkata
- Some with special requirements

### 11.4 Mock Bids (Generate 5-6)
Mix of pending, accepted, rejected statuses.

---

## 12. Consumer App File Reference

Key files in the consumer app that the provider app interfaces with:

| Purpose | File Path |
|---------|-----------|
| Requirement data model | `/src/app/services/api.ts` -> `RequirementRecord` |
| Booking data model | `/src/app/services/api.ts` -> `BookingRecord` |
| Bid card display | `/src/app/components/dashboard/BidsSwipeScreen.tsx` -> `BidProfile` |
| Provider swipe cards | `/src/app/components/dashboard/SwipeScreen.tsx` -> `ProviderProfile` |
| Questionnaire data | `/src/app/components/dashboard/CareQuestionnaire.tsx` -> `QuestionnaireData` |
| Card questionnaire | `/src/app/components/dashboard/CardQuestionnaire.tsx` -> `CardQuestionnaireData` |
| Mode selection | `/src/app/components/dashboard/ChooseModePopup.tsx` (Quick Find vs Post & Bid) |
| Booking flow | `/src/app/components/dashboard/PostRequirementFlow.tsx` |
| Checkout | `/src/app/components/dashboard/BookingCheckout.tsx` -> `CheckoutProfile` |
| Payment | `/src/app/components/dashboard/PaymentFlow.tsx` -> `PaymentProvider`, `PaymentBookingDetails` |
| Worker profile modal | `/src/app/components/dashboard/WorkerProfileModal.tsx` -> `WorkerExtended` |
| Booking context | `/src/app/context/BookingContext.tsx` -> `BookedProvider` |
| Auth context | `/src/app/context/AuthContext.tsx` |
| Service categories | `/src/app/components/dashboard/QuickCategories.tsx` -> `SERVICE_DATA` |
| Care packages | `/src/app/components/dashboard/CarePackages.tsx` + `PackageDetailPopup.tsx` |
| Design tokens | `/src/app/config/designTokens.ts` |
| Data service layer | `/src/app/services/DataService.ts` |

---

## 13. Key UX Principles

1. **Speed matters**: Agencies respond to requests fast. Minimize clicks to submit a bid. Show Quick-Add workers first.
2. **Information density**: Desktop users can handle more data. Use tables, multi-column layouts, and data-rich cards.
3. **Real-time feel**: Even with localStorage stubs, simulate real-time with polling intervals, optimistic updates, and toast notifications.
4. **Worker-centric**: The most important asset is the worker roster. Make it easy to find, filter, and select workers.
5. **Trust signals**: Show verification badges, ratings, and completion counts prominently.
6. **Mobile fallback**: While desktop-first, the app should degrade gracefully on tablet/mobile for managers on the go.

---

## 14. Important Notes for AI Implementation

1. **This is a SEPARATE app** from the consumer app. It has its own router, layout, and auth flow. But it shares the same design system (colors, fonts, tokens).
2. **localStorage keys are namespaced** with `ecp_` prefix (EasyCare Provider) to avoid collision with consumer app's `ec_` prefix.
3. **Mock data should be pre-seeded** on first load (check if localStorage keys exist, if not, populate with mock data).
4. **The provider app is web-focused** since agencies use desktops. The primary layout is a sidebar + content area (not bottom tab navigation like the consumer app).
5. **Worker selection during bid submission is the most critical UX**. It should feel fast, filterable, and clearly show availability status.
6. **Quick-Add pool** is the provider-side mechanism that feeds the consumer app's "Quick Find" / `SwipeScreen` flow. This is a key differentiator.
7. **Budget tiers** from the consumer app map to: Basic (Rs.100-150/hr), Experienced (Rs.150-250/hr), Medical (Rs.250-400/hr).
8. **All monetary values use Indian Rupee** format: `Rs.2,200` or `Rs. 2k-3k`.
9. **Follow the animation guide** at `/src/imports/animation-guide.md` for motion patterns.
10. **Use `createHashRouter`** for routing (GitHub Pages compatibility), same as consumer app.

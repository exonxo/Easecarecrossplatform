import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  X, ArrowLeft, Clock, IndianRupee, CheckCircle2, Search,
} from "lucide-react";
import svgPaths from "../../../imports/svg-y2c5f3iwq2";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { ServiceBookingPopup, type ServiceItem as BookableService } from "./ServiceBookingPopup";
import { useBooking } from "../../context/BookingContext";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { LoginModal } from "../auth/LoginModal";
import { PrimaryButton } from "../shared/PrimaryButton";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ServiceItem {
  name: string;
  description: string;
  price: string;
  duration: string;
  included: string[];
  photo: string;
}

interface Category {
  label: string;
  icon: string;
  viewBox: string;
  iconW: number;
  iconH: number;
  color: string;
  bg: string;
  border: string;
}

// ─── Service Data ─────────────────────────────────────────────────────────────

export const SERVICE_DATA: Record<string, ServiceItem[]> = {
  "Elder Care": [
    {
      name: "Personal Care Assistant",
      description: "Daily living assistance including bathing, grooming & mobility support",
      price: "Starting from ₹599/day",
      duration: "4–12 hrs/day",
      included: ["Bathing & grooming", "Mobility assistance", "Meal support", "Medication reminders"],
      photo: "https://images.unsplash.com/photo-1765896387387-0538bc9f997e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Medication Management",
      description: "Professional tracking and administration of medicines on schedule",
      price: "Starting from ₹499/day",
      duration: "2–4 hrs/day",
      included: ["Medicine schedule tracking", "Dose administration", "Doctor follow-ups", "Health reports"],
      photo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Companionship",
      description: "Friendly companion for conversation, activities & emotional support",
      price: "Starting from ₹449/day",
      duration: "4–8 hrs/day",
      included: ["Conversation & company", "Light activities", "Walk accompaniment", "Reading & games"],
      photo: "https://images.unsplash.com/photo-1765896387403-3e6e0e44d7cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Physical Therapy Support",
      description: "In-home physiotherapy exercises and rehabilitation support",
      price: "Starting from ₹799/day",
      duration: "1–2 hrs/session",
      included: ["Exercise routines", "Mobility training", "Progress tracking", "Weekly reports"],
      photo: "https://images.unsplash.com/photo-1717500252010-d708ec89a0a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Meal Preparation",
      description: "Nutritious home-cooked meals tailored to dietary requirements",
      price: "Starting from ₹399/day",
      duration: "2–3 hrs/day",
      included: ["Diet-specific meals", "Fresh cooking", "Kitchen cleanup", "Grocery management"],
      photo: "https://images.unsplash.com/photo-1547592166-23ac45744acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Medical Escort",
      description: "Accompaniment for hospital visits, check-ups & medical appointments",
      price: "Starting from ₹699/visit",
      duration: "Per visit",
      included: ["Hospital accompaniment", "Report collection", "Pharmacy runs", "Transport coordination"],
      photo: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
  ],
  Housekeeping: [
    {
      name: "Deep Home Cleaning",
      description: "Thorough top-to-bottom cleaning of your entire home",
      price: "Starting from ₹1,499",
      duration: "4–6 hrs",
      included: ["All rooms", "Windows & fans", "Behind furniture", "Balcony cleaning"],
      photo: "https://images.unsplash.com/photo-1563453392212-326f5e854473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Regular Housekeeping",
      description: "Daily or weekly cleaning to maintain a tidy home",
      price: "Starting from ₹499/visit",
      duration: "2–3 hrs",
      included: ["Sweeping & mopping", "Dusting", "Dishwashing", "Bed making"],
      photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Kitchen Cleaning",
      description: "Deep clean of kitchen including appliances and chimney",
      price: "Starting from ₹799",
      duration: "2–3 hrs",
      included: ["Appliance cleaning", "Chimney service", "Counter sanitization", "Cabinet wipe-down"],
      photo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Bathroom Sanitization",
      description: "Complete sanitization and descaling of bathrooms",
      price: "Starting from ₹599/bathroom",
      duration: "1–2 hrs",
      included: ["Tile scrubbing", "Fixture polishing", "Drain cleaning", "Sanitization"],
      photo: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Post-Construction Cleanup",
      description: "Thorough removal of construction debris and dust",
      price: "Starting from ₹2,499",
      duration: "6–8 hrs",
      included: ["Debris removal", "Dust cleaning", "Floor polishing", "Paint spot removal"],
      photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Sofa & Carpet Cleaning",
      description: "Professional shampooing and deep cleaning of upholstery",
      price: "Starting from ₹999",
      duration: "2–4 hrs",
      included: ["Sofa shampooing", "Carpet washing", "Stain removal", "Deodorizing"],
      photo: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
  ],
  "Baby Care": [
    {
      name: "Babysitting",
      description: "Trusted and trained babysitters for infants and toddlers",
      price: "Starting from ₹499/hr",
      duration: "Flexible",
      included: ["Feeding support", "Diaper changes", "Play & engage", "Nap supervision"],
      photo: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "After School Care",
      description: "Supervised activities and care after school hours",
      price: "Starting from ₹599/session",
      duration: "3–5 hrs",
      included: ["Pickup from school", "Snack time", "Homework help", "Creative activities"],
      photo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Homework Help",
      description: "One-on-one tutoring and homework assistance",
      price: "Starting from ₹399/hr",
      duration: "1–2 hrs",
      included: ["Subject tutoring", "Assignment help", "Reading practice", "Exam prep"],
      photo: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Activity-Based Learning",
      description: "Fun educational activities to boost creativity and skills",
      price: "Starting from ₹699/session",
      duration: "2–3 hrs",
      included: ["Art & craft", "Music exposure", "Science experiments", "Storytelling"],
      photo: "https://images.unsplash.com/photo-1617854818583-09e7f077a156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Weekend Daycare",
      description: "Full-day supervised care on weekends",
      price: "Starting from ₹999/day",
      duration: "8–10 hrs",
      included: ["Meals included", "Outdoor play", "Group activities", "Nap time"],
      photo: "https://images.unsplash.com/photo-1709127347884-a106974ef58d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Night Nanny",
      description: "Overnight care for newborns and infants",
      price: "Starting from ₹1,299/night",
      duration: "8–10 hrs",
      included: ["Night feeding", "Diaper changes", "Sleep training", "Parent rest support"],
      photo: "https://images.unsplash.com/photo-1770872938224-8e88ab44fe66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
  ],
  "Home Nursing": [
    {
      name: "Post-Surgery Recovery Nursing",
      description: "Licensed nurse for wound care and recovery monitoring after surgery",
      price: "Starting from ₹899/visit",
      duration: "1–3 hrs/visit",
      included: ["Wound dressing", "Vital sign monitoring", "Medication administration", "Doctor coordination"],
      photo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "IV Therapy & Injections",
      description: "Trained nurse for IV drips, injections and infusions at home",
      price: "Starting from ₹599/visit",
      duration: "Per visit",
      included: ["IV cannulation", "Injection administration", "Drip monitoring", "Safe disposal"],
      photo: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Dementia & Memory Care",
      description: "Specialized nursing for patients with dementia and Alzheimer's",
      price: "Starting from ₹999/day",
      duration: "8–12 hrs/day",
      included: ["Behaviour management", "Medication tracking", "Safety supervision", "Cognitive activities"],
      photo: "https://images.unsplash.com/photo-1740908900846-271f4f021b6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Chronic Disease Management",
      description: "Ongoing nursing care for diabetes, BP, COPD and cardiac conditions",
      price: "Starting from ₹749/day",
      duration: "Flexible",
      included: ["Daily vitals tracking", "Medication schedules", "Diet supervision", "Symptom reporting"],
      photo: "https://images.unsplash.com/photo-1559757175-5700dde675bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Tracheostomy & Catheter Care",
      description: "Sterile management of tracheostomy tubes and urinary catheters",
      price: "Starting from ₹999/visit",
      duration: "1–2 hrs/visit",
      included: ["Tube cleaning & changing", "Infection prevention", "Caregiver training", "Emergency support"],
      photo: "https://images.unsplash.com/photo-1551601651-bc60f254d532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "ICU-at-Home Setup",
      description: "Critical-care nursing with monitoring equipment for ICU-level care",
      price: "Starting from ₹2,499/day",
      duration: "24 hrs",
      included: ["Ventilator support", "24/7 nurse rotation", "Monitor + oxygen setup", "Doctor on-call"],
      photo: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
  ],
  "Companion Care": [
    {
      name: "Daily Companionship",
      description: "Friendly companion for conversation, light activities and emotional support",
      price: "Starting from ₹449/day",
      duration: "4–8 hrs/day",
      included: ["Conversation & company", "Light games & puzzles", "Tea & meal company", "Family check-ins"],
      photo: "https://images.unsplash.com/photo-1765896387403-3e6e0e44d7cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Walk & Outdoor Activities",
      description: "Safe outdoor walks, park visits and light exercise accompaniment",
      price: "Starting from ₹349/session",
      duration: "1–2 hrs",
      included: ["Walk accompaniment", "Park visits", "Light stretches", "Hydration reminders"],
      photo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Hospital Visit Accompaniment",
      description: "Trusted escort for medical appointments, tests and check-ups",
      price: "Starting from ₹699/visit",
      duration: "Per visit",
      included: ["Transport coordination", "Doctor consultation support", "Report collection", "Pharmacy pickups"],
      photo: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Reading & Storytelling",
      description: "Daily reading sessions of books, newspapers and family letters",
      price: "Starting from ₹299/session",
      duration: "1–2 hrs",
      included: ["Books & newspapers", "Personal letters", "Bilingual options", "Audio book setup"],
      photo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Hobby & Activity Time",
      description: "Engaging hobbies like art, music, gardening and board games",
      price: "Starting from ₹499/session",
      duration: "2–3 hrs",
      included: ["Art & craft", "Music sessions", "Gardening help", "Board & card games"],
      photo: "https://images.unsplash.com/photo-1717500252010-d708ec89a0a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Weekend Family Visits",
      description: "Friendly companion to spend quality weekend hours with your loved ones",
      price: "Starting from ₹899/day",
      duration: "Half / full day",
      included: ["Conversation & company", "Meal company", "Light outings", "Video calls with family"],
      photo: "https://images.unsplash.com/photo-1709127347884-a106974ef58d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
  ],
  Physiotherapy: [
    {
      name: "Orthopedic Rehabilitation",
      description: "Targeted recovery therapy for fractures, joint replacements and orthopedic injuries",
      price: "Starting from ₹799/session",
      duration: "45–60 min",
      included: ["Customized exercise plan", "Range-of-motion training", "Strength building", "Progress tracking"],
      photo: "https://images.unsplash.com/photo-1717500252010-d708ec89a0a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Post-Stroke Therapy",
      description: "Neuro-physiotherapy to rebuild movement and coordination after stroke",
      price: "Starting from ₹999/session",
      duration: "45–60 min",
      included: ["Mobility re-training", "Balance therapy", "Speech coordination support", "Family training"],
      photo: "https://images.unsplash.com/photo-1518611012118-696072aa579a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Geriatric Physiotherapy",
      description: "Gentle therapy designed for senior citizens to maintain mobility and strength",
      price: "Starting from ₹699/session",
      duration: "45 min",
      included: ["Joint mobility exercises", "Fall prevention", "Posture correction", "Pain management"],
      photo: "https://images.unsplash.com/photo-1765896387387-0538bc9f997e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Sports Injury Recovery",
      description: "Sports-specific rehabilitation for athletes and active individuals",
      price: "Starting from ₹899/session",
      duration: "45–60 min",
      included: ["Sport-specific drills", "Injury assessment", "Taping & support", "Return-to-play plan"],
      photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Joint Pain Management",
      description: "Non-surgical relief for arthritis, back pain and chronic joint issues",
      price: "Starting from ₹749/session",
      duration: "45 min",
      included: ["Manual therapy", "Hot & cold therapy", "Ergonomic guidance", "Home exercise routine"],
      photo: "https://images.unsplash.com/photo-1559757175-5700dde675bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Pre & Post-Natal Physio",
      description: "Safe exercises and pelvic-floor therapy before and after childbirth",
      price: "Starting from ₹899/session",
      duration: "45 min",
      included: ["Pelvic-floor exercises", "Posture correction", "Diastasis recovery", "Back-pain relief"],
      photo: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
  ],
  "Personal Chef": [
    {
      name: "Daily Home-Cooked Meals",
      description: "Fresh North or South Indian meals prepared in your kitchen every day",
      price: "Starting from ₹399/day",
      duration: "2–3 hrs/day",
      included: ["2 meals/day", "Fresh groceries used", "Kitchen cleanup", "Menu rotation"],
      photo: "https://images.unsplash.com/photo-1547592166-23ac45744acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Diabetic & Diet Special",
      description: "Doctor-approved low-GI meals customized for diabetic or BP patients",
      price: "Starting from ₹599/day",
      duration: "2 hrs/day",
      included: ["Sugar-controlled menus", "Portion-controlled meals", "Sodium tracking", "Weekly nutrition report"],
      photo: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Post-Surgery Soft Foods",
      description: "Easy-to-digest, soft and nutritious meals tailored for recovery",
      price: "Starting from ₹499/day",
      duration: "2 hrs/day",
      included: ["Liquid & soft meals", "Protein-rich recipes", "Hygiene-certified kitchen", "Feeding support"],
      photo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Vegetarian Family Meals",
      description: "Pure-veg / Jain / Satvik meals for the whole family",
      price: "Starting from ₹449/day",
      duration: "2–3 hrs/day",
      included: ["Pure-veg / Jain options", "Roti, rice & sabzi", "Weekly menu plan", "Festival specials"],
      photo: "https://images.unsplash.com/photo-1547592166-23ac45744acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Festive & Party Cooking",
      description: "Multi-course party menus, festival sweets and special-occasion catering",
      price: "Starting from ₹2,499/event",
      duration: "Per event",
      included: ["Up to 25 guests", "Multi-course menu", "Sweets & snacks", "Service & cleanup"],
      photo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Diet Plan Consultation",
      description: "One-on-one consultation with a certified nutritionist to plan your meals",
      price: "Starting from ₹799/consult",
      duration: "45 min",
      included: ["Health assessment", "Custom meal plan", "Grocery list", "Follow-up support"],
      photo: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
  ],
  "Pet Care": [
    {
      name: "Daily Dog Walking",
      description: "Energetic, scheduled walks for your dog with a trained handler",
      price: "Starting from ₹299/walk",
      duration: "30–60 min",
      included: ["Leashed walks", "Water breaks", "Photo updates", "Bowel cleanup"],
      photo: "https://images.unsplash.com/photo-1517849845537-4d257902454a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Pet Sitting at Home",
      description: "In-home pet sitter while you're away — feeding, play and supervision",
      price: "Starting from ₹599/day",
      duration: "Half / full day",
      included: ["Feeding schedule", "Play & exercise", "Litter cleanup", "Daily updates"],
      photo: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Pet Grooming & Bathing",
      description: "Full-service grooming at home: bath, haircut, nails and ear cleaning",
      price: "Starting from ₹799/session",
      duration: "1–2 hrs",
      included: ["Bath & blow-dry", "Haircut & trim", "Nail clipping", "Ear & teeth cleaning"],
      photo: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Vet Visit Accompaniment",
      description: "Pickup, drop and assistance for your pet's vet appointments",
      price: "Starting from ₹699/visit",
      duration: "Per visit",
      included: ["Pickup & drop", "Vet coordination", "Report collection", "Medication pickup"],
      photo: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Cat & Small Pet Care",
      description: "Tailored care for cats, rabbits, birds and other small pets",
      price: "Starting from ₹399/visit",
      duration: "30–60 min",
      included: ["Feeding & water refill", "Litter / cage cleanup", "Playtime", "Health observation"],
      photo: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      name: "Overnight Pet Boarding",
      description: "Overnight stay with feeding, walks and 24-hour supervision at your home",
      price: "Starting from ₹999/night",
      duration: "12 hrs",
      included: ["Evening + morning walks", "Feeding & medication", "Overnight supervision", "Morning report"],
      photo: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
  ],
};

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    name: "Basic Service",
    description: "Standard assistance tailored to your needs",
    price: "Starting from ₹499",
    duration: "Flexible",
    included: ["Customized support", "Verified professionals", "Flexible scheduling"],
    photo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    name: "Premium Package",
    description: "Comprehensive care with dedicated professionals",
    price: "Starting from ₹999",
    duration: "Full day",
    included: ["Dedicated professional", "Priority booking", "Progress reports", "24/7 support"],
    photo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
];

// ─── Category definitions ─────────────────────────────────────────────────────

export const categories: Category[] = [
  // Row 1
  { label: "Elder Care",     icon: svgPaths.p3f3a9b80,  viewBox: "0 0 28 27.3333",      iconW: 28,     iconH: 27.333, color: "#2563EB", bg: "#eff6ff", border: "rgba(219,234,254,0.6)" },
  { label: "Home Nursing",   icon: svgPaths.p23d8d00,   viewBox: "0 0 26.6667 26.6667", iconW: 26.667, iconH: 26.667, color: "#E11D48", bg: "#fff1f2", border: "rgba(255,228,230,0.6)" },
  { label: "Baby Care",      icon: svgPaths.p282fd600,  viewBox: "0 0 24 24",           iconW: 24,     iconH: 24,     color: "#9333EA", bg: "#faf5ff", border: "rgba(243,232,255,0.6)" },
  { label: "Companion Care", icon: svgPaths.p286fe780,  viewBox: "0 0 21.3333 26.6667", iconW: 21.333, iconH: 26.667, color: "#0D9488", bg: "#f0fdfa", border: "rgba(204,251,241,0.6)" },
  // Row 2
  { label: "Physiotherapy",  icon: svgPaths.p2d11f400,  viewBox: "0 0 26.4 26.4",       iconW: 26.4,   iconH: 26.4,   color: "#4F46E5", bg: "#eef2ff", border: "rgba(224,231,255,0.6)" },
  { label: "Housekeeping",   icon: svgPaths.p3eb40d60,  viewBox: "0 0 24 29.3333",      iconW: 24,     iconH: 29.333, color: "#059669", bg: "#ecfdf5", border: "rgba(209,250,229,0.6)" },
  { label: "Personal Chef",  icon: svgPaths.p3dfaed00,  viewBox: "0 0 20 26.6667",      iconW: 20,     iconH: 26.667, color: "#EA580C", bg: "#fff7ed", border: "rgba(255,237,213,0.6)" },
  { label: "Pet Care",       icon: svgPaths.p15b38ee0,  viewBox: "0 0 26.6667 25.3333", iconW: 26.667, iconH: 25.333, color: "#D97706", bg: "#fffbeb", border: "rgba(254,243,199,0.6)" },
];

// ─── Providers pool ───────────────────────────────────────────────────────────

export const SYSTEM_PROVIDERS = [
  { name: "Anjali Sharma",   photo: "https://images.unsplash.com/photo-1710425804836-a1de39056b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", rating: 4.9, agency: "CareFirst Agency" },
  { name: "Priya Dasgupta",  photo: "https://images.unsplash.com/photo-1590905707155-17c680dd7867?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", rating: 4.8, agency: "Bright Cleaners Agency" },
  { name: "Rekha Nair",      photo: "https://images.unsplash.com/photo-1667382137969-a11fd256717d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", rating: 4.7, agency: "HomeCare Plus" },
];

// ─── Service detail inline panel ──────────────────────────────────────────────

function ServiceDetail({
  service,
  category,
  onBack,
  onBook,
}: {
  service: ServiceItem;
  category: Category;
  onBack: () => void;
  onBook: () => void;
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Photo header */}
      <div className="relative h-[180px] md:h-[220px] shrink-0 overflow-hidden">
        <ImageWithFallback
          src={service.photo}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 size-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors"
        >
          <ArrowLeft size={15} className="text-white" />
        </button>
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="font-['Lexend',sans-serif] font-bold text-[20px] text-white leading-[26px]">
            {service.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <p className="font-['Inter',sans-serif] text-[14px] text-[#475569] leading-[22px] mb-5">
          {service.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-[#f8fafc] rounded-[12px] p-3.5 border border-[#f1f5f9]">
            <div className="flex items-center gap-1.5 mb-1">
              <IndianRupee size={13} className="text-[#1975D2]" />
              <span className="font-['Inter',sans-serif] text-[10px] text-[#94a3b8] font-semibold uppercase tracking-wider">Pricing</span>
            </div>
            <p className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#0f172a]">{service.price}</p>
          </div>
          <div className="bg-[#f8fafc] rounded-[12px] p-3.5 border border-[#f1f5f9]">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock size={13} className="text-[#1975D2]" />
              <span className="font-['Inter',sans-serif] text-[10px] text-[#94a3b8] font-semibold uppercase tracking-wider">Duration</span>
            </div>
            <p className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#0f172a]">{service.duration}</p>
          </div>
        </div>

        <h4 className="font-['Lexend',sans-serif] font-bold text-[13px] text-[#0f172a] mb-3">What's Included</h4>
        <div className="flex flex-col gap-2">
          {service.included.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <CheckCircle2 size={15} className="text-[#22c55e] shrink-0" />
              <span className="font-['Inter',sans-serif] text-[13px] text-[#334155]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0 px-5 py-4 border-t border-[#f1f5f9]">
        <PrimaryButton onClick={onBook}>Book Now</PrimaryButton>
      </div>
    </div>
  );
}

// ─── Category Modal ───────────────────────────────────────────────────────────

function CategoryModal({
  category,
  open,
  onClose,
  onBookService,
}: {
  category: Category | null;
  open: boolean;
  onClose: () => void;
  onBookService: (service: ServiceItem, cat: Category) => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ServiceItem | null>(null);

  const services = category ? (SERVICE_DATA[category.label] || DEFAULT_SERVICES) : [];
  const filtered = query.trim()
    ? services.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.description.toLowerCase().includes(query.toLowerCase())
      )
    : services;

  // Reset when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => { setQuery(""); setSelected(null); }, 200);
    }
  }, [open]);

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[860px] sm:max-w-[860px] h-[88vh] p-0 gap-0 overflow-hidden flex flex-col">
        <DialogTitle className="sr-only">{category.label} Services</DialogTitle>

        <AnimatePresence mode="wait" initial={false}>
          {selected ? (
            <motion.div
              key="detail"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full overflow-hidden"
            >
              <ServiceDetail
                service={selected}
                category={category}
                onBack={() => setSelected(null)}
                onBook={() => onBookService(selected, category)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full overflow-hidden"
            >
              {/* ── Modal header ── */}
              <div
                className="shrink-0 px-5 py-5 flex flex-col gap-4"
                style={{ background: `linear-gradient(135deg, ${category.color}18 0%, ${category.color}08 100%)` }}
              >
                {/* Top row: icon + title + close */}
                <div className="flex items-center gap-3">
                  <div
                    className="size-12 rounded-[14px] flex items-center justify-center shrink-0 shadow-sm"
                    style={{ backgroundColor: category.bg, border: `1px solid ${category.border}` }}
                  >
                    <svg width={22} height={22} fill="none" viewBox={category.viewBox}>
                      <path d={category.icon} fill={category.color} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-['Lexend',sans-serif] font-bold text-[20px] text-[#0f172a]">
                      {category.label}
                    </h2>
                    <p className="font-['Inter',sans-serif] text-[13px] text-[#64748b]">
                      {services.length} services available
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="size-9 rounded-full bg-white/80 backdrop-blur-sm border border-[#e5e7eb] flex items-center justify-center cursor-pointer hover:bg-white transition-colors shrink-0"
                  >
                    <X size={15} className="text-[#64748b]" />
                  </button>
                </div>

                {/* Search within category */}
                <div className="relative">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                  <input
                    type="text"
                    placeholder={`Search in ${category.label}...`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-white border border-[#e5e7eb] rounded-[12px] pl-9 pr-4 py-2.5 font-['Inter',sans-serif] text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#1975D2] focus:ring-[2px] focus:ring-[rgba(25,117,210,0.12)] transition-all"
                  />
                </div>
              </div>

              {/* ── Service grid ── */}
              <div className="flex-1 overflow-y-auto px-5 py-4">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Search size={32} className="text-[#e2e8f0] mb-3" />
                    <p className="font-['Lexend',sans-serif] font-semibold text-[15px] text-[#94a3b8]">
                      No services found for "{query}"
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filtered.map((service, idx) => (
                      <motion.button
                        key={service.name}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        onClick={() => setSelected(service)}
                        className="group bg-white rounded-[16px] border border-[#f1f5f9] overflow-hidden text-left cursor-pointer hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.1)] hover:border-[#e2e8f0] active:scale-[0.99] transition-all"
                      >
                        {/* Photo */}
                        <div className="relative h-[130px] overflow-hidden bg-[#f8fafc]">
                          <ImageWithFallback
                            src={service.photo}
                            alt={service.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Card body */}
                        <div className="p-3.5 flex flex-col gap-1.5">
                          <h4 className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#0f172a] leading-[20px] group-hover:text-[#1975D2] transition-colors line-clamp-1">
                            {service.name}
                          </h4>
                          <p className="font-['Inter',sans-serif] text-[12px] text-[#64748b] leading-[18px] line-clamp-2">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-[#f8fafc]">
                            <span className="font-['Lexend',sans-serif] font-semibold text-[12px] text-[#1975D2]">
                              {service.price}
                            </span>
                            <span className="font-['Inter',sans-serif] text-[11px] text-[#94a3b8]">
                              {service.duration}
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main QuickCategories ─────────────────────────────────────────────────────

export function QuickCategories({ initialCategoryLabel }: { initialCategoryLabel?: string } = {}) {
  const navigate = useNavigate();
  const { setBookedProvider } = useBooking();
  const { requireAuth, loginOpen, setLoginOpen } = useRequireAuth();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Auto-open a category modal if the URL pre-selected one
  useEffect(() => {
    if (!initialCategoryLabel) return;
    const match = categories.find(
      (c) => c.label.toLowerCase() === initialCategoryLabel.toLowerCase()
    );
    if (match) {
      setSelectedCategory(match);
      setModalOpen(true);
    }
  }, [initialCategoryLabel]);

  const [bookingService, setBookingService] = useState<ServiceItem | null>(null);
  const [bookingCategory, setBookingCategory] = useState<Category | null>(null);
  const [bookingPopupOpen, setBookingPopupOpen] = useState(false);

  const handleCategoryClick = (cat: Category) => {
    requireAuth(() => {
      setSelectedCategory(cat);
      setModalOpen(true);
    });
  };

  const handleBookService = (service: ServiceItem, cat: Category) => {
    setModalOpen(false);
    requireAuth(() => {
      setBookingService(service);
      setBookingCategory(cat);
      setBookingPopupOpen(true);
    });
  };

  const handleBookingComplete = () => {
    if (!bookingService || !bookingCategory) return;
    const provider = SYSTEM_PROVIDERS[Math.floor(Math.random() * SYSTEM_PROVIDERS.length)];
    setBookedProvider({
      providerName: provider.name,
      providerPhoto: provider.photo,
      service: bookingService.name,
      rating: provider.rating,
      agency: provider.agency,
      timeSlot: "Scheduled",
      bidAmount: bookingService.price,
      isPackageBooking: true,
      packageStage: "confirming",
      packageTitle: bookingService.name,
    });
    setBookingPopupOpen(false);
    setBookingService(null);
    setBookingCategory(null);
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Section heading */}
        <div className="flex items-center justify-between">
          <h2 className="font-['Lexend',sans-serif] font-bold text-[18px] md:text-[20px] text-[#0f172a]">
            What do you need?
          </h2>
          <button
            onClick={() => navigate("/services")}
            className="font-['Lexend',sans-serif] font-semibold text-[13px] text-[#1975D2] hover:underline cursor-pointer"
          >
            See all →
          </button>
        </div>

        {/* ── UC-style 4-col category grid ── */}
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryClick(cat)}
              className="group flex flex-col items-center gap-2.5 py-5 md:py-6 px-2 bg-white rounded-[20px] border border-[#f1f5f9] shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:border-[#e2e8f0] active:scale-[0.97] transition-all cursor-pointer"
            >
              {/* Icon circle */}
              <div
                className="size-14 md:size-16 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                style={{ backgroundColor: cat.bg, border: `1.5px solid ${cat.border}` }}
              >
                <svg
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox={cat.viewBox}
                  style={{ width: cat.iconW * 0.75, height: cat.iconH * 0.75 }}
                >
                  <path d={cat.icon} fill={cat.color} />
                </svg>
              </div>

              {/* Label */}
              <span className="font-['Lexend',sans-serif] font-semibold text-[11px] md:text-[12px] text-[#1e293b] text-center leading-[16px] group-hover:text-[#1975D2] transition-colors">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Category modal */}
      <CategoryModal
        category={selectedCategory}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onBookService={handleBookService}
      />

      {/* Service booking flow */}
      <ServiceBookingPopup
        service={bookingService as BookableService | null}
        category={
          bookingCategory
            ? {
                label: bookingCategory.label,
                color: bookingCategory.color,
                bg: bookingCategory.bg,
                icon: bookingCategory.icon,
                viewBox: bookingCategory.viewBox,
              }
            : null
        }
        isOpen={bookingPopupOpen}
        onClose={() => {
          setBookingPopupOpen(false);
          setBookingService(null);
          setBookingCategory(null);
        }}
        onComplete={handleBookingComplete}
      />

      {/* Auth gate */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}

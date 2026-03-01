import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export interface DateRange {
  start: Date;
  end: Date | null;
}

interface DatePickerBaseProps {
  accentColor?: string;
  minDate?: Date;
  label?: string;
}

interface SingleModeProps extends DatePickerBaseProps {
  mode?: "single";
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  dateRange?: never;
  onSelectRange?: never;
}

interface RangeModeProps extends DatePickerBaseProps {
  mode: "range";
  dateRange: DateRange | null;
  onSelectRange: (range: DateRange) => void;
  selectedDate?: never;
  onSelect?: never;
}

type DatePickerProps = SingleModeProps | RangeModeProps;

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function startOfDay(d: Date) {
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  return r;
}

function isSameDay(a: Date, b: Date) {
  return a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();
}

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function formatShort(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

function formatFull(d: Date) {
  return d.toLocaleDateString("en-IN", {
    weekday: "short", day: "2-digit", month: "short", year: "numeric",
  });
}

export function DatePicker(props: DatePickerProps) {
  const {
    accentColor = "#1975D2",
    minDate,
    label = "Select date",
  } = props;

  const isRange = props.mode === "range";
  const today = startOfDay(new Date());
  const effectiveMin = minDate ? startOfDay(minDate) : today;

  const [isOpen, setIsOpen] = useState(false);

  // For range mode: track which click we're on
  const [rangeStep, setRangeStep] = useState<"start" | "end">("start");

  const initialDate = isRange
    ? (props.dateRange?.start || today)
    : (props.selectedDate || today);

  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(viewYear, viewMonth, d));
    }
    return cells;
  }, [viewMonth, viewYear]);

  const goToPrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const canGoPrev = viewYear > effectiveMin.getFullYear() ||
    (viewYear === effectiveMin.getFullYear() && viewMonth > effectiveMin.getMonth());

  const isDisabled = (d: Date) => d < effectiveMin;
  const isToday = (d: Date) => isSameDay(d, today);

  // ─── Day click handler ───
  const handleDayClick = (day: Date) => {
    if (isDisabled(day)) return;

    if (!isRange) {
      props.onSelect(day);
      setIsOpen(false);
      return;
    }

    // Range mode
    if (rangeStep === "start") {
      props.onSelectRange({ start: day, end: null });
      setRangeStep("end");
    } else {
      const range = props.dateRange;
      if (range && day >= range.start) {
        props.onSelectRange({ start: range.start, end: day });
      } else {
        // Clicked before start — restart
        props.onSelectRange({ start: day, end: null });
      }
      setRangeStep("start");
      setIsOpen(false);
    }
  };

  // ─── Quick select for range ───
  const handleQuickRange = (startOffset: number, endOffset: number) => {
    const s = new Date(today); s.setDate(s.getDate() + startOffset);
    const e = new Date(today); e.setDate(e.getDate() + endOffset);
    if (isRange) {
      props.onSelectRange({ start: s, end: e });
      setRangeStep("start");
    } else {
      props.onSelect(s);
    }
    setViewMonth(s.getMonth());
    setViewYear(s.getFullYear());
    setIsOpen(false);
  };

  // ─── Compute display text ───
  let displayText = "Choose a date";
  if (isRange) {
    const r = props.dateRange;
    if (r?.start && r?.end) {
      const diff = daysBetween(r.start, r.end);
      displayText = `${formatShort(r.start)} → ${formatShort(r.end)} (${diff + 1} day${diff > 0 ? "s" : ""})`;
    } else if (r?.start) {
      displayText = `${formatShort(r.start)} → Pick end date`;
    }
  } else {
    if (props.selectedDate) displayText = formatFull(props.selectedDate);
  }

  // ─── Cell styling ───
  const getCellStyle = (day: Date) => {
    const disabled = isDisabled(day);
    if (disabled) return { bg: undefined, color: "#d1d5db", rounded: "rounded-full" };

    if (isRange && props.dateRange) {
      const { start, end } = props.dateRange;
      const isStart = isSameDay(day, start);
      const isEnd = end && isSameDay(day, end);

      if (isStart && isEnd) {
        return { bg: accentColor, color: "#fff", rounded: "rounded-full" };
      }
      if (isStart) {
        return { bg: accentColor, color: "#fff", rounded: "rounded-l-full" };
      }
      if (isEnd) {
        return { bg: accentColor, color: "#fff", rounded: "rounded-r-full" };
      }
      if (end && day > start && day < end) {
        return { bg: `${accentColor}18`, color: accentColor, rounded: "" };
      }
    }

    if (!isRange && props.selectedDate && isSameDay(day, props.selectedDate)) {
      return { bg: accentColor, color: "#fff", rounded: "rounded-full" };
    }

    return { bg: undefined, color: "#374151", rounded: "rounded-full" };
  };

  const hasSelection = isRange
    ? !!(props.dateRange?.start && props.dateRange?.end)
    : !!props.selectedDate;

  return (
    <div className="w-full">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 bg-white border border-[#e5e7eb] rounded-[14px] px-4 py-3 cursor-pointer transition-all active:scale-[0.99]"
        style={{
          borderColor: isOpen ? accentColor : hasSelection ? `${accentColor}60` : undefined,
          boxShadow: isOpen ? `0 0 0 3px ${accentColor}20` : undefined,
        }}
      >
        <div
          className="size-[34px] rounded-[10px] flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          <Calendar size={16} style={{ color: accentColor }} />
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="font-['Inter',sans-serif] font-medium text-[11px] text-[#9ca3af] leading-none mb-0.5">
            {label}
          </p>
          <p className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#111827] leading-none truncate">
            {displayText}
          </p>
        </div>
        <ChevronRight
          size={16}
          className="text-[#9ca3af] shrink-0 transition-transform"
          style={{ transform: isOpen ? "rotate(90deg)" : undefined }}
        />
      </button>

      {/* Calendar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2 bg-white border border-[#e5e7eb] rounded-[16px] p-3 shadow-[0px_4px_16px_rgba(0,0,0,0.06)]">
              {/* Range hint */}
              {isRange && (
                <p className="text-center font-['Inter',sans-serif] text-[11px] text-[#9ca3af] mb-2">
                  {rangeStep === "start" ? "Tap to select start date" : "Now tap to select end date"}
                </p>
              )}

              {/* Month nav */}
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={goToPrevMonth}
                  disabled={!canGoPrev}
                  className="size-[30px] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#f3f4f6] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} className="text-[#374151]" />
                </button>
                <p className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#111827]">
                  {MONTHS[viewMonth]} {viewYear}
                </p>
                <button
                  onClick={goToNextMonth}
                  className="size-[30px] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#f3f4f6] transition-colors"
                >
                  <ChevronRight size={16} className="text-[#374151]" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-0 mb-0.5">
                {DAYS.map((d) => (
                  <div key={d} className="h-[28px] flex items-center justify-center">
                    <span className="font-['Inter',sans-serif] font-semibold text-[10px] text-[#9ca3af]">{d}</span>
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-0">
                {calendarDays.map((day, i) => {
                  if (!day) return <div key={`empty-${i}`} className="h-[34px]" />;

                  const disabled = isDisabled(day);
                  const { bg, color, rounded } = getCellStyle(day);
                  const todayMark = isToday(day);
                  const isEndpoint = isRange && props.dateRange && (
                    isSameDay(day, props.dateRange.start) ||
                    (props.dateRange.end && isSameDay(day, props.dateRange.end))
                  );

                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => handleDayClick(day)}
                      disabled={disabled}
                      className={`h-[34px] flex items-center justify-center cursor-pointer transition-all relative ${rounded}`}
                      style={{ backgroundColor: bg, color }}
                    >
                      <span
                        className={`font-['Inter',sans-serif] text-[12px] ${
                          isEndpoint ? "font-bold" : todayMark ? "font-bold" : "font-medium"
                        }`}
                      >
                        {day.getDate()}
                      </span>
                      {todayMark && !bg && (
                        <span
                          className="absolute bottom-[2px] left-1/2 -translate-x-1/2 size-[3px] rounded-full"
                          style={{ backgroundColor: accentColor }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick selects */}
              <div className="flex gap-1.5 mt-2 pt-2 border-t border-[#f3f4f6]">
                {isRange ? (
                  <>
                    {[
                      { label: "1 week", s: 1, e: 7 },
                      { label: "2 weeks", s: 1, e: 14 },
                      { label: "1 month", s: 1, e: 30 },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handleQuickRange(opt.s, opt.e)}
                        className="flex-1 py-1.5 rounded-[8px] font-['Inter',sans-serif] font-semibold text-[11px] cursor-pointer transition-all active:scale-[0.97] border border-[#e5e7eb] text-[#6b7280] hover:border-current"
                        style={{ color: "#6b7280" }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </>
                ) : (
                  <>
                    {[
                      { label: "Tomorrow", offset: 1 },
                      { label: "In 3 days", offset: 3 },
                      { label: "Next week", offset: 7 },
                    ].map((opt) => {
                      const d = new Date(today); d.setDate(d.getDate() + opt.offset);
                      const isSelected = !isRange && props.selectedDate && isSameDay(d, props.selectedDate);
                      return (
                        <button
                          key={opt.label}
                          onClick={() => handleQuickRange(opt.offset, opt.offset)}
                          className="flex-1 py-1.5 rounded-[8px] font-['Inter',sans-serif] font-semibold text-[11px] cursor-pointer transition-all active:scale-[0.97] border"
                          style={{
                            borderColor: isSelected ? accentColor : "#e5e7eb",
                            backgroundColor: isSelected ? `${accentColor}12` : "#fff",
                            color: isSelected ? accentColor : "#6b7280",
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

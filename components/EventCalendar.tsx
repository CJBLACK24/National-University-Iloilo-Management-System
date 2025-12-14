"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const router = useRouter();

  // Mock Holidays with names
  const holidays = [
    { date: new Date(2025, 0, 1), name: "New Year's Day" },
    { date: new Date(2025, 3, 9), name: "Day of Valor" },
    { date: new Date(2025, 3, 17), name: "Maundy Thursday" },
    { date: new Date(2025, 3, 18), name: "Good Friday" },
    { date: new Date(2025, 4, 1), name: "Labor Day" },
    { date: new Date(2025, 5, 12), name: "Independence Day" },
    { date: new Date(2025, 11, 25), name: "Christmas Day" },
    { date: new Date(2025, 11, 30), name: "Rizal Day" },
  ];

  return (
    <div className="w-full overflow-hidden rounded-md">
      <Calendar
        onChange={onChange}
        value={value}
        className="dark-calendar w-full border-none bg-zinc-900 text-zinc-400 p-2"
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const isHol = holidays.some(
              (h) =>
                h.date.getDate() === date.getDate() &&
                h.date.getMonth() === date.getMonth()
            );
            return isHol
              ? "holiday-tile group relative"
              : "text-white hover:bg-zinc-800 rounded-md transition-colors";
          }
          return null;
        }}
        tileContent={({ date, view }) => {
          if (view === "month") {
            const holiday = holidays.find(
              (h) =>
                h.date.getDate() === date.getDate() &&
                h.date.getMonth() === date.getMonth()
            );
            if (holiday) {
              return (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none border border-zinc-700">
                  {holiday.name}
                </span>
              );
            }
          }
          return null;
        }}
        prevLabel={<span className="text-zinc-400 font-bold text-xl">‹</span>}
        nextLabel={<span className="text-zinc-400 font-bold text-xl">›</span>}
        prev2Label={null}
        next2Label={null}
      />
      <style jsx global>{`
        .react-calendar {
          background: #18181b !important;
          border: none !important;
          font-family: inherit;
        }
        .react-calendar__navigation button {
          color: #d4d4d8 !important;
          min-width: 44px;
          background: none;
          font-size: 16px;
        }
        .react-calendar__month-view__weekdays__weekday {
          color: #a1a1aa;
          font-size: 0.75rem;
          text-decoration: none !important;
        }
        .react-calendar__month-view__days__day--weekend {
          color: #f87171 !important;
        }
        .react-calendar__month-view__days__day--neighboringMonth {
          color: #52525b !important;
        }
        .holiday-tile {
          background: #fecdd3 !important;
          color: #be123c !important;
          border-radius: 6px;
        }
        .react-calendar__tile {
          padding: 0.75em 0.5em;
          background: none;
          text-align: center;
          line-height: 16px;
          font-size: 0.875rem;
        }
        .react-calendar__tile:disabled {
          background-color: #f0f0f0;
          color: #ababab;
        }
        .react-calendar__tile--now {
          background: #3f3f46 !important;
          color: white !important;
          border-radius: 6px;
        }
        .react-calendar__tile--active {
          background: #db2777 !important;
          color: white !important;
          border-radius: 6px;
        }
        abbr[title] {
          text-decoration: none !important;
        }
      `}</style>
    </div>
  );
};


export default EventCalendar;

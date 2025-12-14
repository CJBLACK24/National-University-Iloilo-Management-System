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

  // Mock Holidays
  const holidays = [
    new Date(2025, 0, 1), // Jan 1
    new Date(2025, 3, 9), // Day of Valor
    new Date(2025, 3, 17), // Maundy Thursday
    new Date(2025, 3, 18), // Good Friday
    new Date(2025, 4, 1), // Labor Day
    new Date(2025, 5, 12), // Independence Day
    new Date(2025, 11, 25), // Dec 25
    new Date(2025, 11, 30), // Rizal Day
  ];

  const isHoliday = (date: Date) => {
    return holidays.some(
      (holiday) =>
        holiday.getDate() === date.getDate() &&
        holiday.getMonth() === date.getMonth()
    );
  };

  return (
    <Calendar
      onChange={onChange}
      value={value}
      tileClassName={({ date, view }) =>
        view === "month" && isHoliday(date) ? "holiday-tile" : null
      }
    />
  );
};

export default EventCalendar;

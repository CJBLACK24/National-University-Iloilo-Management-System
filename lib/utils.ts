import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const adjustScheduleToCurrentWeek = (
  lessons: { title: string; start: Date; end: Date }[]
) => {
  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(
    startOfWeek.getDate() -
      (startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1)
  );

  return lessons.map((lesson) => {
    const lessonDay = lesson.start.getDay();
    const daysFromMonday = lessonDay === 0 ? 6 : lessonDay - 1;

    const adjustedStartDate = new Date(startOfWeek);
    adjustedStartDate.setDate(startOfWeek.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds()
    );
    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds()
    );

    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};

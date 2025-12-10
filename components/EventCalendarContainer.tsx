import Image from "next/image";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import { MoreHorizontal } from "lucide-react";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { date } = searchParams;
  return (
    <div className="bg-[#18181b] p-4 rounded-xl border border-zinc-800 shadow-sm">
      <EventCalendar />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4 text-white">Events</h1>
        <MoreHorizontal className="text-zinc-400 w-5 h-5 cursor-pointer" />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;

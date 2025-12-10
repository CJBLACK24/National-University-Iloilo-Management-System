import prisma from "@/lib/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  return data.map((event) => (
    <div
      className="p-5 rounded-lg border border-zinc-800 bg-zinc-900 shadow-sm transition-all hover:bg-zinc-800"
      key={event.id}
    >
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-semibold text-white">{event.title}</h1>
        <span className="text-zinc-500 text-xs">
          {event.startTime.toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="text-zinc-400 text-sm">{event.description}</p>
    </div>
  ));
};

export default EventList;

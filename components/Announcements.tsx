import prisma from "@/lib/prisma";
import ShimmerButton from "@/components/ui/shimmer-button";

const Announcements = async () => {
  const userId = "admin-id";
  const role = "admin";

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          // @ts-ignore
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  return (
    <div className="bg-zinc-900 p-4 rounded-md h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Announcements</h1>
        <ShimmerButton className="h-8 px-4 text-xs" background="#27272a">
          View All
        </ShimmerButton>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {data[0] && (
          <div className="bg-zinc-800 rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-white">{data[0].title}</h2>
              <span className="text-xs text-zinc-400 bg-zinc-900 rounded-md px-1 py-1">
                {new Intl.DateTimeFormat("en-GB").format(data[0].date)}
              </span>
            </div>
            <p className="text-sm text-zinc-400 mt-1">{data[0].description}</p>
          </div>
        )}
        {data[1] && (
          <div className="bg-zinc-800 rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-white">{data[1].title}</h2>
              <span className="text-xs text-zinc-400 bg-zinc-900 rounded-md px-1 py-1">
                {new Intl.DateTimeFormat("en-GB").format(data[1].date)}
              </span>
            </div>
            <p className="text-sm text-zinc-400 mt-1">{data[1].description}</p>
          </div>
        )}
        {data[2] && (
          <div className="bg-zinc-800 rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-white">{data[2].title}</h2>
              <span className="text-xs text-zinc-400 bg-zinc-900 rounded-md px-1 py-1">
                {new Intl.DateTimeFormat("en-GB").format(data[2].date)}
              </span>
            </div>
            <p className="text-sm text-zinc-400 mt-1">{data[2].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;

import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import StudentGrades from "@/components/StudentGrades";
import TuitionCard from "@/components/TuitionCard";
import prisma from "@/lib/prisma";

const StudentPage = async () => {
  const userId = "student-id"; // TODO: Retrieve actual user ID from session

  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } },
    },
  });

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex gap-4 flex-col xl:flex-row">
        {/* LEFT */}
        <div className="w-full xl:w-2/3 flex flex-col gap-4">
          <div className="h-full bg-black border border-zinc-700 p-4 rounded-md">
            <h1 className="text-xl font-semibold text-white mb-4">
              Schedule (4A)
            </h1>
            <BigCalendarContainer type="classId" id={classItem[0]?.id || 0} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          {/* TUITION CARD */}
          <div className="rounded-md bg-black border border-zinc-700">
            <TuitionCard />
          </div>

          <div className="p-4 rounded-md bg-black border border-zinc-700">
            <EventCalendar />
          </div>

          <div className="p-4 rounded-md bg-black border border-zinc-700">
            <Announcements />
          </div>
        </div>
      </div>

      {/* BOTTOM - GRADES */}
      <div className="w-full">
        <h2 className="text-xl font-semibold text-white mb-4">
          Academic Records
        </h2>
        <StudentGrades />
      </div>
    </div>
  );
};

export default StudentPage;

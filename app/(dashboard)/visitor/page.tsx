import Announcements from "@/components/Announcements";
import EventCalendar from "@/components/EventCalendar";
import { CourseCard } from "@/components/CourseCard";

export default function VisitorDashboard() {
  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 text-white min-h-screen">
      {/* HERO / WELCOME */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-amber-200">
          Welcome to NU Iloilo
        </h1>
        <p className="text-zinc-400">
          Discover our academic programs and latest updates.
        </p>
      </div>

      {/* ACADEMIC OFFERINGS SECTION */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">
          Academic Offerings
        </h2>

        {/* We generally group them. Let's make a grid of "Categories" or "Top Courses" */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* College Engineering */}
          <CourseCard
            title="Engineering"
            items={["Marine", "Civil", "Mechanical", "Electrical", "Computer"]}
            color="bg-blue-900"
          />
          {/* College Tech & Business */}
          <CourseCard
            title="Tech & Business"
            items={["Information Technology", "Accountancy", "Business Admin"]}
            color="bg-amber-700"
          />
          {/* Others */}
          <CourseCard
            title="Arts & Sciences"
            items={["Hospitality Management", "Biology", "English", "Pol Sci"]}
            color="bg-emerald-900"
          />
          {/* SHS Academic */}
          <CourseCard
            title="Senior High - Academic"
            items={["STEM", "ABM", "HUMSS", "Maritime"]}
            color="bg-red-900"
          />
          {/* SHS TVL */}
          <CourseCard
            title="Senior High - TVL"
            items={["Bread & Pastry", "Food & Bev", "Programming", "Animation"]}
            color="bg-orange-800"
          />
          {/* Graduate */}
          <CourseCard
            title="Graduate School"
            items={["Master in Business Mgmt", "Master of Engineering"]}
            color="bg-indigo-900"
          />
        </div>
      </div>

      {/* ANNOUNCEMENTS AND EVENTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Events Calendar - Takes 1 column */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <h2 className="text-xl font-semibold border-l-4 border-amber-500 pl-3">
            Upcoming Events
          </h2>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 h-full">
            <EventCalendar />
          </div>
        </div>

        {/* Announcements - Takes 2 columns */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-xl font-semibold border-l-4 border-pink-500 pl-3">
            Latest Announcements
          </h2>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 h-full">
            <Announcements />
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  SkeletonCard,
  SkeletonChart,
  SkeletonCalendar,
  SkeletonAnnouncements,
} from "@/components/ui/skeleton";

const AdminLoading = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row animate-in fade-in duration-300">
      <div className="flex gap-4 flex-col md:flex-row w-full h-full">
        {/* LEFT */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          {/* USER CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          {/* MIDDLE CHARTS */}
          <div className="flex gap-4 flex-col lg:flex-row">
            <div className="w-full lg:w-1/3 h-[450px]">
              <SkeletonChart />
            </div>
            <div className="w-full lg:w-2/3 h-[450px]">
              <SkeletonChart />
            </div>
          </div>
          {/* BOTTOM CHART */}
          <div className="w-full h-[500px]">
            <SkeletonChart />
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <SkeletonCalendar />
          <SkeletonAnnouncements />
        </div>
      </div>
    </div>
  );
};

export default AdminLoading;

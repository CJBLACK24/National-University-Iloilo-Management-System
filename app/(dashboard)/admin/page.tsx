import Announcements from "@/components/Announcements";
import GradeChart from "@/components/GradeChart";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import UserManagementTable from "@/components/UserManagementTable"; // Import the table
import { getAllUsers } from "@/lib/actions/user-actions"; // Import actions

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AdminPage = async (props: {
  searchParams: Promise<{ [keys: string]: string | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const users = await getAllUsers(); // Fetch users

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const role = (session?.user as any)?.role || "guest";

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* TOP SECTION */}
      <div className="flex gap-4 flex-col xl:flex-row">
        {/* LEFT COLUMN */}
        <div className="w-full xl:w-2/3 flex flex-col gap-4">
          {/* USER CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <UserCard type="admin" />
            <UserCard type="teacher" />
            <UserCard type="student" />
            <UserCard type="parent" />
          </div>
          {/* MIDDLE CHARTS */}
          <div className="flex gap-4 flex-col lg:flex-row">
            {/* COUNT CHART */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <CountChartContainer />
            </div>
            {/* GRADE CHART (Replaces Attendance) */}
            <div className="w-full lg:w-2/3 h-[450px]">
              <GradeChart />
            </div>
          </div>

          {/* USER MANAGEMENT TABLE */}
          <div className="w-full">
            <UserManagementTable users={users} currentUserRole={role} />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          <EventCalendarContainer searchParams={searchParams} />
          <div className="flex-1 rounded-xl">
            <Announcements />
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION - FINANCE MAX WIDTH */}
      <div className="w-full h-[500px]">
        <FinanceChart />
      </div>
    </div>
  );
};

export default AdminPage;

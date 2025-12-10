import CountChart from "./CountChart";
import prisma from "@/lib/prisma";
import { MoreHorizontal } from "lucide-react";

const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;

  return (
    <div className="bg-zinc-900 rounded-xl w-full h-full p-4 border border-zinc-800 flex flex-col">
      {/* TITLE */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-base font-semibold text-white">Students</h1>
        <MoreHorizontal className="text-zinc-500 w-5 h-5 cursor-pointer hover:text-zinc-300 transition-colors" />
      </div>
      {/* CHART */}
      <div className="flex-1 min-h-0">
        <CountChart boys={boys} girls={girls} />
      </div>
    </div>
  );
};

export default CountChartContainer;

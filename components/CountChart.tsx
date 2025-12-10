"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Users } from "lucide-react";

const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const total = boys + girls;
  const boysPercent = total > 0 ? Math.round((boys / total) * 100) : 0;
  const girlsPercent = total > 0 ? Math.round((girls / total) * 100) : 0;

  const chartData = [
    { name: "Male", value: boys, color: "#8b5cf6" },
    { name: "Female", value: girls, color: "#ec4899" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Chart */}
      <div className="relative flex-1 min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="85%"
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <Users className="w-8 h-8 text-zinc-400" />
          <span className="text-lg font-bold text-white">{total}</span>
        </div>
      </div>
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
          <div className="text-xs">
            <span className="text-white font-medium">{boys}</span>
            <span className="text-zinc-500 ml-1">Male ({boysPercent}%)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ec4899]" />
          <div className="text-xs">
            <span className="text-white font-medium">{girls}</span>
            <span className="text-zinc-500 ml-1">Female ({girlsPercent}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountChart;

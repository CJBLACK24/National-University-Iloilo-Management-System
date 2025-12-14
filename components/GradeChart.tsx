"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { MoreHorizontal } from "lucide-react";

const gradeData = [
  { grade: "1.0", count: 12, fill: "#4ade80" }, // Green
  { grade: "1.25", count: 15, fill: "#4ade80" },
  { grade: "1.5", count: 20, fill: "#4ade80" },
  { grade: "1.75", count: 18, fill: "#a3e635" }, // Lime
  { grade: "2.0", count: 25, fill: "#a3e635" },
  { grade: "2.25", count: 14, fill: "#facc15" }, // Yellow
  { grade: "2.5", count: 10, fill: "#facc15" },
  { grade: "2.75", count: 8, fill: "#fb923c" }, // Orange
  { grade: "3.0", count: 5, fill: "#fb923c" },
  { grade: "4.0", count: 2, fill: "#f87171" }, // Red (Fail)
  { grade: "5.0", count: 3, fill: "#ef4444" }, // Red (Fail)
  { grade: "INC", count: 4, fill: "#9ca3af" }, // Gray
  { grade: "NC", count: 1, fill: "#6b7280" }, // Gray
  { grade: "NA", count: 2, fill: "#4b5563" }, // Dark Gray
];

const GradeChart = () => {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 h-full border border-zinc-800 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base font-semibold text-white">
          Grade Distribution
        </h1>
        <MoreHorizontal className="text-zinc-500 w-5 h-5 cursor-pointer hover:text-zinc-300 transition-colors" />
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={gradeData} barSize={20}>
            <CartesianGrid
              vertical={false}
              stroke="hsl(var(--sidebar-border))"
            />
            <XAxis
              dataKey="grade"
              axisLine={false}
              tick={{ fill: "#d4d4d8", fontSize: 12 }}
              tickLine={false}
              interval={0}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
              cursor={{ fill: "transparent" }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {gradeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GradeChart;

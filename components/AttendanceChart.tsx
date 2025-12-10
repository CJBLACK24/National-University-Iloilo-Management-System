"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { MoreHorizontal } from "lucide-react";

const chartConfig = {
  present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const AttendanceChart = ({
  data,
}: {
  data: { name: string; present: number; absent: number }[];
}) => {
  return (
    <ChartContainer config={chartConfig} className="w-full h-[90%]">
      <BarChart data={data} barSize={20}>
        <CartesianGrid vertical={false} stroke="hsl(var(--sidebar-border))" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))" }}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))" }}
          tickLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="present"
          fill="var(--color-present)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="absent"
          fill="var(--color-absent)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default AttendanceChart;

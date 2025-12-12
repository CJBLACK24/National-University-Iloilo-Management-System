import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, User, UserCheck } from "lucide-react";

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const iconMap = {
    admin: UserCheck,
    teacher: GraduationCap,
    student: User,
    parent: Users,
  };

  const colorMap = {
    admin: "from-purple-500 to-purple-600",
    teacher: "from-blue-500 to-blue-600",
    student: "from-emerald-500 to-emerald-600",
    parent: "from-orange-500 to-orange-600",
  };

  const data = await modelMap[type].count();
  const Icon = iconMap[type];

  return (
    <Card className="rounded-xl bg-zinc-900 border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${colorMap[type]}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
          {new Date().toLocaleDateString("en-US")}
        </span>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="text-3xl font-bold text-white mb-1">{data}</div>
        <p className="text-xs text-zinc-400 capitalize">{type}s</p>
      </CardContent>
    </Card>
  );
};

export default UserCard;

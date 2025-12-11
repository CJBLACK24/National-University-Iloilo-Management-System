"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  GraduationCap,
  User,
  Users,
  BookOpen,
  Building2,
  BookOpenText,
  FileDigit,
  ClipboardList,
  BarChartBig,
  CalendarCheck,
  Calendar,
  MessageSquare,
  Megaphone,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react";

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const role = "admin"; // Mock role for now

  // Disable sidebar hover collapse on home/dashboard pages
  const isHomePage =
    pathname === "/admin" ||
    pathname === "/" ||
    pathname === "/teacher" ||
    pathname === "/student" ||
    pathname === "/parent";

  const links = [
    {
      label: "Home",
      href: "/admin",
      icon: <LayoutDashboard className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Faculty",
      href: "/list/teachers",
      icon: <GraduationCap className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher"],
    },
    {
      label: "Students",
      href: "/list/students",
      icon: <User className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher"],
    },
    {
      label: "Guardians",
      href: "/list/parents",
      icon: <Users className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher"],
    },
    {
      label: "Courses",
      href: "/list/subjects",
      icon: <BookOpen className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin"],
    },
    {
      label: "Departments",
      href: "/list/classes",
      icon: <Building2 className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher"],
    },
    {
      label: "Lectures",
      href: "/list/lessons",
      icon: <BookOpenText className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher"],
    },
    {
      label: "Exams",
      href: "/list/exams",
      icon: <FileDigit className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Assignments",
      href: "/list/assignments",
      icon: <ClipboardList className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Results",
      href: "/list/results",
      icon: <BarChartBig className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Attendance",
      href: "/list/attendance",
      icon: <CalendarCheck className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Events",
      href: "/list/events",
      icon: <Calendar className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Messages",
      href: "/list/messages",
      icon: <MessageSquare className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Announcements",
      href: "/list/announcements",
      icon: <Megaphone className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <UserCircle className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Logout",
      href: "/logout",
      icon: <LogOut className="text-zinc-400 h-5 w-5 shrink-0" />,
      visible: ["admin", "teacher", "student", "parent"],
    },
  ];

  const filteredLinks = links.filter((link) => link.visible.includes(role));

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-black w-full flex-1 mx-auto",
        "h-screen overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} disableHover={isHomePage}>
        <SidebarBody className="justify-between gap-6">
          <div className="flex flex-col flex-1 scrollbar-hide overflow-y-auto">
            <Logo />
            <div className="mt-6 flex flex-col gap-1">
              {filteredLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-3">
            <SidebarLink
              link={{
                label: "Christian Duque",
                href: "/profile",
                icon: (
                  <Image
                    src="/avatar.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <DashboardContent>{children}</DashboardContent>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex flex-col items-center gap-1 text-sm text-white py-1 relative z-20"
    >
      <Image
        src="/NU.png"
        className="h-12 w-auto object-contain"
        width={100}
        height={100}
        alt="NU Iloilo Logo"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-xl tracking-wide bg-linear-to-r from-yellow-200 to-blue-300 bg-clip-text text-transparent"
      >
        NUIMS
      </motion.span>
    </Link>
  );
};

// Dashboard content wrapper with smooth scrolling
const DashboardContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <div className="p-4 md:p-6 bg-black flex flex-col gap-4 flex-1 w-full h-full overflow-y-auto scrollbar-hide scroll-smooth">
        {children}
      </div>
    </div>
  );
};

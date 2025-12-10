"use client";
import React, { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const role = "admin"; // Mock role for now

  const links = [
    {
      label: "Home",
      href: "/admin",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Teachers",
      href: "/list/teachers",
      icon: (
        <GraduationCap className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher"],
    },
    {
      label: "Students",
      href: "/list/students",
      icon: (
        <User className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher"],
    },
    {
      label: "Parents",
      href: "/list/parents",
      icon: (
        <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher"],
    },
    {
      label: "Subjects",
      href: "/list/subjects",
      icon: (
        <BookOpen className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin"],
    },
    {
      label: "Classes",
      href: "/list/classes",
      icon: (
        <Building2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher"],
    },
    {
      label: "Lessons",
      href: "/list/lessons",
      icon: (
        <BookOpenText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher"],
    },
    {
      label: "Exams",
      href: "/list/exams",
      icon: (
        <FileDigit className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Assignments",
      href: "/list/assignments",
      icon: (
        <ClipboardList className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Results",
      href: "/list/results",
      icon: (
        <BarChartBig className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Attendance",
      href: "/list/attendance",
      icon: (
        <CalendarCheck className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Events",
      href: "/list/events",
      icon: (
        <Calendar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Messages",
      href: "/list/messages",
      icon: (
        <MessageSquare className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Announcements",
      href: "/list/announcements",
      icon: (
        <Megaphone className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <UserCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      label: "Logout",
      href: "/logout",
      icon: (
        <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
      ),
      visible: ["admin", "teacher", "student", "parent"],
    },
  ];

  const filteredLinks = links.filter((link) => link.visible.includes(role));

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, you might want h-screen
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {filteredLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "John Doe",
                href: "/profile",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
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
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        SchooLama
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const DashboardContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-gray-50 dark:bg-black flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

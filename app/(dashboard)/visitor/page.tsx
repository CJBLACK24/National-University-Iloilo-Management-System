"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Announcements from "@/components/Announcements";
import EventCalendar from "@/components/EventCalendar";
import { useState, useEffect } from "react";

const courses = [
  {
    category: "College Offerings",
    items: [
      { name: "BS Marine Engineering", image: "/courses/marine.jpg" },
      { name: "BS Civil Engineering", image: "/courses/civil.jpg" },
      { name: "BS Mechanical Engineering", image: "/courses/mechanical.jpg" },
      { name: "BS Electrical Engineering", image: "/courses/electrical.jpg" },
      { name: "BS Computer Engineering", image: "/courses/computer_eng.jpg" },
      { name: "BS Information Technology", image: "/courses/it.jpg" },
      { name: "BS Accountancy", image: "/courses/accountancy.jpg" },
      { name: "BS Business Administration", image: "/courses/business.jpg" },
      { name: "BS Hospitality Management", image: "/courses/hospitality.jpg" },
      { name: "BS Biology", image: "/courses/biology.jpg" },
    ],
  },
  {
    category: "Senior High School",
    items: [
      { name: "STEM", image: "/courses/stem.jpg" },
      { name: "ABM", image: "/courses/abm.jpg" },
      { name: "HUMSS", image: "/courses/humss.jpg" },
      { name: "Maritime Specialization", image: "/courses/maritime_shs.jpg" },
      { name: "TVL - Cooking/Baking", image: "/courses/cooking.jpg" },
      { name: "TVL - Animation/Programming", image: "/courses/animation.jpg" },
    ],
  },
];

export default function VisitorDashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll effect for a "carousel" feel if we implemented a slider,
  // but for a modern grid, we might just display them beautifully with hover effects.
  // The user asked for an "automatic carousel", let's try a simple auto-scrolling row or similar.
  // For now, I will implement a sleek Grid layout as requested "modern grid layout... 2 rows 3 column".

  // Actually, to strictly follow "2 rows 3 column", that's 6 items.
  // There are many courses. Maybe we show highlighted courses?
  // Or generic categories?
  // Let's create a "Featured Courses" grid.

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

function CourseCard({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-2xl p-6 ${color} border border-white/10 shadow-xl`}
    >
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-black/20 blur-xl" />

      <h3 className="text-2xl font-bold mb-4 relative z-10">{title}</h3>
      <ul className="space-y-2 relative z-10 text-sm md:text-base text-white/80">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

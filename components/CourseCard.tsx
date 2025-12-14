"use client";

import { motion } from "framer-motion";

export function CourseCard({
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

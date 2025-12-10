"use client";
import { motion } from "framer-motion";
import { Book, GraduationCap, School, Pencil } from "lucide-react";

const icons = [
  { Component: Book, x: "15%", y: "25%", duration: 6, delay: 0 },
  { Component: GraduationCap, x: "80%", y: "15%", duration: 8, delay: 1 },
  { Component: School, x: "20%", y: "80%", duration: 7, delay: 2 },
  { Component: Pencil, x: "75%", y: "75%", duration: 9, delay: 0.5 },
];

export default function AuthIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {icons.map(({ Component, x, y, duration, delay }, index) => (
        <motion.div
          key={index}
          className="absolute text-white/40 backdrop-blur-sm p-4 rounded-full bg-white/10 shadow-lg border border-white/20"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
          }}
        >
          <Component size={48} />
        </motion.div>
      ))}
    </div>
  );
}

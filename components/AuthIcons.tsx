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
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {icons.map(({ Component, x, y, duration, delay }, index) => (
        <motion.div
          key={index}
          className="absolute flex items-center justify-center p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-white/80 ring-1 ring-white/5"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
          }}
        >
          <Component size={40} strokeWidth={1.5} />
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-white/10 to-transparent opacity-50" />
        </motion.div>
      ))}
    </div>
  );
}

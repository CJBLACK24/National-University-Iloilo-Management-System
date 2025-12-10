"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProfileDropdownProps {
  name?: string;
  role?: string;
  avatarSrc?: string;
}

export function ProfileDropdown({
  name = "John Doe",
  role = "Admin",
  avatarSrc = "/avatar.png",
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "Profile", href: "/profile", icon: User },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
      >
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-white leading-tight">
            {name}
          </span>
          <span className="text-xs text-zinc-400 capitalize">{role}</span>
        </div>
        <div className="relative w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden">
          <Image src={avatarSrc} alt="Profile" fill className="object-cover" />
        </div>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "tween", duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden">
                  <Image
                    src={avatarSrc}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {name}
                  </p>
                  <p className="text-xs text-zinc-400 capitalize">{role}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t border-zinc-800 py-1">
              <Link
                href="/logout"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

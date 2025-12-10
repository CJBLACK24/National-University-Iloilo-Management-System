"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { menuItems } from "./Menu";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const role = "admin"; // Mock

  return (
    <>
      <div
        className="cursor-pointer md:hidden text-white"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={30} />
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col p-6 w-screen h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="logo" width={32} height={32} />
              <span className="font-bold text-white text-xl">SchooLama</span>
            </div>
            <X
              className="cursor-pointer text-white"
              size={30}
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="flex flex-col gap-4">
            {menuItems.map((i) => (
              <div className="flex flex-col gap-2" key={i.title}>
                <span className="text-slate-500 font-light my-2 uppercase text-sm">
                  {i.title}
                </span>
                {i.items.map((item) => {
                  if (item.visible.includes(role)) {
                    return (
                      <Link
                        href={item.href}
                        key={item.label}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 text-slate-200 py-3 px-2 rounded-md hover:bg-zinc-800 transition-colors"
                      >
                        <Image
                          src={item.icon}
                          alt=""
                          width={20}
                          height={20}
                          className="invert brightness-0 filter"
                        />
                        {/* Assuming black icons need inversion for dark mode, or keep as is if colored */}
                        {/* Existing code used straight images. I should check if they are black or colored. */}
                        {/* Existing menu used: <Image ... /> without filter. */}
                        <span className="text-lg">{item.label}</span>
                      </Link>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;

"use client";

import { User } from "lucide-react";
import Image from "next/image";

const ProfilePage = () => {
  // Mock user data
  const user = {
    name: "My Profile",
    role: "Administrator",
    email: "admin@nu-iloilo.edu.ph",
    image: "/noAvatar.png",
    id: "2025-0001",
  };
  return (
    <div className="flex-1 p-4 flex flex-col gap-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex items-center gap-8">
        <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-zinc-700">
          <Image src={user.image} alt="" fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <p className="text-zinc-400 capitalize">{user.role}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-xs bg-blue-600/20 text-blue-500 px-2 py-1 rounded">
              ID: {user.id}
            </span>
            <span className="text-xs text-zinc-500">{user.email}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Personal Information
          </h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-500">Full Names</span>
              <span className="text-zinc-200">Christian Duque</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-500">Phone</span>
              <span className="text-zinc-200">09123456789</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-500">Address</span>
              <span className="text-zinc-200">Iloilo City, Philippines</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Account Activity
          </h2>
          <p className="text-zinc-500 text-sm">Recent login: Today, 8:00 AM</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

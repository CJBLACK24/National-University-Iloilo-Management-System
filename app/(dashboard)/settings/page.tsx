"use client";

import { useState } from "react";
import { Bell, Lock, Moon, User, Globe, Shield } from "lucide-react";
import Image from "next/image";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="flex-1 p-4 m-4 mt-0 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-300">
      <h1 className="text-xl font-semibold text-white mb-6">Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* SIDEBAR */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          {[
            { id: "general", label: "General", icon: Globe },
            { id: "account", label: "Account", icon: User },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "appearance", label: "Appearance", icon: Moon },
            { id: "security", label: "Security", icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                activeTab === tab.id
                  ? "bg-zinc-800 text-white"
                  : "hover:bg-zinc-800/50 text-zinc-400"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 h-full min-h-[500px]">
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-white mb-1">
                  Language & Region
                </h2>
                <p className="text-sm text-zinc-500 mb-4">
                  Customize your language and regional settings.
                </p>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold">Language</label>
                    <select className="bg-zinc-800 border border-zinc-700 rounded-md p-2 text-sm focus:outline-none">
                      <option>English (United States)</option>
                      <option>Filipino</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold">Timezone</label>
                    <select className="bg-zinc-800 border border-zinc-700 rounded-md p-2 text-sm focus:outline-none">
                      <option>UTC+08:00 (Philippine Standard Time)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "account" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-white mb-4">
                  Profile Information
                </h2>
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative w-20 h-20">
                    <Image
                      src="/noAvatar.png"
                      alt="Profile"
                      fill
                      className="rounded-full object-cover"
                    />
                    <button className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full text-white">
                      <User className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Administrator</h3>
                    <p className="text-xs text-zinc-500">
                      admin@nu-iloilo.edu.ph
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-white mb-4">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                {[
                  "Email Notifications",
                  "Push Notifications",
                  "SMS Notifications",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg border border-zinc-800"
                  >
                    <span className="text-sm font-medium text-zinc-200">
                      {item}
                    </span>
                    <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        name="toggle"
                        id={item}
                        className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer translate-x-5 transition-transform duration-200 ease-in-out checked:bg-blue-600"
                      />
                      <label
                        htmlFor={item}
                        className="toggle-label block overflow-hidden h-6 rounded-full bg-zinc-700 cursor-pointer"
                      ></label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-white mb-4">
                Theme Settings
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="border border-blue-500 rounded-lg p-4 bg-black flex flex-col gap-2 cursor-pointer">
                  <div className="w-full h-20 bg-zinc-900 rounded-md"></div>
                  <span className="text-sm font-medium text-blue-500">
                    Dark Mode
                  </span>
                </div>
                <div className="border border-zinc-700 hover:border-zinc-600 transition-colors rounded-lg p-4 bg-white flex flex-col gap-2 cursor-pointer opacity-50">
                  <div className="w-full h-20 bg-gray-100 rounded-md"></div>
                  <span className="text-sm font-medium text-zinc-900">
                    Light Mode
                  </span>
                </div>
              </div>
            </div>
          )}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-white mb-4">
                Security Settings
              </h2>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                <Lock className="w-4 h-4" />
                Change Password
              </button>

              <div className="mt-6 border-t border-zinc-800 pt-6">
                <h3 className="text-sm font-medium text-white mb-2">
                  Two-Factor Authentication
                </h3>
                <p className="text-xs text-zinc-500 mb-4">
                  Add an extra layer of security to your account.
                </p>
                <button className="text-blue-500 text-sm hover:underline">
                  Enable 2FA
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

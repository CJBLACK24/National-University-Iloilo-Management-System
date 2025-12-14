"use client";

import { useState } from "react";
import { Filter, ArrowUpDown } from "lucide-react";
import Image from "next/image";

// Mock data for teachers
const teachersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@doe.com",
    role: "Teacher",
    subjects: ["Math", "Physics"],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@smith.com",
    role: "Teacher",
    subjects: ["English", "History"],
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@j.com",
    role: "Admin",
    subjects: ["Biology"],
  },
];

const RoleManagementPage = () => {
  const [teachers, setTeachers] = useState(teachersData);

  const handleRoleChange = (id: number, newRole: string) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, role: newRole } : t))
    );
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-xl flex-1 m-4 border border-zinc-800">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-white">Role Management</h1>
        <div className="flex gap-4">
          {/* Mock Filters */}
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
            <Filter className="w-4 h-4 text-zinc-400" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
            <ArrowUpDown className="w-4 h-4 text-zinc-400" />
          </button>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left text-zinc-400 text-sm border-b border-zinc-800">
            <th className="py-3">Name</th>
            <th className="py-3 hidden md:table-cell">Email</th>
            <th className="py-3 hidden md:table-cell">Subjects</th>
            <th className="py-3">Role</th>
            <th className="py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr
              key={teacher.id}
              className="border-b border-zinc-800 text-sm hover:bg-zinc-800/50 transition-colors"
            >
              <td className="py-4 text-white font-medium flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs">
                  {teacher.name[0]}
                </div>
                {teacher.name}
              </td>
              <td className="hidden md:table-cell text-zinc-400">
                {teacher.email}
              </td>
              <td className="hidden md:table-cell text-zinc-400">
                {teacher.subjects.join(", ")}
              </td>
              <td className="py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    teacher.role === "Admin"
                      ? "bg-purple-500/10 text-purple-500"
                      : "bg-blue-500/10 text-blue-500"
                  }`}
                >
                  {teacher.role}
                </span>
              </td>
              <td className="py-4">
                <select
                  className="bg-zinc-800 text-zinc-300 text-xs p-1 rounded border border-zinc-700 focus:outline-none"
                  value={teacher.role}
                  onChange={(e) => handleRoleChange(teacher.id, e.target.value)}
                >
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagementPage;

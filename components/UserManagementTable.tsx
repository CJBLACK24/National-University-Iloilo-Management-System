"use client";

import Image from "next/image";
import { useState } from "react";
import { updateUserRole } from "@/lib/actions/user-actions";
import { User } from "@prisma/client";
import { Edit, Trash2 } from "lucide-react";

const UserManagementTable = ({ users }: { users: User[] }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setLoadingId(userId);
    await updateUserRole(userId, newRole);
    setLoadingId(null);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mt-6">
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">
          Recent Users & Role Management
        </h2>
        {/* Shortcuts */}
        <div className="flex gap-2">
          <button className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded hover:bg-zinc-700">
            Teachers
          </button>
          <button className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded hover:bg-zinc-700">
            Students
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-[#18181b] text-zinc-200 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-medium">User Profile</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-zinc-800/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9">
                      <Image
                        src={user.image || "/avatar.png"}
                        alt=""
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-white">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <select
                    disabled={loadingId === user.id}
                    value={user.role || "user"}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="bg-zinc-800 border-none text-white text-xs rounded px-2 py-1 cursor-pointer hover:bg-zinc-700 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                    <option value="parent">Parent</option>
                  </select>
                  {loadingId === user.id && (
                    <span className="ml-2 text-xs text-blue-500">
                      Saving...
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-green-500 hover:text-green-400 font-medium text-xs flex items-center gap-1">
                      Edit
                    </button>
                    <button className="text-red-500 hover:text-red-400 font-medium text-xs flex items-center gap-1">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementTable;

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { updateUserRole, deleteUser } from "@/lib/actions/user-actions";
import { User } from "@prisma/client";
import { Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const UserManagementTable = ({ users }: { users: User[] }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  const handleRoleChange = async (userId: string, newRole: string) => {
    setLoadingId(userId);
    await updateUserRole(userId, newRole);
    setLoadingId(null);
    router.refresh();
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      router.refresh();
    }
  };

  // Filter users based on role
  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    return user.role === filter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mt-0 flex flex-col h-full">
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">
          Recent Users & Role Management
        </h2>
        {/* Shortcuts */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setFilter("teacher");
              setPage(1);
            }}
            className={`text-xs px-3 py-1 rounded transition-colors ${
              filter === "teacher"
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            Teachers
          </button>
          <button
            onClick={() => {
              setFilter("student");
              setPage(1);
            }}
            className={`text-xs px-3 py-1 rounded transition-colors ${
              filter === "student"
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            Students
          </button>
          <button
            onClick={() => {
              setFilter("all");
              setPage(1);
            }}
            className={`text-xs px-3 py-1 rounded transition-colors ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
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
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
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
                      <span className="font-medium text-white">
                        {user.name || "No Name"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <select
                      disabled={loadingId === user.id}
                      value={user.role || "user"}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      className="bg-zinc-800 border-none text-white text-xs rounded px-2 py-1 cursor-pointer hover:bg-zinc-700 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="user">User</option>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </select>
                    {loadingId === user.id && (
                      <span className="ml-2 text-xs text-blue-500">
                        Saving...
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          alert(
                            `Edit functionality coming soon for ${user.name}`
                          )
                        }
                        className="text-green-500 hover:text-green-400 font-medium text-xs flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-400 font-medium text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="p-4 border-t border-zinc-800 flex justify-between items-center">
        <span className="text-xs text-zinc-500">
          Page {page} of {totalPages || 1}
        </span>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="p-1 rounded bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="p-1 rounded bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTable;

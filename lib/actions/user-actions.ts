"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20, // Limit to recent 20 for the dashboard
    });
    return users;
  } catch (error) {
    console.error("Failed to fetch users", error);
    return [];
  }
};

export const updateUserRole = async (userId: string, newRole: string) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update role", error);
    return { success: false, error };
  }
};

"use server";

import prisma from "@/lib/prisma";

export const getConversations = async (userId: string) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        participants: true,
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return conversations;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
};

export const getMessages = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

export const sendMessage = async (data: {
  content: string;
  conversationId: string;
  senderId: string;
  attachment?: string;
}) => {
  try {
    const message = await prisma.message.create({
      data: {
        content: data.content,
        conversationId: data.conversationId,
        senderId: data.senderId,
        attachment: data.attachment,
      },
    });
    return message;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const createConversation = async (participantIds: string[]) => {
  // Check if one exists? For pairs, yes. For groups, maybe not.
  // Simplifying: Create new if generic.
  // Ideally check if a conversation with these EXACT participants exists.
  try {
    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          create: participantIds.map((id) => ({ userId: id })),
        },
      },
      include: {
        participants: true,
      },
    });
    return conversation;
  } catch (error) {
    console.error("Error creating conversation", error);
    throw error;
  }
};

export const searchUsers = async (query: string) => {
  // Search teacher, student, etc?
  // Using generic User model since we assumed better-auth User is central,
  // OR we search specific tables.
  // Let's search Teacher and Student tables for now as they display names.
  const teachers = await prisma.teacher.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { surname: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 5,
  });
  const students = await prisma.student.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { surname: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 5,
  });

  return [
    ...teachers.map((t) => ({
      id: t.id,
      name: `${t.name} ${t.surname}`,
      role: "teacher",
      img: t.img,
    })),
    ...students.map((s) => ({
      id: s.id,
      name: `${s.name} ${s.surname}`,
      role: "student",
      img: s.img,
    })),
  ];
};

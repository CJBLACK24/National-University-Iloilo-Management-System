// Socket.io Server for NU Iloilo Management System with Redis Adapter
// Run this separately with: npx ts-node lib/socket-server.ts
// Requires: npm install @socket.io/redis-adapter redis

import { Server } from "socket.io";
import { createServer } from "http";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

const httpServer = createServer();

// Redis clients for pub/sub
const pubClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});
const subClient = pubClient.duplicate();

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  read: boolean;
  recipientId?: string;
  conversationId?: string;
}

interface Notification {
  id: string;
  type: "announcement" | "grade" | "attendance" | "message" | "system";
  title: string;
  message: string;
  userId: string;
  read: boolean;
  createdAt: Date;
  link?: string;
}

async function initSocketServer() {
  // Connect to Redis
  await Promise.all([pubClient.connect(), subClient.connect()]);
  console.log("Connected to Redis");

  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
    adapter: createAdapter(pubClient, subClient),
  });

  // In-memory store (use Redis in production for persistence)
  const onlineUsers = new Map<string, string>(); // socketId -> userId

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Register user session
    socket.on("user:register", (data: { userId: string }) => {
      onlineUsers.set(socket.id, data.userId);
      socket.join(`user:${data.userId}`);
      console.log(`User ${data.userId} registered with socket ${socket.id}`);
    });

    // Join a conversation room
    socket.on("conversation:join", (data: { conversationId: string }) => {
      socket.join(`conversation:${data.conversationId}`);
      console.log(
        `Socket ${socket.id} joined conversation ${data.conversationId}`
      );
    });

    // Leave a conversation room
    socket.on("conversation:leave", (data: { conversationId: string }) => {
      socket.leave(`conversation:${data.conversationId}`);
    });

    // Handle new message
    socket.on(
      "message:send",
      (data: {
        content: string;
        conversationId: string;
        senderName: string;
      }) => {
        const userId = onlineUsers.get(socket.id);
        const message: Message = {
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          senderId: userId || socket.id,
          senderName: data.senderName,
          content: data.content,
          timestamp: new Date(),
          read: false,
          conversationId: data.conversationId,
        };

        // Broadcast to conversation room
        io.to(`conversation:${data.conversationId}`).emit("message", message);
      }
    );

    // Handle typing indicator
    socket.on(
      "typing:start",
      (data: { conversationId: string; userName: string }) => {
        socket.to(`conversation:${data.conversationId}`).emit("typing", {
          userId: onlineUsers.get(socket.id),
          userName: data.userName,
          isTyping: true,
        });
      }
    );

    socket.on("typing:stop", (data: { conversationId: string }) => {
      socket.to(`conversation:${data.conversationId}`).emit("typing", {
        userId: onlineUsers.get(socket.id),
        isTyping: false,
      });
    });

    // Handle notifications
    socket.on("notification:send", (notification: Notification) => {
      // Send to specific user's room
      io.to(`user:${notification.userId}`).emit("notification", notification);
    });

    // Broadcast notification to role (e.g., all teachers)
    socket.on(
      "notification:broadcast",
      (data: { role: string; notification: Notification }) => {
        io.to(`role:${data.role}`).emit("notification", data.notification);
      }
    );

    // Handle mark as read
    socket.on(
      "message:read",
      (data: { messageId: string; conversationId: string }) => {
        io.to(`conversation:${data.conversationId}`).emit("message:read", {
          messageId: data.messageId,
          readBy: onlineUsers.get(socket.id),
        });
      }
    );

    socket.on("disconnect", () => {
      const userId = onlineUsers.get(socket.id);
      onlineUsers.delete(socket.id);
      console.log("User disconnected:", socket.id, userId ? `(${userId})` : "");
    });
  });

  const PORT = process.env.SOCKET_PORT || 3001;

  httpServer.listen(PORT, () => {
    console.log(`Socket.io server with Redis adapter running on port ${PORT}`);
  });

  return io;
}

// Graceful shutdown
process.on("SIGINT", async () => {
  await pubClient.quit();
  await subClient.quit();
  process.exit(0);
});

initSocketServer().catch(console.error);

export { initSocketServer };

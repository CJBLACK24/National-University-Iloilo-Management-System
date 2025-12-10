// Socket.io Server for WIT UMS
// Run this separately with: npx ts-node lib/socket-server.ts

import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  read: boolean;
  recipientId?: string;
}

// In-memory message store (replace with database in production)
const messages: Message[] = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send initial messages
  socket.emit("messages:initial", messages.slice(-50));

  // Handle new message
  socket.on(
    "message:send",
    (data: { content: string; recipientId?: string }) => {
      const message: Message = {
        id: `msg_${Date.now()}`,
        senderId: socket.id,
        senderName: "User", // Replace with actual user name from auth
        content: data.content,
        timestamp: new Date(),
        read: false,
        recipientId: data.recipientId,
      };

      messages.push(message);

      // Broadcast to all connected clients
      io.emit("message", message);
    }
  );

  // Handle mark as read
  socket.on("message:read", (data: { messageId: string }) => {
    const message = messages.find((m) => m.id === data.messageId);
    if (message) {
      message.read = true;
    }
  });

  // Handle mark all as read
  socket.on("messages:readAll", () => {
    messages.forEach((m) => (m.read = true));
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.SOCKET_PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});

export { io };

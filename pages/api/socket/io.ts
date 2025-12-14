import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: any) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);

      socket.on("user_connected", (userId) => {
        socket.join(userId);
        // Simple In-memory online tracking could be added here
        socket.broadcast.emit("user_online", userId);
      });

      socket.on("join_conversation", (conversationId) => {
        socket.join(conversationId);
        console.log(
          `Socket ${socket.id} joined conversation ${conversationId}`
        );
      });

      socket.on("send_message", (message) => {
        // Broadcast to the specific conversation room
        console.log("Broadcasting message:", message);
        io.to(message.conversationId).emit("new_message", message);
      });

      socket.on("typing", (data) => {
        socket.to(data.conversationId).emit("user_typing", data);
      });
    });
  }
  res.end();
};

export default ioHandler;

"use client";

import { useEffect, useState } from "react";
import { io as ClientIO, Socket } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInitializer = async () => {
      try {
        await fetch("/api/socket/io");
      } catch (e) {
        console.error("Failed to init socket server", e);
      }

      const socketInstance = ClientIO(
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        {
          path: "/api/socket/io",
          addTrailingSlash: false,
          transports: ["websocket"],
        }
      );

      socketInstance.on("connect", () => {
        console.log("Socket connected FE");
        setIsConnected(true);
      });

      socketInstance.on("disconnect", () => {
        console.log("Socket disconnected FE");
        setIsConnected(false);
      });

      socketInstance.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });

      setSocket(socketInstance);
    };

    socketInitializer();

    return () => {
      if (socket) {
        // Clean up if existing
        // socket.disconnect();
      }
    };
  }, []);

  return { socket, isConnected };
};

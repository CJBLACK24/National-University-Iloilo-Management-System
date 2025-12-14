"use client";

import { useEffect, useState } from "react";
import { io as ClientIO, Socket } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize the socket connection
    // Ensure the URL matches your dev/prod environment
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const socketInstance = ClientIO(siteUrl, {
      path: "/api/socket/io",
      addTrailingSlash: false,
      transports: ["websocket"], // Force websocket to avoid xhr poll errors
    });

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

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, isConnected };
};

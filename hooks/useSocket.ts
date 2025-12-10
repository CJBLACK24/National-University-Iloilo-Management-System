"use client";

import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketOptions {
  url?: string;
  autoConnect?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export function useSocket({ url, autoConnect = true }: UseSocketOptions = {}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!autoConnect) return;

    const socketUrl =
      url || process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

    const socketInstance = io(socketUrl, {
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });

    socketInstance.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
      if (!message.read) {
        setUnreadCount((prev) => prev + 1);
      }
    });

    socketInstance.on("messages:initial", (initialMessages: Message[]) => {
      setMessages(initialMessages);
      setUnreadCount(initialMessages.filter((m) => !m.read).length);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [url, autoConnect]);

  const sendMessage = useCallback(
    (content: string, recipientId?: string) => {
      if (socket && isConnected) {
        socket.emit("message:send", { content, recipientId });
      }
    },
    [socket, isConnected]
  );

  const markAsRead = useCallback(
    (messageId: string) => {
      if (socket && isConnected) {
        socket.emit("message:read", { messageId });
        setMessages((prev) =>
          prev.map((m) => (m.id === messageId ? { ...m, read: true } : m))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    },
    [socket, isConnected]
  );

  const markAllAsRead = useCallback(() => {
    if (socket && isConnected) {
      socket.emit("messages:readAll");
      setMessages((prev) => prev.map((m) => ({ ...m, read: true })));
      setUnreadCount(0);
    }
  }, [socket, isConnected]);

  return {
    socket,
    isConnected,
    messages,
    unreadCount,
    sendMessage,
    markAsRead,
    markAllAsRead,
  };
}

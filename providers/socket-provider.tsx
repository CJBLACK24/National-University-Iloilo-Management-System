"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSocket } from "@/hooks/useSocket";

interface SocketContextType {
  isConnected: boolean;
  messages: any[];
  unreadCount: number;
  sendMessage: (content: string, recipientId?: string) => void;
  markAsRead: (messageId: string) => void;
  markAllAsRead: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
  const socketData = useSocket();

  return (
    <SocketContext.Provider value={socketData}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
}

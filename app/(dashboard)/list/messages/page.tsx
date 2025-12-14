"use client";

import { useState } from "react";
import { Search, Send, MoreVertical, Phone, Video } from "lucide-react";
import Image from "next/image";

// Mock Data
const conversations = [
  {
    id: 1,
    name: "BSIT 1-A (Section)",
    type: "group",
    lastMessage: "Don't forget the assignment due tomorrow!",
    time: "10:30 AM",
    unread: 2,
    avatar: "/class.png", // Using existing icons
  },
  {
    id: 2,
    name: "IT 101 - Programming 1",
    type: "subject",
    lastMessage: "Sir: Class is cancelled today.",
    time: "Yesterday",
    unread: 0,
    avatar: "/subject.png",
  },
  {
    id: 3,
    name: "John Doe (Teacher)",
    type: "private",
    lastMessage: "Can we meet for consultation?",
    time: "Yesterday",
    unread: 0,
    avatar: "/noAvatar.png",
  },
  {
    id: 4,
    name: "BSIT 1st Year (Batch)",
    type: "group",
    lastMessage: "Assembly at gym 3PM.",
    time: "Mon",
    unread: 5,
    avatar: "/parent.png",
  },
];

const messagesMock = [
  {
    id: 1,
    senderId: "other",
    content: "Good morning everyone!",
    time: "9:00 AM",
    senderName: "Jane Smith",
  },
  {
    id: 2,
    senderId: "me",
    content: "Good morning! Is there a quiz today?",
    time: "9:05 AM",
    senderName: "Me",
  },
  {
    id: 3,
    senderId: "other",
    content: "Yes, focused on Array methods.",
    time: "9:06 AM",
    senderName: "John Doe",
  },
  {
    id: 4,
    senderId: "me",
    content: "Thanks! I need to study.",
    time: "9:10 AM",
    senderName: "Me",
  },
];

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [input, setInput] = useState("");

  const activeChat = conversations.find((c) => c.id === selectedChat);

  return (
    <div className="flex h-[calc(100vh-120px)] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 m-4 mt-0">
      {/* SIDEBAR */}
      <div className="w-1/3 border-r border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-800">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full bg-zinc-800 text-zinc-300 pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-600"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-zinc-800/50 transition-colors ${
                selectedChat === chat.id ? "bg-zinc-800" : ""
              }`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center overflow-hidden">
                  {/* Use Images or Initials */}
                  <Image
                    src={chat.avatar}
                    alt=""
                    width={24}
                    height={24}
                    className={
                      chat.type !== "private"
                        ? "invert brightness-0"
                        : "object-cover w-full h-full"
                    }
                  />
                </div>
                {chat.unread > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                    {chat.unread}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-zinc-500">{chat.time}</span>
                </div>
                <p className="text-xs text-zinc-400 truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col bg-[#18181b]">
        {" "}
        {/* Slightly darker or same */}
        {activeChat ? (
          <>
            {/* CHAT HEADER */}
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center overflow-hidden">
                  <Image
                    src={activeChat.avatar}
                    alt=""
                    width={24}
                    height={24}
                    className={
                      activeChat.type !== "private"
                        ? "invert brightness-0"
                        : "object-cover w-full h-full"
                    }
                  />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    {activeChat.name}
                  </h2>
                  <span className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <Phone className="w-5 h-5 cursor-pointer hover:text-white" />
                <Video className="w-5 h-5 cursor-pointer hover:text-white" />
                <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white" />
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {/* Example Date Divider */}
              <div className="flex justify-center">
                <span className="text-xs text-zinc-600 bg-zinc-900/50 px-2 py-1 rounded">
                  Today
                </span>
              </div>

              {messagesMock.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.senderId === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-xl p-3 text-sm ${
                      msg.senderId === "me"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-zinc-800 text-zinc-200 rounded-bl-none"
                    }`}
                  >
                    {msg.senderId !== "me" && (
                      <p className="text-[10px] text-zinc-400 mb-1 font-bold">
                        {msg.senderName}
                      </p>
                    )}
                    <p>{msg.content}</p>
                    <div
                      className={`text-[10px] mt-1 text-right ${
                        msg.senderId === "me"
                          ? "text-blue-200"
                          : "text-zinc-500"
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900">
              <div className="flex items-center gap-2 bg-zinc-800 rounded-full px-4 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-zinc-200 focus:outline-none text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // Handle send (mock)
                      setInput("");
                    }
                  }}
                />
                <button className="text-blue-500 hover:text-blue-400">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-zinc-500 flex-col gap-4">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
              <Send className="w-8 h-8 text-zinc-600" />
            </div>
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;

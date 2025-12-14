"use client";

import { useEffect, useState, useRef } from "react";
import {
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  Plus,
  Image as ImageIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import { useSocket } from "@/hooks/use-socket";
import { CldUploadWidget } from "next-cloudinary";
import {
  createConversation,
  getMessages,
  searchUsers,
  sendMessage,
} from "@/lib/actions/chat";

type ChatInterfaceProps = {
  currentUserId: string;
  initialConversations: any[];
};

const ChatInterface = ({
  currentUserId,
  initialConversations,
}: ChatInterfaceProps) => {
  const { socket, isConnected } = useSocket();
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages when chat is selected
  useEffect(() => {
    if (selectedChat) {
      getMessages(selectedChat).then(setMessages);
      socket?.emit("join_conversation", selectedChat);
    }
  }, [selectedChat, socket]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Socket listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("new_message", (message: any) => {
      if (message.conversationId === selectedChat) {
        setMessages((prev) => [...prev, message]);
      }
      // Update last message in conversation list
      setConversations((prev) =>
        prev.map((c) =>
          c.id === message.conversationId ? { ...c, messages: [message] } : c
        )
      );
    });

    return () => {
      socket.off("new_message");
    };
  }, [socket, selectedChat]);

  // Search Users
  useEffect(() => {
    if (searchQuery.length > 2) {
      searchUsers(searchQuery).then(setSearchResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSendMessage = async (attachmentUrl?: string) => {
    if ((!input.trim() && !attachmentUrl) || !selectedChat) return;

    const optimisticMsg = {
      id: "temp-" + Date.now(),
      content: input,
      senderId: currentUserId,
      conversationId: selectedChat,
      createdAt: new Date(),
      attachment: attachmentUrl,
    };

    // Optimistic updatet
    setMessages((prev) => [...prev, optimisticMsg]);
    setInput("");

    try {
      const savedMsg = await sendMessage({
        content: optimisticMsg.content,
        conversationId: selectedChat,
        senderId: currentUserId,
        attachment: attachmentUrl,
      });

      socket?.emit("send_message", savedMsg);

      // Replace temp with real
      setMessages((prev) =>
        prev.map((m) => (m.id === optimisticMsg.id ? savedMsg : m))
      );
    } catch (err) {
      console.error("Failed to send", err);
    }
  };

  const handleCreateChat = async (userId: string) => {
    // Create chat
    const convo = await createConversation([currentUserId, userId]);
    setConversations((prev) => [convo, ...prev]);
    setSelectedChat(convo.id);
    setIsSearching(false);
  };

  const activeConvo = conversations.find((c) => c.id === selectedChat);
  // Enhance activeConvo with name/avatar logic (mock for now or derive)
  const getOtherParticipant = (convo: any) => {
    if (!convo) return null;
    const other = convo.participants.find(
      (p: any) => p.userId !== currentUserId
    );
    return other
      ? { name: other.userId, avatar: "/noAvatar.png" }
      : { name: "Chat", avatar: "/noAvatar.png" }; // Fetch real name in PROD
  };

  const activeDetails = getOtherParticipant(activeConvo);

  return (
    <div className="flex h-[calc(100vh-120px)] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 m-4 mt-0">
      {/* SIDEBAR */}
      <div className="w-1/3 border-r border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
          <div className="relative flex-1 mr-2">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-zinc-800 text-zinc-300 pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-600"
            />
          </div>
          <button
            onClick={() => setIsSearching(true)}
            className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* SEARCH MODAL OVERLAY */}
        {isSearching && (
          <div className="absolute top-0 left-0 w-1/3 h-full bg-zinc-900 z-50 border-r border-zinc-800 flex flex-col">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
              <input
                autoFocus
                placeholder="Search people..."
                className="bg-transparent text-white outline-none w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => setIsSearching(false)}>
                <X className="text-zinc-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {searchResults.map((u) => (
                <div
                  key={u.id}
                  onClick={() => handleCreateChat(u.id)}
                  className="p-4 flex items-center gap-3 hover:bg-zinc-800 cursor-pointer text-zinc-300"
                >
                  <Image
                    src={u.img || "/noAvatar.png"}
                    width={32}
                    height={32}
                    alt=""
                    className="rounded-full object-cover w-8 h-8"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{u.name}</p>
                    <p className="text-xs text-zinc-500 capitalize">{u.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => {
            const other = getOtherParticipant(chat);
            return (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-zinc-800/50 transition-colors ${
                  selectedChat === chat.id ? "bg-zinc-800" : ""
                }`}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center overflow-hidden">
                    <Image
                      src={other?.avatar || "/noAvatar.png"}
                      alt=""
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {other?.name || "User"}
                    </h3>
                    <span className="text-xs text-zinc-500">
                      {chat.messages[0]
                        ? new Date(
                            chat.messages[0].createdAt
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 truncate">
                    {chat.messages[0]?.content || "Start a conversation"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col bg-[#18181b]">
        {selectedChat ? (
          <>
            {/* CHAT HEADER */}
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center overflow-hidden">
                  <Image
                    src={activeDetails?.avatar || "/noAvatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    {activeDetails?.name}
                  </h2>
                  <span className="text-xs text-green-500 flex items-center gap-1">
                    {isConnected && (
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    )}
                    {isConnected ? "Online" : "Connecting..."}
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
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.senderId === currentUserId
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-xl p-3 text-sm ${
                      msg.senderId === currentUserId
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-zinc-800 text-zinc-200 rounded-bl-none"
                    }`}
                  >
                    {msg.attachment && (
                      <div className="mb-2 rounded-lg overflow-hidden">
                        <Image
                          src={msg.attachment}
                          width={200}
                          height={150}
                          alt="attachment"
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                    <p>{msg.content}</p>
                    <div
                      className={`text-[10px] mt-1 text-right ${
                        msg.senderId === currentUserId
                          ? "text-blue-200"
                          : "text-zinc-500"
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900">
              <div className="flex items-center gap-2 bg-zinc-800 rounded-full px-4 py-2">
                <CldUploadWidget
                  uploadPreset="school_management"
                  onSuccess={(result: any) =>
                    handleSendMessage(result.info.secure_url)
                  }
                >
                  {({ open }) => (
                    <button
                      onClick={() => open()}
                      className="text-zinc-400 hover:text-white"
                    >
                      <ImageIcon className="w-5 h-5" />
                    </button>
                  )}
                </CldUploadWidget>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-zinc-200 focus:outline-none text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="text-blue-500 hover:text-blue-400"
                >
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
            <p>Select a conversation or start a new one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;

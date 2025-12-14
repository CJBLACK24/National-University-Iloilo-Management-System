"use client";

import { useEffect, useState, useRef } from "react";
import {
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  Edit,
  Image as ImageIcon,
  Info,
  ArrowLeft,
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
      setConversations((prev) => {
        const updated = prev.map((c) =>
          c.id === message.conversationId ? { ...c, messages: [message] } : c
        );
        // Move updated conversation to top
        if (updated.some((c) => c.id === message.conversationId)) {
          const convo = updated.find((c) => c.id === message.conversationId);
          const others = updated.filter((c) => c.id !== message.conversationId);
          return [convo, ...others];
        }
        return updated;
      });
    });

    return () => {
      socket.off("new_message");
    };
  }, [socket, selectedChat]);

  // Search Users
  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true);
      searchUsers(searchQuery).then(setSearchResults);
    } else if (searchQuery.length === 0) {
      setIsSearching(false);
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

    // Optimistic update
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
    // Check if conversation already exists locally first
    // In a real app, logic would be better
    const convo = await createConversation([currentUserId, userId]);

    if (!conversations.find((c) => c.id === convo.id)) {
      setConversations((prev) => [convo, ...prev]);
    }

    setSelectedChat(convo.id);
    setIsSearching(false);
    setSearchQuery("");
  };

  const activeConvo = conversations.find((c) => c.id === selectedChat);
  const getOtherParticipant = (convo: any) => {
    if (!convo) return null;
    const other = convo.participants.find(
      (p: any) => p.userId !== currentUserId
    );
    return other
      ? { name: other.userId, avatar: "/noAvatar.png" }
      : { name: "Chat", avatar: "/noAvatar.png" };
  };

  const activeDetails = getOtherParticipant(activeConvo);

  return (
    <div className="flex h-[calc(100vh-120px)] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 m-4 mt-0 shadow-2xl">
      {/* SIDEBAR (Messenger Style) */}
      <div className="w-1/3 border-r border-zinc-800 flex flex-col bg-zinc-900 md:w-80 lg:w-96 flex-shrink-0">
        {/* HEADER */}
        <div className="p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Chats</h1>
            <div className="flex gap-2">
              <button className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors">
                <Edit className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* SEARCH PILL */}
          <div
            className={`flex items-center gap-2 px-3 py-2 bg-zinc-800 rounded-full transition-all ${
              isSearching ? "ring-1 ring-blue-500" : ""
            }`}
          >
            {isSearching ? (
              <ArrowLeft
                className="w-5 h-5 text-zinc-400 cursor-pointer"
                onClick={() => {
                  setIsSearching(false);
                  setSearchQuery("");
                }}
              />
            ) : (
              <Search className="w-5 h-5 text-zinc-500" />
            )}
            <input
              type="text"
              placeholder="Search students, teachers..."
              className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* ACTIVE NOW / ONLINE USERS */}
        {!isSearching && (
          <div className="px-4 py-2">
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
              {/* Mock Filter for Active Users or from Socket */}
              {/* For demonstration, showing first few conversations as 'active' if connected or random */}
              {isConnected &&
                conversations.slice(0, 5).map((c) => {
                  const other = getOtherParticipant(c);
                  return (
                    <div
                      key={c.id}
                      className="flex flex-col items-center gap-1 cursor-pointer min-w-[60px]"
                      onClick={() => setSelectedChat(c.id)}
                    >
                      <div className="relative w-12 h-12">
                        <Image
                          src={other?.avatar || "/noAvatar.png"}
                          fill
                          className="rounded-full object-cover border-2 border-zinc-900"
                          alt=""
                        />
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-zinc-900"></div>
                      </div>
                      <span className="text-[11px] text-zinc-400 truncate w-full text-center max-w-[60px]">
                        {other?.name.split(" ")[0]}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* LIST */}
        <div className="flex-1 overflow-y-auto px-2">
          {isSearching ? (
            // SEARCH RESULTS
            <div className="flex flex-col gap-1">
              <p className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase">
                Contacts
              </p>
              {searchResults.map((u) => (
                <div
                  key={u.id}
                  onClick={() => handleCreateChat(u.id)}
                  className="p-2 flex items-center gap-3 hover:bg-zinc-800/50 rounded-lg cursor-pointer transition-colors group"
                >
                  <div className="relative w-12 h-12">
                    <Image
                      src={u.img || "/noAvatar.png"}
                      fill
                      alt=""
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">{u.name}</p>
                    <p className="text-xs text-zinc-500 capitalize">{u.role}</p>
                  </div>
                </div>
              ))}
              {searchResults.length === 0 && (
                <p className="px-3 text-sm text-zinc-500 text-center mt-4">
                  No results found.
                </p>
              )}
            </div>
          ) : (
            // CONVERSATIONS
            conversations.map((chat) => {
              const other = getOtherParticipant(chat);
              const lastMsg = chat.messages[0];
              const isActive = selectedChat === chat.id;

              return (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-2 flex items-center gap-3 rounded-lg cursor-pointer transition-colors group ${
                    isActive ? "bg-zinc-800/50" : "hover:bg-zinc-800/30"
                  }`}
                >
                  {/* AVATAR */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 relative rounded-full overflow-hidden border border-zinc-800">
                      <Image
                        src={other?.avatar || "/noAvatar.png"}
                        fill
                        className="object-cover"
                        alt=""
                      />
                    </div>
                    {/* Online Indicator (Mock) */}
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-zinc-900"></div>
                  </div>

                  {/* TEXT CONTENT */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex justify-between items-baseline">
                      <h3
                        className={`text-[15px] truncate text-white ${
                          lastMsg && lastMsg.unread
                            ? "font-bold"
                            : "font-medium"
                        }`}
                      >
                        {other?.name || "User"}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-[13px]">
                      <p
                        className={`truncate max-w-[140px] ${
                          lastMsg?.unread
                            ? "text-white font-bold"
                            : "text-zinc-500"
                        }`}
                      >
                        {lastMsg?.senderId === currentUserId ? "You: " : ""}
                        {lastMsg?.content ||
                          (lastMsg?.attachment
                            ? "Sent an attachment"
                            : "Start a conversation")}
                      </p>
                      <span className="text-zinc-500">·</span>
                      <span className="text-zinc-500">
                        {lastMsg
                          ? new Date(lastMsg.createdAt)
                              .toLocaleTimeString([], {
                                hour: "numeric",
                                minute: "numeric",
                              })
                              .replace(" PM", "")
                              .replace(" AM", "")
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col bg-black">
        {selectedChat ? (
          <>
            {/* HEADER */}
            <div className="p-3 border-b border-zinc-800 flex justify-between items-center bg-zinc-900 shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image
                    src={activeDetails?.avatar || "/noAvatar.png"}
                    fill
                    className="rounded-full object-cover"
                    alt=""
                  />
                </div>
                <div>
                  <h2 className="text-[17px] font-semibold text-white">
                    {activeDetails?.name}
                  </h2>
                  <span className="text-[12px] text-zinc-400 block leading-tight">
                    {isConnected ? "Active now" : "Offline"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-blue-500">
                <Phone className="w-6 h-6 cursor-pointer hover:bg-zinc-800 p-1 rounded-full box-content" />
                <Video className="w-6 h-6 cursor-pointer hover:bg-zinc-800 p-1 rounded-full box-content" />
                <Info className="w-6 h-6 cursor-pointer hover:bg-zinc-800 p-1 rounded-full box-content" />
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
              {messages.map((msg, idx) => {
                const isMe = msg.senderId === currentUserId;
                const isLast =
                  idx === messages.length - 1 ||
                  messages[idx + 1]?.senderId !== msg.senderId;
                const isFirst =
                  idx === 0 || messages[idx - 1]?.senderId !== msg.senderId;

                return (
                  <div
                    key={msg.id}
                    className={`flex ${
                      isMe ? "justify-end" : "justify-start"
                    } ${isFirst ? "mt-2" : ""}`}
                  >
                    {/* Avatar for other user */}
                    {!isMe && isLast && (
                      <div className="w-7 h-7 relative rounded-full overflow-hidden mr-2 self-end">
                        <Image
                          src={activeDetails?.avatar || "/noAvatar.png"}
                          fill
                          className="object-cover"
                          alt=""
                        />
                      </div>
                    )}
                    {!isMe && !isLast && <div className="w-9 mr-0" />}{" "}
                    {/* Spacer */}
                    <div
                      className={`max-w-[70%] px-3 py-2 text-[15px] ${
                        isMe
                          ? "bg-[#0084FF] text-white rounded-2xl"
                          : "bg-zinc-800 text-white rounded-2xl"
                      } ${
                        isMe
                          ? isLast
                            ? "rounded-br-md"
                            : "rounded-br-md"
                          : isLast
                          ? "rounded-bl-md"
                          : "rounded-bl-md"
                      } break-words`}
                    >
                      {msg.attachment && (
                        <div className="mb-2 rounded-lg overflow-hidden">
                          <Image
                            src={msg.attachment}
                            width={300}
                            height={200}
                            alt="attachment"
                            className="w-full h-auto"
                          />
                        </div>
                      )}
                      {msg.content}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="p-3 bg-zinc-900 flex items-center gap-2">
              <MoreVertical className="w-6 h-6 text-blue-500 cursor-pointer" />

              <CldUploadWidget
                uploadPreset="school_management"
                onSuccess={(result: any) =>
                  handleSendMessage(result.info.secure_url)
                }
              >
                {({ open }) => (
                  <button
                    onClick={() => open()}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <ImageIcon className="w-6 h-6" />
                  </button>
                )}
              </CldUploadWidget>

              <div className="flex-1 bg-zinc-800 rounded-full px-4 py-2 flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Aa"
                  className="flex-1 bg-transparent text-white placeholder-zinc-500 focus:outline-none text-[15px]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                />
                <button className="text-blue-500">
                  {/* Smiley icon could go here */}
                </button>
              </div>

              <button
                onClick={() => handleSendMessage()}
                className="text-blue-500 hover:scale-110 transition-transform"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-black flex-col gap-4">
            {/* Empty State */}
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-2">
                Welcome to NU Iloilo Chat
              </h2>
              <p className="text-zinc-500">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;

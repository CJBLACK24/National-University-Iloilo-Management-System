import ChatInterface from "@/components/ChatInterface";
import { getConversations } from "@/lib/actions/chat";

const MessagesPage = async () => {
  // Using the consistent mock ID used throughout the prototypes.
  // In a real app, retrieve session.user.id
  const currentUserId = "teacher-id";

  const conversations = await getConversations(currentUserId);

  return (
    <ChatInterface
      currentUserId={currentUserId}
      initialConversations={conversations}
    />
  );
};

export default MessagesPage;

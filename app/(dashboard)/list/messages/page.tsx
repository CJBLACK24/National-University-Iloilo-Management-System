import ChatInterface from "@/components/ChatInterface";
import { getConversations } from "@/lib/actions/chat";
import { auth } from "@/lib/auth"; // Server-side auth
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const MessagesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    // Handle unauthenticated state or redirect
    return redirect("/");
  }

  const currentUserId = session.user.id;

  const conversations = await getConversations(currentUserId);

  return (
    <ChatInterface
      currentUserId={currentUserId}
      initialConversations={conversations}
    />
  );
};

export default MessagesPage;

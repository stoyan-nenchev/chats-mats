import ChatSidebar from "./components/ChatSidebar";
import ChatWindow from "./components/ChatWindow";

export default function Home() {
  return (
    <div className="flex h-full">
      {/* Sidebar (friends and channels) */}
      <ChatSidebar />

      {/* Main Chat Window */}
      <main className="flex-1 p-6 bg-gray-100">
        <ChatWindow />
      </main>
    </div>
  );
}

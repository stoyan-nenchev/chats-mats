import ChatSidebar from "@/components/ChatSidebar";
import ChatWindow from "@/components/ChatWindow";

export default function ChatsPage() {
    return (
        <div className="flex flex-row flex-1 space-x-4 max-w-screen-xl mx-auto">
            <section className="flex flex-none">
                <ChatSidebar/>
            </section>
            <section className="flex flex-1">
                <ChatWindow/>
            </section>
        </div>
    );
}

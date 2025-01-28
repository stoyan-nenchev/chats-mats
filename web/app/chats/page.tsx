"use client"

import ChatSidebar from "@/components/ChatSidebar";
import ChatWindow from "@/components/ChatWindow";
import { useState, useEffect } from "react";

export default function ChatsPage() {
    const [senderId, setSenderId] = useState<string | null>(null);
    const [receiverId, setReceiverId] = useState<string | null>(null);
    const [channelId, setChannelId] = useState<string | null>(null);

    useEffect(() => {
        const fetchSenderId = async () => {
            try {
                const response = await fetch('/api/self');
                if (!response.ok) {
                    throw new Error("Failed to fetch senderId");
                }
                const data = await response.json();
                if (data.success) {
                    setSenderId(data.userId);
                } else {
                    console.error("Authentication failed:", data.error || "Unknown error");
                }
            } catch (error) {
                console.error("Error fetching senderId:", error);
            }
        };

        fetchSenderId();
    }, []);

    if (!senderId) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-row flex-1 space-x-4 max-w-screen-xl mx-auto">
            <section className="flex flex-none">
                <ChatSidebar/>
            </section>
            <section className="flex flex-1">
                <ChatWindow senderId={senderId} receiverId={receiverId} channelId={channelId} />
            </section>
        </div>
    );
}

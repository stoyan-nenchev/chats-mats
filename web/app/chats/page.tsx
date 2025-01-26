import ChatSidebar from "@/components/ChatSidebar";
import ChatWindow from "@/components/ChatWindow";
import { useState } from "react";
import { GetServerSideProps } from 'next';
import { getUserIdFromToken } from '@/lib/auth';

export default function ChatsPage() {
    const [senderId, setSenderId] = useState<string | null>(null);
    const [receiverId, setReceiverId] = useState<string | null>(null);
    const [channelId, setChannelId] = useState<string | null>(null);

    return (
        <div className="flex flex-row flex-1 space-x-4 max-w-screen-xl mx-auto">
            <section className="flex flex-none">
                <ChatSidebar/>
            </section>
            <section className="flex flex-1">
                <ChatWindow senderId={senderId!} receiverId={receiverId} channelId={channelId} />
            </section>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const token = req.cookies.token;

    const senderId = getUserIdFromToken(token);

    if (!senderId) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { senderId },
    };
};

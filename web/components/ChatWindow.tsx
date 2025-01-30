import {FC, useEffect, useState} from "react";
import ChatHead from "@/components/ChatHead";
import {SendMessageForm} from "@/components/forms/SendMessageForm";
import ChatWindowMessage from "@/components/ChatWindowMessage";

interface Props {
    senderId: string;
    receiverId: string | null;
    channelId: string | null;
}

const ChatWindow: FC<Props> = ({ senderId, receiverId, channelId }) => {
    const [messages, setMessages] = useState<{ message: string; isReceived: boolean }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [chatName, setChatName] = useState<string>("");

    useEffect(() => {
        const fetchMessages = async () => {
            if (!channelId && !receiverId) {
                return;
            }
            try {
                let fetchedMessages;
                if (channelId) {
                    fetchedMessages = await fetchMessagesByChannel(channelId);
                } else if (receiverId) {
                    fetchedMessages = await fetchMessagesByUser(receiverId);
                }

                setMessages(
                    fetchedMessages.map((msg: any) => ({
                        message: msg.content,
                        isReceived: msg.senderId !== senderId, // Determine if the message was received
                    }))
                );
            } catch (err: any) {
                setError(err.message || "Failed to load messages.");
            }
        };

        fetchMessages();
    }, [channelId, receiverId, senderId]);

    useEffect(() => {
        const fetchChatName = async () => {
            if (channelId) {
                const data = await fetchChannelDetails(channelId);
                setChatName(data.channelName);
            } else if (receiverId) {
                const data = await fetchUserDetails(receiverId);
                setChatName(data.username);
            } else {
                setChatName("");
            }
        };

        fetchChatName();
    }, [channelId, receiverId]);

    const fetchChannelDetails = async (channelId: string) => {
        const response = await fetch(`/api/channels/${channelId}`);
        if (!response.ok) throw new Error("Failed to fetch messages by channel.");
        return response.json();
    };

    const fetchUserDetails = async (id: string) => {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) throw new Error("Failed to fetch messages by user.");
        return response.json();
    };

    const fetchMessagesByChannel = async (channelId: string) => {
        const response = await fetch(`/api/messages/channels/${channelId}`);
        if (!response.ok) throw new Error("Failed to fetch messages by channel.");
        return response.json();
    };

    const fetchMessagesByUser = async (userId: string) => {
        const response = await fetch(`/api/messages/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch messages by user.");
        return response.json();
    };

    return (
      <div className="bg-white p-6 rounded-xl border h-full flex flex-col grow">
          <div className="flex flex-col flex-1 overflow-y-auto space-y-4">

              <div className="pb-2 border-b-2">
                  <ChatHead name={chatName || "Select a chat"}/>
              </div>
              <div className="flex flex-col flex-1">
                  {error ? (
                      <div className="text-red-500">{error}</div>
                  ) : (
                      messages.map((msg, index) => (
                          <ChatWindowMessage
                              key={index}
                              message={msg.message}
                              isReceived={msg.isReceived}
                          />
                      ))
                  )}
              </div>
          </div>
          <div className="mt-4 flex flex-row space-x-2">
              <SendMessageForm senderId={senderId} receiverId={receiverId} channelId={channelId} />
          </div>
      </div>
  );
};

export default ChatWindow;

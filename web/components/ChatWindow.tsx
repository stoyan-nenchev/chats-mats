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

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                let fetchedMessages;
                if (channelId) {
                    fetchedMessages = await fetchMessagesByChannel(channelId);
                } else if (receiverId) {
                    fetchedMessages = await fetchMessagesByUser(receiverId);
                } else {
                    throw new Error("Either channelId or receiverId must be provided.");
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
                  <ChatHead initials={"SN"} username={"kaaremass"}/>
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

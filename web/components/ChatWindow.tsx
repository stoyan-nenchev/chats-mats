import {FC, useEffect, useState} from "react";
import ChatHead from "@/components/ChatHead";
import {SendMessageForm} from "@/components/forms/SendMessageForm";
import ChatWindowMessage from "@/components/ChatWindowMessage";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {SearchUserForm} from "@/components/forms/SearchUserForm";
import AddFriendModel from "@/components/AddFriendModel";
import SearchUserIcon from "@/components/icons/SearchUserIcon";
import EditMemberModel from "@/components/EditMemberModel";

interface Props {
    senderId: string;
    receiverId: string | null;
    channelId: string | null;
}

const ChatWindow: FC<Props> = ({senderId, receiverId, channelId}) => {
    const [messages, setMessages] = useState<{ message: string; isReceived: boolean }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [chatName, setChatName] = useState<string>("");
    const [searchResults, setSearchResults] = useState<{ id: string; username: string; email: string }[]>([]);
    const [channelMembers, setChannelMembers] = useState<any[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!channelId && !receiverId) {
                return;
            }
            try {
                let fetchedMessages;
                if (channelId) {
                    fetchedMessages = await fetchMessagesByChannel(channelId);
                    const channelDetails = await fetchChannelDetails(channelId);
                    setChatName(channelDetails.name);
                    setChannelMembers(channelDetails.members)
                } else if (receiverId) {
                    fetchedMessages = await fetchMessagesByUser(receiverId);
                    const userDetails = await fetchUserDetails(receiverId);
                    setChatName(userDetails.username);
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

    const handleSearchResults = (users: { id: string; username: string; email: string }[]) => {
        setSearchResults(users);
    };

    const handleAddUserToChannel = async (userId: string) => {
        if (!channelId) return;

        try {
            const response = await fetch(`/api/channels/${channelId}/members`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({memberId: userId, role: "MEMBER"}),
            });

            if (response.ok) {
                setSearchResults(prev => prev.filter(user => user.id !== userId));
            } else {
                console.error("Failed to add user to the channel.");
            }
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        if (!channelId) return;
        try {
            const response = await fetch(`/api/channels/${channelId}/members`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({memberId: userId, role: newRole}),
            });
            if (!response.ok) {
                console.error("Failed to update role.");
            }
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };

    const handleKickUser = async (userId: string) => {
        if (!channelId) return;
        try {
            const response = await fetch(`/api/channels/${channelId}/members`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({memberId: userId})
            });
            if (response.ok) {
                setChannelMembers(prevMembers => prevMembers.filter(member => member.id !== userId));
            } else {
                console.error("Failed to kick user from channel.");
            }
        } catch (error) {
            console.error("Error kicking user:", error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border h-full flex flex-col grow">
            <div className="flex flex-col flex-1 overflow-y-auto space-y-4">

                <div className="pb-2 border-b-2 flex flex-row items-center">
                    <ChatHead name={chatName || "Select a chat"}/>
                    {channelId && (
                        <>
                            <Dialog>
                                <DialogTrigger>
                                    <SearchUserIcon/>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Find a user to add</DialogTitle>
                                        <DialogDescription>
                                            Search for users who are not in the channel.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <SearchUserForm onResults={handleSearchResults}/>
                                    <div
                                        className="flex flex-col border rounded-xl space-y-2 p-2 max-h-64 overflow-y-auto">
                                        {searchResults.length > 0 ? (
                                            searchResults.map(user => (
                                                <AddFriendModel
                                                    key={user.id}
                                                    username={user.username}
                                                    email={user.email}
                                                    userId={user.id}
                                                    onAddFriend={handleAddUserToChannel}/>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-sm">No results found</p>
                                        )}
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger>
                                    <button className="text-blue-500">Manage Channel Members</button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Channel Members</DialogTitle>
                                        <DialogDescription>
                                            Manage the roles and membership of users in the channel.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="flex flex-col border rounded-xl space-y-2 p-2 max-h-64 overflow-y-auto">
                                        {channelMembers.length > 0 ? (
                                            channelMembers.map((member) => (
                                                <EditMemberModel
                                                    key={member.id}
                                                    username={member.username}
                                                    email={member.email}
                                                    role={member.role}
                                                    userId={member.id}
                                                    onUpdateRole={handleRoleChange}
                                                    onKickUser={handleKickUser}
                                                />
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-sm">No members found</p>
                                        )}
                                    </div>
                                </DialogContent>
                            </Dialog></>
                    )}
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
                <SendMessageForm
                    senderId={senderId}
                    receiverId={receiverId}
                    channelId={channelId}
                    messages={messages}
                    setMessages={setMessages}/>
            </div>
        </div>
    );
};

export default ChatWindow;

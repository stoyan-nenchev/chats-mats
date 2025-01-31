"use client";

import {FC, useEffect, useState} from "react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import SidebarComponent from "@/components/SidebarComponent";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import SearchUserIcon from "@/components/icons/SearchUserIcon";
import {SearchUserForm} from "@/components/forms/SearchUserForm";
import AddFriendModel from "@/components/AddFriendModel";
import {CreateChannelForm} from "@/components/forms/CreateChannelForm";
import CreateIcon from "@/components/icons/CreateIcon";

interface SearchedUser {
    id: string;
    username: string;
    email: string;
}

interface Friend {
    id: string;
    username: string;
    status: string;
    message: string;
}

interface Channel {
    id: string;
    name: string;
    description: string;
    message: string;
}

const ChatSidebar: FC<{ onSelectChat: (receiverId?: string, channelId?: string) => void }> = ({ onSelectChat }) => {
    const [searchResults, setSearchResults] = useState<SearchedUser[]>([]);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [channels, setChannels] = useState<Channel[]>([]);
    const [selectedChat, setSelectedChat] = useState<{ receiverId?: string; channelId?: string } | null>(null);
    const router = useRouter()

    const handleSearchResults = (users: SearchedUser[]) => {
        setSearchResults(users);
    };

    const handleSelect = (receiverId?: string, channelId?: string) => {
        setSelectedChat({ receiverId, channelId });
        onSelectChat(receiverId, channelId);
    };

    useEffect(() => {
        const fetchSidebarData = async () => {
            try {
                const [friendsResponse, channelsResponse] = await Promise.all([
                    fetch("/api/friends"),
                    fetch("/api/channels/users"),
                ]);

                if (friendsResponse.ok && channelsResponse.ok) {
                    setFriends(await friendsResponse.json());
                    setChannels(await channelsResponse.json());
                } else {
                    console.error("Failed to fetch sidebar data");
                }
            } catch (error) {
                console.error("Error fetching sidebar data:", error);
            }
        };

        fetchSidebarData();
    }, []);

    const handleAddFriend = async (userId: string) => {
        const isFriend = friends.some(friend => friend.id === userId);

        if (isFriend) {
            console.log("This user is already your friend.");
            return;
        }
        try {
            const response = await fetch("/api/friends", {
                method: "POST",
                body: JSON.stringify({ receiverId: userId }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const newFriend = await response.json();
                setFriends((prev) => [...prev, newFriend]);
                console.log("Friend request added.")
            } else {
                console.error("Failed to send friend request");
            }
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    };

    const handleRemoveFriend = async (id: string) => {
        try {
            const response = await fetch(`/api/friends`, {
                method: "DELETE",
                body: JSON.stringify({receiverId: id})
            });

            if (response.ok) {
                setFriends((prev) => prev.filter((friend) => friend.id !== id));
            } else {
                console.error("Failed to remove friend");
            }
        } catch (error) {
            console.error("Error removing friend:", error);
        }
    };

    const addChannel = (newChannel: Channel) => {
        setChannels((prevChannels) => [...prevChannels, newChannel]);
    }

    const handleRemoveChannel = async (channelId: string) => {
        try {
            console.log(channelId)
            const response = await fetch(`/api/channels/${channelId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setChannels((prev) => prev.filter((channel) => channel.id !== channelId));
            } else {
                console.error("Failed to remove channel");
            }
        } catch (error) {
            console.error("Error removing channel:", error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "GET"
            });

            if (!response.ok) {
                console.log("Error when logging out", response.statusText)
                return;
            }
            router.push("/")
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="min-h-[200px] max-w-md h-full md:min-w-[450px] space-y-1">
            <div className="rounded-lg border p-2">
                <Button variant="destructive" onClick={handleLogout}>Logout</Button>
            </div>
            <ResizablePanelGroup
                direction="vertical"
                className="rounded-lg border"
            >
                <ResizablePanel defaultSize={25}>
                    <div className="flex flex-row pl-2 pt-2 space-x-2">
                        <h1>Friends</h1>
                        <Dialog>
                            <DialogTrigger>
                                <SearchUserIcon />
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Find a friend.</DialogTitle>
                                    <DialogDescription>
                                        You still need to be cautious as there can be imposters.
                                    </DialogDescription>
                                    <SearchUserForm onResults={handleSearchResults} />
                                    <div className="flex flex-col border rounded-xl space-y-2 p-2 max-h-64 overflow-y-auto">
                                        {searchResults.length > 0 ? (
                                            searchResults.map(user => (
                                                <AddFriendModel
                                                    key={user.id}
                                                    username={user.username}
                                                    email={user.email}
                                                    userId={user.id}
                                                    onAddFriend={handleAddFriend} />
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-sm">No results found</p>
                                        )}
                                    </div>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="flex flex-col h-full p-6 overflow-y-auto">
                        {friends.map((friend) => (
                            <SidebarComponent
                                key={friend.id}
                                username={friend.username}
                                message={friend.message}
                                onRemove={() => handleRemoveFriend(friend.id)}
                                badge={friend.status}
                                onClick={() => handleSelect(friend.id, undefined)}
                                isSelected={selectedChat?.receiverId === friend.id}
                                id={friend.id}/>
                        ))}
                    </div>
                </ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel defaultSize={75}>
                    <div className="flex flex-row pl-2 pt-2 space-x-2">
                        <h1>Channels</h1>
                        <Dialog>
                            <DialogTrigger>
                                <CreateIcon />
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create a channel.</DialogTitle>
                                    <CreateChannelForm />
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="flex flex-col h-full p-6 overflow-y-auto">
                        {channels.map((channel) => (
                            <SidebarComponent
                                key={channel.id}
                                id={channel.id}
                                info={channel.description}
                                username={channel.name}
                                message={channel.message}
                                onRemove={() => handleRemoveChannel(channel.id)}
                                badge={null}
                                onClick={() => handleSelect(undefined, channel.id)}
                                isSelected={selectedChat?.channelId === channel.id}
                                isChannel={true}
                            />
                        ))}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default ChatSidebar;

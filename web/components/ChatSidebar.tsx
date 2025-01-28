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

interface Friend {
    id: string;
    initials: string;
    username: string;
    message: string;
}

interface Channel {
    id: string;
    initials: string;
    username: string;
    message: string;
}

const ChatSidebar: FC = () => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [channels, setChannels] = useState<Channel[]>([]);
    const router = useRouter()

    useEffect(() => {
        const fetchSidebarData = async () => {
            try {
                const [friendsResponse, channelsResponse] = await Promise.all([
                    fetch("/api/friends"),
                    fetch("/api/channels"),
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
                                    <SearchUserForm />
                                    <div className="flex flex-col border rounded-xl space-y-2 p-2 max-h-64 overflow-y-auto">
                                        <AddFriendModel initials={"SN"} username={"kaaremass"} email={"this is message place"}/>
                                        <AddFriendModel initials={"SN"} username={"kaaremass"} email={"this is message place"}/>
                                        <AddFriendModel initials={"SN"} username={"kaaremass"} email={"this is message place"}/>
                                        <AddFriendModel initials={"SN"} username={"kaaremass"} email={"this is message place"}/>
                                        <AddFriendModel initials={"SN"} username={"kaaremass"} email={"this is message place"}/>
                                        <AddFriendModel initials={"SN"} username={"kaaremass"} email={"this is message place"}/>
                                    </div>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="flex flex-col h-full p-6 overflow-y-auto">
                        {friends.map((friend) => (
                            <SidebarComponent
                                key={friend.id}
                                initials={friend.initials}
                                username={friend.username}
                                message={friend.message}
                                onRemove={() => handleRemoveFriend(friend.id)}
                            />
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
                                initials={channel.initials}
                                username={channel.username}
                                message={channel.message}
                                onRemove={() => handleRemoveChannel(channel.id)}
                            />
                        ))}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default ChatSidebar;

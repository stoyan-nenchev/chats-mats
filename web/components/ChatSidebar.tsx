"use client";

import {FC} from "react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import SidebarComponent from "@/components/SidebarComponent";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const ChatSidebar: FC = () => {
    const router = useRouter()
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
                    <h1 className="pl-2 pt-2">Friends</h1>
                    <div className="flex flex-col h-full p-6">
                        <SidebarComponent initials={"SN"} username={"kaaremass"} message={"this is message place"}/>
                        <SidebarComponent initials={"SN"} username={"kaaremass"} message={"this is message place"}/>
                        <SidebarComponent initials={"SN"} username={"kaaremass"} message={"this is message place"}/>
                        <SidebarComponent initials={"SN"} username={"kaaremass"} message={"this is message place"}/>
                    </div>
                </ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel defaultSize={75}>
                    <h1 className="pl-2 pt-2">Channels</h1>
                    <div className="flex flex-col h-full p-6">
                        <SidebarComponent initials={"DD"} username={"kaaremass"} message={"this is message place"}/>
                        <SidebarComponent initials={"AA"} username={"kaaremass"} message={"this is message place"}/>
                        <SidebarComponent initials={"SS"} username={"kaaremass"} message={"this is message place"}/>
                        <SidebarComponent initials={"SN"} username={"kaaremass"} message={"this is message place"}/>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default ChatSidebar;

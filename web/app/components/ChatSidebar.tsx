import {FC} from "react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import SidebarComponent from "@/components/SidebarComponent";

const ChatSidebar: FC = () => {
    return (
        <ResizablePanelGroup
            direction="vertical"
            className="min-h-[200px] max-w-md h-full rounded-lg border md:min-w-[450px]"
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
    );
};

export default ChatSidebar;

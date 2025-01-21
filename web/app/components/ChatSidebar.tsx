import { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ChatSidebar: FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-full p-4">
      {/* Friends Section */}
      <div className="flex flex-col space-y-4">
        <h3 className="font-semibold text-xl">Friends</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full text-left">John Doe</Button>
          <Button variant="outline" className="w-full text-left">Jane Smith</Button>
        </div>
      </div>

      {/* Channels Section */}
      <div className="flex flex-col mt-8 space-y-4">
        <h3 className="font-semibold text-xl">Channels</h3>
        <Link href="/channels/general">
          <Button variant="outline" className="w-full text-left"># General</Button>
        </Link>
        <Link href="/channels/random">
          <Button variant="outline" className="w-full text-left"># Random</Button>
        </Link>
      </div>
    </div>
  );
};

export default ChatSidebar;

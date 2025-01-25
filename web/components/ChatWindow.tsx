import { FC } from "react";
import ChatHead from "@/components/ChatHead";
import {SendMessageForm} from "@/components/SendMessageForm";
import ChatWindowMessage from "@/components/ChatWindowMessage";

const ChatWindow: FC = () => {
  return (
      <div className="bg-white p-6 rounded-xl border h-full flex flex-col grow">
          <div className="flex flex-col flex-1 overflow-y-auto space-y-4">

              <div className="pb-2 border-b-2">
                  <ChatHead initials={"SN"} username={"kaaremass"}/>
              </div>
              <div className="flex flex-col flex-1">
                  <ChatWindowMessage message={"Hey there!"} isReceived={true}/>
                  <ChatWindowMessage message={"Hey, how are you?"} isReceived={false}/>
              </div>
          </div>
          <div className="mt-4 flex flex-row space-x-2">
              <SendMessageForm/>
          </div>
      </div>
  );
};

export default ChatWindow;

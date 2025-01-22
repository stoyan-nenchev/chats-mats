import { FC } from "react";
import ChatHead from "@/components/ChatHead";
import {SendMessageForm} from "@/components/SendMessageForm";

const ChatWindow: FC = () => {
  return (
      <div className="bg-white p-6 rounded-xl border h-full flex flex-col grow">
          <div className="flex flex-col flex-1 overflow-y-auto space-y-4">

              <div className="pb-2 border-b-2">
                  <ChatHead initials={"SN"} username={"kaaremass"}/>
              </div>
              <div className="flex flex-col flex-1">
                  <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg max-w-xs">Hey there!</div>
                  </div>
                  <div className="flex justify-end">
                      <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                          Hello! How are you?
                      </div>
                  </div>
              </div>
          </div>
          <div className="mt-4 flex flex-row space-x-2">
              <SendMessageForm/>
          </div>
      </div>
  );
};

export default ChatWindow;

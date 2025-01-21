import { FC } from "react";

const ChatWindow: FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {/* Messages */}
        <div className="space-y-4">
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg max-w-xs">Hey there!</div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">Hello! How are you?</div>
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>
    </div>
  );
};

export default ChatWindow;

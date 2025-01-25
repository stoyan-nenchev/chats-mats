import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
    message: string;
    isReceived: boolean;
}

const ChatWindowMessage:FC<Props> = ({message, isReceived}) => {
    return (
        <div className={cn("flex", isReceived ? "justify-start" : "justify-end")}>
            <p className={cn(isReceived ? "bg-gray-500" : "bg-blue-500", "text-white", "p-3", "rounded-lg", "max-w-xs")}>
                {message}
            </p>
        </div>
    )
}

export default ChatWindowMessage;
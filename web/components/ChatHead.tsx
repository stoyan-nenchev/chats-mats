import {FC} from "react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

interface Props {
    initials: string;
    username: string;
}

const ChatHead: FC<Props> = ({initials, username}) => {
    return (
        <div className="flex flex-row items-center m-2 space-x-2">
            <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <p>{username}</p>
        </div>
    );
}

export default ChatHead;
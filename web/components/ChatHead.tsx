import {FC} from "react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

interface Props {
    name: string;
}

const ChatHead: FC<Props> = ({name}) => {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    };

    return (
        <div className="flex flex-row items-center m-2 space-x-2">
            <Avatar>
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            <p>{name}</p>
        </div>
    );
}

export default ChatHead;
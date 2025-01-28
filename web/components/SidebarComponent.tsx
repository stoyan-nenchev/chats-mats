import {FC} from "react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import RemoveFriendButton from "@/components/RemoveFriendButton";

interface Props {
    initials: string;
    username: string;
    message: string;
    onRemove: () => void;
}

const SidebarComponent: FC<Props> = ({initials, username, message, onRemove}) => {
    return (
        <div className="flex flex-row items-center">
            <Avatar className="m-2">
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col m-2">
                <p>{username}</p>
                <p>{message}</p>
            </div>
            <RemoveFriendButton onClick={onRemove} />
        </div>
    );
}

export default SidebarComponent;
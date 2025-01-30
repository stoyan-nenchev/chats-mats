import {FC} from "react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import RemoveFriendButton from "@/components/RemoveFriendButton";
import {Badge} from "@/components/ui/badge";

interface Props {
    username: string;
    message: string;
    badge: string | null;
    onRemove: () => void;
    onClick?: () => void;
    isSelected?: boolean;
}

const SidebarComponent: FC<Props> = ({username, message, onRemove, badge, onClick, isSelected}) => {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    };

    return (
        <div className={`flex flex-row items-center ${isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
            onClick={onClick}
        >
            <Avatar className="m-2">
                <AvatarFallback>{getInitials(username)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col m-2">
                <p>{username}</p>
                <p>{message}</p>
            </div>
            {badge && <Badge>{badge}</Badge>}
            <RemoveFriendButton onRemove={onRemove} />
        </div>
    );
}

export default SidebarComponent;
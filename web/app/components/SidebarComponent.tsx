import {FC} from "react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

interface Props {
    initials: string;
    username: string;
    message: string;
}

const SidebarComponent: FC<Props> = ({initials, username, message}) => {
    return (
        <div className="flex flex-row items-center">
            <Avatar className="m-2">
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col m-2">
                <p>{username}</p>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default SidebarComponent;
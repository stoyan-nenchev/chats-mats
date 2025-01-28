import {FC} from "react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import AddFriendButton from "@/components/AddFriendButton";

interface Props {
    initials: string;
    username: string;
    email: string;
}

const AddFriendModel: FC<Props> = ({initials, username, email}) => {
    return (
        <div className="flex flex-row items-center space-x-2">
            <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <p>{username}</p>
            <p className="text-gray-400">{email}</p>
            <AddFriendButton/>
        </div>
    );
}

export default AddFriendModel;
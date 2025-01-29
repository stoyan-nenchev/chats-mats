import {FC} from "react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import AddFriendButton from "@/components/AddFriendButton";

interface Props {
    username: string;
    email: string;
    onAddFriend: (userId: string) => void;
    userId: string;
}

const AddFriendModel: FC<Props> = ({username, email, onAddFriend, userId}) => {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    };

    return (
        <div className="flex flex-row items-center space-x-2">
            <Avatar>
                <AvatarFallback>{getInitials(username)}</AvatarFallback>
            </Avatar>
            <p>{username}</p>
            <p className="text-gray-400">{email}</p>
            <AddFriendButton onClick={() => onAddFriend(userId)}/>
        </div>
    );
}

export default AddFriendModel;
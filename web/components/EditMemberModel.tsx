import { FC } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Props {
    username: string;
    email: string;
    role: string;
    userId: string;
    onUpdateRole: (userId: string, newRole: string) => void;
    onKickUser: (userId: string) => void;
}

const EditMemberModel: FC<Props> = ({ username, email, role, onUpdateRole, onKickUser, userId }) => {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    };

    const handleRoleChange = (newRole: string) => {
        onUpdateRole(userId, newRole);
    };

    return (
        <div className="flex flex-row items-center space-x-2">
            <Avatar>
                <AvatarFallback>{getInitials(username)}</AvatarFallback>
            </Avatar>
            <p>{username}</p>
            <p className="text-gray-400">{email}</p>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        {role}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleRoleChange("ADMIN")}>Admin</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRoleChange("MEMBER")}>Member</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="destructive" size="sm" onClick={() => onKickUser(userId)}>
                Kick
            </Button>
        </div>
    );
};

export default EditMemberModel;

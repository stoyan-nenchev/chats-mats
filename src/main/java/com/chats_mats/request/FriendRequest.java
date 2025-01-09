package com.chats_mats.request;

import lombok.Data;

import java.util.UUID;

@Data
public class FriendRequest {

    private UUID senderId;
    private UUID receiverId;
}

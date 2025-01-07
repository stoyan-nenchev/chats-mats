package com.chats_mats.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class MessageRequest {

    @NotNull
    private String content;
    @NotNull
    private UUID senderId;
    private UUID receiverId;
    private UUID channelId;
}

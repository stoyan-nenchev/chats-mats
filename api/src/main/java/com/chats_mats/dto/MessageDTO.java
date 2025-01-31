package com.chats_mats.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class MessageDTO {
    private UUID id;
    private String content;
    private UUID senderId;
    private UUID receiverId;
    private UUID channelId;
    private String status;
    private LocalDateTime sentDate;
}

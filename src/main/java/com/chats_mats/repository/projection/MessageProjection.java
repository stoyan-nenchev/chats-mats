package com.chats_mats.repository.projection;

import com.chats_mats.enums.MessageStatusType;

import java.time.LocalDateTime;
import java.util.UUID;

public interface MessageProjection {
    UUID getMessageId();
    String getContent();
    UUID getSenderId();
    UUID getReceiverId();
    UUID getChannelId();
    MessageStatusType getStatus();
    LocalDateTime getSentDate();
}

package com.chats_mats.request;

import lombok.Data;

import java.util.UUID;

@Data
public class ChannelMemberRequest {
    private UUID requesterId;
    private UUID memberId;
}

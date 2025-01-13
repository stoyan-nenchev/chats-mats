package com.chats_mats.request;

import com.chats_mats.enums.ChannelMemberRole;
import lombok.Data;

import java.util.UUID;

@Data
public class ChannelMemberRequest {
    private UUID requesterId;
    private UUID memberId;
    private ChannelMemberRole role;
}

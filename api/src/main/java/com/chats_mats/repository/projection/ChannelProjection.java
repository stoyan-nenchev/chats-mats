package com.chats_mats.repository.projection;

public interface ChannelProjection {
    String getChannelId();
    String getName();
    String getDescription();
    Boolean getOwner();
}

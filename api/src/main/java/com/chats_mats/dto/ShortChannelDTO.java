package com.chats_mats.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class ShortChannelDTO {
    private UUID id;
    private String name;
    private String description;
    private boolean owner;
}

package com.chats_mats.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class ChannelCreateRequest {
    @NotNull
    private UUID requesterId;
    @NotBlank
    private String name;
    @NotBlank
    private String description;
}

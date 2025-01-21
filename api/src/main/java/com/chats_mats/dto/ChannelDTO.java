package com.chats_mats.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
public class ChannelDTO {
    private UUID id;
    private String name;
    private String description;
    private UUID ownerId;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Set<MemberDTO> members;
}

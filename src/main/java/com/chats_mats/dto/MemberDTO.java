package com.chats_mats.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class MemberDTO {
    private UUID id;
    private String username;
    private String email;
}

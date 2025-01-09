package com.chats_mats.dto;

import com.chats_mats.enums.FriendStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FriendDTO {

    private UUID id;
    private String username;
    private FriendStatus status;
}

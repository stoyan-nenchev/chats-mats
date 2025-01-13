package com.chats_mats.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserUpdateRequest {
    @NotBlank
    private String username;
    @NotBlank
    private String email;
}

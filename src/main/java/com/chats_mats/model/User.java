package com.chats_mats.model;

import com.chats_mats.model.base.BaseEntitySoftDelete;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "users")
public class User extends BaseEntitySoftDelete {

    @NotBlank
    private String username;

    @NotNull
    @Email
    private String email;

    @NotBlank
    private String password;
}

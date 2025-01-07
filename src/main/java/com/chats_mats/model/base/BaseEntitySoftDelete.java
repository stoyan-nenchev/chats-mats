package com.chats_mats.model.base;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@Setter
public abstract class BaseEntitySoftDelete extends BaseEntityAudit {

    private LocalDateTime deletedAt;

    public void softDelete() {
        this.setDeletedAt(LocalDateTime.now());
    }

    public boolean isDeleted() {
        return deletedAt != null;
    }
}

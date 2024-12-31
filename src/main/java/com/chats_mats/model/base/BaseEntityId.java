package com.chats_mats.model.base;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import lombok.Getter;

import java.util.UUID;

@Getter
@MappedSuperclass
public abstract class BaseEntityId {
    @Id
    @Column(columnDefinition = "uuid", unique = true)
    private UUID id;

    /**
     * This provides support to set a certain id, but also makes sure, that once an entity is tied to an id, it cannot
     * be changes
     * @param id - chosen UUID to be set to the target entity if it already is not associated with an id
     */
    public void setId(UUID id) {
        if (this.id == null) {
            this.id = id;
        }
    }

    /**
     * Make sure the id exists before persist.
     */
    @PrePersist
    public void generateId() {
        if (this.id == null) {
            this.id = UUID.randomUUID();
        }
    }

    @Override
    public int hashCode() {
        if (id != null) {
            return id.hashCode();
        }
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof BaseEntityId)) {
            return false;
        }
        BaseEntityId other = (BaseEntityId) obj;

        if (id != null) {
            return id.equals(other.id);
        }
        return super.equals(other);
    }
}

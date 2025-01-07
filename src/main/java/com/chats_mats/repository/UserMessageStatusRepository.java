package com.chats_mats.repository;

import com.chats_mats.model.UserMessageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserMessageStatusRepository extends JpaRepository<UserMessageStatus, UUID> {
}

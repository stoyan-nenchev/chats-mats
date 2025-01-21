package com.chats_mats.repository;

import com.chats_mats.model.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FriendRepository extends JpaRepository<Friend, UUID> {
    boolean existsByUserIdAndFriendId(UUID userId, UUID friendId);
    Friend findByUserIdAndFriendId(UUID userId, UUID friendId);
    List<Friend> findByUserIdAndDeletedAtIsNull(UUID userId);
}

package com.chats_mats.repository;

import com.chats_mats.model.Message;
import com.chats_mats.repository.projection.MessageProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {

    @Query("""
        SELECT
            m.id AS messageId,
            m.content AS content,
            m.sender.id AS senderId,
            m.receiver.id AS receiverId,
            m.channel.id AS channelId,
            ums.status AS status,
            m.createdAt AS sentDate
        FROM Message m
        LEFT JOIN UserMessageStatus ums ON m.id = ums.message.id
        WHERE (:channelId IS NULL OR m.channel.id = :channelId)
            AND (:userId IS NULL OR (m.channel.id IS NULL AND (m.receiver.id = :userId OR m.sender.id = :userId)))
        ORDER BY m.createdAt DESC
    """)
    List<MessageProjection> findMessagesWithStatuses(@Param("channelId") UUID channelId, @Param("userId") UUID userId);
}

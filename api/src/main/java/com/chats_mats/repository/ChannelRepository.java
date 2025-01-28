package com.chats_mats.repository;

import com.chats_mats.model.Channel;
import com.chats_mats.repository.projection.ChannelProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, UUID> {
    boolean existsByIdAndOwner_Id(UUID channelId, UUID ownerId);

    @Query(value = """
                SELECT
                    c.id AS channelId,
                    c.name AS name,
                    CASE
                        WHEN c.owner_id = cm.user_id THEN TRUE
                        ELSE FALSE
                    END AS is_owner
                FROM channels c
                JOIN channel_members cm ON c.id = cm.channel_id
                WHERE cm.user_id = :userId
                    AND c.deleted_at IS NULL
            """, nativeQuery = true)
    List<ChannelProjection> findChannelsForUser(@Param("userId") UUID userId);
}

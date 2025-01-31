package com.chats_mats.repository;

import com.chats_mats.model.ChannelMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChannelMemberRepository extends JpaRepository<ChannelMember, UUID> {

    @Query("""
            SELECT CASE WHEN COUNT(cm) > 0 THEN TRUE ELSE FALSE END
            FROM ChannelMember cm
            WHERE cm.user.id = :userId AND cm.channel.id = :channelId
            """)
    boolean existsByUserIdAndChannelId(@Param("userId") UUID userId, @Param("channelId") UUID channelId);
    Optional<ChannelMember> findByUserIdAndChannelId(UUID userId, UUID channelId);
}

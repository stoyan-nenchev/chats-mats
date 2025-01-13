package com.chats_mats.repository;

import com.chats_mats.model.ChannelMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChannelMemberRepository extends JpaRepository<ChannelMember, UUID> {

    boolean existsByUser_IdAndChannel_Id(UUID userId, UUID channelId);
    Optional<ChannelMember> findByUser_IdAndChannel_Id(UUID userId, UUID channelId);
}

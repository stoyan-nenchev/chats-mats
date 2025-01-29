package com.chats_mats.util.mapper;

import com.chats_mats.dto.ChannelDTO;
import com.chats_mats.dto.ShortChannelDTO;
import com.chats_mats.model.Channel;
import com.chats_mats.repository.projection.ChannelProjection;
import org.mapstruct.BeanMapping;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.UUID;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR, uses = { MemberMapper.class })
public interface ChannelMapper {

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "ownerId", source = "owner.id")
    ChannelDTO toDTO(Channel channel);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "ownerId", source = "owner.id")
    @Mapping(target = "members", source = "members")
    ChannelDTO toDTOWithMembers(Channel channel);

    @Mapping(target = "id", source = "channelId")
    ShortChannelDTO toShortDTO(ChannelProjection projection);

    @Mapping(target = "owner", expression = "java(isOwnerMap(channel, userId))")
    ShortChannelDTO toShortDTO(Channel channel, @Context UUID userId);

    @Named("isOwnerMap")
    default boolean isOwnerMap(Channel channel, UUID userId) {
        return channel.getOwner().getId() == userId;
    }
}

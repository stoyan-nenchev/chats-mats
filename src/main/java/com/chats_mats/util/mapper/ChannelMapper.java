package com.chats_mats.util.mapper;

import com.chats_mats.dto.ChannelDTO;
import com.chats_mats.model.Channel;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

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
}

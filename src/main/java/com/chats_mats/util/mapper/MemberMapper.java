package com.chats_mats.util.mapper;

import com.chats_mats.dto.MemberDTO;
import com.chats_mats.model.ChannelMember;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface MemberMapper {

    @Mapping(target = "id", source = "user.id")
    @Mapping(target = "username", source = "user.username")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "role", source = "role")
    MemberDTO toDTO(ChannelMember channelMember);
}

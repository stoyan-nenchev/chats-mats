package com.chats_mats.util.mapper;

import com.chats_mats.dto.MemberDTO;
import com.chats_mats.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface MemberMapper {

    MemberDTO toDTO(User user);
}

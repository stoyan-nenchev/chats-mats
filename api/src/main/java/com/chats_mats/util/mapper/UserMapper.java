package com.chats_mats.util.mapper;

import com.chats_mats.dto.UserDTO;
import com.chats_mats.model.User;
import com.chats_mats.request.UserRegisterRequest;
import com.chats_mats.request.UserUpdateRequest;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface UserMapper {

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "username", source = "createRequest.username")
    @Mapping(target = "email", source = "createRequest.email")
    @Mapping(target = "password", expression = "java(passwordEncoder.encode(createRequest.getPassword()))")
    User toNewEntity(UserRegisterRequest createRequest, PasswordEncoder passwordEncoder);

    UserDTO toDTO(User user);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "username", source = "username")
    @Mapping(target = "email", source = "email")
    void intoEntity(@MappingTarget User user, UserUpdateRequest createRequest);
}

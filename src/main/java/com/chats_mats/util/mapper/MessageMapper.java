package com.chats_mats.util.mapper;

import com.chats_mats.dto.MessageDTO;
import com.chats_mats.enums.MessageStatusType;
import com.chats_mats.model.Channel;
import com.chats_mats.model.Message;
import com.chats_mats.model.User;
import com.chats_mats.repository.projection.MessageProjection;
import com.chats_mats.request.MessageRequest;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.UUID;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface MessageMapper {

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "content", source = "content")
    Message toEntity(MessageRequest messageRequest);

    @Mapping(target = "content", source = "message.content")
    @Mapping(target = "receiverId", source = "message.receiver", qualifiedByName = "mapUserId")
    @Mapping(target = "channelId", source = "message.channel", qualifiedByName = "mapChannelId")
    @Mapping(target = "status", source = "statusType")
    @Mapping(target = "sentDate", source = "message.createdAt")
    MessageDTO toDTO(Message message, MessageStatusType statusType);

    @Mapping(target = "id", source = "messageId")
    MessageDTO toDTO(MessageProjection projection);

    @Named("mapUserId")
    default UUID mapUserToId(User user) {
        return user != null ? user.getId() : null;
    }

    @Named("mapChannelId")
    default UUID mapChannelToId(Channel channel) {
        return channel != null ? channel.getId() : null;
    }
}

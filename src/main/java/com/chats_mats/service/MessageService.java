package com.chats_mats.service;

import com.chats_mats.dto.MessageDTO;
import com.chats_mats.enums.MessageStatusType;
import com.chats_mats.model.Channel;
import com.chats_mats.model.Message;
import com.chats_mats.model.User;
import com.chats_mats.model.UserMessageStatus;
import com.chats_mats.repository.ChannelRepository;
import com.chats_mats.repository.MessageRepository;
import com.chats_mats.repository.UserMessageStatusRepository;
import com.chats_mats.repository.UserRepository;
import com.chats_mats.repository.projection.MessageProjection;
import com.chats_mats.request.MessageRequest;
import com.chats_mats.util.exception.NotFoundException;
import com.chats_mats.util.exception.UnprocessableEntityException;
import com.chats_mats.util.mapper.MessageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ChannelRepository channelRepository;
    private final UserMessageStatusRepository userMessageStatusRepository;
    private final MessageMapper messageMapper;

    @Transactional
    public MessageDTO sendMessage(MessageRequest messageRequest) {
        User sender = userRepository.findById(messageRequest.getSenderId())
                .orElseThrow(() -> new NotFoundException("Sender not found."));

        User receiver = null;
        Channel channel = null;

        if (messageRequest.getReceiverId() != null) {
            receiver = userRepository.findById(messageRequest.getReceiverId())
                    .orElseThrow(() -> new NotFoundException("Receiver not found."));
        }

        if (messageRequest.getChannelId() != null) {
            channel = channelRepository.findById(messageRequest.getChannelId())
                    .orElseThrow(() -> new NotFoundException("Channel not found."));
        }

        if ((receiver == null && channel == null) || (receiver != null && channel != null)) {
            throw new UnprocessableEntityException("A message must be directed to either a receiver or a channel.");
        }

        Message message = messageMapper.toEntity(messageRequest);
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setChannel(channel);

        Message savedMessage = messageRepository.save(message);

        UserMessageStatus senderStatus = new UserMessageStatus();
        senderStatus.setMessage(savedMessage);
        senderStatus.setUser(sender);
        senderStatus.setStatus(MessageStatusType.SENT);
        userMessageStatusRepository.save(senderStatus);

        return messageMapper.toDTO(savedMessage, senderStatus.getStatus());
    }

    @Transactional(readOnly = true)
    public List<MessageDTO> getMessagesByChannel(UUID channelId) {
        List<MessageProjection> messagesProjection = messageRepository.findMessagesWithStatuses(channelId, null);
        return messagesProjection.stream()
                .map(messageMapper::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MessageDTO> getMessagesByUser(UUID userId) {
        List<MessageProjection> messagesProjection = messageRepository.findMessagesWithStatuses(null, userId);
        return messagesProjection.stream()
                .map(messageMapper::toDTO)
                .toList();
    }
}

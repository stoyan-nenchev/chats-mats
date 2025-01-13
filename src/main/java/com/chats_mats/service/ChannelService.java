package com.chats_mats.service;

import com.chats_mats.dto.ChannelDTO;
import com.chats_mats.model.Channel;
import com.chats_mats.model.User;
import com.chats_mats.repository.ChannelRepository;
import com.chats_mats.repository.UserRepository;
import com.chats_mats.request.ChannelCreateRequest;
import com.chats_mats.request.ChannelMemberRequest;
import com.chats_mats.request.ChannelUpdateRequest;
import com.chats_mats.util.exception.NotFoundException;
import com.chats_mats.util.exception.UnprocessableEntityException;
import com.chats_mats.util.mapper.ChannelMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChannelService {

    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;
    private final ChannelMapper channelMapper;

    public ChannelDTO createChannel(ChannelCreateRequest request) {
        User owner = userRepository.findById(request.getRequesterId())
                .orElseThrow(() -> new NotFoundException("User not found."));

        Channel channel = new Channel();
        channel.setName(request.getName());
        channel.setDescription(request.getDescription());
        channel.setOwner(owner);

        channelRepository.save(channel);

        return channelMapper.toDTO(channel);
    }

    public String deleteChannel(UUID channelId, UUID initiatorId) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new NotFoundException("Channel not found."));
        validateOwnerRequest(channel.getId(), initiatorId);
        channel.softDelete();
        channelRepository.save(channel);

        return String.format("Channel %s deleted successfully.", channel.getName());
    }

    public ChannelDTO updateChannel(UUID channelId, ChannelUpdateRequest request) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new IllegalArgumentException("Channel not found."));
        validateOwnerRequest(channel.getId(), request.getRequesterId());

        channel.setName(request.getName());
        channel.setDescription(request.getDescription());

        channelRepository.save(channel);
        return channelMapper.toDTO(channel);
    }

    public ChannelDTO addMember(UUID channelId, ChannelMemberRequest request) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new NotFoundException("Channel not found."));

        User user = userRepository.findById(request.getRequesterId())
                .orElseThrow(() -> new NotFoundException("User not found."));

        if (!channel.getMembers().contains(user)) {
            channel.getMembers().add(user);
            channelRepository.save(channel);
        }

        return channelMapper.toDTOWithMembers(channel);
    }

    public ChannelDTO removeMember(UUID channelId, ChannelMemberRequest request) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new IllegalArgumentException("Channel not found."));

        User user = userRepository.findById(request.getRequesterId())
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        if (channel.getMembers().contains(user)) {
            channel.getMembers().remove(user);
            channelRepository.save(channel);
        }

        return channelMapper.toDTOWithMembers(channel);
    }

    private void validateOwnerRequest(UUID channelId, UUID ownerId) {
        if (!channelRepository.existsByIdAndOwner_Id(channelId, ownerId)) {
            throw new UnprocessableEntityException("Requester is not the owner of the channel.");
        }
    }
}

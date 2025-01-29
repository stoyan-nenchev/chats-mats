package com.chats_mats.service;

import com.chats_mats.dto.ChannelDTO;
import com.chats_mats.dto.ShortChannelDTO;
import com.chats_mats.enums.ChannelMemberRole;
import com.chats_mats.model.Channel;
import com.chats_mats.model.ChannelMember;
import com.chats_mats.model.User;
import com.chats_mats.repository.ChannelMemberRepository;
import com.chats_mats.repository.ChannelRepository;
import com.chats_mats.repository.UserRepository;
import com.chats_mats.request.ChannelCreateRequest;
import com.chats_mats.request.ChannelMemberRequest;
import com.chats_mats.request.ChannelUpdateRequest;
import com.chats_mats.util.mapper.ChannelMapper;
import com.chats_mats.util.exception.NotFoundException;
import com.chats_mats.util.exception.UnprocessableEntityException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChannelService {

    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;
    private final ChannelMemberRepository channelMemberRepository;
    private final ChannelMapper channelMapper;

    @Transactional
    public ShortChannelDTO createChannel(ChannelCreateRequest request) {
        User owner = userRepository.findById(request.getRequesterId())
                .orElseThrow(() -> new NotFoundException("User not found."));

        Channel channel = new Channel();
        channel.setName(request.getName());
        channel.setDescription(request.getDescription());
        channel.setOwner(owner);

        channelRepository.save(channel);

        ChannelMember channelMember = new ChannelMember();
        channelMember.setUser(owner);
        channelMember.setChannel(channel);
        channelMember.setRole(ChannelMemberRole.OWNER);
        channelMemberRepository.save(channelMember);

        return channelMapper.toShortDTO(channel, owner.getId());
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
                .orElseThrow(() -> new NotFoundException("Channel not found."));
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

        if (!channelMemberRepository.existsByUser_IdAndChannel_Id(user.getId(), channel.getId())) {
            ChannelMember channelMember = new ChannelMember();
            channelMember.setUser(user);
            channelMember.setChannel(channel);
            channelMember.setRole(request.getRole());
            channelMemberRepository.save(channelMember);
        } else {
            throw new UnprocessableEntityException("Member is already a part of the channel.");
        }

        return channelMapper.toDTOWithMembers(channel);
    }

    public ChannelDTO removeMember(UUID channelId, ChannelMemberRequest request) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new NotFoundException("Channel not found."));

        User user = userRepository.findById(request.getRequesterId())
                .orElseThrow(() -> new NotFoundException("User not found."));

        ChannelMember channelMember = channelMemberRepository.findByUser_IdAndChannel_Id(user.getId(), channel.getId())
                .orElseThrow(() -> new UnprocessableEntityException("User is already not a member in the channel."));

        channelMemberRepository.delete(channelMember);

        return channelMapper.toDTOWithMembers(channel);
    }

    public List<ShortChannelDTO> getChannels(UUID userId) {
        return channelRepository.findChannelsForUser(userId).stream()
                .map(channelMapper::toShortDTO)
                .toList();
    }

    private void validateOwnerRequest(UUID channelId, UUID ownerId) {
        if (!channelRepository.existsByIdAndOwner_Id(channelId, ownerId)) {
            throw new UnprocessableEntityException("Requester is not the owner of the channel.");
        }
    }
}

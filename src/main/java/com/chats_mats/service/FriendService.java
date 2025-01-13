package com.chats_mats.service;

import com.chats_mats.dto.FriendDTO;
import com.chats_mats.enums.FriendStatus;
import com.chats_mats.model.Friend;
import com.chats_mats.model.User;
import com.chats_mats.repository.FriendRepository;
import com.chats_mats.repository.UserRepository;
import com.chats_mats.request.FriendRequest;
import com.chats_mats.util.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    public FriendDTO addFriend(FriendRequest friendRequest) {
        User sender = userRepository.findById(friendRequest.getSenderId())
                .orElseThrow(() -> new NotFoundException("User sending the friend request was not found."));

        User receiver = userRepository.findById(friendRequest.getReceiverId())
                .orElseThrow(() -> new NotFoundException("User receiving the friend request was not found."));

        Friend senderRequest = new Friend();
        senderRequest.setUser(sender);
        senderRequest.setFriend(receiver);
        senderRequest.setStatus(FriendStatus.SENT);
        friendRepository.save(senderRequest);

        Friend receiverRequest = new Friend();
        receiverRequest.setUser(receiver);
        receiverRequest.setFriend(sender);
        receiverRequest.setStatus(FriendStatus.RECEIVED);
        friendRepository.save(receiverRequest);

        FriendDTO friendDTO = new FriendDTO();
        friendDTO.setId(receiver.getId());
        friendDTO.setUsername(receiver.getUsername());
        friendDTO.setStatus(senderRequest.getStatus());
        return friendDTO;
    }

    public FriendDTO blockFriend(FriendRequest friendRequest) {
        Friend friendToBlock = friendRepository.findByUserIdAndFriendId(friendRequest.getSenderId(), friendRequest.getReceiverId());
        friendToBlock.setStatus(FriendStatus.BLOCKED);
        friendRepository.save(friendToBlock);

        FriendDTO friendDTO = new FriendDTO();
        friendDTO.setId(friendToBlock.getFriend().getId());
        friendDTO.setUsername(friendToBlock.getFriend().getUsername());
        friendDTO.setStatus(friendToBlock.getStatus());
        return friendDTO;
    }

    public String removeFriend(FriendRequest friendRequest) {
        Friend initiator = friendRepository.findByUserIdAndFriendId(friendRequest.getSenderId(), friendRequest.getReceiverId());

        Friend receiver = friendRepository.findByUserIdAndFriendId(friendRequest.getReceiverId(), friendRequest.getSenderId());

        initiator.softDelete();
        receiver.softDelete();
        friendRepository.saveAll(List.of(initiator, receiver));
        return "Friend successfully removed.";
    }

    @Transactional(readOnly = true)
    public List<FriendDTO> getFriends(UUID userId) {
        return friendRepository.findByUserIdAndDeletedAtIsNull(userId).stream()
                .sorted(Comparator.comparingInt(friend -> friend.getStatus().ordinal()))
                .map(friend -> new FriendDTO(friend.getFriend().getId(), friend.getFriend().getUsername(), friend.getStatus()))
                .toList();
    }

    public FriendDTO acceptRequest(FriendRequest friendRequest) {
        Friend initiator = friendRepository.findByUserIdAndFriendId(friendRequest.getSenderId(), friendRequest.getReceiverId());

        Friend receiver = friendRepository.findByUserIdAndFriendId(friendRequest.getReceiverId(), friendRequest.getSenderId());

        initiator.setStatus(FriendStatus.ACCEPTED);
        Friend acceptedRequest = friendRepository.save(initiator);

        receiver.setStatus(FriendStatus.ACCEPTED);
        friendRepository.save(receiver);

        return new FriendDTO(acceptedRequest.getFriend().getId(), acceptedRequest.getFriend().getUsername(), acceptedRequest.getStatus());
    }
}

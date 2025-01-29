package com.chats_mats.resource;

import com.chats_mats.dto.FriendDTO;
import com.chats_mats.request.FriendRequest;
import com.chats_mats.service.FriendService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/friends")
@RequiredArgsConstructor
public class FriendResource {

    private final FriendService friendService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<FriendDTO>> getFriends(@PathVariable UUID userId) {
        List<FriendDTO> friends = friendService.getFriends(userId);
        return ResponseEntity.ok(friends);
    }

    @PostMapping("/accept")
    public ResponseEntity<FriendDTO> acceptRequest(@RequestBody @Valid FriendRequest friendRequest) {
        FriendDTO friendDTO = friendService.acceptRequest(friendRequest);
        return ResponseEntity.ok(friendDTO);
    }

    @PostMapping("/add")
    public ResponseEntity<FriendDTO> addFriend(@RequestBody @Valid FriendRequest friendRequest) {
        FriendDTO friendDTO = friendService.addFriend(friendRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(friendDTO);
    }

    @PostMapping("/block")
    public ResponseEntity<FriendDTO> blockFriend(@RequestBody @Valid FriendRequest friendRequest) {
        FriendDTO friendDTO = friendService.blockFriend(friendRequest);
        return ResponseEntity.ok(friendDTO);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Map<String, String>> removeFriend(@RequestBody @Valid FriendRequest friendRequest) {
        String message = friendService.removeFriend(friendRequest);
        return ResponseEntity.ok(Map.of("message", message));
    }

}

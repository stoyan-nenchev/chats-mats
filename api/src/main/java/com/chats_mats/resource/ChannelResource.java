package com.chats_mats.resource;

import com.chats_mats.dto.ChannelDTO;
import com.chats_mats.dto.ShortChannelDTO;
import com.chats_mats.request.ChannelCreateRequest;
import com.chats_mats.request.ChannelMemberRequest;
import com.chats_mats.request.ChannelUpdateRequest;
import com.chats_mats.service.ChannelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/channels")
@RequiredArgsConstructor
public class ChannelResource {

    private final ChannelService channelService;

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<ShortChannelDTO>> getChannels(@PathVariable UUID userId) {
        List<ShortChannelDTO> channels = channelService.getChannels(userId);
        return ResponseEntity.ok(channels);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChannelDTO> getChannel(@PathVariable UUID id) {
        ChannelDTO channel = channelService.getChannelById(id);
        return ResponseEntity.ok(channel);
    }

    @PostMapping
    public ResponseEntity<ShortChannelDTO> createChannel(@RequestBody @Valid ChannelCreateRequest request) {
        ShortChannelDTO channel = channelService.createChannel(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(channel);
    }

    @DeleteMapping("/{channelId}")
    public ResponseEntity<Map<String, String>> deleteChannel(
            @PathVariable UUID channelId,
            @RequestParam UUID initiatorId) {
        String message = channelService.deleteChannel(channelId, initiatorId);
        return ResponseEntity.ok(Map.of("message", message));
    }

    @PutMapping("/{channelId}")
    public ResponseEntity<ChannelDTO> updateChannel(
            @PathVariable UUID channelId,
            @RequestBody @Valid ChannelUpdateRequest request) {
        ChannelDTO updatedChannel = channelService.updateChannel(channelId, request);
        return ResponseEntity.ok(updatedChannel);
    }

    @PostMapping("/{channelId}/members")
    public ResponseEntity<ChannelDTO> addMember(
            @PathVariable UUID channelId,
            @RequestBody @Valid ChannelMemberRequest request) {
        ChannelDTO updatedChannel = channelService.addMember(channelId, request);
        return ResponseEntity.ok(updatedChannel);
    }

    @PutMapping("/{channelId}/members")
    public ResponseEntity<ChannelDTO> updateMemberRole(
            @PathVariable UUID channelId,
            @RequestBody @Valid ChannelMemberRequest request) {
        ChannelDTO updatedChannel = channelService.updateMember(channelId, request);
        return ResponseEntity.ok(updatedChannel);
    }

    @DeleteMapping("/{channelId}/members")
    public ResponseEntity<ChannelDTO> removeMember(
            @PathVariable UUID channelId,
            @RequestBody @Valid ChannelMemberRequest request) {
        ChannelDTO updatedChannel = channelService.removeMember(channelId, request);
        return ResponseEntity.ok(updatedChannel);
    }
}

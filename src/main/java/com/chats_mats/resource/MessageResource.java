package com.chats_mats.resource;

import com.chats_mats.dto.MessageDTO;
import com.chats_mats.model.Message;
import com.chats_mats.request.MessageRequest;
import com.chats_mats.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class MessageResource {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<MessageDTO> sendMessage(@RequestBody MessageRequest messageRequest) {
        return ResponseEntity.ok(messageService.sendMessage(messageRequest));
    }

    @GetMapping("/channel/{channelId}")
    public ResponseEntity<List<MessageDTO>> getMessagesByChannel(@PathVariable UUID channelId) {
        List<MessageDTO> messages = messageService.getMessagesByChannel(channelId);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MessageDTO>> getMessagesByUser(@PathVariable UUID userId) {
        List<MessageDTO> messages = messageService.getMessagesByUser(userId);
        return ResponseEntity.ok(messages);
    }
}

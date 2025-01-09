package com.chats_mats.service;

import com.chats_mats.repository.ChannelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChannelService {

    private final ChannelRepository channelRepository;


}

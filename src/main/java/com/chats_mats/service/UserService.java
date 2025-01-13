package com.chats_mats.service;

import com.chats_mats.dto.UserDTO;
import com.chats_mats.model.User;
import com.chats_mats.repository.UserRepository;
import com.chats_mats.request.UserCreateRequest;
import com.chats_mats.request.UserUpdateRequest;
import com.chats_mats.util.exception.NotFoundException;
import com.chats_mats.util.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserDTO create(UserCreateRequest createRequest) {
        User userToCreate = userMapper.toEntity(createRequest);
        userRepository.save(userToCreate);
        return userMapper.toDTO(userToCreate);
    }

    public UserDTO update(UUID userId, UserUpdateRequest updateRequest) {
        User userToUpdate = userRepository.getReferenceById(userId);
        userMapper.intoEntity(userToUpdate, updateRequest);
        userRepository.save(userToUpdate);
        return userMapper.toDTO(userToUpdate);
    }

    @Transactional(readOnly = true)
    public List<UserDTO> search(String query) {
        return userRepository.searchByUsernameOrEmail(query).stream()
                .map(userMapper::toDTO)
                .toList();
    }

    public String delete(UUID userId) {
        if (!userRepository.existsById(userId)) {
            throw new NotFoundException("User to delete not found.");
        }
        userRepository.deleteById(userId);
        return "User deleted successfully.";
    }
}

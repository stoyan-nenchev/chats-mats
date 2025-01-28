package com.chats_mats.authentication;

import com.chats_mats.model.User;
import com.chats_mats.repository.UserRepository;
import com.chats_mats.request.LoginRequest;
import com.chats_mats.request.UserRegisterRequest;
import com.chats_mats.util.exception.NotFoundException;
import com.chats_mats.util.exception.UnauthorizedException;
import com.chats_mats.util.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public String register(UserRegisterRequest createRequest) {
        User userToCreate = userMapper.toNewEntity(createRequest, passwordEncoder);
        userRepository.save(userToCreate);
        return login(new LoginRequest(createRequest.getEmail(), createRequest.getPassword()));
    }

    public String login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        if (!authentication.isAuthenticated()) {
            throw new UnauthorizedException("Unable to authenticate.");
        }
        User foundUser = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found."));

        return jwtService.generateToken(loginRequest.getEmail(), foundUser.getId());
    }
}

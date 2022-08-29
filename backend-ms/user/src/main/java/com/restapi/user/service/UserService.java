package com.restapi.user.service;

import com.restapi.user.model.User;
import com.restapi.user.payload.request.ReqUserLogin;
import com.restapi.user.payload.request.ReqUserRegister;
import com.restapi.user.payload.response.ResMessage;
import com.restapi.user.payload.response.ResMessageType;
import com.restapi.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    public ResponseEntity<?> register(ReqUserRegister reqUserRegister) {
        // Check username already exists or not
        if (userRepository.existsByUsername(reqUserRegister.getUsername()))
            return ResponseEntity.ok(new ResMessage("Username already exists", ResMessageType.BAD));

        // Check email already exists or not
        if (userRepository.existsByEmail(reqUserRegister.getEmail()))
            return ResponseEntity.ok(new ResMessage("Email already exists", ResMessageType.BAD));

        User user = new User(
                reqUserRegister.getUsername(),
                reqUserRegister.getFirstName(),
                reqUserRegister.getLastName(),
                reqUserRegister.getPhone(),
                reqUserRegister.getAddress(),
                reqUserRegister.getUserType(),
                reqUserRegister.getEmail(),
                encoder.encode(reqUserRegister.getPassword())
        );

        userRepository.save(user);

        return ResponseEntity.ok(new ResMessage("Account created successfully", ResMessageType.OK));
    }

    public ResponseEntity<?> login(ReqUserLogin reqUserLogin){
        // Check email already exists or not
        if (!userRepository.existsByEmail(reqUserLogin.getEmail()))
            return ResponseEntity.ok(new ResMessage("Email not exists", ResMessageType.BAD));

        User user = userRepository.findByEmail(reqUserLogin.getEmail());

        if(!encoder.matches(reqUserLogin.getPassword(), user.getPassword()))
            return ResponseEntity.ok(new ResMessage("Incorrect password", ResMessageType.BAD));

        return ResponseEntity.ok(new ResMessage("Login successful", ResMessageType.OK));
    }
}

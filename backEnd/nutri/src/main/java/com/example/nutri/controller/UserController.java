package com.example.nutri.controller;


import com.example.nutri.model.User;
import com.example.nutri.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*") // Permite conexões do frontend
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("Usuário registrado com sucesso!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());
            return ResponseEntity.ok(loggedInUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Endpoint funcionando!");
    }
}
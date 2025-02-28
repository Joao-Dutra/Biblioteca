package com.example.biblioteca.controller;

import com.example.biblioteca.dto.LoginRequest;
import com.example.biblioteca.model.Usuario;
import com.example.biblioteca.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173") // Permite chamadas do front-end
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository; // Acessa o banco

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(request.getEmail());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Usuário não encontrado!");
        }

        Usuario usuario = usuarioOpt.get();
        if (!usuario.getSenha().equals(request.getSenha())) {
            return ResponseEntity.status(401).body("Senha incorreta!");
        }

        // Criamos um token fake (substitua por JWT real)
        Map<String, Object> response = new HashMap<>();
        response.put("token", "fake-jwt-token-123456");
        response.put("email", usuario.getEmail());
        response.put("id", usuario.getId());

        return ResponseEntity.ok(response);
    }
}

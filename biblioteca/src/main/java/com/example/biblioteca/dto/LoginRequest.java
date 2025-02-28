package com.example.biblioteca.dto;


public class LoginRequest {
    private String email;
    private String senha; // Deve ser igual ao nome enviado do frontend

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}

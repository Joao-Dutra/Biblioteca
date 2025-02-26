package com.example.biblioteca.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Melhor para MySQL
    private Long id;

    private String nome;

    private String email;

    private String senha;

    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro;


    @PrePersist
    protected void onCreate() {
        dataCadastro = LocalDateTime.now(); // Define a data de criação automaticamente
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

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

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }
}

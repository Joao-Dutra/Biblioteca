package com.example.biblioteca.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalDateTime;
import java.time.LocalDate;
@Entity

public class Resenha {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String conteudo;
    private LocalDateTime dataPublicacao;
    @PrePersist
    protected void onCreate() {
        dataPublicacao = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "livro_id")
    private Livro livro;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public LocalDateTime getDataPublicacao() {
        return dataPublicacao;
    }

    public void setDataPublicacao(LocalDateTime dataPublicacao) {
        this.dataPublicacao = dataPublicacao;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Livro getLivro() {
        return livro;
    }

    public void setLivro(Livro livro) {
        this.livro = livro;
    }
    
}

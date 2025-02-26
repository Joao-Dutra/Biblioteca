package com.example.biblioteca.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;


import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.annotation.processing.Generated;

@Entity

public class Troca {
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "livroSolicitado_id")
    private Livro livro;

    @ManyToOne
    @JoinColumn(name = "solicitante_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "proprietario_id") 
    private Usuario proprietario;

    private String status;

    private LocalDateTime dataSolicitacao;

    private LocalDate dataConclusao;
    
    @PrePersist
    protected void onCreate() {
        dataSolicitacao = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Livro getLivro() {
        return livro;
    }

    public void setLivro(Livro livro) {
        this.livro = livro;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Usuario getProprietario() {
        return proprietario;
    }

    public void setProprietario(Usuario proprietario) {
        this.proprietario = proprietario;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDataSolicitacao() {
        return dataSolicitacao;
    }

    public void setDataSolicitacao(LocalDateTime dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }

    public LocalDate getDataConclusao() {
        return dataConclusao;
    }

    public void setDataConclusao(LocalDate dataConclusao) {
        this.dataConclusao = dataConclusao;
    }

    
}

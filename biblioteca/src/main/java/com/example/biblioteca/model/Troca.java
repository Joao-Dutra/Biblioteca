package com.example.biblioteca.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.annotation.processing.Generated;

@Entity
public class Troca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    private Long id;


    @ManyToOne
    @JoinColumn(name = "livroSolicitado_id", nullable = false)
    private Livro livroSolicitado;

    @ManyToOne
    @JoinColumn(name = "solicitante_id", nullable = false)
    private Usuario solicitante;

    @ManyToOne
    @JoinColumn(name = "proprietario_id", nullable = false)
    private Usuario proprietario;

    private String status;
    private LocalDateTime dataSolicitacao;
    private LocalDate dataConclusao;

    @PrePersist
    protected void onCreate() {
        dataSolicitacao = LocalDateTime.now();
        status = "Pendente";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Livro getLivroSolicitado() {
        return livroSolicitado;
    }

    public void setLivroSolicitado(Livro livroSolicitado) {
        this.livroSolicitado = livroSolicitado;
    }

    public Usuario getSolicitante() {
        return solicitante;
    }

    public void setSolicitante(Usuario solicitante) {
        this.solicitante = solicitante;
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

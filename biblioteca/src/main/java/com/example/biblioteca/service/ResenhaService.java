package com.example.biblioteca.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.biblioteca.model.Livro;
import com.example.biblioteca.model.Resenha;
import com.example.biblioteca.model.Troca;
import com.example.biblioteca.repository.LivroRepository;
import com.example.biblioteca.repository.ResenhaRepository;

import java.nio.file.OpenOption;
import java.util.List;
import java.util.Optional;
@Service

public class ResenhaService {
    
    @Autowired
    private ResenhaRepository resenhaRepository;

    public List<Resenha> listarTodas() {
        return resenhaRepository.findAll();
    }

    public Optional<Resenha> buscarPorId(Long id) {
        return resenhaRepository.findById(id);
    }

    public Resenha salvar(Resenha resenha) {
        return resenhaRepository.save(resenha);
    }

    public void deletar(Long id) {
        resenhaRepository.deleteById(id);
    }
}

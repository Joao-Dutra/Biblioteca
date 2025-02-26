package com.example.biblioteca.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.biblioteca.repository.LivroRepository;
import com.example.biblioteca.repository.TrocaRepository;
import com.example.biblioteca.model.Livro;
import com.example.biblioteca.model.Troca;

import java.nio.file.OpenOption;
import java.util.List;
import java.util.Optional;
@Service
public class TrocaService {
    
    @Autowired
    private TrocaRepository trocaRepository;

    public List<Troca> listarTodas() {
        return trocaRepository.findAll();
    }

    public Optional<Troca> buscarPorId(Long id) {
        return trocaRepository.findById(id);
    }

    public Troca salvar(Troca troca) {
        return trocaRepository.save(troca);
    }

    public void deletar(Long id) {
        trocaRepository.deleteById(id);
    }
}

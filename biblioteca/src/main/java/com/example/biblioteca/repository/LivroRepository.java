package com.example.biblioteca.repository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.biblioteca.model.Livro;
import com.example.biblioteca.model.Usuario;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {
    Optional findById(Long id);
    
    
}

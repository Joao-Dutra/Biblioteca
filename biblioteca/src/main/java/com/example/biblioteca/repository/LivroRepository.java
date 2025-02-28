package com.example.biblioteca.repository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.biblioteca.model.Livro;
import com.example.biblioteca.model.Usuario;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {
    Optional findById(Long id);
     @Query("SELECT l FROM Livro l JOIN FETCH l.usuario")
    List<Livro> findAllWithUsers();
    List<Livro> findByUsuario(Usuario usuario);

}

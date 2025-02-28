package com.example.biblioteca.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.biblioteca.model.Resenha;
import java.util.List;

@Repository
public interface ResenhaRepository extends JpaRepository<Resenha, Long> {
    
    // Método para buscar resenhas por ID do livro
    List<Resenha> findByLivroId(Long livroId);
}

package com.example.biblioteca.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import 
com.example.biblioteca.model.Resenha;

@Repository
public interface ResenhaRepository extends JpaRepository<Resenha, Long> {
    
}

package com.example.biblioteca.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.biblioteca.model.Troca;

@Repository
public interface TrocaRepository extends JpaRepository<Troca, Long> {
    
}

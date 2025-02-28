package com.example.biblioteca.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.biblioteca.model.Livro;
import com.example.biblioteca.service.LivroService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/livros")
public class LivroController {
    @Autowired
    private LivroService livroService;
    
    @GetMapping
    public List<Livro> listarTodos(){
        return livroService.listarTodos();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscarPorId(@PathVariable Long id) {
    Optional<Livro> livro = livroService.buscarPorId(id);
    return livro.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
}

    @PostMapping
    public ResponseEntity<Livro> criar(@RequestBody Livro livro){
        Livro novoLivro = livroService.salvar(livro);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoLivro);
    }
     @PutMapping("/{id}")
    public ResponseEntity<Livro> atualizar(@PathVariable Long id, @RequestBody Livro livro) {
        if (!livroService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        livro.setId(id);
        Livro livroAtualizado = livroService.salvar(livro);
        return ResponseEntity.ok(livroAtualizado);
    }

     @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!livroService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        livroService.deletar(id);
        return ResponseEntity.noContent().build();
    }
    
}

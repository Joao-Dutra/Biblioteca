package com.example.biblioteca.controller;

import com.example.biblioteca.model.Resenha;
import com.example.biblioteca.model.Usuario;
import com.example.biblioteca.model.Livro;
import com.example.biblioteca.service.ResenhaService;
import com.example.biblioteca.service.UsuarioService;
import com.example.biblioteca.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/resenhas") // Define a URL base para este controlador
public class ResenhaController {

    @Autowired
    private ResenhaService resenhaService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private LivroService livroService;

    // 1️⃣ Listar todas as resenhas (GET /resenhas)
    @GetMapping
    public List<Resenha> listarTodas() {
        return resenhaService.listarTodas();
    }

    // 2️⃣ Buscar uma resenha por ID (GET /resenhas/{id})
    @GetMapping("/{id}")
    public ResponseEntity<Resenha> buscarPorId(@PathVariable Long id) {
        Optional<Resenha> resenha = resenhaService.buscarPorId(id);
        return resenha.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 3️⃣ Criar uma nova resenha (POST /resenhas)
    @PostMapping
    public ResponseEntity<Object> criar(@RequestBody Resenha resenha) {
        if (resenha.getUsuario() == null || resenha.getUsuario().getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: O usuário é obrigatório.");
        }
        if (resenha.getLivro() == null || resenha.getLivro().getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: O livro é obrigatório.");
        }
    
        Optional<Usuario> usuario = usuarioService.buscarPorId(resenha.getUsuario().getId());
        Optional<Livro> livro = livroService.buscarPorId(resenha.getLivro().getId());
    
        if (!usuario.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: Usuário não encontrado.");
        }
        if (!livro.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: Livro não encontrado.");
        }
    
        resenha.setUsuario(usuario.get());
        resenha.setLivro(livro.get());
    
        Resenha novaResenha = resenhaService.salvar(resenha);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaResenha);
    }
    

    // 4️⃣ Atualizar uma resenha (PUT /resenhas/{id})
    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizar(@PathVariable Long id, @RequestBody Resenha resenha) {
        Optional<Resenha> resenhaExistente = resenhaService.buscarPorId(id);
        if (!resenhaExistente.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Usuario> usuario = usuarioService.buscarPorId(resenha.getUsuario().getId());
        Optional<Livro> livro = livroService.buscarPorId(resenha.getLivro().getId());

        if (!usuario.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário não encontrado.");
        }

        if (!livro.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Livro não encontrado.");
        }

        resenha.setId(id);
        resenha.setUsuario(usuario.get());
        resenha.setLivro(livro.get());

        Resenha resenhaAtualizada = resenhaService.salvar(resenha);
        return ResponseEntity.ok(resenhaAtualizada);
    }

    // 5️⃣ Excluir uma resenha (DELETE /resenhas/{id})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!resenhaService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        resenhaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

package com.example.biblioteca.controller;

import com.example.biblioteca.model.Troca;
import com.example.biblioteca.model.Usuario;
import com.example.biblioteca.model.Livro;
import com.example.biblioteca.service.TrocaService;
import com.example.biblioteca.service.UsuarioService;
import com.example.biblioteca.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trocas") // Define a URL base para este controlador
public class TrocaController {

    @Autowired
    private TrocaService trocaService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private LivroService livroService;

    // 1️⃣ Listar todas as trocas (GET /trocas)
    @GetMapping
    public List<Troca> listarTodas() {
        return trocaService.listarTodas();
    }

    // 2️⃣ Buscar uma troca por ID (GET /trocas/{id})
    @GetMapping("/{id}")
    public ResponseEntity<Troca> buscarPorId(@PathVariable Long id) {
        Optional<Troca> troca = trocaService.buscarPorId(id);
        return troca.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 3️⃣ Criar uma nova troca (POST /trocas)
    @PostMapping
    public ResponseEntity<Object> criar(@RequestBody Troca troca) {
        if (troca.getSolicitante() == null || troca.getSolicitante().getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: O solicitante é obrigatório.");
        }
        if (troca.getProprietario() == null || troca.getProprietario().getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: O proprietário é obrigatório.");
        }
        if (troca.getLivroSolicitado() == null || troca.getLivroSolicitado().getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: O livro solicitado é obrigatório.");
        }
    
        Optional<Usuario> solicitante = usuarioService.buscarPorId(troca.getSolicitante().getId());
        Optional<Usuario> proprietario = usuarioService.buscarPorId(troca.getProprietario().getId());
        Optional<Livro> livroSolicitado = livroService.buscarPorId(troca.getLivroSolicitado().getId());
    
        if (!solicitante.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: O solicitante não foi encontrado no banco.");
        }
        if (!proprietario.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: O proprietário não foi encontrado no banco.");
        }
        if (!livroSolicitado.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: O livro solicitado não foi encontrado no banco.");
        }
    
        troca.setSolicitante(solicitante.get());
        troca.setProprietario(proprietario.get());
        troca.setLivroSolicitado(livroSolicitado.get());
        troca.setStatus("Pendente");
    
        Troca novaTroca = trocaService.salvar(troca);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaTroca);
    }
    

    // 4️⃣ Atualizar uma troca (PUT /trocas/{id})
    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizar(@PathVariable Long id, @RequestBody Troca troca) {
        Optional<Troca> trocaExistente = trocaService.buscarPorId(id);
        if (!trocaExistente.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Usuario> solicitante = usuarioService.buscarPorId(troca.getSolicitante().getId());
        Optional<Usuario> proprietario = usuarioService.buscarPorId(troca.getProprietario().getId());
        Optional<Livro> livroSolicitado = livroService.buscarPorId(troca.getLivroSolicitado().getId());

        if (!solicitante.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Solicitante não encontrado.");
        }

        if (!proprietario.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Proprietário não encontrado.");
        }

        if (!livroSolicitado.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Livro solicitado não encontrado.");
        }

        troca.setId(id);
        troca.setSolicitante(solicitante.get());
        troca.setProprietario(proprietario.get());
        troca.setLivroSolicitado(livroSolicitado.get());

        Troca trocaAtualizada = trocaService.salvar(troca);
        return ResponseEntity.ok(trocaAtualizada);
    }

    // 5️⃣ Excluir uma troca (DELETE /trocas/{id})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!trocaService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        trocaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

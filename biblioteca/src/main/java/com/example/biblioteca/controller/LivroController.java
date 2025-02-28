package com.example.biblioteca.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.biblioteca.dto.LivroDTO;
import com.example.biblioteca.model.Livro;
import com.example.biblioteca.model.Usuario;
import com.example.biblioteca.repository.LivroRepository;
import com.example.biblioteca.repository.UsuarioRepository;
import com.example.biblioteca.service.LivroService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/livros")
public class LivroController {
    @Autowired
    private LivroService livroService;
    @Autowired
    private LivroRepository livroRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public LivroController(LivroRepository livroRepository, UsuarioRepository usuarioRepository) {
        this.livroRepository = livroRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    public List<Livro> listarTodos() {
        return livroService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscarPorId(@PathVariable Long id) {
        Optional<Livro> livro = livroService.buscarPorId(id);
        return livro.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
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

    @PostMapping("/adicionar") // ✅ FIX: Now we use /livros/adicionar
    public ResponseEntity<?> adicionarLivro(@RequestBody LivroDTO livroDTO) {
        if (livroDTO.getUsuarioId() == null) {
            return ResponseEntity.badRequest().body("Erro: ID do usuário é obrigatório.");
        }

        Optional<Usuario> usuarioOptional = usuarioRepository.findById(livroDTO.getUsuarioId().longValue());

        if (usuarioOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Erro: Usuário não encontrado.");
        }

        Livro livro = new Livro();
        livro.setTitulo(livroDTO.getTitulo());
        livro.setAutor(livroDTO.getAutor());
        livro.setEditor(livroDTO.getEditor());
        livro.setEstadoConservacao(livroDTO.getEstadoConservacao());
        livro.setUsuario(usuarioOptional.get());

        Livro novoLivro = livroRepository.save(livro);

        return ResponseEntity.ok(novoLivro);
    }
}

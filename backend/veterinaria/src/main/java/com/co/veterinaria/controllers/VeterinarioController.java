package com.co.veterinaria.controllers;

import com.co.veterinaria.entities.Veterinario;
import com.co.veterinaria.services.VeterinarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/veterinarios")
public class VeterinarioController {

    private final VeterinarioService veterinarioService;

    @Autowired
    public VeterinarioController(VeterinarioService veterinarioService) {
        this.veterinarioService = veterinarioService;
    }

    @PostMapping
    public ResponseEntity<Veterinario> guardarVeterinario(@RequestBody Veterinario veterinario) {
        Veterinario nuevoVeterinario = veterinarioService.guardarVeterinario(veterinario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoVeterinario);
    }

    @GetMapping
    public ResponseEntity<List<Veterinario>> obtenerTodosVeterinarios() {
        List<Veterinario> veterinarios = veterinarioService.obtenerTodosVeterinarios();
        return ResponseEntity.ok(veterinarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veterinario> obtenerVeterinarioPorId(@PathVariable("id") Long id) {
        return veterinarioService.obtenerVeterinarioPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Veterinario> actualizarVeterinario(@PathVariable("id") Long id, @RequestBody Veterinario veterinario) {
        Veterinario veterinarioExistente = veterinarioService.obtenerVeterinarioPorId(id)
                .orElse(null);
        if (veterinarioExistente == null) {
            return ResponseEntity.notFound().build();
        }
        veterinarioExistente.setNombreCompleto(veterinario.getNombreCompleto());
        veterinarioExistente.setCedula(veterinario.getCedula());
        veterinarioExistente.setFechaRegistro(veterinario.getFechaRegistro());

        Veterinario veterinarioActualizado = veterinarioService.actualizarVeterinario(veterinarioExistente);
        return ResponseEntity.ok(veterinarioActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarVeterinario(@PathVariable("id") Long id) {
        veterinarioService.eliminarVeterinario(id);
        return ResponseEntity.noContent().build();
    }
}

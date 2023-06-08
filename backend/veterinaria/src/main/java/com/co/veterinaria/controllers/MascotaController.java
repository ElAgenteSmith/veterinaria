package com.co.veterinaria.controllers;

import com.co.veterinaria.entities.Mascota;
import com.co.veterinaria.services.MascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/mascotas")
public class MascotaController {

    private final MascotaService mascotaService;

    @Autowired
    public MascotaController(MascotaService mascotaService) {
        this.mascotaService = mascotaService;
    }

    @PostMapping
    public ResponseEntity<Mascota> guardarMascota(@RequestBody Mascota mascota) {
        Mascota nuevaMascota = mascotaService.guardarMascota(mascota);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaMascota);
    }

    @GetMapping
    public ResponseEntity<List<Mascota>> obtenerTodasMascotas() {
        List<Mascota> mascotas = mascotaService.obtenerTodasMascotas();
        return ResponseEntity.ok(mascotas);
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<Mascota> obtenerMascotaPorId(@PathVariable("id") Long id) {
        return mascotaService.obtenerMascotaPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mascota> actualizarMascota(@PathVariable("id") Long id, @RequestBody Mascota mascota) {
        Mascota mascotaExistente = mascotaService.obtenerMascotaPorId(id).orElse(null);
        if (mascotaExistente == null) {
            return ResponseEntity.notFound().build();
        }
        mascotaExistente.setEdad(mascota.getEdad());
        mascotaExistente.setRaza(mascota.getRaza());
        mascotaExistente.setNombre(mascota.getNombre());
        Mascota mascotaActualizada = mascotaService.actualizarMascota(mascotaExistente);
        return ResponseEntity.ok(mascotaActualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarMascota(@PathVariable("id") Long id) {
        mascotaService.eliminarMascota(id);
        return ResponseEntity.noContent().build();
    }
}

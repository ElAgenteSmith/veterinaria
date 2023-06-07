package com.co.veterinaria.controllers;

import com.co.veterinaria.entities.AtencionPrestada;
import com.co.veterinaria.enums.Servicio;
import com.co.veterinaria.services.AtencionPrestadaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/atenciones")
public class AtencionPrestadaController {
    private final AtencionPrestadaService atencionPrestadaService;

    @Autowired
    public AtencionPrestadaController(AtencionPrestadaService atencionPrestadaService) {
        this.atencionPrestadaService = atencionPrestadaService;
    }

    @PostMapping
    public ResponseEntity<AtencionPrestada> guardarAtencionPrestada(@RequestBody AtencionPrestada atencionPrestada) {
        atencionPrestada.setServicio(validarServicio(atencionPrestada.getServicio()));
        AtencionPrestada nuevaAtencionPrestada = atencionPrestadaService.guardarAtencionPrestada(atencionPrestada);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaAtencionPrestada);
    }


    @GetMapping
    public ResponseEntity<List<AtencionPrestada>> obtenerAtencionesPrestadas() {
        List<AtencionPrestada> atencionPrestadas = atencionPrestadaService.obtenerTodosAtencionPrestada();
        return ResponseEntity.ok(atencionPrestadas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AtencionPrestada> obtenerAtencionPrestadaPorId(@PathVariable("id") Long id) {
        return atencionPrestadaService.obtenerAtencionPrestadaPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AtencionPrestada> actualizarAtencionPrestada(@PathVariable("id") Long id, @RequestBody AtencionPrestada atencionPrestada) {
        AtencionPrestada atencionExistente = atencionPrestadaService.obtenerAtencionPrestadaPorId(id)
                .orElse(null);
        if (atencionExistente == null) {
            return ResponseEntity.notFound().build();
        }
        atencionExistente.setDescripcion(atencionPrestada.getDescripcion());
        atencionExistente.setVeterinario(atencionPrestada.getVeterinario());
        atencionExistente.setUsuario(atencionPrestada.getUsuario());
        atencionExistente.setMascota(atencionPrestada.getMascota());

        // validate service type
        if (atencionPrestada.getServicio() != null) {
            atencionExistente.setServicio(validarServicio(atencionPrestada.getServicio()));
        }

        AtencionPrestada atencionActualizada = atencionPrestadaService.actualizarAtencionPrestada(atencionExistente);
        return ResponseEntity.ok(atencionActualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAtencionPrestada(@PathVariable("id") Long id) {
        atencionPrestadaService.eliminarAtencionPrestada(id);
        return ResponseEntity.noContent().build();
    }

    public Servicio validarServicio(Servicio servicio) {
        String servicioLowerCase = String.valueOf(servicio).toLowerCase();
        if ("salud".equals(servicioLowerCase)) {
            return Servicio.Salud;
        } else {
            return Servicio.Limpieza;
        }
    }
}


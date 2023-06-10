package com.co.veterinaria.controllers;

import com.co.veterinaria.entities.UsuariosAutenticacion;
import com.co.veterinaria.services.UsuariosAutenticacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/usuarios-autenticacion")
public class UsuariosAutenticacionController {

    private final UsuariosAutenticacionService usuariosAutenticacionService;

    @Autowired
    public UsuariosAutenticacionController(UsuariosAutenticacionService usuariosAutenticacionService) {
        this.usuariosAutenticacionService = usuariosAutenticacionService;
    }

    @PostMapping
    public ResponseEntity<UsuariosAutenticacion> guardarUsuariosAutenticacion(@RequestBody UsuariosAutenticacion usuariosAutenticacion) {
        UsuariosAutenticacion createdUsuariosAutenticacion = usuariosAutenticacionService.guardarUsuarioAutenticacion(usuariosAutenticacion);
        return new ResponseEntity<>(createdUsuariosAutenticacion, HttpStatus.CREATED);
    }

    @GetMapping("/{nombreUsuario}/{password}")
    public ResponseEntity<UsuariosAutenticacion> buscarPorNombreUsuarioYPassword(@PathVariable("nombreUsuario") String nombreUsuario,
                                                                                 @PathVariable("password") String password) {
        UsuariosAutenticacion usuario = usuariosAutenticacionService.buscarPorNombreUsuarioYPassword(nombreUsuario, password);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


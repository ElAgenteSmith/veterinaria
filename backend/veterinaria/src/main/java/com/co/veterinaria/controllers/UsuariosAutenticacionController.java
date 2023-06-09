package com.co.veterinaria.controllers;

import com.co.veterinaria.entities.UsuariosAutenticacion;
import com.co.veterinaria.enums.Rol;
import com.co.veterinaria.services.UsuariosAutenticacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        usuariosAutenticacion.setRol(validarRol(usuariosAutenticacion.getRol()));
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

    public Rol validarRol(Rol rol) {
        String rolLowerCase = String.valueOf(rol).toLowerCase();
        if ("administrador".equals(rolLowerCase)) {
            return Rol.Administrador;
        } else {
            return Rol.Usuario;
        }
    }
}


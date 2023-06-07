package com.co.veterinaria.services;

import com.co.veterinaria.entities.UsuariosAutenticacion;
import com.co.veterinaria.repositories.UsuariosAutenticacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuariosAutenticacionService {

    private final UsuariosAutenticacionRepository usuariosAutenticacionRepository;

    @Autowired
    public UsuariosAutenticacionService(UsuariosAutenticacionRepository usuariosAutenticacionRepository) {
        this.usuariosAutenticacionRepository = usuariosAutenticacionRepository;
    }

    public UsuariosAutenticacion buscarPorNombreUsuarioYPassword(String nombreUsuario, String password) {
        return usuariosAutenticacionRepository.findByNombreUsuarioAndPassword(nombreUsuario, password);
    }

    public UsuariosAutenticacion guardarUsuarioAutenticacion(UsuariosAutenticacion usuariosAutenticacion) {
        return usuariosAutenticacionRepository.save(usuariosAutenticacion);
    }

}


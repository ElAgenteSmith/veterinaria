package com.co.veterinaria.repositories;

import com.co.veterinaria.entities.UsuariosAutenticacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuariosAutenticacionRepository extends JpaRepository<UsuariosAutenticacion, Long> {
    UsuariosAutenticacion findByNombreUsuarioAndPassword(String nombreUsuario, String password);
}


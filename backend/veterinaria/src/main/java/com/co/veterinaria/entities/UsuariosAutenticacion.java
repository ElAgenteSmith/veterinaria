package com.co.veterinaria.entities;

import com.co.veterinaria.enums.Rol;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "UsuariosAutenticacion")
@Data
public class UsuariosAutenticacion {

    @Id
    private String nombreUsuario;

    private String password;

    @Enumerated(EnumType.STRING)
    private Rol rol;

}


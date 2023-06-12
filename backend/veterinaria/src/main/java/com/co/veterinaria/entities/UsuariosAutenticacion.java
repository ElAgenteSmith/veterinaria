package com.co.veterinaria.entities;

import com.co.veterinaria.enums.Rol;
import com.co.veterinaria.enums.TipoUsuario;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "UsuariosAutenticacion")
@Data
public class UsuariosAutenticacion {

    @Id
    private String nombreUsuario;

    @Column(name = "Password")
    private String password;

    @Column(name = "AutenticacionID")
    private Long autenticacionID;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    @Enumerated(EnumType.STRING)
    private TipoUsuario tipoUsuario;

}


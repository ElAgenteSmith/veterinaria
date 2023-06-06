package com.co.veterinaria.dto;

import com.co.veterinaria.entities.Usuario;
import com.co.veterinaria.entities.Veterinario;
import lombok.Data;

import java.util.List;

@Data
public class MascotaDTO {

    private Long id;
    private String raza;
    private int edad;
    private String nombre;
    private List<Veterinario> veterinarios;
    private List<Usuario> usuarios;
}

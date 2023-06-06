package com.co.veterinaria.dto;

import com.co.veterinaria.entities.Mascota;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class UsuarioDTO {

    private Long id;
    private String cedula;
    private String nombreCompleto;
    private LocalDate fechaIngreso;
    private String direccion;
    private List<Mascota> mascotas;

}

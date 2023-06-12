package com.co.veterinaria.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class VeterinarioDTO {
    private Long veterinarioID;
    private LocalDate fechaRegistro;
    private String cedula;
    private String nombreCompleto;

}

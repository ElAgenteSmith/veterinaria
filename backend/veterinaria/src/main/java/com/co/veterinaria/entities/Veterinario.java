package com.co.veterinaria.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "Veterinarios")
@Data
public class Veterinario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VeterinarioID")
    private Long id;

    @Column(name = "FechaRegistro")
    private LocalDate fechaRegistro;

    @Column(name = "Cedula")
    private String cedula;

    @Column(name = "NombreCompleto")
    private String nombreCompleto;

}

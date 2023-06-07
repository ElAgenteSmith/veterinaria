package com.co.veterinaria.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

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

    @ManyToMany
    @JoinTable(
            name = "RelacionVeterinarioMascota",
            joinColumns = @JoinColumn(name = "VeterinarioID"),
            inverseJoinColumns = @JoinColumn(name = "MascotaID")
    )
    private List<Mascota> mascotas;

}

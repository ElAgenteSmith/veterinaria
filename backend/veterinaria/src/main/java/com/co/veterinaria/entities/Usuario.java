package com.co.veterinaria.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "Usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UsuarioID")
    private Long id;

    @Column(name = "Cedula")
    private String cedula;

    @Column(name = "NombreCompleto")
    private String nombreCompleto;

    @Column(name = "FechaIngreso")
    private LocalDate fechaIngreso;

    @Column(name = "Direccion")
    private String direccion;

    @ManyToMany
    @JoinTable(
            name = "RelacionUsuarioMascota",
            joinColumns = @JoinColumn(name = "UsuarioID"),
            inverseJoinColumns = @JoinColumn(name = "MascotaID")
    )
    private List<Mascota> mascotas;

}


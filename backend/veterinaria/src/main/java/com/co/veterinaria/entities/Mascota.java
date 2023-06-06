package com.co.veterinaria.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "Mascotas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mascota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MascotaID")
    private Long id;

    @Column(name = "Raza")
    private String raza;

    @Column(name = "Edad")
    private int edad;

    @Column(name = "Nombre")
    private String nombre;

    @ManyToMany(mappedBy = "mascotas")
    private List<Veterinario> veterinarios;

    @ManyToMany(mappedBy = "mascotas")
    private List<Usuario> usuarios;

}

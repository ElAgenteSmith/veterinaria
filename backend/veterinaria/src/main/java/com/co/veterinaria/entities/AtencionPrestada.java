package com.co.veterinaria.entities;

import com.co.veterinaria.enums.Servicio;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "AtencionPrestada")
@Data
public class AtencionPrestada {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long atencionID;

    private LocalDate fecha;
    private String descripcion;
    private String veterinario;
    private String usuario;
    private String mascota;

    @Enumerated(EnumType.STRING)
    private Servicio servicio;


    @PrePersist
    void prePersist() {
        fecha = LocalDate.now();
    }

}


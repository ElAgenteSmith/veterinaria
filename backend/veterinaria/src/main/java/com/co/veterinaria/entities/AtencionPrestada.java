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
    @Enumerated(EnumType.STRING)
    private Servicio servicio;
    
    @ManyToOne
    @JoinColumn(name = "VeterinarioID")
    private Veterinario veterinario;
    @ManyToOne
    @JoinColumn(name = "UsuarioID")
    private Usuario usuario;
    @ManyToOne
    @JoinColumn(name = "MascotaID")
    private Mascota mascota;


    @PrePersist
    void prePersist() {
        fecha = LocalDate.now();
    }

}


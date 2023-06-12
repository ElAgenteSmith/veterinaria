package com.co.veterinaria.services;

import com.co.veterinaria.entities.AtencionPrestada;
import com.co.veterinaria.repositories.AtencionPrestadaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AtencionPrestadaService {
    private final AtencionPrestadaRepository atencionPrestadaRepository;

    @Autowired
    public AtencionPrestadaService(AtencionPrestadaRepository atencionPrestadaRepository) {
        this.atencionPrestadaRepository = atencionPrestadaRepository;
    }

    public AtencionPrestada guardarAtencionPrestada(AtencionPrestada atencionPrestada) {
        return atencionPrestadaRepository.save(atencionPrestada);
    }

    public List<AtencionPrestada> obtenerTodosAtencionPrestada() {
        return atencionPrestadaRepository.findAll();
    }

    public Optional<AtencionPrestada> obtenerAtencionPrestadaPorId(Long id) {
        return atencionPrestadaRepository.findById(id);
    }

    public AtencionPrestada actualizarAtencionPrestada(AtencionPrestada atencionPrestada) {
        return atencionPrestadaRepository.save(atencionPrestada);
    }

    public void eliminarAtencionPrestada(Long id) {
        atencionPrestadaRepository.deleteById(id);
    }
}


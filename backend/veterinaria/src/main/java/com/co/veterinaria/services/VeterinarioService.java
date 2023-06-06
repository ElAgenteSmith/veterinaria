package com.co.veterinaria.services;

import com.co.veterinaria.entities.Veterinario;
import com.co.veterinaria.repositories.VeterinarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VeterinarioService {
    private final VeterinarioRepository veterinarioRepository;

    @Autowired
    public VeterinarioService(VeterinarioRepository veterinarioRepository) {
        this.veterinarioRepository = veterinarioRepository;
    }

    public Veterinario guardarVeterinario(Veterinario veterinario) {
        return veterinarioRepository.save(veterinario);
    }

    public List<Veterinario> obtenerTodosVeterinarios() {
        return veterinarioRepository.findAll();
    }

    public Optional<Veterinario> obtenerVeterinarioPorId(Long id) {
        return veterinarioRepository.findById(id);
    }

    public Veterinario actualizarVeterinario(Veterinario veterinario) {
        return veterinarioRepository.save(veterinario);
    }

    public void eliminarVeterinario(Long id) {
        veterinarioRepository.deleteById(id);
    }
}

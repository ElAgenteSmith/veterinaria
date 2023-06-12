package com.co.veterinaria.services;

import com.co.veterinaria.entities.Mascota;
import com.co.veterinaria.entities.Usuario;
import com.co.veterinaria.repositories.MascotaRepository;
import com.co.veterinaria.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MascotaService {
    private final MascotaRepository mascotaRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public MascotaService(MascotaRepository mascotaRepository, UsuarioRepository usuarioRepository) {
        this.mascotaRepository = mascotaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Mascota guardarMascota(Mascota mascota) {
        Usuario usuario = usuarioRepository.findById(mascota.getUsuario().getId()).orElse(null);
        mascota.setUsuario(usuario);
        return mascotaRepository.save(mascota);
    }

    public List<Mascota> obtenerTodasMascotas() {
        return mascotaRepository.findAll();
    }

    public Optional<Mascota> obtenerMascotaPorId(Long id) {
        return mascotaRepository.findById(id);
    }

    public List<Mascota> obtenerMascotasPorUsuarioId(Long id) {
        return mascotaRepository.findAllByUsuarioId(id);
    }

    public Mascota actualizarMascota(Mascota mascota) {
        return mascotaRepository.save(mascota);
    }

    public void eliminarMascota(Long id) {
        mascotaRepository.deleteById(id);
    }

}

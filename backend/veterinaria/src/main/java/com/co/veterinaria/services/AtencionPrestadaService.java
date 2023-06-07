package com.co.veterinaria.services;

import com.co.veterinaria.entities.AtencionPrestada;
import com.co.veterinaria.entities.Mascota;
import com.co.veterinaria.entities.Usuario;
import com.co.veterinaria.entities.Veterinario;
import com.co.veterinaria.repositories.AtencionPrestadaRepository;
import com.co.veterinaria.repositories.MascotaRepository;
import com.co.veterinaria.repositories.UsuarioRepository;
import com.co.veterinaria.repositories.VeterinarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AtencionPrestadaService {
    private final AtencionPrestadaRepository atencionPrestadaRepository;
    private final VeterinarioRepository veterinarioRepository;
    private final MascotaRepository mascotaRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public AtencionPrestadaService(AtencionPrestadaRepository atencionPrestadaRepository, VeterinarioRepository veterinarioRepository,
                                   MascotaRepository mascotaRepository, UsuarioRepository usuarioRepository) {
        this.atencionPrestadaRepository = atencionPrestadaRepository;
        this.veterinarioRepository = veterinarioRepository;
        this.mascotaRepository = mascotaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public AtencionPrestada guardarAtencionPrestada(AtencionPrestada atencionPrestada) {
        validarRelaciones(atencionPrestada);
        return atencionPrestadaRepository.save(atencionPrestada);
    }

    public List<AtencionPrestada> obtenerTodosAtencionPrestada() {
        return atencionPrestadaRepository.findAll();
    }

    public Optional<AtencionPrestada> obtenerAtencionPrestadaPorId(Long id) {
        return atencionPrestadaRepository.findById(id);
    }

    public AtencionPrestada actualizarAtencionPrestada(AtencionPrestada atencionPrestada) {
        validarRelaciones(atencionPrestada);
        return atencionPrestadaRepository.save(atencionPrestada);
    }

    public void eliminarAtencionPrestada(Long id) {
        atencionPrestadaRepository.deleteById(id);
    }

    public AtencionPrestada validarRelaciones(AtencionPrestada atencionPrestada) {
        Veterinario veterinario = veterinarioRepository.findById(atencionPrestada.getVeterinario().getId())
                .orElse(null);
        atencionPrestada.setVeterinario(veterinario);
        Mascota mascota = mascotaRepository.findById(atencionPrestada.getMascota().getId()).orElse(null);
        atencionPrestada.setMascota(mascota);
        Usuario usuario = usuarioRepository.findById(atencionPrestada.getUsuario().getId()).orElse(null);
        atencionPrestada.setUsuario(usuario);
        return atencionPrestada;
    }
}


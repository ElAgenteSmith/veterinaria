package com.co.veterinaria.repositories;

import com.co.veterinaria.entities.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Long> {
    List<Mascota> findAllByUsuarioId(Long id);
}

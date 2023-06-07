package com.co.veterinaria.repositories;

import com.co.veterinaria.entities.AtencionPrestada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AtencionPrestadaRepository extends JpaRepository<AtencionPrestada, Long> {
}


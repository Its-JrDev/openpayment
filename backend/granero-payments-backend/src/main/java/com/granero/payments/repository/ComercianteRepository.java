package com.granero.payments.repository;

import com.granero.payments.entity.Comerciante;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ComercianteRepository extends JpaRepository<Comerciante, Long> {

    Optional<Comerciante> findByWalletAddress(String walletAddress);
}

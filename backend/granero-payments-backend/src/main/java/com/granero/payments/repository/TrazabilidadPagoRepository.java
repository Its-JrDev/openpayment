package com.granero.payments.repository;

import com.granero.payments.entity.TrazabilidadPago;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TrazabilidadPagoRepository extends JpaRepository<TrazabilidadPago, Long> {

    Optional<TrazabilidadPago> findByVentaId(Long ventaId);

    Optional<TrazabilidadPago> findByOpenPaymentsId(String openPaymentsId);
}

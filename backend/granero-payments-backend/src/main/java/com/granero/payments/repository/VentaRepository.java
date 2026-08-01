package com.granero.payments.repository;

import com.granero.payments.entity.EstadoVenta;
import com.granero.payments.entity.Venta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VentaRepository extends JpaRepository<Venta, Long> {

    Optional<Venta> findByOpenPaymentsId(String openPaymentsId);

    List<Venta> findByEstado(EstadoVenta estado);

    List<Venta> findByComercianteId(Long comercianteId);
}

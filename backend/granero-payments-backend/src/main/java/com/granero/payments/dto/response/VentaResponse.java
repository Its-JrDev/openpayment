package com.granero.payments.dto.response;

import com.granero.payments.entity.EstadoVenta;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record VentaResponse(
        Long id,
        Long comercianteId,
        BigDecimal montoTotal,
        String moneda,
        EstadoVenta estado,
        String openPaymentsId,
        String paymentUrl,
        LocalDateTime fechaCreacion
) {
}

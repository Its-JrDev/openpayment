package com.granero.payments.dto.response;

import com.granero.payments.entity.EstadoVenta;

public record VentaCreadaResponse(
        Long ventaId,
        String paymentId,
        String paymentUrl,
        EstadoVenta estado
) {
}

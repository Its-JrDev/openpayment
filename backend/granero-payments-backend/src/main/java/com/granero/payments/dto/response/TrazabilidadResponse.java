package com.granero.payments.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TrazabilidadResponse(
        Long ventaId,
        BigDecimal monto,
        String estado,
        String paymentId,
        String walletOrigen,
        LocalDateTime fechaPago
) {
}

package com.granero.payments.mapper;

import com.granero.payments.dto.response.VentaCreadaResponse;
import com.granero.payments.dto.response.VentaResponse;
import com.granero.payments.entity.Venta;

public final class VentaMapper {

    private VentaMapper() {
    }

    public static VentaResponse toResponse(Venta venta) {
        return new VentaResponse(
                venta.getId(),
                venta.getComerciante().getId(),
                venta.getMontoTotal(),
                venta.getMoneda(),
                venta.getEstado(),
                venta.getOpenPaymentsId(),
                venta.getPaymentUrl(),
                venta.getFechaCreacion()
        );
    }

    public static VentaCreadaResponse toCreadaResponse(Venta venta) {
        return new VentaCreadaResponse(
                venta.getId(),
                venta.getOpenPaymentsId(),
                venta.getPaymentUrl(),
                venta.getEstado()
        );
    }
}

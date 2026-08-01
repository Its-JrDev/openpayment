package com.granero.payments.mapper;

import com.granero.payments.dto.response.TrazabilidadResponse;
import com.granero.payments.entity.TrazabilidadPago;

public final class TrazabilidadMapper {

    private TrazabilidadMapper() {
    }

    public static TrazabilidadResponse toResponse(TrazabilidadPago trazabilidad) {
        return new TrazabilidadResponse(
                trazabilidad.getVenta().getId(),
                trazabilidad.getMontoRecibido(),
                trazabilidad.getVenta().getEstado().name(),
                trazabilidad.getOpenPaymentsId(),
                trazabilidad.getWalletOrigen(),
                trazabilidad.getFechaPago()
        );
    }
}

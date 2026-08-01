package com.granero.payments.client;

import java.math.BigDecimal;

/**
 * Punto único de contacto con el ASE (Account Servicing Entity) vía el SDK
 * oficial de Open Payments. Ninguna otra clase debe hacer llamadas HTTP
 * directas al ASE: todo pasa por aquí.
 *
 * NOTA: la implementación real con el SDK de Interledger se completa en el
 * paso 8. Por ahora expone el contrato que va a usar VentaService.
 */
public interface OpenPaymentsClient {

    /**
     * Crea un Incoming Payment en el ASE para el monto y moneda indicados.
     *
     * @param monto  monto de la venta
     * @param moneda código de moneda (ej. COP, USD)
     * @return datos del Incoming Payment creado (id y url)
     */
    IncomingPaymentResult crearIncomingPayment(BigDecimal monto, String moneda);

    record IncomingPaymentResult(String paymentId, String paymentUrl) {
    }
}

package com.granero.payments.client;

import com.granero.payments.config.OpenPaymentsProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.interledger.openpayments.IOpenPaymentsClient;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * Único punto de contacto con el ASE (Account Servicing Entity) a través del
 * SDK oficial de Open Payments para Java. Ninguna otra clase del backend
 * debe hacer llamadas HTTP directas al ASE.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class OpenPaymentsClientImpl implements OpenPaymentsClient {

    private final IOpenPaymentsClient client;
    private final OpenPaymentsProperties properties;

    @Override
    public IncomingPaymentResult crearIncomingPayment(BigDecimal monto, String moneda) {
        try {
            // 1. Recuperar la wallet address del comercio (receptor del pago)
            var receiverWallet = client.walletAddress().get(properties.getWalletAddress());

            // 2. Solicitar el grant necesario para crear un Incoming Payment
            var grantRequest = client.auth().grant().incomingPayment(receiverWallet);

            // 3. Crear el Incoming Payment por el monto de la venta
            var incomingPayment = client.payment()
                    .incomingPayment(receiverWallet, grantRequest, monto);

            String paymentId = incomingPayment.getId().toString();

            log.info("Incoming Payment creado en el ASE: {}", paymentId);

            // El "id" de un Incoming Payment en Open Payments ya es una URL
            return new IncomingPaymentResult(paymentId, paymentId);

        } catch (Exception e) {
            log.error("Error creando Incoming Payment en el ASE", e);
            throw new OpenPaymentsIntegrationException(
                    "No se pudo crear el Incoming Payment en el ASE", e);
        }
    }
}

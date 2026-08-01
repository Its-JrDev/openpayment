package com.granero.payments.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "app.open-payments")
public class OpenPaymentsProperties {

    /** Wallet address del comercio (la propia cuenta que recibe el pago). */
    private String walletAddress;

    /** Client ID registrado ante el ASE. */
    private String clientId;

    /** Ruta (classpath: o file:) a la llave privada PEM usada para firmar. */
    private String privateKeyPath;

    /** Key ID asociado a la llave privada. */
    private String keyId;

    /** URL base del Authorization/Resource Server del ASE. */
    private String baseUrl;

    /** URL pública donde este backend recibe las notificaciones del ASE. */
    private String webhookCallbackUrl;

    private int connectTimeoutMs = 5000;
    private int readTimeoutMs = 10000;
}

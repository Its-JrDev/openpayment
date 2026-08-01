package com.granero.payments.config;

import com.granero.payments.util.PemKeyLoader;
import lombok.RequiredArgsConstructor;
import org.interledger.openpayments.IOpenPaymentsClient;
import org.interledger.openpayments.OpenPaymentsHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class OpenPaymentsClientConfig {

    private final OpenPaymentsProperties properties;

    @Bean
    public IOpenPaymentsClient openPaymentsHttpClient() {
        String privateKeyPem = PemKeyLoader.readPrivateKey(properties.getPrivateKeyPath());

        return OpenPaymentsHttpClient.defaultClient(
                properties.getWalletAddress(),
                privateKeyPem,
                properties.getKeyId()
        );
    }
}

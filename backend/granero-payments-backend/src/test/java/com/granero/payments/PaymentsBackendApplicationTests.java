package com.granero.payments;

import com.granero.payments.client.OpenPaymentsClient;
import com.granero.payments.client.OpenPaymentsClient.IncomingPaymentResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class PaymentsBackendApplicationTests {

    @Autowired
    private OpenPaymentsClient openPaymentsClient;

    @Test
    void contextLoads() {
        assertThat(openPaymentsClient).isNotNull();
    }

    @Test
    void testCrearIncomingPaymentConASE() {
        IncomingPaymentResult result = openPaymentsClient.crearIncomingPayment(new BigDecimal("15.50"), "COP");
        assertThat(result).isNotNull();
        assertThat(result.paymentId()).isNotBlank();
        assertThat(result.paymentUrl()).startsWith("http");
    }
}

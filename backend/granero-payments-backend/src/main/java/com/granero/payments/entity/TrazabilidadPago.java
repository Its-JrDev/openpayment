package com.granero.payments.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "trazabilidad_pagos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrazabilidadPago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venta_id", nullable = false, unique = true)
    private Venta venta;

    @Column(name = "open_payments_id", nullable = false)
    private String openPaymentsId;

    @Column(name = "wallet_origen")
    private String walletOrigen;

    @Column(name = "monto_recibido", precision = 19, scale = 2)
    private BigDecimal montoRecibido;

    @Column(name = "fecha_pago")
    private LocalDateTime fechaPago;

    @Column(name = "hash_ilp")
    private String hashIlp;
}

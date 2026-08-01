package com.granero.payments.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "ventas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comerciante_id", nullable = false)
    private Comerciante comerciante;

    @Column(name = "monto_total", nullable = false, precision = 19, scale = 2)
    private BigDecimal montoTotal;

    @Column(nullable = false, length = 3)
    private String moneda;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private EstadoVenta estado = EstadoVenta.PENDIENTE;

    @Column(name = "open_payments_id")
    private String openPaymentsId;

    @Column(name = "payment_url")
    private String paymentUrl;

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @PrePersist
    void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
        if (this.estado == null) {
            this.estado = EstadoVenta.PENDIENTE;
        }
    }
}

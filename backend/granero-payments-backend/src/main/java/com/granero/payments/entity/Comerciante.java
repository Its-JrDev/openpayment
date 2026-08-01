package com.granero.payments.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comerciantes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comerciante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_comercio", nullable = false)
    private String nombreComercio;

    @Column(name = "wallet_address", nullable = false, unique = true)
    private String walletAddress;

    @Builder.Default
    @OneToMany(mappedBy = "comerciante", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Usuario> usuarios = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "comerciante", cascade = CascadeType.ALL)
    private List<Venta> ventas = new ArrayList<>();
}

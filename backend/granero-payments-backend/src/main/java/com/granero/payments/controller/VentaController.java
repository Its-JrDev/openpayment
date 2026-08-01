package com.granero.payments.controller;

import com.granero.payments.dto.request.CrearVentaRequest;
import com.granero.payments.dto.response.VentaCreadaResponse;
import com.granero.payments.dto.response.VentaResponse;
import com.granero.payments.service.VentaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ventas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VentaController {

    private final VentaService ventaService;

    @PostMapping
    public ResponseEntity<VentaCreadaResponse> crearVenta(@Valid @RequestBody CrearVentaRequest request) {
        return ResponseEntity.ok(ventaService.crearVenta(request));
    }

    @GetMapping
    public ResponseEntity<List<VentaResponse>> listarVentas() {
        return ResponseEntity.ok(ventaService.listarVentas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VentaResponse> obtenerVentaPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ventaService.obtenerVentaPorId(id));
    }
}

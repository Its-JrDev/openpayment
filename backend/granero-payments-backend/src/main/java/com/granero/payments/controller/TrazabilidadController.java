package com.granero.payments.controller;

import com.granero.payments.dto.response.TrazabilidadResponse;
import com.granero.payments.service.TrazabilidadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/trazabilidad")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TrazabilidadController {

    private final TrazabilidadService trazabilidadService;

    @GetMapping
    public ResponseEntity<List<TrazabilidadResponse>> listarTrazabilidad() {
        return ResponseEntity.ok(trazabilidadService.listarTrazabilidad());
    }
}

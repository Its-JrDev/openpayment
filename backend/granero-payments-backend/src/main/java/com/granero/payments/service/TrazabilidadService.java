package com.granero.payments.service;

import com.granero.payments.dto.response.TrazabilidadResponse;
import com.granero.payments.mapper.TrazabilidadMapper;
import com.granero.payments.repository.TrazabilidadPagoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrazabilidadService {

    private final TrazabilidadPagoRepository trazabilidadPagoRepository;

    @Transactional(readOnly = true)
    public List<TrazabilidadResponse> listarTrazabilidad() {
        return trazabilidadPagoRepository.findAll().stream()
                .map(TrazabilidadMapper::toResponse)
                .toList();
    }
}

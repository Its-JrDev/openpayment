package com.granero.payments.service;

import com.granero.payments.client.OpenPaymentsClient;
import com.granero.payments.dto.request.CrearVentaRequest;
import com.granero.payments.dto.response.VentaCreadaResponse;
import com.granero.payments.dto.response.VentaResponse;
import com.granero.payments.entity.Comerciante;
import com.granero.payments.entity.EstadoVenta;
import com.granero.payments.entity.TrazabilidadPago;
import com.granero.payments.entity.Venta;
import com.granero.payments.exception.ResourceNotFoundException;
import com.granero.payments.mapper.VentaMapper;
import com.granero.payments.repository.ComercianteRepository;
import com.granero.payments.repository.TrazabilidadPagoRepository;
import com.granero.payments.repository.VentaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VentaService {

    private final VentaRepository ventaRepository;
    private final ComercianteRepository comercianteRepository;
    private final TrazabilidadPagoRepository trazabilidadPagoRepository;
    private final OpenPaymentsClient openPaymentsClient;

    /**
     * Flujo de creación de venta:
     * 1. Guarda la venta en estado PENDIENTE.
     * 2. Crea el Incoming Payment vía el SDK de Open Payments.
     * 3. Guarda el Payment ID / URL devueltos.
     */
    @Transactional
    public VentaCreadaResponse crearVenta(CrearVentaRequest request) {
        Comerciante comerciante = comercianteRepository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("No hay comerciante configurado"));

        Venta venta = Venta.builder()
                .comerciante(comerciante)
                .montoTotal(request.montoTotal())
                .moneda(request.moneda())
                .estado(EstadoVenta.PENDIENTE)
                .build();

        venta = ventaRepository.save(venta);

        OpenPaymentsClient.IncomingPaymentResult incomingPayment =
                openPaymentsClient.crearIncomingPayment(request.montoTotal(), request.moneda());

        venta.setOpenPaymentsId(incomingPayment.paymentId());
        venta.setPaymentUrl(incomingPayment.paymentUrl());
        venta = ventaRepository.save(venta);

        return VentaMapper.toCreadaResponse(venta);
    }

    @Transactional(readOnly = true)
    public List<VentaResponse> listarVentas() {
        return ventaRepository.findAll().stream()
                .map(VentaMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public VentaResponse obtenerVentaPorId(Long id) {
        Venta venta = buscarVentaPorId(id);
        return VentaMapper.toResponse(venta);
    }

    @Transactional(readOnly = true)
    public Venta buscarVentaPorId(Long id) {
        return ventaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venta no encontrada: " + id));
    }

    @Transactional(readOnly = true)
    public Venta buscarVentaPorOpenPaymentsId(String openPaymentsId) {
        return ventaRepository.findByOpenPaymentsId(openPaymentsId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Venta no encontrada para openPaymentsId: " + openPaymentsId));
    }

    /**
     * Llamado desde el webhook cuando el ASE notifica que un pago se completó.
     */
    @Transactional
    public void marcarVentaComoPagada(Venta venta, String walletOrigen,
                                       BigDecimal montoRecibido, String hashIlp) {
        venta.setEstado(EstadoVenta.PAGADA);
        ventaRepository.save(venta);

        TrazabilidadPago trazabilidad = TrazabilidadPago.builder()
                .venta(venta)
                .openPaymentsId(venta.getOpenPaymentsId())
                .walletOrigen(walletOrigen)
                .montoRecibido(montoRecibido)
                .fechaPago(LocalDateTime.now())
                .hashIlp(hashIlp)
                .build();

        trazabilidadPagoRepository.save(trazabilidad);
    }
}

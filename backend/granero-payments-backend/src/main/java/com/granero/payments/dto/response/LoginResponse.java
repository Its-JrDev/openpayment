package com.granero.payments.dto.response;

public record LoginResponse(
        String token,
        String tipo,
        String username,
        String rol
) {
    public static LoginResponse of(String token, String username, String rol) {
        return new LoginResponse(token, "Bearer", username, rol);
    }
}

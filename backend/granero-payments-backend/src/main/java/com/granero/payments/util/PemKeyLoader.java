package com.granero.payments.util;

import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

/**
 * Lee el contenido de una llave privada PEM a partir de una ruta con prefijo
 * "classpath:" o "file:" (o una ruta de archivo normal), tal como se
 * configura en application.yml -> app.open-payments.private-key-path.
 */
public final class PemKeyLoader {

    private static final ResourceLoader RESOURCE_LOADER = new DefaultResourceLoader();

    private PemKeyLoader() {
    }

    public static String readPrivateKey(String path) {
        Resource resource = RESOURCE_LOADER.getResource(path);
        try (InputStream is = resource.getInputStream()) {
            return new String(is.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new IllegalStateException(
                    "No se pudo leer la llave privada de Open Payments en: " + path, e);
        }
    }
}

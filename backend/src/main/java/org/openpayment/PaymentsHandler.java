package org.openpayment;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class PaymentsHandler implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        if ("OPTIONS".equals(method)) {
            sendCorsHeaders(exchange);
            exchange.sendResponseHeaders(204, -1);
            exchange.close();
            return;
        }

        sendCorsHeaders(exchange);

        if ("GET".equals(method)) {
            byte[] body = "{\"payments\":[]}".getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(200, body.length);
            write(exchange, body);
            return;
        }

        if ("POST".equals(method)) {
            byte[] body = "{\"message\":\"payment created\"}".getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(201, body.length);
            write(exchange, body);
            return;
        }

        byte[] body = "{\"error\":\"method not allowed\"}".getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(405, body.length);
        write(exchange, body);
    }

    private void write(HttpExchange exchange, byte[] body) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        try (OutputStream out = exchange.getResponseBody()) {
            out.write(body);
        }
        exchange.close();
    }

    private void sendCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");
    }
}

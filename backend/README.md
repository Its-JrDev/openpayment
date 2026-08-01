# Backend — Open Payments

Java vanilla (JDK 21, sin frameworks). API REST con `com.sun.net.httpserver.HttpServer`.

## Scripts

```sh
./run.sh build   # compilar a backend/out
./run.sh run     # compilar y ejecutar en http://localhost:8080
```

## Endpoints

| Método | Ruta             | Descripción                |
|--------|------------------|----------------------------|
| GET    | `/api/health`    | Health check               |
| GET    | `/api/payments`  | Listar pagos               |
| POST   | `/api/payments`  | Crear pago                 |

## Estructura

```
backend/
├── src/main/java/org/openpayment/
│   ├── Main.java            # arranque del servidor
│   ├── HealthHandler.java
│   └── PaymentsHandler.java
├── run.sh
└── .gitignore
```

## Próximos pasos (integración Interledger)

- Sincronizar el flujo Open Payments con el SDK Node existente en la raíz
  (`incoming` → `quote` → `interact` → `outgoing`) o replicarlo desde Java.
- CORS ya habilitado para el frontend (`http://localhost:5173`).

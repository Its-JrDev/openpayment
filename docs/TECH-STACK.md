# Tech Stack — Mini Hackaton Open Payments (Interledger)

> **Contexto:** mini-hackaton para implementar la tecnología de Interledger/Open Payments.
> El jurado evalúa principalmente que la implementación esté **bien hecha** (correcto uso del
> protocolo, manejo de grants y transferencias), no tanto la UI ni las funcionalidades
> extra. Aun así, es necesario cumplir con unos **requisitos mínimos** sólidos.

## Arquitectura objetivo

```
┌────────────────┐     HTTP/REST      ┌─────────────────┐     Open Payments    ┌──────────────────────────┐
│   Frontend     │ ─────────────────▶ │    Backend      │ ───────────────────▶ │ Interledger Test Network │
│   (React/Vite) │ ◀───────────────── │ (Java vanilla)  │ ◀─────────────────── │ Open Payments / test     │
└────────────────┘                    └─────────────────┘                      │ wallet                   │
                                                                               └──────────────────────────┘
```

- **Frontend**: consume la API del backend, muestra el estado del pago y dispara los pasos del flujo.
- **Backend**: orquesta el flujo completo de Open Payments (grants, incoming/quote/outgoing) y expone una API REST.
- **Red de test**: wallets `sender` y `receiver` creadas en `wallet.interledger-test.dev`.

## Tabla de stack objetivo

| Capa                 | Tecnología              | Propósito                                                       |
|----------------------|-------------------------|-----------------------------------------------------------------|
| Frontend (lenguaje)  | JavaScript              | Lógica de la interfaz                                           |
| Frontend (framework) | React                   | Componentes y estado de la UI                                   |
| Frontend (build)     | Vite                    | Dev server, HMR y build de producción                           |
| Frontend (estilos)   | Tailwind CSS            | Utilidades de estilos                                           |
| Frontend (UI kit)    | shadcn/ui               | Componentes accesibles y consistentes (botones, forms, etc.)    |
| Frontend (packages)  | npm                     | Gestión de dependencias y scripts                               |
| Backend              | Java (vanilla, JDK)     | API REST y orquestación del flujo Open Payments (sin frameworks)|
| Interledger          | `@interledger/open-payments` | SDK cliente para grants y payments (incoming, quote, outgoing) |
| Red de test          | Interledger test wallet | Wallets `sender`/`receiver` y auth server de prueba             |

## Requisitos mínimos (baseline evaluable)

Checklist para que la implementación se considere **correcta**:

1. **Flujo completo de Open Payments**:
   - [ ] Crear `incoming payment` (wallet receiver).
   - [ ] Crear `quote` (wallet sender).
   - [ ] Solicitar `outgoing payment` con interacción (consentimiento GNAP).
   - [ ] Continuar el grant con `interact_ref` tras el *Accept* del usuario.
   - [ ] Crear el `outgoing payment` y verificar `failed: false` y saldo movido.

2. **Seguridad de claves**:
   - [ ] Key IDs y rutas a `.key` vía config/env (`constants.js`), sin valores hardcodeados de cuentas reales.
   - [ ] Archivos `.key` privados **nunca** commiteados (revisar `.gitignore`).
   - [ ] Correspondencia correcta wallet → Key ID → private key (evita `401 invalid_client`).

3. **Manejo de errores**:
   - [ ] Tratamiento de `invalid_client` / `invalid signature`.
   - [ ] Detección y re-intento ante IDs de incoming/quote caducados.
   - [ ] Mensajes de error claros hacia el usuario (frontend) y logs en backend.

4. **Comunicación frontend ↔ backend**:
   - [ ] Backend expone endpoints REST para cada paso del flujo.
   - [ ] Frontend consume la API, muestra estado del pago y errores.
   - [ ] El `interact_ref` fluye desde el redirect (server) hacia el backend/frontend.

5. **Documentación y operación**:
   - [ ] README con pasos de setup y ejecución.
   - [ ] `docs/` con el tech stack (este archivo).
   - [ ] Comandos reproducibles (`npm run ...` y/o scripts de backend).

## Estructura de carpetas propuesta

```
openpayment/
├── docs/                  # Documentación (este archivo)
├── frontend/              # React + Vite + Tailwind + shadcn/ui
│   ├── src/
│   └── package.json
├── backend/               # Java vanilla (API REST + orquestación)
│   └── src/main/java/
├── sender/                # Clientes Open Payments del wallet sender
├── receiver/              # Clientes Open Payments del wallet receiver
├── constants.js           # Config: wallet URLs, key IDs, rutas a .key
├── server.js              # Servidor de redirect (interact_ref)
├── incoming.js / quote.js / interact.js / outgoing.js
└── README.MD
```

## Comandos

### Frontend (Vite + React + Tailwind + shadcn/ui)

```sh
npm create vite@latest frontend -- --template react   # crear proyecto
cd frontend
npm install
npm install -D tailwindcss @tailwindcss/vite          # Tailwind v4 vía plugin de Vite
npx shadcn@latest init                                # inicializar shadcn/ui
npx shadcn@latest add button card input label ...     # añadir componentes
npm run dev                                           # dev server
npm run build                                         # build de producción
```

### Backend (Java vanilla)

```sh
cd backend
javac -d out $(find src -name "*.java")   # compilar
java -cp out Main                          # ejecutar
```

### Flujo Interledger (flujo actual del repo)

```sh
npm run server      # servidor de redirect (interact_ref)
npm run incoming    # incoming payment  → copiar id a quote.js
npm run quote       # quote             → copiar id a senderOutgoingGrant.js y outgoing.js
npm run interact    # link de Accept    → copiar continue.* a continueGrant.js
# → Accept en navegador, server imprime interact_ref → copiar a continueGrant.js
npm run outgoing    # outgoing payment  → verificar failed: false
```

# Frontend — Open Payments

React + Vite + Tailwind CSS + shadcn/ui.

## Scripts

```sh
npm install       # instalar dependencias
npm run dev       # dev server (http://localhost:5173)
npm run build     # build de producción
npm run lint      # ESLint
npm run preview   # previsualizar build
```

## Estructura

```
src/
├── components/ui/   # componentes shadcn (button, card, input, label)
├── lib/utils.js     # helper cn (clsx + tailwind-merge)
├── App.jsx
└── index.css        # Tailwind v4 + tokens de tema (css variables)
```

## Convenciones

- Aliases de import: `@/` → `src/` (ver `jsconfig.json` y `vite.config.js`).
- Stack: JavaScript, React 19, Vite, Tailwind CSS v4, shadcn/ui (Base UI / Radix), ESLint.

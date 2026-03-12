# ADR-FE-003: Gate de accesibilidad en CI

- Estado: Aceptada
- Fecha: 2026-03-12

## Contexto
El proyecto necesita evidencia continua de cumplimiento de accesibilidad, no solo revisión manual.

## Decisión
Definir gate obligatorio en CI:
- `eslint-plugin-jsx-a11y` vía `npm run lint:strict`.
- Auditoría automática de UI con `jest-axe` (`npm run test:accessibility`).
- Eliminar dependencia `DISABLE_ESLINT_PLUGIN=true` de scripts `start/build`.

## Consecuencias
- Menor riesgo de regresiones WCAG en PRs.
- PRs con violaciones de lint o a11y fallan antes de merge.

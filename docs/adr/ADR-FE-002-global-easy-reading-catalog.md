# ADR-FE-002: Catálogo global de texto en lectura fácil

- Estado: Aceptada
- Fecha: 2026-03-12

## Contexto
Se requiere modo de lectura fácil (UC14) consistente en múltiples flujos sin duplicar lógica por pantalla.

## Decisión
Centralizar mensajes críticos en `src/data/easyReadingTexts.ts` y exponer helper `getReadableText()` desde `AccessibilityContext`.

## Consecuencias
- Mensajería consistente y mantenible.
- Nuevos textos críticos deben registrarse en el catálogo para soportar modo fácil.

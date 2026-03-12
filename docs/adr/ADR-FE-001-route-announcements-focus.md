# ADR-FE-001: Anuncios de ruta SPA y gestión de foco

- Estado: Aceptada
- Fecha: 2026-03-12

## Contexto
La aplicación usa navegación SPA con React Router. Sin gestión explícita de foco y anuncio de cambio de ruta, usuarios con lector de pantalla pueden perder contexto.

## Decisión
Implementar en `AppRouter`:
- Región `aria-live` para anunciar cada navegación.
- Movimiento de foco al `h1` principal (o `main` como fallback) tras cambio de ruta.

## Consecuencias
- Mejora orientación y navegación asistiva.
- Requiere mantener encabezados principales por pantalla.

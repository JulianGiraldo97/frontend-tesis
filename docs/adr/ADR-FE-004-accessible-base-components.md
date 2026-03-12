# ADR-FE-004: Catálogo de componentes base accesibles

- Estado: Aceptada
- Fecha: 2026-03-12

## Contexto
Para escalar accesibilidad por defecto, se necesita un set reutilizable de componentes base.

## Decisión
Crear catálogo en `src/components/base/` con:
- `Button`
- `Input`
- `Modal` (foco atrapado + `Esc`)
- `Select` (label, helper/error y `aria-describedby`)
- `Toast` (`role`/`aria-live` según severidad)

## Consecuencias
- Estandariza patrones accesibles.
- Nuevas vistas deben preferir el catálogo base para coherencia.

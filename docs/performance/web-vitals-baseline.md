# Baseline Web Vitals (Frontend)

Fecha de corte: 2026-03-12

## Objetivo
Definir umbrales operativos y baseline de medición para pantallas críticas del frontend:
- `/login`
- `/jobs`
- `/apply/:id`
- `/employer`
- `/admin`
- `/profile`

## Umbrales adoptados

| Métrica | Good | Needs Improvement | Poor |
| --- | --- | --- | --- |
| LCP | <= 2.5 s | > 2.5 s y <= 4.0 s | > 4.0 s |
| INP | <= 200 ms | > 200 ms y <= 500 ms | > 500 ms |
| CLS | <= 0.10 | > 0.10 y <= 0.25 | > 0.25 |

Fuente técnica: umbrales de referencia de `web-vitals` para experiencia de usuario.

## Instrumentación implementada
- `src/reportWebVitals.ts`
- `src/performance/webVitals.ts`
- Integración en `src/index.tsx` mediante `reportWebVitals(recordWebVitalMetric)`.

La app registra LCP/INP/CLS por ruta en `localStorage` (`web-vitals-history`) y reporta estado (`good`, `needs-improvement`, `poor`).

## Baseline inicial
La baseline se captura en entorno real de ejecución (navegador) con el siguiente protocolo mínimo:
1. Limpiar métricas previas (`localStorage.removeItem('web-vitals-history')`).
2. Recorrer cada pantalla crítica 3 veces con red estable.
3. Exportar valores almacenados y calcular mediana por ruta/métrica.
4. Comparar contra umbrales y registrar hallazgos.

## Criterio de aceptación por release
- Ninguna pantalla crítica con CLS en estado `poor`.
- Al menos 80% de muestras LCP e INP en estado `good`.
- Tendencia estable o decreciente de muestras `poor` respecto al release anterior.

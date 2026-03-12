# Matriz de Compatibilidad Frontend + Protocolo Smoke

## Política de soporte
- Navegadores desktop: últimas 2 versiones de Chrome, Edge, Firefox, Safari.
- Navegadores móviles: Safari iOS y Chrome Android en versión estable reciente.
- Tecnologías asistivas prioritarias: NVDA (Windows), VoiceOver (macOS/iOS).

## Matriz

| Plataforma | Navegador | Estado esperado | Lector de pantalla | Cobertura smoke |
| --- | --- | --- | --- | --- |
| Windows 11 | Chrome (latest-1/latest) | Compatible | NVDA | Sí |
| Windows 11 | Edge (latest-1/latest) | Compatible | NVDA | Sí |
| Windows 11 | Firefox (latest-1/latest) | Compatible | NVDA | Sí |
| macOS | Safari (latest-1/latest) | Compatible | VoiceOver | Sí |
| macOS | Chrome (latest-1/latest) | Compatible | VoiceOver | Sí |
| iOS | Safari (latest) | Compatible | VoiceOver | Sí |
| Android | Chrome (latest) | Compatible | TalkBack (referencial) | Opcional |

## Smoke test por release

### Flujos mínimos
1. Login accesible (`/login`)
2. Búsqueda de vacantes (`/jobs`)
3. Detalle + postulación (`/job/:id` -> `/apply/:id`)
4. Gestión de vacantes empleador (`/employer`)
5. Panel administrativo (`/admin`)

### Validaciones por flujo
- Navegación por teclado completa sin bloqueos.
- Foco visible y orden lógico.
- Anuncios de cambio de ruta en SPA.
- Mensajes de estado/errores anunciables.
- Sin solapamiento visual en móvil (responsive).

### Criterio de salida
- 0 bloqueantes en flujos críticos.
- Hallazgos menores documentados con plan de corrección.
- Evidencia adjunta en reporte manual (`docs/accessibility/reports/`).

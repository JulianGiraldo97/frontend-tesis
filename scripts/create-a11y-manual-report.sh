#!/usr/bin/env bash

set -euo pipefail

REPORT_DATE="${1:-$(date +%Y-%m-%d)}"
OUT_DIR="docs/accessibility/reports"
OUT_FILE="${OUT_DIR}/manual-a11y-report-${REPORT_DATE}.md"

mkdir -p "${OUT_DIR}"

cat > "${OUT_FILE}" <<TEMPLATE
# Reporte Manual de Accesibilidad - ${REPORT_DATE}

## Entorno
- URL probada:
- Navegador:
- Sistema operativo:
- Lector de pantalla: NVDA / VoiceOver
- Persona que ejecuta la prueba:

## Resultado por flujo

### Registro
- Resultado: PASS / FAIL / PARTIAL
- Hallazgos:

### Login
- Resultado: PASS / FAIL / PARTIAL
- Hallazgos:

### Búsqueda de vacantes
- Resultado: PASS / FAIL / PARTIAL
- Hallazgos:

### Postulación
- Resultado: PASS / FAIL / PARTIAL
- Hallazgos:

### Gestión de vacantes (empleador)
- Resultado: PASS / FAIL / PARTIAL
- Hallazgos:

## Incidencias detectadas
| ID | Flujo | Severidad | Descripción | Criterio WCAG relacionado | Estado |
| --- | --- | --- | --- | --- | --- |
| A11Y-001 | | | | | |

## Evidencias
- Capturas:
- Videos:
- Observaciones:
TEMPLATE

echo "Reporte creado en: ${OUT_FILE}"

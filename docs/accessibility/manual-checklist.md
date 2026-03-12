# Checklist Manual de Accesibilidad (Teclado + NVDA + VoiceOver)

## Alcance
- Registro
- Login
- Búsqueda de vacantes
- Postulación a vacante
- Gestión de vacantes (empleador)

## Preparación
1. Ejecutar la app en local (`npm start`).
2. Abrir navegador compatible (Chrome o Edge para NVDA; Safari para VoiceOver).
3. Activar lector de pantalla:
- NVDA (Windows)
- VoiceOver (macOS)

## Criterios globales
- [ ] Todo flujo es operable solo con teclado (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`).
- [ ] No existen keyboard traps.
- [ ] El foco es visible en cada interacción.
- [ ] Los cambios de ruta SPA anuncian el nombre de la pantalla.
- [ ] El foco se mueve al `h1` principal en navegación SPA.
- [ ] Mensajes de éxito/error se anuncian con `role="status"` o `role="alert"`.

## Flujo: Registro
- [ ] Campos tienen etiqueta clara y orden lógico de foco.
- [ ] Errores de validación son claros y se anuncian en lector de pantalla.
- [ ] El primer campo con error recibe foco automáticamente.
- [ ] Confirmación de registro se anuncia correctamente.

## Flujo: Login
- [ ] Se puede completar y enviar formulario solo con teclado.
- [ ] Recuperación de acceso funciona con mensajes claros y anunciables.
- [ ] Existe alternativa cuando el correo no está registrado.
- [ ] En caso de error, el foco llega al campo que debe corregirse.

## Flujo: Búsqueda de vacantes
- [ ] Filtros (palabra clave, ubicación, contrato) son accesibles por teclado.
- [ ] Resultados se actualizan y el conteo se anuncia correctamente.
- [ ] Estado "sin resultados" se anuncia con mensaje comprensible.
- [ ] Al abrir detalle de vacante y volver, se mantiene el estado de filtros.

## Flujo: Postulación
- [ ] Se informa claramente si la vacante está cerrada.
- [ ] Se informa claramente si ya existe postulación previa.
- [ ] Se informa claramente si el perfil está incompleto y se ofrece acción correctiva.
- [ ] El formulario por pasos mantiene navegación clara y validaciones anunciables.

## Flujo: Gestión de vacantes (empleador)
- [ ] Filtros por vacante/estado y orden son accesibles por teclado.
- [ ] Empty state de postulaciones comunica siguiente acción.
- [ ] Composer de retroalimentación permite plantilla + edición + vista previa.
- [ ] Se puede descargar transcripción de retroalimentación en texto.

## Contenido multimedia y transcripciones
- [ ] Modal de vacante permite ver subtítulos/transcripción y descargar `.txt`.
- [ ] Modal de CV permite ver subtítulos/transcripción y descargar `.txt`.
- [ ] Las transcripciones son legibles y describen contenido relevante.

## Evidencias
- [ ] Capturas o grabaciones de prueba por flujo.
- [ ] Reporte con fecha, navegador, lector de pantalla y hallazgos.
- [ ] Lista de incidencias con severidad (`critical`, `serious`, `moderate`, `minor`).

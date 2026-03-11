# Emplea+ — Lista de Tareas Pendientes

Proyecto de tesis: plataforma de empleo accesible para personas con discapacidad.
React 18 + TypeScript + Bootstrap 5 · Desplegado en GitHub Pages (`/frontend-tesis`)

---

## 1. Accesibilidad WCAG 2.1 AA

### Skip link
- [x] Conectar `SkipLink` al DOM — actualmente está definido en `src/components/SkipLink/` pero **no se usa en ningún lugar**; añadirlo al inicio de `Navigation.tsx` o `AppRouter.tsx`
- [x] Agregar estilos `.skip-link:focus` (visible al recibir foco) en el CSS global

### Gestión de foco (modales y paneles)
- [x] `src/components/JobDetailModal.tsx` — implementar trampa de foco (focus trap) mientras el modal esté abierto y devolver foco al elemento disparador al cerrar
- [x] `src/components/VacancyDetailModal.tsx` — ídem
- [x] `src/components/AccessibilitySettingsPanel.tsx:56-64` — el botón flotante abre el panel pero no atrapa el foco ni hace manejo de Escape

### Atributos ARIA faltantes
- [x] `src/pages/LoginPage.tsx:100` — enlace "¿Olvidaste tu contraseña?" sin `aria-label`
- [x] `src/pages/LoginPage.tsx:125` — enlace "Crear cuenta" sin `aria-label`
- [x] `src/pages/JobSearchPage.tsx:341` — botón "🔍 Buscar empleos" sin `aria-label`
- [x] `src/pages/JobSearchPage.tsx:433` — botón "📄 Cargar más empleos" sin `aria-label`
- [x] `src/pages/ProfilePage.tsx:570` — `<select>` "Tamaño de Fuente" sin `aria-labelledby` / `aria-describedby`
- [x] `src/pages/ProfilePage.tsx:585` — `<select>` "Esquema de Color" sin `aria-label`
- [x] `src/pages/JobDetailPage.tsx:12` — enlace "Empleos" en breadcrumb sin `aria-label`
- [x] `src/components/SavedJobs.tsx:125-145` — botones de acción y botón eliminar (ícono) sin `aria-label`
- [x] `src/components/Navigation.tsx:8-14` — ítems de navegación con emojis (💼📊🏢⚙️👤) sin `aria-label` descriptivo
- [x] `src/components/JobDetailModal.tsx:185-211` — botones del pie del modal sin `aria-label`
- [x] `src/pages/EmployerDashboard.tsx:133-148` — botones de acciones rápidas sin `aria-label`
- [x] `src/pages/AdminDashboard.tsx:133-148` — ídem

### Formularios
- [x] `src/pages/ApplicationPage.tsx:127-134` — textarea "Carta de presentación" sin `aria-describedby` vinculado al texto de ayuda
- [x] `src/pages/ApplicationPage.tsx:147-156` — input de archivo CV sin `aria-describedby` a los requisitos de formato
- [x] `src/pages/ProfilePage.tsx:408-415` — textarea "Biografía" sin `aria-describedby`
- [x] `src/components/Input/Input.tsx:47` — considerar `aria-describedby` permanente para campos requeridos (no solo cuando hay error)

### Elementos decorativos
- [x] `src/components/Navigation.tsx:21` — div con logo "E+" sin `aria-hidden="true"` (es decorativo)
- [x] `src/pages/JobSearchPage.tsx:358-359` — avatar con inicial de empresa sin `aria-hidden` ni descripción contextual
- [x] `src/components/ScreenReader.tsx:280-288` — div de debug visible en el DOM y anunciado por lectores de pantalla; añadir `aria-hidden="true"` o `display:none`

### Contraste de color (verificar)
- [x] `src/pages/LoginPage.tsx:136-145` — texto con clase `white-50` (opacidad) puede tener contraste insuficiente
- [x] `src/components/JobDetailModal.tsx:145-146` — bullets "text-success" verde; verificar ratio mínimo 4.5:1

### Jerarquía de encabezados
- [x] `src/pages/JobDetailPage.tsx:28-31` — usar semántica HTML correcta; revisar orden de `<h1>`-`<h6>` en toda la página
- [x] `src/pages/CandidateDashboard.tsx:38` — navegación por pestañas sin encabezado de sección para el contenido activo

---

## 2. Funcionalidad Mock

### Eliminar `console.log` de producción
- [x] `src/pages/LoginPage.tsx:15`
- [x] `src/pages/ApplicationPage.tsx:29`
- [x] `src/pages/ProfilePage.tsx:177`
- [x] `src/pages/JobSearchPage.tsx:191, 196, 208`
- [x] `src/components/ScreenReader.tsx` — 15+ sentencias `console.log/error` (líneas 31, 48, 52, 58, 64, 75, 78, 91-93, 107, 120, 128, 134, 139, 150, 157, 163, 168, 179, 199, 201, 211, 213, 299, 305, 311)
- [x] `src/components/CandidateCVModal.tsx:55, 75, 122`
- [x] `src/components/VacancyDetailModal.tsx:56, 81, 117`
- [x] `src/components/ScreenReaderTest.tsx:44`

### Centralizar datos mock
- [x] Crear `src/data/mockData.ts` y mover todos los arrays de prueba allí:
  - `mockJobs` — `src/pages/JobSearchPage.tsx:30-187`
  - `recommendedJobs` — `src/pages/CandidateDashboard.tsx`
  - `savedJobs` / `jobDetails` — `src/pages/ProfilePage.tsx:56-172`
  - `vacancies` / `applications` — `src/pages/EmployerDashboard.tsx`
  - métricas — `src/pages/AdminDashboard.tsx:23-42`

### Conectar formularios al AuthContext / servicios mock
- [x] `src/pages/LoginPage.tsx:9-18` — el submit solo hace `console.log`; debe llamar a `useAuth().login()`
- [x] `src/pages/ApplicationPage.tsx:27-30` — el submit no persiste datos; conectar a estado global o servicio mock
- [x] `src/pages/ProfilePage.tsx:174-178` — guardar cambios de perfil en el AuthContext o localStorage
- [x] `src/pages/JobSearchPage.tsx:194-209` — handlers de "Aplicar" y "Guardar empleo" solo actualizan estado local; conectar al contexto

### Completar contenido placeholder
- [x] `src/pages/JobDetailPage.tsx:33-73` — descripción, requisitos, beneficios y empresa ("TechCorp Inc.") son placeholders; vincular a datos mock reales

### Validación de formularios
- [x] `src/pages/ApplicationPage.tsx` — validar tipo y tamaño de archivo antes del submit
- [x] `src/context/AuthContext.tsx:86-109` — validar formato de email y fortaleza de contraseña en `register()`
- [x] `src/pages/ProfilePage.tsx` — validar campos antes de `handleSubmit`

---

## 3. Calidad de Código

### Refactorizar archivos largos
- [ ] `src/pages/ProfilePage.tsx` (625+ líneas) — extraer secciones en sub-componentes (`ProfileHeader`, `ProfileSkills`, `ProfileSettings`, etc.)
- [ ] `src/pages/EmployerDashboard.tsx` (400+ líneas) — separar vistas de vacantes y candidatos
- [ ] `src/pages/CandidateDashboard.tsx` (300+ líneas) — extraer pestañas en componentes propios
- [ ] `src/components/ScreenReader.tsx` (322 líneas) — separar el hook `useScreenReader` del componente visual

### Extraer código duplicado
- [ ] Lógica de inicialización de síntesis de voz (`speechSynthesis` + `setTimeout`) repetida en `VacancyDetailModal.tsx:50-64` y `CandidateCVModal.tsx:48-64` → extraer a hook reutilizable (e.g. `useSpeechSynthesis`)

### Estilos en línea → clases CSS
- [ ] `src/components/AccessibilitySettingsPanel.tsx:54,59` — `style={{ bottom, right, width, height }}` → clase utilitaria
- [ ] `src/components/SavedJobs.tsx:90` — `style={{ width: '50px', height: '50px' }}` → clase
- [ ] `src/components/JobDetailModal.tsx:73` — `style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}` → clase Bootstrap o variable CSS
- [ ] `src/components/AccessibilityNotification.tsx:36-41` — múltiples estilos en línea

### Constantes en lugar de valores mágicos
- [ ] `src/components/ScreenReader.tsx:177` — `setTimeout(..., 100)` → constante nombrada
- [ ] `src/components/VacancyDetailModal.tsx:63` — `setTimeout(..., 200)` → constante nombrada

### TypeScript: tipos más estrictos
- [ ] `src/pages/EmployerDashboard.tsx:35` — `activeTab` como `string` → union type `'overview' | 'vacancies' | 'candidates'`
- [ ] Revisar todos los `useState('')` que representan un enum y tiparlos correctamente

### Imports y barrel exports
- [ ] Estandarizar imports: usar el barrel `src/components/index.ts` donde sea posible en lugar de rutas relativas directas
- [ ] Revisar importaciones no utilizadas con ESLint (`no-unused-vars`, `@typescript-eslint/no-unused-vars`)

### Documentación interna
- [ ] `src/hooks/useFocusManagement.ts` — añadir JSDoc a `trapFocus` explicando parámetros y comportamiento
- [ ] `src/context/AccessibilityContext.tsx` — documentar los valores expuestos por el contexto

---

## Notas

- Las credenciales de demo (`demo@example.com` / `password`) y el token `mock-token` en `src/context/AuthContext.tsx` son intencionales para el prototipo de tesis.
- Priorizar las tareas de **Accesibilidad** para el evaluador de la tesis; representan el núcleo del proyecto.
- El orden de proveedores (`BrowserRouter → AccessibilityProvider → AuthProvider → App`) no debe modificarse sin actualizar este archivo.

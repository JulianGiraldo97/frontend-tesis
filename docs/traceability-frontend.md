# Matriz de Trazabilidad Frontend (RF/RNF -> UI -> Evidencia)

## Alcance
Matriz orientada a frontend para asegurar trazabilidad entre requerimientos, componentes UI y evidencia verificable.

| Requisito | Componentes / Pantallas | Evidencia automática | Evidencia manual |
| --- | --- | --- | --- |
| RF001 Registro/login accesible | `src/pages/LoginPage.tsx`, `src/components/base/Input.tsx`, `src/components/base/Button.tsx` | `src/pages/__tests__/LoginPage.a11y.test.tsx`, `npm run lint:strict` | `docs/accessibility/manual-checklist.md` (Login/Registro) |
| RF002 Perfil y hoja de vida estructurada | `src/pages/ProfilePage.tsx`, `src/pages/ProfileBuilder.tsx` | `src/pages/__tests__/ProfileBuilder.a11y.test.tsx` | `docs/accessibility/manual-checklist.md` |
| RF003 Búsqueda accesible de vacantes | `src/pages/JobSearchPage.tsx`, `src/components/base/Select.tsx` | `src/pages/__tests__/JobSearchPage.a11y.test.tsx` | `docs/accessibility/manual-checklist.md` |
| RF004 Postulación accesible | `src/pages/ApplicationPage.tsx`, `src/pages/JobDetailPage.tsx` | `src/pages/__tests__/ApplicationPage.a11y.test.tsx` | `docs/accessibility/manual-checklist.md` |
| RF006 Revisión de postulaciones | `src/pages/EmployerDashboard.tsx`, `src/components/CandidateCVModal.tsx` | `src/pages/__tests__/EmployerDashboard.a11y.test.tsx` | `docs/accessibility/manual-checklist.md` |
| RF007 Retroalimentación accesible | `src/pages/EmployerDashboard.tsx`, `src/components/TranscriptPanel.tsx` | `npm run test:accessibility` (suite a11y) | `docs/accessibility/manual-checklist.md` |
| RF008 Trazabilidad administrativa | `src/pages/AdminDashboard.tsx` | `npm run type-check` + `npm run lint:strict` | Revisión funcional en reporte manual |
| RF009 Monitoreo de accesibilidad | `src/pages/AdminDashboard.tsx`, exportación CSV/JSON | `npm run test:ci`, `npm run test:accessibility` | Checklist manual + reporte de auditoría |
| RNF001 WCAG AA | `src/components/base/*`, `src/AppRouter.tsx` | `npm run lint:strict`, `npm run test:accessibility` | NVDA/VoiceOver checklist |
| RNF002 Usabilidad | Flujos `Login`, `JobSearch`, `Application`, `Employer` | Pruebas de interfaz + lint | Checklist y sesiones con usuarios |
| RNF003 Interoperabilidad AT | `aria-live`, foco SPA, transcript panel | `jest-axe` por flujo | NVDA/VoiceOver en checklist |
| RNF006 Rendimiento frontend | Vistas principales + code quality | `npm run build`, `npm run test:ci` | Medición manual de Web Vitals |
| RNF007 Mantenibilidad | `src/components/base/`, ADRs | `npm run type-check`, CI pipeline | Revisión arquitectónica ADR |

## Gates de CI asociados
- `npm run lint:strict`
- `npm run type-check`
- `npm run test:ci`
- `npm run test:accessibility`

## Referencias
- `docs/adr/ADR-FE-001-route-announcements-focus.md`
- `docs/adr/ADR-FE-002-global-easy-reading-catalog.md`
- `docs/adr/ADR-FE-003-accessibility-gates-ci.md`
- `docs/adr/ADR-FE-004-accessible-base-components.md`
- `docs/accessibility/manual-checklist.md`

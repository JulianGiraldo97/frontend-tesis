# Emplea+ - Plataforma Web Accesible de Intermediación Laboral

Una plataforma web accesible diseñada específicamente para personas con discapacidad visual, auditiva y cognitiva, que cumple con los estándares WCAG 2.1 AA.

## 🎯 Características Principales

### Accesibilidad WCAG 2.1 AA
- ✅ Navegación completa por teclado (Tab/Enter)
- ✅ Compatibilidad con lectores de pantalla (NVDA, JAWS, VoiceOver)
- ✅ Modo alto contraste
- ✅ Modo lectura fácil
- ✅ Subtítulos y anuncios dinámicos
- ✅ Skip links y gestión de focus
- ✅ Atributos ARIA completos

### Funcionalidades por Rol

#### 👤 **Candidatos**
- Dashboard personalizado con resumen de CV
- Búsqueda avanzada de empleos con filtros accesibles
- Proceso de postulación simplificado
- Gestión de perfil y preferencias de accesibilidad

#### 🏢 **Empleadores**
- Dashboard con métricas de ofertas y postulaciones
- Gestión de vacantes con acciones de editar/cerrar
- Listado de candidatos con notas de accesibilidad
- Acciones masivas para gestión de postulaciones

#### 👨‍💼 **Administradores**
- Panel de administración de usuarios
- Métricas de cumplimiento WCAG
- Dashboard de accesibilidad
- Gestión de roles y permisos

## 🛠️ Tecnologías

### Frontend
- **React 18** con TypeScript estricto
- **React Router v6** para navegación
- **TailwindCSS** para estilos accesibles
- **Radix UI** para componentes accesibles
- **React Hook Form** para formularios

### Accesibilidad
- **@axe-core/react** para validación automática
- **eslint-plugin-jsx-a11y** para linting
- **jest-axe** para testing de accesibilidad
- **focus-trap-react** para gestión de focus

### Testing & Calidad
- **Jest** + **React Testing Library**
- **TypeScript** con configuración estricta
- **ESLint** + **Prettier**
- **Husky** para pre-commit hooks

## 🐳 Docker (Recomendado)

### Prerrequisitos
- Docker Desktop instalado y ejecutándose
- Docker Compose

### Desarrollo con Docker

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/emplea-plus.git
cd emplea-plus

# Iniciar desarrollo
./scripts/docker-dev.sh

# O manualmente:
docker-compose up emplea-plus-dev
```

### Producción con Docker

```bash
# Construir y ejecutar en producción
./scripts/docker-prod.sh

# O manualmente:
docker-compose up -d emplea-plus-prod
```

### Testing con Docker

```bash
# Ejecutar tests
./scripts/docker-test.sh

# O manualmente:
docker-compose run --rm emplea-plus-test
```

### Comandos Docker Útiles

```bash
# Ver logs
docker-compose logs -f emplea-plus-dev

# Reconstruir imagen
docker-compose build emplea-plus-dev

# Parar todos los servicios
docker-compose down

# Ver estado de contenedores
docker-compose ps
```

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── ComponentName/
│   │   ├── ComponentName.tsx
│   │   ├── ComponentName.styles.ts
│   │   ├── ComponentName.test.tsx
│   │   └── index.ts
├── context/             # Context API providers
│   ├── AccessibilityContext.tsx
│   └── AuthContext.tsx
├── hooks/               # Custom hooks
│   ├── useAccessibility.ts
│   ├── useAuth.ts
│   └── useFocusManagement.ts
├── pages/               # Componentes de rutas
│   ├── LoginPage.tsx
│   ├── CandidateDashboard.tsx
│   ├── JobSearchPage.tsx
│   └── ...
├── services/            # Cliente API y servicios
│   ├── apiClient.ts
│   └── accessibilityService.ts
├── styles/              # Estilos globales
│   └── globals.css
├── tests/               # Configuración de tests
│   └── setup.ts
├── types/               # Tipos TypeScript
│   └── index.ts
├── utils/               # Utilidades puras
│   ├── accessibilityUtils.ts
│   └── formatters.ts
├── App.tsx
├── AppRouter.tsx
└── index.tsx
```

## 🚀 Instalación Local (Alternativa)

### Prerrequisitos
- Node.js 18+ 
- npm 8+

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/emplea-plus.git
cd emplea-plus

# Instalar dependencias
npm install --legacy-peer-deps

# Configurar variables de entorno
cp .env.example .env.local
```

### Scripts Disponibles

```bash
# Desarrollo
npm start                    # Iniciar servidor de desarrollo
npm run build               # Construir para producción

# Testing
npm test                    # Ejecutar tests con coverage
npm run test:watch          # Tests en modo watch
npm run test:accessibility  # Tests específicos de accesibilidad

# Linting y Formateo
npm run lint                # Verificar linting
npm run lint:fix           # Corregir errores de linting
npm run format             # Formatear código con Prettier

# Accesibilidad
npm run axe:ci             # Auditoría de accesibilidad con axe-core

# TypeScript
npm run type-check         # Verificar tipos TypeScript

# Pre-commit
npm run pre-commit         # Ejecutar linting + tests + type-check
```

## 🎨 Diseño y Accesibilidad

### Paleta de Colores
- **Primario**: `#2A7F62` (Verde accesible)
- **Secundario**: `#4A90E2` (Azul)
- **Alto Contraste**: `#000000` / `#FFFFFF`
- **Lectura Fácil**: `#333333` / `#F5F5F5`

### Tipografías
- **Inter** para texto general
- **Open Sans** para modo lectura fácil

### Componentes Accesibles
- Todos los componentes incluyen atributos ARIA
- Gestión de focus automática
- Anuncios para lectores de pantalla
- Estados de carga y error accesibles

## 🧪 Testing de Accesibilidad

### Herramientas
- **jest-axe**: Testing automático de accesibilidad
- **@axe-core/react**: Auditoría en tiempo real
- **eslint-plugin-jsx-a11y**: Linting de accesibilidad

### Comandos
```bash
# Tests de accesibilidad
npm run test:accessibility

# Auditoría con axe-core
npm run axe:ci

# Verificar en desarrollo
npm start
# Luego abrir http://localhost:3000 y revisar consola
```

## 📊 Métricas de Accesibilidad

El proyecto incluye métricas automáticas de:
- **Contraste de colores** (WCAG AA/AAA)
- **Navegación por teclado**
- **Atributos ARIA**
- **Etiquetas y descripciones**
- **Gestión de focus**

## 🔧 Configuración de Desarrollo

### ESLint
Configuración estricta con reglas de accesibilidad:
- `jsx-a11y/*` para accesibilidad
- `@typescript-eslint/*` para TypeScript
- `react-hooks/*` para hooks

### Prettier
Formateo automático con configuración consistente.

### Husky
Pre-commit hooks que ejecutan:
- Linting
- Type checking
- Tests con coverage
- Tests de accesibilidad

## 🚀 Despliegue

### Build de Producción
```bash
# Con Docker (recomendado)
./scripts/docker-prod.sh

# Sin Docker
npm run build
```

### Verificación Pre-despliegue
```bash
npm run lint
npm run type-check
npm test
npm run axe:ci
```

### CI/CD
El proyecto incluye GitHub Actions que:
- Ejecuta tests en múltiples versiones de Node.js
- Valida accesibilidad con axe-core
- Genera reportes de coverage
- Verifica seguridad de dependencias

## 📈 Funcionalidades por Pantalla

### 1. **Login/Registro**
- Header "Emplea+" con color verde #2A7F62
- Inputs accesibles con validación
- Botón "mostrar contraseña"
- CTAs para login, registro y recuperación

### 2. **Dashboard Candidato**
- Sidebar de navegación vertical
- Header personalizado
- Tarjeta de resumen CV con foto
- Secciones expandibles (datos, formación, experiencia)

### 3. **Búsqueda de Empleos**
- Filtros accesibles (categoría, ubicación, contrato)
- Toggle "Modo lectura fácil"
- Tarjetas con aria-labels
- Indicador "Empleo Accesible"

### 4. **Detalle de Oferta**
- Breadcrumbs de navegación
- Información completa con iconos accesibles
- CTA fijo "Postularme"
- Sidebar con información de empresa

### 5. **Proceso de Postulación**
- Stepper visual con progreso
- Formulario simplificado
- Botones "Anterior"/"Siguiente" con focus
- Validación accesible

### 6. **Dashboard Empleador**
- Métricas en tarjetas
- Tabla de vacantes con acciones
- Listado de postulaciones
- Filtros por estado

### 7. **Panel Administración**
- Menú lateral para usuarios y métricas
- Dashboard de cumplimiento WCAG
- Gestión de roles
- Reportes de accesibilidad

### 8. **Configuración Accesibilidad**
- Switches para todas las preferencias
- Preview en vivo
- Persistencia en localStorage
- Anuncios dinámicos

## 🤝 Contribución

### Guías de Contribución
1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código
- **TypeScript estricto** con tipos explícitos
- **Accesibilidad WCAG 2.1 AA** en todos los componentes
- **Tests de accesibilidad** obligatorios
- **Documentación** en componentes complejos

### Checklist de PR
- [ ] Tests pasan (`npm test`)
- [ ] Linting sin errores (`npm run lint`)
- [ ] TypeScript sin errores (`npm run type-check`)
- [ ] Tests de accesibilidad pasan (`npm run test:accessibility`)
- [ ] Cobertura de tests > 80%
- [ ] Documentación actualizada

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Equipo

- **Desarrollador Principal**: [Tu Nombre]
- **Diseñador UX/UI**: [Nombre del Diseñador]
- **Especialista en Accesibilidad**: [Nombre del Especialista]

## 📞 Contacto

- **Email**: contacto@emplea-plus.com
- **Sitio Web**: https://emplea-plus.com
- **Documentación**: https://docs.emplea-plus.com

---

**Emplea+** - Haciendo el empleo accesible para todos. ♿ 
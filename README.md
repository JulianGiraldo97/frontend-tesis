# 🚀 Emplea+ - Plataforma de Intermediación Laboral Inclusiva

<!-- Trigger deployment -->
## 📋 Descripción

Emplea+ es una plataforma web accesible de intermediación laboral diseñada específicamente para personas con discapacidad visual, auditiva y cognitiva. La aplicación cumple con los estándares WCAG 2.1 AA y ofrece funcionalidades avanzadas de accesibilidad.

## ✨ Características Principales

### 🎯 **Accesibilidad WCAG 2.1 AA**
- **Navegación por teclado** - Compatible con lectores de pantalla
- **Alto contraste** - Múltiples esquemas de color
- **Lectura fácil** - Modo simplificado para discapacidad cognitiva
- **Lector de pantalla integrado** - Text-to-speech con Web Speech API
- **Tamaños de fuente ajustables** - Para mejor legibilidad

### 🔧 **Funcionalidades Técnicas**
- **React 18** con TypeScript
- **React Router v6** para navegación
- **Bootstrap 5** para UI responsive
- **Context API** para estado global
- **Linting automático** con ESLint

### 📱 **Pantallas Principales**
1. **Login/Registro** - Autenticación accesible
2. **Dashboard Candidato** - Gestión personal de empleos
3. **Búsqueda de Empleos** - Filtros accesibles
4. **Detalle de Empleo** - Información completa con lector de pantalla
5. **Dashboard Empleador** - Gestión de vacantes
6. **Panel de Administración** - Métricas de accesibilidad
7. **Perfil de Usuario** - Configuración de accesibilidad

## 🚀 Deployment en GitHub Pages

### **URL de la Aplicación:**
```
https://juliangiraldo97.github.io/frontend-tesis
```

### **Configuración Automática:**
- ✅ **Deployment automático** - En cada push a master
- ✅ **Build optimizado** - Para producción
- ✅ **Rollback fácil** - Historial de deployments

## 🛠️ Instalación Local

### **Prerrequisitos:**
- Node.js 18+
- npm 8+

### **Pasos de Instalación:**

```bash
# Clonar el repositorio
git clone https://github.com/JulianGiraldo97/frontend-tesis.git
cd frontend-tesis

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

### **Scripts Disponibles:**

```bash
# Desarrollo
npm start                    # Servidor de desarrollo
npm run build               # Build para producción
npm run test                # Tests unitarios
npm run lint                # Linting
npm run type-check          # Verificación de tipos

# Formateo
npm run format              # Formatear código
npm run lint:fix            # Corregir linting
```

## 📊 Monitoreo del Deployment

### **GitHub Actions Dashboard:**
- **Actions** > **Deploy to GitHub Pages** - Estado del deployment

### **GitHub Pages:**
- **Settings** > **Pages** - Configuración y URL
- **Actions** > **gh-pages** - Historial de deployments

## 🔧 Configuración para Deployment

### **1. Configurar GitHub Pages:**
1. Ve a tu repositorio en GitHub
2. **Settings** > **Pages**
3. **Source**: Selecciona **GitHub Actions**

### **2. Hacer push a master:**
```bash
git add .
git commit -m "Configurar deployment en GitHub Pages"
git push origin master
```

## 🎯 Beneficios del Deployment

### **✅ Para Desarrollo:**
- **Build automático** - Cada cambio se construye
- **Deployment automático** - Sin intervención manual
- **Rollback fácil** - Historial de deployments

### **✅ Para Usuarios:**
- **URL pública** - Acceso directo a la aplicación
- **Versión estable** - Siempre la última versión de master
- **Testing manual** - Verificación de accesibilidad

### **✅ Para Testing:**
- **Entorno de producción** - Pruebas reales
- **Múltiples usuarios** - Testing con usuarios reales
- **Feedback inmediato** - Problemas se detectan rápido

## 🔧 Troubleshooting

### **Si el deployment falla:**
1. **Verificar logs** - En GitHub Actions
2. **Ejecutar localmente** - `npm run build`
3. **Verificar dependencias** - `npm install`
4. **Verificar linting** - `npm run lint`

### **Si las rutas no funcionan:**
1. **Verificar 404.html** - Está configurado
2. **Verificar index.html** - Tiene script SPA
3. **Verificar homepage** - En package.json

## 📝 Notas Importantes

### **Seguridad:**
- El repositorio debe ser público para GitHub Pages gratuito
- No incluir secretos en el código
- Usar variables de entorno para configuraciones sensibles

### **Performance:**
- La aplicación se construye optimizada para producción
- Assets se comprimen automáticamente
- CDN de GitHub para distribución global

### **Accesibilidad:**
- Verificación manual de WCAG 2.1 AA
- Testing con usuarios reales
- Feedback continuo de accesibilidad

## 🤝 Contribución

### **Flujo de Trabajo:**
1. **Fork** del repositorio
2. **Crear branch** para nueva funcionalidad
3. **Desarrollar** con verificación de accesibilidad
4. **Push** y crear Pull Request
5. **Review** manual de accesibilidad
6. **Merge** después de aprobación

### **Estándares de Código:**
- **TypeScript** - Tipado estricto
- **ESLint** - Linting automático
- **Prettier** - Formateo consistente
- **Accesibilidad** - Verificación manual

---

**¡Emplea+ está listo para ayudar a crear un mundo laboral más inclusivo!** 🎉

Para más información sobre el deployment, consulta [DEPLOYMENT.md](./DEPLOYMENT.md). 
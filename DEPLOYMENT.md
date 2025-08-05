# 🚀 Deployment en GitHub Pages

## 📋 Configuración Inicial

### 1. **Configurar GitHub Pages**

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** > **Pages**
3. En **Source**, selecciona **GitHub Actions**
4. Esto habilitará el deployment automático

### 2. **Actualizar package.json**

Reemplaza la línea `homepage` en `package.json` con tu información:

```json
{
  "homepage": "https://[tu-usuario].github.io/[tu-repositorio]"
}
```

**Ejemplo:**
```json
{
  "homepage": "https://juliangiraldo.github.io/emplea-plus"
}
```

### 3. **Configurar Rutas para React Router**

Como estamos usando React Router, necesitamos configurar GitHub Pages para manejar las rutas correctamente. Crea un archivo `public/404.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Emplea+</title>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // https://github.com/rafgraph/spa-github-pages
      var pathSegmentsToKeep = 1;

      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

Y actualiza `public/index.html` para incluir este script:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Plataforma de intermediación laboral accesible" />
    <title>Emplea+ - Intermediación Laboral Inclusiva</title>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // https://github.com/rafgraph/spa-github-pages
      (function(l) {
        if (l.search[1] === '/' ) {
          var decoded = l.search.slice(1).split('&').map(function(s) { 
            return s.replace(/~and~/g, '&')
          }).join('?');
          window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location))
    </script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

## 🔄 Workflow de Deployment

### **Automatizado con GitHub Actions**

El workflow `.github/workflows/deploy.yml` se ejecuta automáticamente:

1. **En cada push a main/master**
2. **En cada Pull Request**

### **Pasos del Workflow:**

1. **Test** - Ejecuta tests unitarios y de linting
2. **Build** - Construye la aplicación para producción
3. **Deploy** - Despliega a GitHub Pages (solo en main/master)

### **Verificar Deployment:**

1. Ve a **Actions** en tu repositorio
2. Verifica que el workflow `Deploy to GitHub Pages` se ejecute correctamente
3. Una vez completado, tu aplicación estará disponible en:
   ```
   https://[tu-usuario].github.io/[tu-repositorio]
   ```

## 🧪 Testing de Accesibilidad

### **Tests Automatizados**

El workflow `.github/workflows/accessibility.yml` ejecuta tests de accesibilidad:

1. **Instala Playwright**
2. **Construye la aplicación**
3. **Ejecuta tests de accesibilidad**
4. **Genera reportes**

### **Ejecutar Tests Localmente:**

```bash
# Instalar Playwright
npm run install:playwright

# Ejecutar tests de accesibilidad
npm run test:accessibility

# Ejecutar todos los tests E2E
npm run test:e2e

# Ejecutar tests con UI
npm run test:e2e:ui
```

## 📊 Monitoreo

### **GitHub Actions Dashboard:**

- **Actions** > **Deploy to GitHub Pages** - Estado del deployment
- **Actions** > **Accessibility Check** - Estado de accesibilidad

### **GitHub Pages:**

- **Settings** > **Pages** - Configuración y estado
- **Actions** > **gh-pages** - Historial de deployments

## 🔧 Troubleshooting

### **Problemas Comunes:**

#### **1. Build Falla:**
```bash
# Verificar dependencias
npm install

# Verificar linting
npm run lint

# Verificar tipos
npm run type-check
```

#### **2. Tests Fallan:**
```bash
# Ejecutar tests localmente
npm test

# Ejecutar tests de accesibilidad
npm run test:accessibility
```

#### **3. Deployment No Funciona:**
- Verificar que el repositorio sea público
- Verificar que GitHub Pages esté habilitado
- Verificar que el workflow tenga permisos

#### **4. Rutas No Funcionan:**
- Verificar que `public/404.html` esté configurado
- Verificar que `public/index.html` tenga el script de SPA
- Verificar que `homepage` en `package.json` sea correcto

## 🎯 Beneficios del Deployment

### **✅ Para Desarrollo:**
- **Testing automático** - Cada cambio se prueba
- **Deployment automático** - Sin intervención manual
- **Rollback fácil** - Historial de deployments

### **✅ Para Usuarios:**
- **URL pública** - Acceso directo a la aplicación
- **Versión estable** - Siempre la última versión de main
- **Testing de accesibilidad** - Verificación automática

### **✅ Para Testing:**
- **Entorno de producción** - Pruebas reales
- **Múltiples usuarios** - Testing con usuarios reales
- **Feedback inmediato** - Problemas se detectan rápido

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
- Tests automáticos verifican WCAG 2.1 AA
- Reportes de accesibilidad en cada deployment
- Correcciones automáticas cuando es posible

---

**¡Tu aplicación Emplea+ estará disponible públicamente para pruebas con usuarios reales!** 🎉 
# 🐳 Docker Guide - Emplea+

Esta guía te ayudará a ejecutar **Emplea+** usando Docker, evitando problemas de dependencias y configuraciones locales.

## 🚀 Inicio Rápido

### 1. Verificar Docker
```bash
./scripts/check-docker.sh
```

### 2. Desarrollo
```bash
./scripts/docker-dev.sh
```

### 3. Producción
```bash
./scripts/docker-prod.sh
```

## 📋 Prerrequisitos

- **Docker Desktop** instalado y ejecutándose
- **Docker Compose** (incluido con Docker Desktop)

### Instalar Docker Desktop

#### macOS
```bash
# Con Homebrew
brew install --cask docker

# O descargar desde
# https://www.docker.com/products/docker-desktop
```

#### Windows
- Descargar desde: https://www.docker.com/products/docker-desktop
- Instalar y reiniciar

#### Linux
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose

# O seguir la guía oficial:
# https://docs.docker.com/desktop/install/linux-install/
```

## 🛠️ Comandos Docker

### Desarrollo
```bash
# Iniciar desarrollo
docker-compose up emplea-plus-dev

# En segundo plano
docker-compose up -d emplea-plus-dev

# Ver logs
docker-compose logs -f emplea-plus-dev

# Reconstruir
docker-compose build emplea-plus-dev
```

### Producción
```bash
# Construir y ejecutar producción
docker-compose up -d emplea-plus-prod

# Ver logs
docker-compose logs -f emplea-plus-prod

# Parar
docker-compose down emplea-plus-prod
```

### Testing
```bash
# Ejecutar tests
docker-compose run --rm emplea-plus-test

# Tests con coverage
docker-compose run --rm emplea-plus-test npm test -- --coverage
```

### Utilidades
```bash
# Ver estado de contenedores
docker-compose ps

# Parar todos los servicios
docker-compose down

# Limpiar imágenes
docker system prune -a

# Ver logs de todos los servicios
docker-compose logs -f
```

## 🌐 Acceso a la Aplicación

### Desarrollo
- **URL**: http://localhost:3000
- **Hot Reload**: ✅ Activado
- **Source Maps**: ✅ Activados

### Producción
- **URL**: http://localhost
- **Optimizado**: ✅ Minificado y comprimido
- **Nginx**: ✅ Configurado con gzip

## 🔧 Configuración Avanzada

### Variables de Entorno
```bash
# Crear archivo .env
cp .env.example .env

# Editar variables
nano .env
```

### Volúmenes
Los volúmenes están configurados para:
- **Hot Reload**: Cambios en código se reflejan inmediatamente
- **Node Modules**: Caché persistente de dependencias
- **Build Cache**: Acelera reconstrucciones

### Redes
- **emplea-plus-network**: Red aislada para contenedores
- **Puerto 3000**: Desarrollo
- **Puerto 80**: Producción

## 🐛 Solución de Problemas

### Docker no está ejecutándose
```bash
# Verificar estado
./scripts/check-docker.sh

# Iniciar Docker Desktop manualmente
open -a Docker
```

### Error de puertos ocupados
```bash
# Verificar puertos en uso
lsof -i :3000
lsof -i :80

# Cambiar puertos en docker-compose.yml
ports:
  - "3001:3000"  # Cambiar 3000 por 3001
```

### Error de permisos
```bash
# En Linux, agregar usuario al grupo docker
sudo usermod -aG docker $USER
newgrp docker
```

### Limpiar Docker
```bash
# Parar todos los contenedores
docker-compose down

# Limpiar imágenes no utilizadas
docker system prune -a

# Limpiar volúmenes
docker volume prune
```

### Reconstruir desde cero
```bash
# Parar y eliminar todo
docker-compose down -v
docker system prune -a

# Reconstruir
docker-compose build --no-cache
```

## 📊 Monitoreo

### Ver recursos de contenedores
```bash
docker stats
```

### Ver logs en tiempo real
```bash
docker-compose logs -f --tail=100
```

### Ver información del contenedor
```bash
docker-compose ps
docker inspect emplea-plus-dev
```

## 🔒 Seguridad

### Headers de Seguridad
Nginx está configurado con:
- **X-Frame-Options**: SAMEORIGIN
- **X-XSS-Protection**: 1; mode=block
- **X-Content-Type-Options**: nosniff
- **Content-Security-Policy**: Configurado

### Variables de Entorno
- **NODE_ENV**: development/production
- **REACT_APP_API_URL**: URL de la API
- **CHOKIDAR_USEPOLLING**: Para hot reload en Docker

## 🚀 Despliegue

### Desarrollo Local
```bash
./scripts/docker-dev.sh
```

### Producción Local
```bash
./scripts/docker-prod.sh
```

### Despliegue en Servidor
```bash
# Construir imagen de producción
docker-compose build emplea-plus-prod

# Ejecutar en servidor
docker-compose up -d emplea-plus-prod
```

## 📝 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `./scripts/check-docker.sh` | Verificar estado de Docker |
| `./scripts/docker-dev.sh` | Iniciar desarrollo |
| `./scripts/docker-prod.sh` | Iniciar producción |
| `./scripts/docker-test.sh` | Ejecutar tests |

## 🎯 Ventajas de Docker

### ✅ **Sin problemas de dependencias**
- Entorno aislado y reproducible
- Sin conflictos de versiones
- Instalación limpia cada vez

### ✅ **Desarrollo consistente**
- Mismo entorno para todos los desarrolladores
- Configuración idéntica en todas las máquinas
- Sin "funciona en mi máquina"

### ✅ **Despliegue simplificado**
- Build optimizado para producción
- Configuración de Nginx incluida
- Fácil escalabilidad

### ✅ **Testing confiable**
- Entorno de testing aislado
- Tests consistentes en CI/CD
- Sin interferencias del sistema local

## 🆘 Soporte

Si encuentras problemas:

1. **Verificar Docker**: `./scripts/check-docker.sh`
2. **Revisar logs**: `docker-compose logs -f`
3. **Reconstruir**: `docker-compose build --no-cache`
4. **Limpiar**: `docker system prune -a`

---

**🐳 Docker hace que Emplea+ sea más accesible para todos los desarrolladores!** 
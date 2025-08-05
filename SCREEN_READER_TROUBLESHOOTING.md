# 🔧 Guía de Solución de Problemas - Lector de Pantalla

## 🚨 Problemas Comunes y Soluciones

### ❌ **No se reproduce audio al hacer clic en "Leer Vacante"**

#### **Posibles causas y soluciones:**

### 1. **Permisos del Navegador**
```
✅ Solución: Verificar permisos de audio
```
- **Chrome/Edge:** 
  - Ve a `chrome://settings/content/sound`
  - Asegúrate de que el sitio no esté bloqueado
  - Verifica que el volumen del navegador esté activado

- **Firefox:**
  - Ve a `about:preferences#privacy`
  - Busca "Permisos" y verifica audio
  - Asegúrate de que el sitio tenga permisos

- **Safari:**
  - Ve a Preferencias > Sitios web > Audio
  - Permite el audio para este sitio

### 2. **Web Speech API no disponible**
```
✅ Solución: Usar navegador compatible
```
- **Navegadores compatibles:**
  - ✅ Chrome 33+
  - ✅ Firefox 49+
  - ✅ Safari 7+
  - ✅ Edge 79+

- **Navegadores NO compatibles:**
  - ❌ Internet Explorer
  - ❌ Versiones antiguas de navegadores

### 3. **Voces no cargadas**
```
✅ Solución: Esperar inicialización
```
- El componente muestra "Inicializando lector de pantalla..."
- Espera a que aparezca "Estado: Soportado | Inicializado: Sí"
- Si no se inicializa, recarga la página

### 4. **Volumen del sistema**
```
✅ Solución: Verificar volumen
```
- Asegúrate de que el volumen del sistema esté activado
- Verifica que no esté en modo silencioso
- Comprueba que los altavoces/auriculares estén conectados

### 5. **Interacción del usuario requerida**
```
✅ Solución: Interacción previa necesaria
```
- Algunos navegadores requieren interacción del usuario antes de reproducir audio
- Haz clic en cualquier parte de la página antes de usar el lector
- Intenta hacer clic en el botón de prueba primero

## 🧪 **Componente de Prueba**

### **Ubicación:**
- Ve a tu perfil (página de configuración)
- Busca la sección "🧪 Test del Lector de Pantalla"
- Haz clic en "Probar Lector de Pantalla"

### **Información de Debug:**
El componente muestra:
- ✅ **Navegador:** Tu navegador actual
- ✅ **Web Speech API:** Disponible/No disponible
- ✅ **SpeechSynthesisUtterance:** Disponible/No disponible
- ✅ **Estado de lectura:** Leyendo/Detenido

## 🔍 **Verificación Paso a Paso**

### **Paso 1: Verificar compatibilidad**
```javascript
// Abre la consola del navegador (F12) y ejecuta:
console.log('speechSynthesis:', 'speechSynthesis' in window);
console.log('SpeechSynthesisUtterance:', 'SpeechSynthesisUtterance' in window);
```

### **Paso 2: Verificar voces disponibles**
```javascript
// En la consola:
const voices = window.speechSynthesis.getVoices();
console.log('Voces disponibles:', voices.length);
voices.forEach(voice => console.log(voice.name, voice.lang));
```

### **Paso 3: Probar síntesis básica**
```javascript
// En la consola:
const utterance = new SpeechSynthesisUtterance('Hola mundo');
window.speechSynthesis.speak(utterance);
```

## 🛠️ **Soluciones Avanzadas**

### **Problema: Chrome no reproduce audio**
```
✅ Solución: Habilitar flags
```
1. Ve a `chrome://flags/`
2. Busca "Speech Synthesis"
3. Habilita "Speech Synthesis API"
4. Reinicia Chrome

### **Problema: Firefox no funciona**
```
✅ Solución: Verificar media.autoplay
```
1. Ve a `about:config`
2. Busca `media.autoplay.enabled`
3. Establece en `true`

### **Problema: Safari en macOS**
```
✅ Solución: Verificar permisos del sistema
```
1. Ve a Preferencias del Sistema > Seguridad y Privacidad
2. Pestaña "Privacidad" > "Accesibilidad"
3. Asegúrate de que Safari esté permitido

## 📱 **Problemas en Móviles**

### **iOS Safari:**
- Requiere interacción del usuario
- Verifica que no esté en modo silencioso
- Asegúrate de que el volumen esté activado

### **Android Chrome:**
- Verifica permisos de audio
- Asegúrate de que no esté en modo "No molestar"
- Comprueba que los altavoces estén activados

## 🔧 **Debugging Avanzado**

### **Logs del componente:**
El componente muestra logs en la consola:
```
✅ "Voces disponibles: X"
✅ "Speech Synthesis inicializado correctamente"
✅ "Iniciando lectura..."
✅ "Comando de lectura enviado"
✅ "Lectura completada"
```

### **Errores comunes:**
```
❌ "Error al inicializar el lector de pantalla"
❌ "Error al iniciar la lectura"
❌ "Web Speech API no está disponible"
```

## 📞 **Soporte**

### **Si nada funciona:**
1. **Cambia de navegador** - Prueba Chrome, Firefox, Safari
2. **Actualiza el navegador** - Usa la versión más reciente
3. **Desactiva extensiones** - Algunas bloquean audio
4. **Verifica el sistema** - Reinstala drivers de audio

### **Información para reportar:**
- Navegador y versión
- Sistema operativo
- Mensajes de error en consola
- Resultado del componente de prueba

## 🎯 **Mejores Prácticas**

### **Para usuarios:**
- ✅ Usa navegadores actualizados
- ✅ Verifica el volumen antes de usar
- ✅ Haz clic en la página antes de usar el lector
- ✅ Usa el componente de prueba primero

### **Para desarrolladores:**
- ✅ Siempre verifica compatibilidad
- ✅ Maneja errores graciosamente
- ✅ Proporciona feedback visual
- ✅ Incluye información de debug

---

**¿Necesitas ayuda adicional?** 
Revisa la consola del navegador (F12) para ver mensajes de error específicos. 
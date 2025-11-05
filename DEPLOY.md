# 🚀 Guía de Deployment en Vercel

## InnovaClass - Simulador Docente 360°

---

## ✅ Estado Actual

Tu proyecto ya está completamente subido a GitHub:
- **Repositorio**: https://github.com/FacundoMaco/InnovaClass.git
- **Rama principal**: `main`
- **Commits**: 3 commits realizados exitosamente
- **Archivos incluidos**: Todos los archivos necesarios (21 archivos)

---

## 📦 Archivos de Configuración Preparados

### ✅ `vercel.json` (Ya creado)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### ✅ `package.json` (Ya configurado)
- Scripts de build listos
- Dependencias definidas

### ✅ `.gitignore` (Optimizado)
- Excluye `node_modules`
- Excluye archivos de build
- Excluye variables de entorno

---

## 🌐 Pasos para Deploy en Vercel

### Opción 1: Desde el Dashboard de Vercel (Recomendado)

1. **Inicia sesión en Vercel**
   - Ve a https://vercel.com
   - Inicia sesión con tu cuenta de GitHub

2. **Importar Proyecto**
   - Click en "Add New..." → "Project"
   - Selecciona el repositorio `FacundoMaco/InnovaClass`

3. **Configuración del Proyecto**
   - **Framework Preset**: Vercel detectará automáticamente "Vite"
   - **Root Directory**: Deja vacío o usa `Innovaclass Simulador Docente 360`
   - **Build Command**: `npm run build` (ya configurado en vercel.json)
   - **Output Directory**: `dist` (ya configurado en vercel.json)
   - **Install Command**: `npm install` (automático)

4. **Variables de Entorno (Opcional)**
   - Si necesitas `GEMINI_API_KEY`:
     - Agrega la variable en la sección "Environment Variables"
     - Nombre: `GEMINI_API_KEY`
     - Valor: Tu clave de API

5. **Deploy**
   - Click en "Deploy"
   - Vercel construirá y desplegará automáticamente

### Opción 2: Desde la Terminal (CLI de Vercel)

1. **Instalar Vercel CLI** (si no lo tienes)
   ```bash
   npm i -g vercel
   ```

2. **Login en Vercel**
   ```bash
   vercel login
   ```

3. **Ir al directorio del proyecto**
   ```bash
   cd "Innovaclass Simulador Docente 360"
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   
   - Sigue las instrucciones interactivas
   - Primera vez preguntará si quieres conectar a un proyecto existente
   - Selecciona el proyecto `InnovaClass` si aparece

5. **Deploy a Producción**
   ```bash
   vercel --prod
   ```

---

## ⚙️ Configuración Específica para Vercel

### Framework Detection
Vercel detectará automáticamente Vite gracias al `vercel.json`.

### Rutas SPA (Single Page Application)
El archivo `vercel.json` ya incluye el rewrite necesario para que todas las rutas redirijan a `index.html` (requerido para React Router o navegación client-side).

### Variables de Entorno
Si necesitas usar variables de entorno en producción:

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega las variables necesarias
4. Vuelve a hacer deploy

---

## 🔍 Verificación Post-Deploy

Después del deploy, verifica:

1. ✅ La aplicación carga correctamente
2. ✅ La imagen panorámica se muestra
3. ✅ Los hotspots funcionan
4. ✅ Las interacciones responden correctamente
5. ✅ El modo oscuro/claro funciona
6. ✅ La navegación es fluida

---

## 📝 Comandos Útiles

### Ver logs del deploy
```bash
vercel logs
```

### Ver información del proyecto
```bash
vercel inspect
```

### Listar todos los deployments
```bash
vercel ls
```

---

## 🐛 Troubleshooting

### Problema: La aplicación no carga
- **Solución**: Verifica que `vercel.json` tenga el rewrite correcto
- Verifica que `outputDirectory` sea `dist`

### Problema: Rutas 404 en navegación directa
- **Solución**: El `vercel.json` ya incluye el rewrite necesario
- Si persiste, verifica que el build genere correctamente `dist/index.html`

### Problema: Imágenes no cargan
- **Solución**: Verifica que `public/Assets/` esté en el repositorio
- Las imágenes en `public/` se sirven automáticamente

### Problema: Build falla
- **Solución**: 
  - Verifica que todas las dependencias estén en `package.json`
  - Ejecuta `npm install` localmente para verificar
  - Revisa los logs del build en Vercel Dashboard

---

## 🔄 Actualizaciones Futuras

Para hacer cambios y re-deploy:

1. **Hacer cambios localmente**
2. **Commit y push a GitHub**
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push
   ```
3. **Vercel detectará automáticamente** el push y hará un nuevo deploy
4. O puedes hacer deploy manual desde Vercel Dashboard

---

## 📊 Monitoreo

Una vez desplegado, puedes:
- Ver analytics en Vercel Dashboard
- Revisar logs en tiempo real
- Configurar dominios personalizados
- Configurar preview deployments para PRs

---

## 🎉 ¡Listo!

Una vez completado el deploy, tendrás:
- ✅ URL de producción de Vercel (ej: `innova-class.vercel.app`)
- ✅ Deploy automático con cada push a `main`
- ✅ Preview deployments para cada PR
- ✅ SSL automático
- ✅ CDN global

---

**¡Tu aplicación estará lista para compartir!** 🚀

Para más información: https://vercel.com/docs


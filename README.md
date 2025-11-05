# InnovaClass - Simulador Docente 360°

<div align="center">
  <h3>🌄 Simulador Pedagógico Inmersivo para Docentes de Escuelas Rurales</h3>
  <p>Entorno seguro de práctica para desarrollar competencias pedagógicas en contextos rurales multigrado</p>
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/FacundoMaco/InnovaClass)
</div>

---

## 📋 Descripción

**InnovaClass** es una aplicación web interactiva que utiliza tecnología de visualización 360° para capacitar a docentes que trabajan en escuelas rurales y de recursos limitados del Perú. Los docentes pueden practicar situaciones pedagógicas reales en un entorno seguro e inmersivo, recibiendo retroalimentación inmediata sobre sus decisiones.

### Características Principales

- 🎥 **Visualización 360° inmersiva** del aula rural
- 🎯 **4 capacitaciones especializadas** (3 pedagógicas + 1 académica)
- 📊 **Sistema de evaluación pedagógica** en 4 dimensiones
- 👤 **Personalización del perfil docente**
- 🌿 **Contenido contextualizado** a la realidad rural peruana
- 📱 **Diseño responsive** y moderno
- 🌙 **Modo oscuro/claro**

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/FacundoMaco/InnovaClass.git
   cd "Innovaclass Simulador Docente 360"
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Build para Producción

```bash
npm run build
npm run preview
```

---

## 📚 Capacitaciones Disponibles

### Pedagógicas

1. **Manejo de Conflictos**
   - Resolución constructiva en contextos de recursos limitados
   - Gestión de conflictos por recursos compartidos

2. **Fomentando la Participación**
   - Estrategias para estudiantes tímidos
   - Valoración del conocimiento local y tradicional

3. **Inclusión y Diversidad**
   - Integración intercultural genuina
   - Valoración de lenguas originarias

### Académicas

4. **Fotosíntesis (Bioquímica)**
   - Enseñanza de ciencias usando el entorno natural
   - STEM en contextos rurales

---

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos utilitarios
- **Pannellum** - Visualización panorámica 360°
- **Lucide React** - Iconos

---

## 📁 Estructura del Proyecto

```
Innovaclass Simulador Docente 360/
├── public/
│   └── Assets/
│       └── aularural.png        # Imagen panorámica 360°
├── components/
│   ├── HotspotCard.tsx
│   ├── HotspotList.tsx
│   ├── ImageUploader.tsx
│   └── Spinner.tsx
├── services/
│   ├── staticScenario.ts        # Escenarios y contenido
│   └── geminiService.ts
├── App.tsx                       # Componente principal
├── index.tsx                     # Punto de entrada
├── types.ts                      # Definiciones TypeScript
├── vite.config.ts               # Configuración Vite
└── package.json
```

---

## 🎓 Sistema de Evaluación

Cada decisión pedagógica se evalúa en 4 dimensiones:

- **💗 Empatía**: Comprensión de necesidades emocionales
- **🛡️ Asertividad**: Control y liderazgo del aula
- **👥 Inclusividad**: Valoración de la diversidad cultural
- **🔀 Manejo de Conflictos**: Resolución constructiva

---

## 🌐 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio de GitHub a [Vercel](https://vercel.com)
2. El archivo `vercel.json` ya está configurado
3. Vercel detectará automáticamente el framework y desplegará

### Otros Plataformas

El proyecto genera archivos estáticos en `dist/` que pueden desplegarse en:
- Netlify
- GitHub Pages
- Cualquier servidor estático

---

## 📖 Documentación

- **[CONTENIDO_CAPACITACIONES.md](./CONTENIDO_CAPACITACIONES.md)** - Detalle completo de todos los escenarios pedagógicos
- **[RESUMEN_PRESENTACION.md](./RESUMEN_PRESENTACION.md)** - Resumen ejecutivo del proyecto
- **[AUDIT.md](./AUDIT.md)** - Auditoría técnica y mejoras implementadas

---

## 🎯 Características Destacadas

### Contextualización Cultural
- Nombres auténticos (María, Wayra, Carmen)
- Situaciones reales de aulas rurales multigrado
- Valoración explícita de lenguas originarias (quechua, asháninka)
- Integración del conocimiento comunitario y agrícola

### Pedagogía Fundamentada
- Basado en teorías validadas (Pedagogía Situada, EIB)
- Retroalimentación pedagógica profesional
- Soluciones prácticas sin tecnología costosa

### Experiencia de Usuario
- Interfaz moderna y intuitiva
- Transiciones suaves
- Feedback visual inmediato
- Guardado de progreso local

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo desarrollo para uso educativo en escuelas rurales del Perú.

---

## 👥 Autores

- **Facundo Maco** - Desarrollo y Programación

---

## 🙏 Agradecimientos

- Docentes rurales del Perú por su inspiración
- Comunidades educativas rurales por compartir sus experiencias
- Pannellum por la biblioteca de visualización 360°

---

## 📧 Contacto

Para preguntas o sugerencias sobre el proyecto, puedes abrir un issue en el repositorio.

---

<div align="center">
  <p>Desarrollado con ❤️ para docentes rurales del Perú</p>
  <p>Versión 2.0 | Noviembre 2025</p>
</div>

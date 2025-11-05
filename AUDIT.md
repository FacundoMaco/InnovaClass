# Auditoría del Código y Plan de Mejora: InnovaClass

## 1. Resumen General

InnovaClass es una aplicación de simulación 360° construida con React, TypeScript y Pannellum. Su objetivo es proporcionar a los docentes un entorno interactivo para practicar habilidades pedagógicas y académicas. La aplicación ha evolucionado de un modelo dinámico basado en IA (para la generación de escenarios) a un modelo estático más controlado y fiable.

## 2. Lógica y Flujo de Datos

El flujo de la aplicación es el siguiente:

1.  **Inicio (`index.tsx`)**: Monta el componente principal `App` en el DOM.
2.  **Pantalla de Bienvenida (`App.tsx`)**:
    *   El estado inicial de la aplicación es `'welcome'`.
    *   Se renderiza el componente `WelcomeScreen`, que muestra las capacitaciones disponibles (pedagógicas y académicas).
    *   El usuario selecciona un tema. Esto llama a `handleStartSimulation`.
3.  **Inicio de la Simulación (`App.tsx`)**:
    *   `handleStartSimulation` cambia el estado de la aplicación a `'simulation'`.
    *   Llama a `getScenarioByTopicId` del servicio `services/staticScenario.ts` para obtener los datos del escenario (imagen, hotspots, interacciones) basados en el ID del tema seleccionado.
    *   El escenario se guarda en el estado `currentScenario`.
4.  **Vista de Simulación (`App.tsx`)**:
    *   Se renderiza la interfaz principal de la simulación, que incluye:
        *   Un `header` con el título y los botones de acción (Ver Puntaje, Iniciar Interacción, Volver al Menú).
        *   El componente `ScenarioViewer`, que recibe los datos del escenario y renderiza el panorama 360° con Pannellum.
        *   Un `ScoreModal` que muestra el puntaje o los objetivos, y que se activa con el botón "Ver Puntaje".
        *   Paneles condicionales para la interacción y el feedback, que aparecen cuando el estado de la vista (`viewState`) cambia de `'exploring'` a `'interaction'` o `'feedback'`.
5.  **Interacción**:
    *   El usuario puede hacer clic en un hotspot (`onHotspotClick`) o en el botón "Iniciar Interacción" (`handleTriggerInteraction`).
    *   Ambas acciones actualizan el estado `activeInteraction` y cambian `viewState` a `'interaction'`, mostrando el contexto y las opciones de respuesta.
    *   Al seleccionar una opción (`handleSelectOption`), se actualiza el puntaje, se guarda la opción seleccionada y se cambia `viewState` a `'feedback'`.
    *   El panel de feedback se muestra. Al hacer clic en "Continuar" (`handleNext`), la aplicación vuelve al estado `'exploring'`.

---

## 3. Puntos Críticos y Áreas de Mejora

### Crítico - Carga de la Imagen (Causa del Error Actual)

*   **Problema**: El intento de incrustar una imagen de ~3.5MB como una cadena Base64 en el archivo JavaScript es la causa principal de que la aplicación se congele. El motor de JavaScript del navegador se bloquea al intentar analizar y asignar memoria para una cadena de texto tan masiva, impidiendo que la aplicación se renderice.
*   **Solución (Implementada)**: Mover la imagen a una carpeta de activos estáticos (como `/public` o `/assets`) y referenciarla con una URL simple y directa (ej. `/assets/aularural.png`). Esto permite que el navegador cargue la imagen de forma asíncrona y eficiente, como cualquier otro recurso web, sin bloquear la ejecución del código.

### Arquitectura y "Spaghetti Code"

*   **Problema**: El archivo `App.tsx` es un "Componente Dios" que maneja casi toda la lógica y la renderización de la aplicación (bienvenida, simulación, modales, estado). Esto lo hace difícil de leer, mantener y depurar.
*   **Mejora Sugerida**:
    1.  **Dividir `App.tsx`**: Extraer la lógica y la vista de la simulación a su propio componente (ej. `SimulationView.tsx`).
    2.  **Componentes Atómicos**: Extraer los componentes internos (`Scoreboard`, `Options`, `Feedback`, `WelcomeScreen`) a sus propios archivos en una carpeta `components/`. Esto ya se ha hecho parcialmente, pero podría ser más consistente.
    3.  **Gestión de Estado**: El estado en `App.tsx` está creciendo. Para una mayor escalabilidad, se podría usar `useReducer` para gestionar las transiciones de estado complejas o el Context API para pasar datos como `score` y `scenario` sin necesidad de "prop drilling".

### Código Heredado y Sin Uso

*   **Problema**: El proyecto contiene archivos de componentes de iteraciones anteriores que ya no se utilizan (`ImageUploader.tsx`, `HotspotList.tsx`, `HotspotCard.tsx`, `Spinner.tsx`). También existe el archivo `services/geminiService.ts` que está vacío.
*   **Solución (Implementada)**: Eliminar estos archivos para limpiar el código base, reducir la confusión y facilitar la incorporación de nuevos desarrolladores.

### Servicio de Escenario Estático

*   **Problema**: La función `getScenarioByTopicId` en `staticScenario.ts` funciona, pero modifica un objeto `defaultScenario` mediante una copia profunda (`JSON.parse(JSON.stringify(...))`). Esto es un poco ineficiente y propenso a errores si el objeto contiene tipos de datos no serializables (como funciones o `undefined`).
*   **Mejora Sugerida**: Refactorizar para tener una función de "fábrica" (`createScenario`) que construya el objeto de escenario desde cero basado en una configuración base y las personalizaciones del tema. Esto es más explícito y seguro.

## 4. Conclusión

La aplicación tiene una base funcional sólida. El principal problema que impide su funcionamiento es la estrategia de carga de imágenes. Al solucionar este punto crítico y seguir las recomendaciones para refactorizar y limpiar el código, InnovaClass se convertirá en una herramienta mucho más robusta, mantenible y escalable.
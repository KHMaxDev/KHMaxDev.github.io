# Auditoría y corrección de `avatar.glb` y la animación `floating`

- **Proyecto:** `stats_viewer` (React + Vite + Three.js + React Three Fiber)
- **Fecha:** 2026-10-19
- **Archivo auditado:** `public/avatar.glb`
- **Síntoma reportado:** la pierna derecha presenta *glitches* al reproducir `floating`
- **Resultado:** causa raíz localizada y corregida en los datos de animación; `Character.jsx` no necesitó cambios

---

## A. Resumen ejecutivo

El problema no estaba en la lógica de React, en `useAnimations` ni en un conflicto de mezcladores. Estaba en el propio recurso: dentro de la animación `floating`, el track de rotación de `Right Leg` tenía **dos keyframes separados por 0,004 segundos** con una diferencia angular de **130°**.

Al tener una duración de solo `0.004 s` y reproducirse con `LoopRepeat`, el clip se reiniciaba varias veces por frame a 60 fps. El resultado era una oscilación brusca de la pierna derecha entre dos orientaciones, no una interpolación visible. Las transiciones con `fadeIn`/`fadeOut` mezclaban esa oscilación con la pose anterior y hacían el defecto aún más evidente.

La corrección consistió en conservar únicamente el keyframe de `t = 0` de ese track (la pose nueva que define el resto de `floating`) y eliminar el key de `t = 0.004` (una pose heredada de `avatar3.glb`). Con eso, `floating` pasa de `0.004 s` a una pose estática de duración `0`, igual que los otros tres clips.

No se eliminaron animaciones, canales, nodos, mallas, materiales ni texturas. El archivo original quedó respaldado en `.backup/avatar.original.glb`.

---

## B. Diagnóstico

### B.1. Archivos inspeccionados

| Archivo | Relevancia |
|---|---|
| `src/three/Character.jsx` | Carga del modelo, selección de clips, `useAnimations`, fades |
| `src/three/Scene3D.jsx` | `<Canvas>`, cámara, `OrbitControls`, tone mapping |
| `src/three/CameraController.jsx` | Presets de cámara por pestaña |
| `src/App.jsx` | Estado `activeTab` que activa `floating` |
| `src/data/tabs.js`, `src/data/portfolio.js` | Navegación y contenido |
| `public/avatar.glb` | Recurso 3D auditado |
| `public/avatar3.glb` | Exportación anterior del mismo modelo; referencia de comparación |
| `dist/avatar.glb` | Build anterior; coincidía con `avatar3.glb` |
| `package.json` | Versiones de Three.js, R3F, Drei y GSAP |

No existe repositorio Git en el directorio (`git status` devuelve “not a git repository”), así que no había historial de cambios que pudiera sobrescribirse.

### B.2. Flujo de animaciones en `Character.jsx`

1. **Carga del modelo** — `src/three/Character.jsx:24` y `:27`
   - `useGLTF.preload('/avatar.glb')` se ejecuta a nivel de módulo.
   - `useGLTF('/avatar.glb')` usa la caché de Drei; no se clona el personaje.
   - `gltf.scene` se pasa a `useAnimations` y se renderiza con `<primitive>` (`:51`).

2. **Creación del mezclador** — `src/three/Character.jsx:28`
   - `useAnimations(animations, scene)` de `@react-three/drei` crea **un único `AnimationMixer`**.
   - Drei actualiza ese mezclador dentro de su propio `useFrame` usando el delta real del render.
   - No hay ningún `new AnimationMixer()` manual en el proyecto.

3. **Selección del clip** — `src/three/Character.jsx:7-12`
   ```js
   knowledge -> flex
   projects  -> pointing
   traits    -> floating
   info      -> idle
   ```
   La pestaña `traits` (“Actitudes”) es la que activa `floating`.

4. **Cambio de animación** — `src/three/Character.jsx:31-49`
   - Busca el clip solicitado por nombre; si no existe, usa el primero.
   - Si ya está activo: `reset().fadeIn(0.5).play()`.
   - Si cambia: `fadeOut(0.5)` de la acción anterior y `reset().fadeIn(0.5).play()` de la nueva.
   - No se usa `crossFadeTo`, pero los pesos de `fadeIn`/`fadeOut` son coherentes.
   - No hay asignación manual de `weight`, `timeScale` ni llamadas a `stopAllAction()`.

5. **Bucle de render**
   - `useFrame` en `src/three/Character.jsx:57-61` **solo** gira el halo (`haloRef.rotation.z`).
   - No modifica piernas, brazos, posiciones ni rotaciones del avatar.
   - No hay IK, física, retargeting ni escritura externa de transformaciones.
   - `OrbitControls` mueve la cámara, no los nodos del personaje.

**Conclusión del flujo:** la implementación de React/R3F es correcta para este caso. No hay mezcladores duplicados, ni bucles que compitan por la misma pierna, ni un estado mutable rápido conectado a props 3D.

### B.3. Estructura real del recurso

Hallazgo importante: `public/avatar.glb` **no es un GLB binario**. Es un **glTF 2.0 en texto JSON con el buffer embebido en base64**, generado por **Blockbench 5.2.2 glTF exporter**. `GLTFLoader` lo carga correctamente porque detecta el contenido y lo trata como `.gltf`, pero la extensión es engañosa.

Estructura:

| Elemento | Cantidad |
|---|---|
| Nodos | 19 |
| Mallas | 12 |
| Primitivas | 12 |
| Skins | 0 |
| Materiales | 1 |
| Texturas | 1 |
| Animaciones | 4 |
| Buffer | 1 (10.588 bytes, base64) |

El avatar es **rígido, estilo Blockbench/Minecraft**, sin skinning:

```text
Waist
├── Head (mesh Head + Hat Layer)
├── Body (mesh Body + Body Layer)
├── Right Arm (mesh + layer)
└── Left Arm (mesh + layer)
Right Leg (mesh + layer)
Left Leg  (mesh + layer)
```

Las piernas son nodos independientes con pivote en la cadera y un nodo hijo para la malla. No hay huesos con pesos, no hay escalas nulas, no hay ciclos y cada nodo tiene un solo padre. Three.js sanea los nombres (`Right Leg` → `Right_Leg`), pero los tracks se enlazan correctamente.

### B.4. Inventario de animaciones antes de corregir

| Clip | Duración | Tracks | Canales |
|---|---:|---:|---|
| `idle` | 0 s | 3 | Right Arm rotation, translation, scale |
| `floating` | **0.004 s** | **10** | Waist rotation/translation, Head rotation, Right Arm rotation, Left Arm rotation/translation, **Right Leg rotation (2 keys)**, Right Leg translation, Left Leg rotation/translation |
| `pointing` | 0 s | 6 | Waist, Head, ambos brazos y ambas piernas (rotation) |
| `flex` | 0 s | 7 | Head, brazos y piernas con rotación/traslación |

Los clips `idle`, `pointing` y `flex` son **poses estáticas**: todos sus tracks tienen un único keyframe en `t = 0`.

### B.5. Track anómalo de la pierna derecha

Canal: `Right Leg.rotation`, sampler 6 de `floating`.

| Key | Tiempo | Cuaternión `[x, y, z, w]` | Magnitud | Ángulo aproximado |
|---|---:|---|---:|---:|
| 0 | `0.000000` | `[0, 0, 0.9883615, 0.1521234]` | 1.000000 | **162.50°** |
| 1 | `0.004000` | `[0, 0, 0.2798290, 0.9600499]` | 1.000000 | **32.50°** |

- Diferencia angular entre keys: **130°**.
- Duración del clip: **0.004 s**.
- Tiempos finitos y ordenados.
- Cuaterniones normalizados y válidos.
- No hay canales duplicados para el mismo nodo/propiedad.
- No hay `NaN` ni infinitos.
- No hay escalas negativas ni transformaciones sospechosas.

**Comparación con `avatar3.glb`:** en la exportación anterior, `floating` tenía `Right Leg.rotation` con **un solo key** de **32.50°**. El segundo key del archivo actual (`32.50°`) coincide exactamente con esa pose heredada. El key de `t = 0` (`162.50°`) es el valor nuevo que acompaña a los canales nuevos de `Waist`, `Left Leg`, `Left Arm.translation`, etc.

La inspección visual controlada de ambas orientaciones mostró que el valor heredado de `32.5°` producía una intersección de la pierna con el torso en la pose nueva, mientras que `162.5°` era la orientación coherente con el resto de la pose. Por eso se conservó el key de `t = 0`.

### B.6. Causa raíz

Clasificación: **A (datos defectuosos en el GLB) + C (problema de tiempos/interpolación)**.

No es:

- **B (jerarquía/pivotes):** la jerarquía es válida y la pose estática se ve bien.
- **D (conflicto entre animaciones):** el fallo se reproduce con `floating` aislada.
- **E (mixer):** Drei crea un solo mixer y lo actualiza correctamente.
- **F (React/render):** no hay re-render por frame ni efectos que dupliquen acciones.
- **G (modificaciones externas):** nada escribe las piernas fuera del mixer.

**Mecanismo del glitch:** `floating` dura `0.004 s`. A 60 fps el delta es `0.0167 s`, es decir, más de cuatro veces la duración del clip. Con `LoopRepeat`, Three.js reinicia el tiempo del clip varias veces por frame. La pierna derecha no interpola de forma visible: salta entre fases del track y produce vibración/temblor. Al cambiar desde `flex` o hacia `idle`, el `fadeIn`/`fadeOut` mezcla esa oscilación con la pose anterior y el defecto se aprecia todavía más.

### B.7. Reproducción controlada antes de corregir

Se usó un arnés Node con la misma versión de Three.js del proyecto (`0.169.0`) y `GLTFLoader`, reproduciendo `floating` con `AnimationMixer` a 60 fps. Muestreo del ángulo de `Right Leg` en frames consecutivos:

```text
140.83°, 119.17°, 97.50°, 75.83°, 54.17°, 32.50°, 140.83°, 119.17°, ...
```

El salto de `32.50°` a `140.83°` confirma el reinicio del clip de 4 ms. En la secuencia real `flex -> floating -> idle` se observó la misma oscilación (por ejemplo, `65.8° -> 113.1°`).

---

## C. Cambios realizados

### C.1. `public/avatar.glb`

| Aspecto | Detalle |
|---|---|
| Problema corregido | Track `Right Leg.rotation` de `floating` con dos keys a 4 ms y 130° de diferencia |
| Cambio | Accessor de entrada `66`: `count` 2 → 1, `min/max` → `[0]`. Accessor de salida `67`: `count` 2 → 1, `min/max` → cuaternión de `t=0` |
| Datos binarios | Se conservó el buffer y su tamaño; se ponen a cero los 4 + 16 bytes que quedan fuera del nuevo `count` |
| Codificación | El buffer base64 se re-codificó sin cambiar offsets ni `bufferViews` |
| Resultado | `floating` pasa a duración `0`; la pierna derecha queda estática en `162.50°`; el resto de canales y la pose nueva se conservan |
| No se tocó | Nodos, jerarquía, mallas, material, textura, `idle`, `pointing`, `flex`, nombres ni transformaciones de reposo |

Hash del archivo original (respaldo):

```text
SHA-256 887D1A84F79114245935D782E5CD85329AF89C6D942A9B2B583AA50596799A6A
```

Hash después de la corrección:

```text
SHA-256 8F8A923CBB15034FEED28E4881F93AAD8809B21405835B8CC77A996898F8A13E
```

Respaldo intacto: `.backup/avatar.original.glb`

### C.2. `scripts/audit-avatar-animations.mjs` (nuevo)

Comprobación reproducible sin navegador. Carga el recurso con `GLTFLoader`, verifica que existan los cuatro clips, que `floating` sea estática, que no tenga tracks multi-key y que la pierna derecha no cambie entre 60 frames. Falla con código de salida distinto de cero si algo se rompe.

```bash
node scripts/audit-avatar-animations.mjs
```

Salida actual:

```json
{
  "animations": [
    { "name": "idle", "duration": 0, "tracks": 3 },
    { "name": "floating", "duration": 0, "tracks": 10 },
    { "name": "pointing", "duration": 0, "tracks": 6 },
    { "name": "flex", "duration": 0, "tracks": 7 }
  ],
  "rightLegAngle": 162.5,
  "stableFrames": 60,
  "failures": []
}
```

### C.3. `Character.jsx`

**No modificado.** La causa era de datos, no del flujo de React/R3F. Cambiar el código para “esconder” un clip de 4 ms habría enmascarado el error del recurso y habría fijado la pose en el key equivocado. Se mantiene el diseño actual de un solo mixer, fades de 0.5 s y actualización mediante `useAnimations`.

### C.4. `dist/`

Se regeneró con `npm run build`. `dist/avatar.glb` ahora coincide con el `public/avatar.glb` corregido.

---

## D. Pruebas ejecutadas

| Prueba | Resultado | Evidencia |
|---|---|---|
| Carga del GLB | **Aprobada** | `GLTFLoader` de Three.js 0.169 carga el recurso y devuelve 4 animaciones |
| Validación estructural | **Aprobada** | 1 buffer dentro de límites, 19 nodos sin ciclos ni multi-parent, 12 mallas con índices válidos, 0 skins, 1 material, 1 textura |
| `floating` aislada (antes) | **Fallida** (defecto reproducido) | Ángulo de `Right Leg` por frame: `140.83, 119.17, 97.50, 75.83, 54.17, 32.50`, reinicio a `140.83` |
| `floating` aislada (después) | **Aprobada** | 60 frames a 60 fps con ángulo estable `162.50°`; `duration: 0` |
| Otras animaciones | **Aprobada** | `idle` estable en 0°; `pointing` en 80.81°; `flex` en 85.86°; poses aplicadas correctamente |
| Transiciones `flex -> floating -> idle` | **Aprobada a nivel de mixer** | Los ángulos cambian de forma monotónica durante el fade de 0.5 s; no reaparece el salto de 130° por loop |
| Integración en navegador | **Aprobada** | Chrome headless sobre el build: la app carga, se hace clic en “Actitudes”, el panel cambia a `Actitudes` y no hay errores de runtime; solo un 404 de `favicon.ico` |
| Estabilidad visual entre frames | **Aprobada (parcial)** | Dos capturas separadas 200 ms: 84 píxeles con diferencia > 20 (halo/estrella), sin saltos de la pierna. La comparación no aísla solo la pierna |
| Compilación | **Aprobada** | `npm run build`: 640 módulos transformados, build correcto; solo warning de chunk > 500 kB |
| Comparación en Blockbench | **No ejecutada** | Blockbench no está instalado en el entorno |

---

## E. Limitaciones pendientes

1. **No hay Blockbench ni validador glTF oficial instalado.** La validación se hizo con un parser propio y con el `GLTFLoader` real de Three.js. No se pudo abrir el proyecto original `.bbmodel` (no existe en el repositorio).
2. **No se pudo comparar visualmente en Blockbench.** La comparación se hizo con un preview WebGL headless y con el análisis cinemático de posiciones de pie.
3. **La prueba de navegador usó SwiftShader (headless).** No sustituye una revisión visual en un navegador real con GPU, especialmente para evaluar artefactos de iluminación/texturas.
4. **La diferencia de píxeles entre capturas incluye halo y fondo estrellado.** No es una métrica exclusiva de la pierna; la prueba principal de estabilidad es el muestreo del `AnimationMixer`.
5. **Decisión de pose:** se conservó el key de `t = 0` porque es la pose nueva que acompaña a los canales añadidos en esta exportación; el key de `0.004` coincide exactamente con la pose antigua de `avatar3.glb`. Si el diseño pretendía la pose antigua, habría que reexportar desde Blockbench.
6. **`avatar.glb` es en realidad glTF JSON.** Funciona con `GLTFLoader`, pero puede confundir a otras herramientas. No se renombró para no cambiar la ruta usada por `Character.jsx`.
7. **Los clips de duración 0 hacen que `action.time` sea `NaN` en el arnés Node.** Es un comportamiento del cálculo de tiempo de Three.js para clips de duración cero; no afecta a la reproducción de la pose y el proyecto no lee `action.time`.

---

## F. Recomendaciones

### Necesarias para el problema actual

- Mantener el respaldo `.backup/avatar.original.glb`.
- Si se vuelve a editar el avatar en Blockbench, dejar `floating` con **un único keyframe** si es una pose estática, o definir una duración real (por ejemplo 1–2 s) y varios keys si se quiere movimiento. Evitar tracks de 4 ms.
- Reexportar y ejecutar `node scripts/audit-avatar-animations.mjs` antes de volver a compilar.

### Mejoras recomendadas

- **Renombrar** `avatar.glb` a `avatar.gltf` (o exportar un GLB binario real) para que la extensión coincida con el contenido. Si se renombra, actualizar `useGLTF.preload('/avatar.glb')` y `useGLTF('/avatar.glb')` en `Character.jsx`.
- Añadir el script de auditoría a un comando `npm run audit:avatar` o a la verificación previa al build.
- Añadir una advertencia en desarrollo si un clip de personaje tiene `duration < 1/60`, para detectar exportaciones degeneradas sin ocultar el problema:
  ```js
  if (import.meta.env.DEV && clip.duration < 1 / 60) {
    console.warn(`[avatar] clip degenerado: ${clip.name} (${clip.duration}s)`);
  }
  ```
- Documentar que las animaciones actuales son **poses estáticas**, no clips con movimiento continuo. Si en el futuro se añade movimiento real, revisar `LoopRepeat`, pesos y transiciones.
- Conservar la prueba de integración con Chrome/CDP como smoke test opcional del portafolio.

---

## Comandos de verificación

```bash
# Auditoría del recurso y de la estabilidad de Right Leg
node scripts/audit-avatar-animations.mjs

# Build de producción
npm run build

# Desarrollo y comprobación manual
npm run dev
# Abrir la app, pulsar "Actitudes" y observar la pierna derecha.
```

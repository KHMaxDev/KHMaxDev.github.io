---
name: threejs-react
description: "Integrates Three.js in React using React Three Fiber (R3F), @react-three/drei, and optimized rendering loops."
compatibility: opencode
---

## Contexto de la Skill
Esta skill proporciona las mejores prácticas para trabajar con WebGL dentro del ecosistema de React usando **React Three Fiber (R3F)**.

## Reglas de Implementación (React Three Fiber)

1. **El Componente `<Canvas>`:**
   - Todo objeto de Three.js DEBE ir dentro de un `<Canvas>`.
   - El `<Canvas>` crea su propio root de React. No le pases props de estado que cambien rápidamente, ya que desmontar/montar el Canvas es muy costoso.

2. **Rendimiento y Ciclo de Render (useFrame):**
   - **NUNCA** uses `useState` o `useEffect` para animaciones cuadro por cuadro (como rotaciones o seguimiento del ratón).
   - Usa `useRef` para acceder a los meshes y muta sus propiedades directamente dentro del hook `useFrame`.
   ```jsx
   const meshRef = useRef();
   useFrame((state, delta) => {
     meshRef.current.rotation.x += delta;
   });
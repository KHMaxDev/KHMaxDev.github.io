import { SKILLS } from './portfolio.js';

export const CATEGORIES = [
  { id: 'backend', label: 'Backend', color: '#7ee787', subtitle: 'Lógica y servicios' },
  { id: 'frontend', label: 'Frontend', color: '#5cc8ff', subtitle: 'Interfaz y estilos' },
  { id: 'datos', label: 'Datos', color: '#43c9e0', subtitle: 'Persistencia y caché' },
  { id: 'herramientas', label: 'Herramientas', color: '#ff8a54', subtitle: 'Flujo de trabajo' },
  { id: 'arquitectura', label: 'Arquitectura', color: '#2ee6b0', subtitle: 'APIs y documentación' },
];

const CATEGORY_GROUPS = {
  backend: ['Lenguajes de programación', 'Frameworks Backend', 'Entorno de ejecución'],
  frontend: ['Frontend', 'Maquetación y estilos', 'Gráficos 3D y WebGL'],
  datos: ['Bases de datos'],
  herramientas: ['Control de versiones', 'Herramientas de desarrollo', 'Sistemas operativos'],
  arquitectura: ['APIs e integración', 'Documentación y marcado'],
};

export const CATEGORY_TECHS = CATEGORIES.reduce((acc, category) => {
  const groups = CATEGORY_GROUPS[category.id] ?? [];
  acc[category.id] = SKILLS.filter((skill) => groups.includes(skill.category));
  return acc;
}, {});

export const TECH_CATEGORY = Object.entries(CATEGORY_TECHS).reduce((acc, [categoryId, techs]) => {
  techs.forEach((tech) => {
    acc[tech.name] = categoryId;
  });
  return acc;
}, {});

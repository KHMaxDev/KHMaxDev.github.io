export const SKILLS = [
  // 1. Lenguajes fundamentales
  { name: 'JavaScript', color: '#ffe14d', category: 'Lenguajes de programación', logo: '/logos/javascript.png' },
  { name: 'PHP', color: '#9aa7ff', category: 'Lenguajes de programación', logo: '/logos/php.png' },
  { name: 'TypeScript', color: '#2ee6b0', category: 'Lenguajes de programación', logo: '/logos/typescript.png' },
  { name: 'Python', color: '#6fb3ff', category: 'Lenguajes de programación', logo: '/logos/python.png' },

  // 2. Backend y desarrollo de aplicaciones
  { name: 'Laravel', color: '#ff4d3d', category: 'Frameworks Backend', logo: '/logos/laravel.png' },
  { name: 'Node.js', color: '#7ee787', category: 'Entorno de ejecución', logo: '/logos/node.png' },
  { name: 'APIs REST', color: '#2ee6b0', category: 'APIs e integración', logo: '/logos/api.png' },

  // 3. Fundamentos de desarrollo web
  { name: 'HTML', color: '#e6622e', category: 'Maquetación y estilos', logo: '/logos/html.png' },
  { name: 'CSS', color: '#2ea6e6', category: 'Maquetación y estilos', logo: '/logos/css.png' },
  { name: 'React', color: '#2ee6b0', category: 'Frontend', logo: '/logos/react.png' },
  { name: 'Tailwind CSS', color: '#5cc8ff', category: 'Maquetación y estilos', logo: '/logos/tailwind.png' },

  // 4. Bases de datos
  { name: 'PostgreSQL', color: '#68a8ff', category: 'Bases de datos', logo: '/logos/postgresql.png' },
  { name: 'MySQL', color: '#43c9e0', category: 'Bases de datos', logo: '/logos/mysql.png' },
  { name: 'MongoDB', color: '#2ee6b0', category: 'Bases de datos', logo: '/logos/mongodb.png' },

  // 5. Control de versiones y colaboración
  { name: 'Git', color: '#ff8a54', category: 'Control de versiones', logo: '/logos/git.png' },
  { name: 'GitHub', color: '#d5e2ea', category: 'Control de versiones', logo: '/logos/github.png' },

  // 6. Herramientas de desarrollo y pruebas
  { name: 'Composer', color: '#4a1d0b', category: 'Herramientas de desarrollo', logo: '/logos/composer.png' },
  { name: 'Postman', color: '#e6872e', category: 'Herramientas de desarrollo', logo: '/logos/postman.png' },
  { name: 'Docker', color: '#e6872e', category: 'Herramientas de desarrollo', logo: '/logos/docker.png' },
  { name: 'Visual Studio Code', color: '#0085c3', category: 'Herramientas de desarrollo', logo: '/logos/visualstudio.png' },

  // 7. Sistemas y conocimientos complementarios
  { name: 'Linux', color: '#bdc5c2', category: 'Sistemas operativos', logo: '/logos/linux.png' },
  { name: 'Three.js', color: '#000604', category: 'Gráficos 3D y WebGL', logo: '/logos/threejs.png' },
  { name: 'GSAP', color: '#0ea439', category: 'Gráficos 3D y WebGL', logo: '/logos/gsap.png' },
  { name: 'Markdown', color: '#150f8f', category: 'Documentación y marcado', logo: '/logos/markdown.png' },
  { name: 'LaTeX', color: '#150f8f', category: 'Documentación y marcado', logo: '/logos/latex.png' },
];

export const PROJECTS = [
  {
    name: 'Sistema Reporteador Estatal',
    role: 'Desarrollador Web',
    year: '2025 - 2026',
    stars: 5,
    description:
      'Plataforma web para la automatización y fiscalización de envíos de información de entes públicos, optimizando la trazabilidad y los tiempos de reporte institucional.',
    stack: ['Laravel', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    name: 'Plataforma de Investigadores de Quintana Roo',
    role: 'Desarrollador Web (Estadías)',
    year: '2025',
    stars: 5,
    description:
      'Sistema web de cobertura estatal diseñado para centralizar trámites, optimizar la experiencia de usuario y agilizar la gestión de los investigadores de la región.',
    stack: ['Laravel', 'Tailwind CSS', 'MySQL'],
  },
  {
    name: 'Medicura',
    role: 'Tech Lead & Database Architect',
    year: '2025',
    stars: 4,
    description:
      'Sistema de gestión de salud para la administración de consultas e historias clínicas. Incluyó migración de arquitectura de base de datos relacional a NoSQL para mejorar la escalabilidad del historial clínico.',
    stack: ['Laravel', 'MongoDB', 'MySQL', 'Bootstrap'],
  },
];

export const TRAITS = [
  { name: 'Aprendizaje continuo', level: 5, note: 'Adopto nuevas herramientas y patrones con rapidez.' },
  { name: 'Pensamiento analítico', level: 4, note: 'Descompongo problemas complejos en soluciones medibles.' },
  { name: 'Trabajo en equipo', level: 4, note: 'Comunicación clara en revisiones y pair programming.' },
  { name: 'Atención al detalle', level: 4, note: 'Código legible, testeable y consistente.' },
  { name: 'Liderazgo técnico', level: 3, note: 'Mentoría y definición de estándares de proyecto.' },
];

export const INFO = {
  name: 'Madox - KHMaxDev',
  role: 'Desarrollador Web',
  element: 'Anemo',
  region: 'Servidor de Producción',
  vision:
    'Construyo sistemas web fiables y escalables, cuidando tanto la arquitectura interna como la experiencia de quien los usa.',
  stats: [
    { label: 'Años de experiencia', value: '1+' },
    { label: 'Proyectos entregados', value: '3+' },
    { label: 'Nivel de estudios', value: 'Ing. Desarrollo y Gestion de Software' },
  ],
  contact: [
    { label: 'Email', value: 'quefajardomadox@gmail.com' },
    { label: 'LinkedIn', value: 'www.linkedin.com/in/madox-que-fajardo-948080363' },
    { label: 'GitHub', value: 'github.com/KHMaxDev' },
    { label: 'Ubicación', value: 'Remoto · Global' },
  ],
};
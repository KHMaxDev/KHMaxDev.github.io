export const DEFAULT_LANGUAGE = 'es';

export const LANGUAGES = ['es', 'en'];

export const translations = {
  es: {
    nav: {
      ariaLabel: 'Secciones del portafolio',
      brand: 'BIENVENIDO',
      brandSubtitle: 'Portafolio interactivo',
      hint: 'Eleva tu mirada · explora cada constelación',
    },
    tabs: {
      knowledge: { label: 'Conocimientos', hint: 'Artefactos' },
      projects: { label: 'Proyectos Elaborados', hint: 'Constelación' },
      traits: { label: 'Actitudes', hint: 'Talentos' },
      info: { label: 'Acerca de mí', hint: 'Info' },
    },
    categories: {
      backend: { label: 'Backend', subtitle: 'Lógica y servicios' },
      frontend: { label: 'Frontend', subtitle: 'Interfaz y estilos' },
      datos: { label: 'Datos', subtitle: 'Persistencia y caché' },
      herramientas: { label: 'Herramientas', subtitle: 'Flujo de trabajo' },
      arquitectura: { label: 'Arquitectura', subtitle: 'APIs y documentación' },
    },
    ui: {
      technologies: 'Tecnologías',
      categoriesAria: 'Categorías de conocimiento',
      knowledgeLead:
        'Mi caja de artefactos: herramientas que invoco a diario para construir, medir y desplegar.',
      projectsLead: 'Cada proyecto es una estrella trazada en mi constelación profesional.',
      traitsLead: 'Talentos pasivos que sostienen cada proyecto, más allá del código.',
      level: 'Nv.',
      rating: (stars) => `${stars} de 5 estrellas`,
      languageToggle: 'Idioma: Español. Cambiar a inglés.',
    },
    skillGroups: {
      'Lenguajes de programación': 'Lenguajes de programación',
      'Frameworks Backend': 'Frameworks Backend',
      'Entorno de ejecución': 'Entorno de ejecución',
      Frontend: 'Frontend',
      'Maquetación y estilos': 'Maquetación y estilos',
      'Gráficos 3D y WebGL': 'Gráficos 3D y WebGL',
      'Bases de datos': 'Bases de datos',
      'Control de versiones': 'Control de versiones',
      'Herramientas de desarrollo': 'Herramientas de desarrollo',
      'Sistemas operativos': 'Sistemas operativos',
      'APIs e integración': 'APIs e integración',
      'Documentación y marcado': 'Documentación y marcado',
    },
    projects: [
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
    ],
    traits: [
      { name: 'Aprendizaje continuo', level: 5, note: 'Adopto nuevas herramientas y patrones con rapidez.' },
      {
        name: 'Pensamiento analítico',
        level: 4,
        note: 'Descompongo problemas complejos en soluciones medibles.',
      },
      {
        name: 'Trabajo en equipo',
        level: 4,
        note: 'Comunicación clara en revisiones y pair programming.',
      },
      {
        name: 'Atención al detalle',
        level: 4,
        note: 'Código legible, testeable y consistente.',
      },
      {
        name: 'Liderazgo técnico',
        level: 3,
        note: 'Mentoría y definición de estándares de proyecto.',
      },
    ],
    info: {
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
    },
  },
  en: {
    nav: {
      ariaLabel: 'Portfolio sections',
      brand: 'WELCOME',
      brandSubtitle: 'Interactive portfolio',
      hint: 'Lift your gaze · explore every constellation',
    },
    tabs: {
      knowledge: { label: 'Knowledge', hint: 'Artifacts' },
      projects: { label: 'Projects', hint: 'Constellation' },
      traits: { label: 'Traits', hint: 'Talents' },
      info: { label: 'About Me', hint: 'Info' },
    },
    categories: {
      backend: { label: 'Backend', subtitle: 'Logic & services' },
      frontend: { label: 'Frontend', subtitle: 'Interface & styling' },
      datos: { label: 'Data', subtitle: 'Persistence & caching' },
      herramientas: { label: 'Tools', subtitle: 'Workflow' },
      arquitectura: { label: 'Architecture', subtitle: 'APIs & documentation' },
    },
    ui: {
      technologies: 'Technologies',
      categoriesAria: 'Knowledge categories',
      knowledgeLead: 'My artifact box: tools I summon daily to build, measure, and deploy.',
      projectsLead: 'Every project is a star traced in my professional constellation.',
      traitsLead: 'Passive talents that hold every project together, beyond the code.',
      level: 'Lv.',
      rating: (stars) => `${stars} out of 5 stars`,
      languageToggle: 'Language: English. Switch to Spanish.',
    },
    skillGroups: {
      'Lenguajes de programación': 'Programming languages',
      'Frameworks Backend': 'Backend frameworks',
      'Entorno de ejecución': 'Runtime',
      Frontend: 'Frontend',
      'Maquetación y estilos': 'Markup & styling',
      'Gráficos 3D y WebGL': '3D graphics & WebGL',
      'Bases de datos': 'Databases',
      'Control de versiones': 'Version control',
      'Herramientas de desarrollo': 'Development tools',
      'Sistemas operativos': 'Operating systems',
      'APIs e integración': 'APIs & integration',
      'Documentación y marcado': 'Documentation & markup',
    },
    projects: [
      {
        name: 'State Reporting System',
        role: 'Web Developer',
        year: '2025 - 2026',
        stars: 5,
        description:
          'Web platform for automating and auditing information submissions from public entities, improving traceability and institutional reporting times.',
        stack: ['Laravel', 'PostgreSQL', 'Tailwind CSS'],
      },
      {
        name: 'Quintana Roo Researchers Platform',
        role: 'Web Developer (Internship)',
        year: '2025',
        stars: 5,
        description:
          'Statewide web system designed to centralize procedures, improve the user experience, and streamline the management of researchers in the region.',
        stack: ['Laravel', 'Tailwind CSS', 'MySQL'],
      },
      {
        name: 'Medicura',
        role: 'Tech Lead & Database Architect',
        year: '2025',
        stars: 4,
        description:
          'Health management system for handling appointments and clinical records. It included migrating the relational database architecture to NoSQL to improve the scalability of clinical history.',
        stack: ['Laravel', 'MongoDB', 'MySQL', 'Bootstrap'],
      },
    ],
    traits: [
      { name: 'Continuous learning', level: 5, note: 'I adopt new tools and patterns quickly.' },
      {
        name: 'Analytical thinking',
        level: 4,
        note: 'I break complex problems into measurable solutions.',
      },
      {
        name: 'Teamwork',
        level: 4,
        note: 'Clear communication in reviews and pair programming.',
      },
      {
        name: 'Attention to detail',
        level: 4,
        note: 'Readable, testable, and consistent code.',
      },
      {
        name: 'Technical leadership',
        level: 3,
        note: 'Mentoring and defining project standards.',
      },
    ],
    info: {
      name: 'Madox - KHMaxDev',
      role: 'Web Developer',
      element: 'Anemo',
      region: 'Production Server',
      vision:
        'I build reliable, scalable web systems, caring for both the internal architecture and the experience of the people who use them.',
      stats: [
        { label: 'Years of experience', value: '1+' },
        { label: 'Projects delivered', value: '3+' },
        { label: 'Education level', value: 'Software Development & Management Engineer' },
      ],
      contact: [
        { label: 'Email', value: 'quefajardomadox@gmail.com' },
        { label: 'LinkedIn', value: 'www.linkedin.com/in/madox-que-fajardo-948080363' },
        { label: 'GitHub', value: 'github.com/KHMaxDev' },
        { label: 'Location', value: 'Remote · Global' },
      ],
    },
  },
};

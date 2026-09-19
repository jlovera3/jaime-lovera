import { Content } from '../core/i18n/content.model';

export const ES: Content = {
  meta: {
    title: 'Jaime Lovera — Ingeniero Frontend y Móvil',
    description:
      'Ingeniero frontend y móvil que crea apps rápidas y cuidadas para web, iOS y Android. Portfolio y currículum de Jaime Lovera.',
  },
  a11y: {
    skipToContent: 'Saltar al contenido',
    primaryNav: 'Principal',
    language: 'Idioma',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    backToTop: 'Volver arriba',
  },
  nav: {
    about: 'Sobre mí',
    experience: 'Experiencia',
    work: 'Proyectos',
    skills: 'Skills',
    contact: 'Contacto',
  },
  splash: { role: 'Ingeniero Frontend y Móvil', skip: 'Saltar intro' },
  hero: {
    eyebrow: 'Ingeniero Frontend y Móvil',
    headline: {
      before: 'Creo experiencias',
      accent: 'móviles y web',
      after: 'rápidas y cuidadas.',
    },
    lead: 'Publico apps de producción en App Store y Google Play, y me importan la arquitectura limpia, el rendimiento y los pequeños detalles que hacen que un producto se sienta bien.',
    ctaWork: 'Ver proyectos',
    ctaContact: 'Contactar',
    scroll: 'Desliza',
  },
  about: {
    eyebrow: 'Sobre mí',
    title: 'De la ingeniería industrial a publicar apps.',
    paragraphs: [
      'Tras estudiar Ingeniería Industrial durante unos años, descubrí mi pasión por programar y crear apps móviles. Desde entonces me dedico por completo a mejorar en el oficio.',
      'Soy cercano, mantengo la calma bajo presión y disfruto resolviendo problemas, ya sea desenredando un bug en producción, liderando un pequeño equipo o puliendo una interacción hasta que se siente bien.',
    ],
    educationTitle: 'Formación',
    education: {
      university: 'Ingeniería Industrial',
      degree: 'Ciclo Superior en Desarrollo de Aplicaciones Multiplataforma',
    },
    stats: { years: 'Años de experiencia', companies: 'Empresas', apps: 'Apps publicadas' },
  },
  experience: {
    eyebrow: 'Experiencia',
    title: 'Dónde he trabajado',
    subtitle: 'Cuatro equipos, cuatro productos muy distintos y un mismo foco en la calidad.',
    present: 'Actualidad',
    visit: 'Visitar web',
    apps: ['app', 'apps'],
    units: { year: ['año', 'años'], month: ['mes', 'meses'] },
    companies: {
      meinestadt: {
        role: 'Desarrollador Frontend',
        highlights: [
          'Desarrollo de la app que representa el portal web de la empresa.',
          'Comunicar, mejorar y aplicar los conceptos internos de producto.',
          'Responsable del despliegue de las apps en las tiendas.',
        ],
      },
      nttdata: {
        role: 'Desarrollador Full-Stack y Líder de equipo',
        highlights: [
          'Trabajo simultáneo en varias apps para resolver errores en producción.',
          'Liderazgo de un equipo de 4 personas, gestionando y organizando las tareas de 3 proyectos durante una baja por paternidad.',
          'Desarrollo y mejora de apps para clientes externos, aumentando la calidad y la eficacia del producto.',
        ],
      },
      magtel: {
        role: 'Desarrollador Full-Stack',
        highlights: [
          'Desarrollo web, Android e iOS con Ionic, Angular y Cordova, y back end con Laravel.',
          'Apps «Museos de Málaga», «Nuestra Señora de la Leche» y «Galeón Juncal».',
          'Experiencias de realidad virtual y aumentada en dispositivos Android.',
          'Flujo de trabajo con Git en un equipo Agile / Scrum.',
        ],
      },
      ptv: {
        role: 'Desarrollador Móvil',
        highlights: [
          'Desarrollo desde cero de las apps web, Android e iOS del servicio técnico de clientes de PTV Telecom.',
          'Ionic, Angular, TypeScript y drivers PHP, con control de versiones en GitHub.',
          'Publicación en App Store y Google Play.',
          'Integración de Google Maps nativo, envío de SMS y pagos con tarjeta.',
        ],
      },
    },
  },
  work: {
    eyebrow: 'Proyectos destacados',
    title: 'Apps en las tiendas',
    subtitle: 'Una selección de las apps que he creado o mantenido, disponibles en iOS y Android.',
    all: 'Todas',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    filterLabel: 'Filtrar por empresa',
  },
  skills: {
    eyebrow: 'Skills',
    title: 'La caja de herramientas',
    subtitle: 'Tecnologías que he usado en producción, agrupadas según para qué sirven.',
    groups: {
      frontend: {
        title: 'Frontend',
        description: 'Interfaces rápidas, accesibles y fáciles de mantener.',
      },
      mobile: {
        title: 'Móvil',
        description: 'Apps híbridas publicadas en App Store y Google Play.',
      },
      backend: { title: 'Backend', description: 'Las APIs y servicios que hay detrás de las apps.' },
      data: { title: 'Datos', description: 'Del almacenamiento local a las bases de datos en la nube.' },
      craft: { title: 'Oficio', description: 'Cómo trabajo en equipo y saco las cosas adelante.' },
    },
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Construyamos algo genial juntos.',
    text: '¿Tienes un proyecto, una oferta o solo quieres saludar? Mi bandeja está abierta.',
    copy: 'Copiar email',
    copied: '¡Copiado!',
    write: 'Escríbeme',
  },
  footer: { built: 'Diseñado y desarrollado por Jaime Lovera' },
};

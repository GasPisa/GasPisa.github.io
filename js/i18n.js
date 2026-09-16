const translations = {
  es: {
    meta: {
      title: 'Gaspar Pisa Eyaralar — Portfolio',
      description: 'Gaspar Pisa Eyaralar — Ingeniero de software especializado en videojuegos y desarrollo mobile. Portfolio de proyectos y experiencia.'
    },
    nav: {
      home: 'Inicio',
      expertise: 'Aptitudes',
      work: 'Proyectos',
      experience: 'Experiencia',
      contact: 'Contacto'
    },
    lang: { toggleAria: 'Cambiar a inglés' },
    menu: { toggleAria: 'Abrir menú' },
    hero: {
      role: 'Ingeniero de software',
      scrollAria: 'Scroll hacia abajo',
      cvButton: 'Solicitar CV',
      cvHref: 'mailto:gaspar.pisa@gmail.com?subject=Solicitud%20de%20CV%20-%20Gaspar%20Pisa%20Eyaralar&body=Hola%20Gaspar%2C%0A%0A%C2%BFPodr%C3%ADas%20enviarme%20tu%20CV%20actualizado%3F%0A%0ASaludos.'
    },
    expertise: {
      eyebrow: 'Qué hago',
      title: 'Aptitudes',
      card1: { titleAccent: 'Programación', titleRest: 'de sistemas de juego', desc: 'Desarrollo de gameplay, sistemas y herramientas internas en Unity, incluyendo un editor de niveles propio.' },
      card2: { titleAccent: 'Diseño', titleRest: 'de videojuegos', desc: 'Formación de posgrado en diseño de videojuegos, con foco en mecánicas de juego y experiencia de usuario.' },
      card3: { titleAccent: 'Desarrollo', titleRest: 'móvil', desc: 'Construcción de aplicaciones Android e híbridas, con integración de servicios en la nube y pasarelas de pago.' },
      card4: { titleAccent: 'Porting', desc: 'Adaptación de videojuegos ya publicados a nuevas plataformas, con optimización y compresión de recursos según las limitaciones de cada hardware, colaborando con estudios internacionales.' },
      card5: { titleAccent: 'Control', titleRest: 'de calidad', desc: 'Testing y control de calidad de videojuegos y software empresarial, desde pruebas exploratorias hasta seguimiento de incidencias.' },
      card6: { titleAccent: 'Metodologías', titleRest: 'ágiles', desc: 'Trabajo en equipos multidisciplinares con metodologías ágiles, planificación iterativa y entrega incremental.' }
    },
    work: {
      eyebrow: 'Portfolio',
      title: 'Proyectos',
      desc: 'Una selección de proyectos en los que trabajé: desde videojuegos publicados hasta aplicaciones móviles y sistemas empresariales.',
      filterAll: 'Todos',
      filterProgramming: 'Programación',
      filterPorting: 'Porting',
      filterMobile: 'Móvil',
      filterQa: 'QA',
      viewSteam: 'Ver en Steam →',
      private: 'Proyecto privado',
      academic: 'Proyecto académico',
      p1: { desc: 'Programación de sistemas de juego para este roguelike de carreras y construcción de mazos, desarrollado en Meteorbyte Studios. Actualmente en desarrollo.' },
      p14: { title: 'Editor de circuitos para Deck RX', desc: 'Trabajo de Fin de Grado: editor de circuitos para Deck RX, con interfaz gráfica para crear y editar circuitos, exportados en formato JSON. Desarrollado para Meteorbyte Studios.' },
      p2: { desc: 'Control de calidad para esta estrategia por turnos ambientada en las Guerras Numantinas, desarrollada en Meteorbyte Studios.' },
      p3: { desc: 'Desarrollo de funcionalidades de modo multijugador para este simulador de gestión de parques acuáticos.' },
      p4: { desc: 'Trabajo de porting de este título del universo Five Nights at Freddy\'s, desarrollado por Mega Cat Studios.' },
      p5: { desc: 'Control de calidad para este shooter roguelike con física de pinball, desarrollado por Whale Peak Games.' },
      p6: { desc: 'Control de calidad para esta aventura de mundo abierto, desarrollada por Snekflat.' },
      p7: { desc: 'Trabajo de porting de este juego de acción y exploración en mundo abierto, desarrollado por Zockrates Laboratories.' },
      p8: { desc: 'Trabajo de porting de este roguelite musical de disparos, desarrollado por Rogueside.' },
      p9: { desc: 'Trabajo de porting de este simulador de entregas, desarrollado por Oro Interactive.' },
      p10: { desc: 'Trabajo de porting de este juego arcade multijugador, desarrollado por Alan-1.' },
      p11: { desc: 'Trabajo de porting de este plataformas 3D, desarrollado por Eat Pant Games.' },
      p12: { title: 'Eterna Diagnostics — App de salud', desc: 'Prototipo de aplicación Android conectada a smartwatches para métricas de salud, con inicio de sesión con Google e integración de pagos con Stripe.' },
      p13: { title: 'QA — Sistema de hipotecas bancario', desc: 'Control de calidad de un sistema de hipotecas para un banco, incluyendo el flujo de reporte y seguimiento de incidencias, en Ricoh España.' }
    },
    experience: {
      eyebrow: 'Trayectoria',
      title: 'Experiencia',
      job1: { role: 'Ingeniero de software', date: 'Abr. 2024 — Sep. 2026', desc: 'Participación en más de diez videojuegos publicados, entre ellos Five Nights at Freddy\'s: Into the Pit y Waterpark Simulator (porting con modo multijugador), integrando APIs específicas de consolas y móviles.' },
      job2: { role: 'Desarrollador de aplicaciones', date: 'Ago. 2023 — Dic. 2023', desc: 'Desarrollo de un prototipo de aplicación Android conectada con relojes inteligentes para ofrecer métricas de salud, con inicio de sesión mediante Google e integración de la pasarela de pagos Stripe.' },
      job3: { role: 'Control de calidad', date: 'Ago. 2019 — Ene. 2020', desc: 'QA del sistema de hipotecas de un banco, con flujo de reporte y seguimiento de incidencias.' }
    },
    education: {
      title: 'Formación académica',
      degree1: 'Máster en Diseño de Videojuegos',
      degree2: 'Grado en Ingeniería Informática del Software'
    },
    testimonials: {
      eyebrow: 'Recomendaciones',
      title: 'Lo que dicen de mí',
      quote1: '“Recomiendo a Gaspar si necesitan un ingeniero responsable y con capacidad de integrarse rápido en el día a día de un equipo.”',
      name1: 'Felipe González Fanjul',
      role1: 'Director, Meteorbyte Studios',
      quote2: '“Gaspar es un gran profesional, con muy buena comunicación con el equipo y capacidad de resolución de problemas.”',
      name2: 'Fabio Cuartas',
      role2: 'Programador, Meteorbyte Studios',
      prevAria: 'Testimonio anterior',
      nextAria: 'Siguiente testimonio'
    },
    contact: {
      eyebrow: 'Contacto'
    }
  },

  en: {
    meta: {
      title: 'Gaspar Pisa Eyaralar — Portfolio',
      description: 'Gaspar Pisa Eyaralar — Software Engineer specialized in videogame and mobile development. Portfolio of projects and experience.'
    },
    nav: {
      home: 'Home',
      expertise: 'Skills',
      work: 'Projects',
      experience: 'Experience',
      contact: 'Contact'
    },
    lang: { toggleAria: 'Switch to Spanish' },
    menu: { toggleAria: 'Open menu' },
    hero: {
      role: 'Software Engineer',
      scrollAria: 'Scroll down',
      cvButton: 'Request CV',
      cvHref: 'mailto:gaspar.pisa@gmail.com?subject=CV%20Request%20-%20Gaspar%20Pisa%20Eyaralar&body=Hi%20Gaspar%2C%0A%0ACould%20you%20send%20me%20your%20updated%20CV%3F%0A%0ABest%20regards.'
    },
    expertise: {
      eyebrow: 'What I do',
      title: 'Skills',
      card1: { titleAccent: 'Game Systems', titleRest: 'Programming', desc: 'Development of gameplay, systems and internal tools in Unity, including a custom level editor.' },
      card2: { titleAccent: 'Videogame', titleRest: 'Design', desc: 'Postgraduate training in videogame design, focused on game mechanics and player experience.' },
      card3: { titleAccent: 'Mobile', titleRest: 'Development', desc: 'Building Android and hybrid apps, integrating cloud services and payment gateways.' },
      card4: { titleAccent: 'Porting', desc: 'Adapting already-published videogames to new platforms, optimizing and compressing assets to fit each platform\'s hardware constraints, collaborating with international studios.' },
      card5: { titleAccent: 'Quality', titleRest: 'Assurance', desc: 'Testing and quality assurance for videogames and enterprise software, from exploratory testing to issue tracking.' },
      card6: { titleAccent: 'Agile', titleRest: 'Methodologies', desc: 'Working in multidisciplinary teams with agile methodologies, iterative planning and incremental delivery.' }
    },
    work: {
      eyebrow: 'Portfolio',
      title: 'Projects',
      desc: 'A selection of projects I\'ve worked on: from published videogames to mobile apps and enterprise systems.',
      filterAll: 'All',
      filterProgramming: 'Programming',
      filterPorting: 'Porting',
      filterMobile: 'Mobile',
      filterQa: 'QA',
      viewSteam: 'View on Steam →',
      private: 'Private project',
      academic: 'Academic project',
      p1: { desc: 'Programming game systems for this deckbuilding racing roguelike, developed at Meteorbyte Studios. Currently in development.' },
      p14: { title: 'Track Editor for Deck RX', desc: 'Bachelor\'s thesis: a track editor for Deck RX, with a graphical interface to create and edit tracks, exported as JSON. Developed for Meteorbyte Studios.' },
      p2: { desc: 'Quality assurance for this turn-based strategy game set during the Numantine Wars, developed at Meteorbyte Studios.' },
      p3: { desc: 'Developed multiplayer mode features for this waterpark management simulator.' },
      p4: { desc: 'Porting work for this title in the Five Nights at Freddy\'s universe, developed by Mega Cat Studios.' },
      p5: { desc: 'Quality assurance for this pinball-physics roguelike shooter, developed by Whale Peak Games.' },
      p6: { desc: 'Quality assurance for this open-world adventure game, developed by Snekflat.' },
      p7: { desc: 'Porting work for this open-world action and exploration game, developed by Zockrates Laboratories.' },
      p8: { desc: 'Porting work for this music-driven roguelite shooter, developed by Rogueside.' },
      p9: { desc: 'Porting work for this delivery simulation game, developed by Oro Interactive.' },
      p10: { desc: 'Porting work for this multiplayer arcade game, developed by Alan-1.' },
      p11: { desc: 'Porting work for this 3D platformer, developed by Eat Pant Games.' },
      p12: { title: 'Eterna Diagnostics — Health App', desc: 'Prototype Android application connected to smartwatches for health metrics, with Google sign-in and Stripe payment integration.' },
      p13: { title: 'QA — Bank Mortgage System', desc: 'Quality assurance for a bank\'s mortgage system, including the issue reporting and tracking workflow, at Ricoh España.' }
    },
    experience: {
      eyebrow: 'Career',
      title: 'Experience',
      job1: { role: 'Software Engineer', date: 'Apr. 2024 — Sep. 2026', desc: 'Contributed to more than ten published videogames, including Five Nights at Freddy\'s: Into the Pit and Waterpark Simulator (porting with multiplayer mode), integrating console- and mobile-specific APIs.' },
      job2: { role: 'Application Developer', date: 'Aug. 2023 — Dec. 2023', desc: 'Built a prototype Android application connected to smartwatches to provide health metrics, with Google sign-in and Stripe payment gateway integration.' },
      job3: { role: 'Quality Assurance', date: 'Aug. 2019 — Jan. 2020', desc: 'QA for a bank\'s mortgage system, including the issue reporting and tracking workflow.' }
    },
    education: {
      title: 'Academic Background',
      degree1: 'Master\'s Degree in Videogame Design',
      degree2: 'Bachelor\'s Degree in Software Engineering'
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'What people say about me',
      quote1: '“I recommend Gaspar if you need a responsible engineer who can quickly integrate into a team\'s day-to-day work.”',
      name1: 'Felipe González Fanjul',
      role1: 'Director, Meteorbyte Studios',
      quote2: '“Gaspar is a great professional, with great communication with the team and strong problem-solving skills.”',
      name2: 'Fabio Cuartas',
      role2: 'Programmer, Meteorbyte Studios',
      prevAria: 'Previous testimonial',
      nextAria: 'Next testimonial'
    },
    contact: {
      eyebrow: 'Contact'
    }
  }
};

function getTranslation(lang, key) {
  return key.split('.').reduce((obj, part) => (obj ? obj[part] : undefined), translations[lang]);
}

function applyLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = getTranslation(lang, el.dataset.i18n);
    if (value !== undefined) el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    const [attr, key] = el.dataset.i18nAttr.split(':');
    const value = getTranslation(lang, key);
    if (value !== undefined) el.setAttribute(attr, value);
  });

  document.title = getTranslation(lang, 'meta.title');

  const langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.textContent = lang === 'es' ? 'EN' : 'ES';

  localStorage.setItem('lang', lang);
}

function initLanguage() {
  const saved = localStorage.getItem('lang');
  const detected = navigator.language && navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
  const lang = saved || detected;
  applyLanguage(lang);
}

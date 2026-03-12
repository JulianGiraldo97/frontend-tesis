export const easyReadingTexts = {
  'login.welcome': {
    defaultText: 'Bienvenido de vuelta',
    easyText: 'Bienvenido',
  },
  'login.subtitle': {
    defaultText: 'Tu plataforma de intermediación laboral accesible e inclusiva',
    easyText: 'Te ayudamos a buscar empleo de forma accesible.',
  },
  'login.emailLabel': {
    defaultText: 'Correo electrónico',
    easyText: 'Correo',
  },
  'login.passwordLabel': {
    defaultText: 'Contraseña',
    easyText: 'Clave',
  },
  'login.forgotPassword': {
    defaultText: '¿Olvidaste tu contraseña?',
    easyText: 'No recuerdo mi clave',
  },
  'login.signIn': {
    defaultText: 'Iniciar sesión',
    easyText: 'Entrar',
  },
  'login.recoveryIntro': {
    defaultText:
      'Ingresa el correo de tu cuenta. Te enviaremos un enlace para restablecer la contraseña.',
    easyText: 'Escribe tu correo para recuperar tu clave.',
  },
  'jobs.searchFilters': {
    defaultText: 'Filtros de búsqueda',
    easyText: 'Filtros',
  },
  'jobs.searchButton': {
    defaultText: 'Buscar empleos',
    easyText: 'Buscar',
  },
  'jobs.noResults': {
    defaultText:
      'No encontramos vacantes con esos filtros. Ajusta los criterios y vuelve a intentar.',
    easyText: 'No hay resultados. Cambia los filtros e inténtalo de nuevo.',
  },
  'application.block.applied': {
    defaultText:
      'Ya te postulaste a esta vacante. Puedes revisar el estado en tu perfil.',
    easyText: 'Ya te postulaste. Revisa el estado en tu perfil.',
  },
  'application.block.closed': {
    defaultText: 'La vacante está cerrada y no acepta nuevas postulaciones.',
    easyText: 'Esta vacante está cerrada.',
  },
  'application.block.incompleteProfile': {
    defaultText:
      'Tu perfil está incompleto. Debes completar tus datos antes de postularte.',
    easyText: 'Completa tu perfil para poder postularte.',
  },
  'employer.feedback.help': {
    defaultText:
      'Usa frases cortas, lenguaje directo y evita tecnicismos para mejorar comprensión.',
    easyText: 'Escribe frases cortas y claras.',
  },
} as const;

export type EasyReadingTextKey = keyof typeof easyReadingTexts;


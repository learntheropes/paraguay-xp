import find from 'lodash.find';

export const locales = [
  {
    code: 'en',
    file: 'en.json',
    iso: 'en-US',
    name: 'English',
    validate: 'en',
    default: true
  }, 
  {
    code: 'es',
    file: 'es.json',
    iso: 'es-419',
    name: 'Español',
    validate: 'es',  
  },
  {
    code: 'pt',
    iso: 'pt-BR',
    file: 'pt.json',
    name: 'Brasileiro',
  }
];

export const defaultLocale = find(locales, { default: true }).code;

export const routeRules = locales.reduce((obj, locale) => {
  obj[`/${locale.code}`] = {
    static: true,
    headers: {
      'Cache-Control': `s-maxage=${60 * 60 * 24 * 365}`
    }
  }
  obj[`/${locale.code}/escort/**`] = {
    static: true,
    headers: {
      'Cache-Control': `s-maxage=${60 * 60 * 24 * 365}`
    }
  },
  obj[`/${locale.code}/blog/**`] = {
    static: true,
    headers: {
      'Cache-Control': `s-maxage=${60 * 60 * 24 * 365}`
    }
  },
  obj[`/${locale.code}/area/**`] = {
    static: true,
    headers: {
      'Cache-Control': `s-maxage=${60 * 60 * 24 * 365}`
    }
  },
  obj[`/${locale.code}/agency/**`] = {
    static: true,
    headers: {
      'Cache-Control': `s-maxage=${60 * 60 * 24 * 365}`
    }
  },
  obj[`/${locale.code}/extra/**`] = {
    static: true,
    headers: {
      'Cache-Control': `s-maxage=${60 * 60 * 24 * 365}`
    }
  }
  return obj
}, {
  '_ipx/**': {
    headers: {
      'Cache-Control': `s-maxage=${60 * 60 * 24 * 365}`
    }
  }
})


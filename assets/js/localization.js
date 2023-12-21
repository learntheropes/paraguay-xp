import find from 'lodash.find';

export const locales = [
  // {
  //   code: 'en',
  //   file: 'en.json',
  //   iso: 'en-US',
  //   name: 'English',
  // }, 
  {
    code: 'es',
    file: 'es.json',
    iso: 'es-419',
    name: 'Español',
    default: true 
  },
  {
    code: 'pt',
    iso: 'pt-BR',
    file: 'pt.json',
    name: 'Brasileiro',
  }
];

export const localeCodes = locales.map(locale => locale.code);

export const defaultLocale = find(locales, { default: true }).code;

export const routeRules = localeCodes.reduce((obj, code) => {
  obj[`/${code}`] = {
    static: true,
    // prerender: true,
    headers: {
      // 'Access-Control-Allow-Origin:': process.env.NEXTAUTH_URL,
      'Cache-Control': `maxage=${60 * 60 * 24 * 365}`
    }
  }
  obj[`/${code}/escort/**`] = {
    static: true,
    // prerender: true,
    headers: {
      'Cache-Control': `maxage=${60 * 60 * 24 * 365}`
    }
  },
  obj[`/${code}/blog/**`] = {
    static: true,
    // prerender: true,
    headers: {
      'Cache-Control': `maxage=${60 * 60 * 24 * 365}`
    }
  },
  obj[`/${code}/area/**`] = {
    static: true,
    // prerender: true,
    headers: {
      'Cache-Control': `maxage=${60 * 60 * 24 * 365}`
    }
  },
  obj[`/${code}/agency/**`] = {
    static: true,
    // prerender: true,
    headers: {
      'Cache-Control': `maxage=${60 * 60 * 24 * 365}`
    }
  },
  obj[`/${code}/extra/**`] = {
    static: true,
    // prerender: true,
    headers: {
      'Cache-Control': `maxage=${60 * 60 * 24 * 365}`
    }
  },
  obj[`/${code}/auth/**`] = {
    static: true
  }
  return obj;
}, {});

export const excludedRoutes = localeCodes.reduce((arr, code) => {
  ['auth', 'dashboard', 'admin', 'legal', 'news'].map(endpoint => {
    arr.push(`/${code}/${endpoint}/**`);
  });
  return arr;
}, []);
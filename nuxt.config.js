const isDeployed = (
  process.env.NEXTAUTH_URL === 'http://localhost:3000'
  || !process.env.NEXTAUTH_URL
) ? false : true;
const deploymentDomain = process.env.NEXTAUTH_URL || 'http://localhost:3000';

import {
  locales,
  localeCodes,
  defaultLocale,
  routeRules
} from './assets/js/locales';

export default defineNuxtConfig({

  runtimeConfig: {
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    faunaSecret: process.env.FAUNA_SECRET,
    mongodbUri: process.env.MONGODB_URI,
    telegramToken: process.env.TELEGRAM_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID,
    public: {
      isDeployed,
      deploymentDomain
    }
  },

  $production: {

    routeRules
  },

  css: [
    '~/assets/scss/main.scss',
    '~/assets/scss/mdi.scss',
  ],

  components: [{
    path: '~/components',
    pathPrefix: false,
    global: true
  }],

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
    'nuxt-content-git',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
  ],

  i18n: {
    baseUrl: deploymentDomain,
    locales,
    defaultLocale,
    lazy: true,
    langDir: 'lang',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: false,
      redirectOnRoot: true,
    }
  },

  content: {
    locales: localeCodes,
    defaultLocale,
    // navigation: false,
    ignores: [
      '/back-links/',
      '/competitors/',
      '/notes/'
    ]
  },

  auth: {
    provider: {
      type: 'authjs',
      addDefaultCallbackUrl: true
    },
    origin: deploymentDomain,
    baseUrl: `/api/auth`,
    addDefaultCallbackUrl: true,
    globalAppMiddleware: {
      isEnabled: true,
      allow404WithoutAuth: true,
      addDefaultCallbackUrl: true
    },
  },

  pinia: {
    autoImports: [
      'defineStore'
    ],
  },

  imports: {
    dirs: ['stores'],
  },

  nitro: {
    devStorage: {
      db: {
        driver: 'fs',
        base: './lang'
      }
    },
    storage: {
      db: {
        driver: 'github',
        repo: process.env.GITHUB_REPO,
        branch: 'main',
        dir: '/lang',
      }
    },
  }
});
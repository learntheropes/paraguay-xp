const isDeployed = (
  process.env.NEXTAUTH_URL === 'http://localhost:3000'
  || !process.env.NEXTAUTH_URL
) ? false : true;
const deploymentDomain = process.env.NEXTAUTH_URL || 'http://localhost:3000';

import {
  locales,
  localeCodes,
  defaultLocale,
  routeRules,
  excludedRoutes,
} from './assets/js/locales';

export default defineNuxtConfig({

  // site: {
  //   url: deploymentDomain,
  // },

  runtimeConfig: {
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    faunaSecret: process.env.FAUNA_SECRET,
    mongodbUri: process.env.MONGODB_URI,
    telegramToken: process.env.TELEGRAM_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID,
    public: {
      seoTitle: ' 🫦 Paraguay XP',
      isDeployed,
      deploymentDomain,
      whatsappAdmin: process.env.WHATSAPP_ADMIN
    }
  },

  app: {
    head: {
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        },
        {
          id: 'googlebot',
          name: 'googlebot',
          content: 'notranslate'
        },
        {
          id: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          id: 'og:url',
          name: 'og:url',
          content: deploymentDomain
        },
        {
          id: 'og:site_name',
          name: 'og:site_name',
          content: 'Paraguay XP'
        },
        {
          id: 'og:image',
          name: 'og:image',
          content: `${deploymentDomain}/favicon/favicon.png`
        },
        {
          id: 'twitter:card',
          name: 'twitter:card',
          content: 'summary'
        },
        {
          id: 'twitter:image',
          name: 'twitter:image',
          content: `${deploymentDomain}/favicon/favicon.png`
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon/favicon.ico'
        },
      ]
    },
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
    'nuxt-simple-robots',
    'nuxt-simple-sitemap',
    '@nuxtjs/device',
    '@nuxtjs/i18n',
    '@nuxt/content',
    'nuxt-content-git',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-delay-hydration',
  ],

  robots: {
    disallow: ['/', '/$'].concat(excludedRoutes.map(route => route.replace('/**', ''))),
  },

  sitemap: {
    xsl: false,
    exclude: excludedRoutes,
    credits: false,
    // autoalternativelangprefixes: ['en-US', 'es-419', 'pt-BR']
  },

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
      redirectOn: 'root',
      // This one doesn´t work
      // alwaysRedirect: true
    }
  },

  content: {
    locales: localeCodes,
    defaultLocale,
    // This crashes npm run build
    // navigation: false,
    ignores: [
      '/back-links/',
      '/competitors/',
      '/notes/',
      '/age/'
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

  image: {
    format: [
      'webp',
      'png'
    ],
    presets: {
      navigator: {
        modifiers: {
          width: 48,
          height: 48,
          quality: 10
        }
      },
      preview: {
        modifiers: {
          width: 288,
          height: 288,
          quality: 30
        }
      },
      modal: {
        modifiers: {
          quality: 50
        }
      }
    }
  },
  
  nitro: {
    devStorage: {
      db: {
        driver: 'fs',
        base: './lang'
      },
      content: {
        driver: 'fs',
        base: './content'
      }
    },
    storage: {
      db: {
        driver: 'custom-github',
        repo: process.env.GITHUB_REPO,
        token: process.env.GITHUB_TOKEN,
        branch: 'main',
        base: 'lang',
      },
      content: {
        driver: 'custom-github',
        repo: process.env.GITHUB_REPO,
        token: process.env.GITHUB_TOKEN,
        branch: 'main',
        base: 'content',
      }
    },
  },

  delayHydration: {
    mode: 'init',
    exclude: excludedRoutes,
    debug: process.env.NODE_ENV === 'development'
  }
});
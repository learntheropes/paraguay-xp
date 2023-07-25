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
          content: `${deploymentDomain}/favicon/favicon.jpg`
        },
        {
          id: 'twitter:card',
          name: 'twitter:card',
          content: 'summary'
        },
        {
          id: 'twitter:image',
          name: 'twitter:image',
          content: `${deploymentDomain}/favicon/favicon.jpg`
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
    '@nuxtjs/i18n',
    '@nuxt/content',
    'nuxt-content-git',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-speedkit'
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
      redirectOn: 'root',
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

  image: {
    format: [
      'webp',
      'png'
    ],
    presets: {
      preview: {
        modifiers: {
          width: 288,
          height: 288,
          quality: 50
        }
      },
      modal: {
        modifiers: {
          quality: 70
        }
      }
    }
  },
  
  speedkit: {

    detection: {
      performance: true,
      browserSupport: true
    },

    performanceMetrics: {
      device: {
        hardwareConcurrency: { min: 2, max: 48 },
        deviceMemory: { min: 2 }
      },
      timing: {
        fcp: 800,
        dcl: 1200
      }
    },

    fonts: [{
      family: 'Font A',
      locals: ['Font A'],
      fallback: ['Arial', 'sans-serif'],
      variances: [
        {
          style: 'normal',
          weight: 400,
          sources: [
            { src: '@/assets/fonts/font-a-regular.woff', type:'woff' },
            { src: '@/assets/fonts/font-a-regular.woff2', type:'woff2' }
          ]
        }, {
          style: 'italic',
          weight: 400,
          sources: [
            { src: '@/assets/fonts/font-a-regularItalic.woff', type:'woff' },
            { src: '@/assets/fonts/font-a-regularItalic.woff2', type:'woff2' }
          ]
        }, {
          style: 'normal',
          weight: 700,
          sources: [
            { src: '@/assets/fonts/font-a-700.woff', type:'woff' },
            { src: '@/assets/fonts/font-a-700.woff2', type:'woff2' }
          ]
        }
      ]
    }],

    targetFormats: ['webp', 'avif', 'jpg|jpeg|png|gif'],

    componentAutoImport: false,
    componentPrefix: undefined,

    // lazyOffset: {
    //   component: '0%',
    //   asset: '0%'
    // },

    loader: {
      dataUri: null,
      size: '100px',
      backgroundColor: 'grey'
    }
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
        token: process.env.GITHUB_TOKEN,
        branch: 'main',
        dir: '/lang',
      }
    },
  }
});
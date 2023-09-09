const isDeployed = process.env.NEXTAUTH_URL && process.env.NEXTAUTH_URL !== 'http://localhost:3000'
const deploymentDomain = process.env.NEXTAUTH_URL || 'http://localhost:3000';
import {
  locales,
  localeCodes,
  defaultLocale,
  routeRules,
  excludedRoutes,
} from './assets/js/localization';

export default defineNuxtConfig({

  nitro: {
    preset: 'digital-ocean'
  },

  runtimeConfig: {
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    faunaSecret: process.env.FAUNA_SECRET,
    telegramToken: process.env.TELEGRAM_TOKEN,
    googleApiKey: process.env.GOOGLE_API_KEY,
    githubRepo: process.env.GITHUB_REPO,
    githubToken: process.env.GITHUB_TOKEN,
    public: {
      seoTitle: ' 🫦 Paraguay XP',
      isDeployed,
      deploymentDomain,
      whatsappAdmin: process.env.WHATSAPP_ADMIN,
      whatsappDomain: process.env.WHATSAPP_DOMAIN
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
    'nuxt-jsonld',
    '@nuxtjs/device',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-content-git',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-delay-hydration',
  ],

  robots: {
    disallow: [
      '/',
      '/$',
      ...excludedRoutes.map(route => route.replace('/**', ''))
    ],
  },

  sitemap: {
    xsl: false,
    exclude: excludedRoutes,
    credits: false,
    autoI18n: false
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
      '/ages/'
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

  image: {
    presets: {
      preview: {
        modifiers: {
          format: ['webp'],
          quality: 30,
          width: 288,
          height: 288
        }
      },
      navigator: {
        modifiers: {
          format: ['webp'],
          quality: 10,
          width: 48,
          height: 48
        }
      }
    }
  },

  delayHydration: {
    mode: 'init',
    exclude: excludedRoutes,
    debug: process.env.NODE_ENV === 'development'
  },

  pinia: {
    autoImports: [
      'defineStore'
    ],
  },

  // piniaPersistedstate: {
  //   storage: localStorage
  // },

  imports: {
    dirs: ['stores'],
  },

  nitro: {

    // compressPublicAssets: true,

    devStorage: {
      lang: {
        driver: 'fs',
        base: './lang'
      },
      content: {
        driver: 'fs',
        base: './content'
      }
    },
    storage: {
      lang: {
        driver:'github',
        repo: process.env.GITHUB_REPO,
        token: process.env.GITHUB_TOKEN,
        branch: 'main',
        dir: '/lang',
      },
      content: {
        driver: 'github',
        repo: process.env.GITHUB_REPO,
        token: process.env.GITHUB_TOKEN,
        branch: 'main',
        dir: '/content',
      }
    },
  },
});

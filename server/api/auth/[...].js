import { NuxtAuthHandler } from '#auth';
import EmailProvider from 'next-auth/providers/email';
import faunadb from 'faunadb';
import { customFaunaAdapter } from '~/assets/js/customFaunaAdapter';
import { locales, defaultLocale } from '~/assets/js/localization';
import find from 'lodash.find';

const {
  nextAuthSecret,
  faunaSecret,
  public: {
    isDeployed
  }
} = useRuntimeConfig();

const client = new faunadb.Client({
  secret: faunaSecret,
  scheme: 'https',
  domain: 'db.fauna.com',
  port: 443,
});

export default NuxtAuthHandler({
  debug: (isDeployed) ? false : true,
  secret: nextAuthSecret,
  pages: {
    signIn: `/auth/login`,
    error: `/auth/error`
  },
  theme: {
    colorScheme: 'light'
  },
  providers: [
    EmailProvider.default({
      id: 'whatsapp',
      type: 'email',
      maxAge: 60 * 10,
      generateVerificationToken: () => {

        return Math.floor(100000 + Math.random() * 900000);
      },
      normalizeIdentifier: (identifier) => {
        return identifier;
      },
      sendVerificationRequest: async ({ identifier, url }) => {

        try {

          const searchParams = new URLSearchParams(url.split('?')[1]);
          const callbackUrl = searchParams.get("callbackUrl");
          const locale = (callbackUrl && find(locales, { code: callbackUrl.split('/')[3] })) ? callbackUrl.split('/')[3] : defaultLocale;
          const token = searchParams.get("token");

          const {
            auth: {
              messageContent
            }
          } = await useStorage('lang').getItem(`${locale}.json`);
          const message = `${messageContent} *${token}*`;
         
          await $fetch(`/api/whatsapp/send-message/${identifier}`, {
            method: 'POST',
            body: {
              message
            },
            headers: {
              'content-type': 'application/json',
              'authorization': `token ${nextAuthSecret}`
            }
          });
        } catch (error) {

          throw new Error(error);
        }
      }
    }),
  ],
  adapter: customFaunaAdapter(client),
});


import { ofetch } from 'ofetch';

const {
  telegramToken,
  public: {
    whatsappDomain
  }
} = useRuntimeConfig();

export default defineEventHandler(async event => {

  const origin = getHeader(event, 'sec-fetch-site');
  if (origin !== 'same-origin') {
    setResponseStatus(event, 403);
    return 'Unauthenticated';
  };

  return await ofetch('/state', {
    baseURL: whatsappDomain,
    headers: {
      authorization: `token ${telegramToken}`
    }
  })
})
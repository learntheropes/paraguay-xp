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
  }

  const body = await readBody(event);
  const recipient = getRouterParam(event, 'recipient');

  return await ofetch(`/message/${recipient}`, {
    baseURL: whatsappDomain,
    method: 'POST',
    body,
    headers: {
      'content-type': 'application/json',
      authorization: `token ${telegramToken}`
    }
  })
})
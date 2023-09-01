import { ofetch } from 'ofetch';

const {
  telegramToken,
  public: {
    whatsappDomain
  }
} = useRuntimeConfig();

export default defineEventHandler(async () => {

  return await ofetch('/get-state', {
    baseURL: whatsappDomain,
    headers: {
      authorization: `token ${telegramToken}`
    }
  })
})
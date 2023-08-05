import { ofetch } from 'ofetch';
const { googleApiKey } = useRuntimeConfig();

export const googleTranslate = ofetch.create({ 
  method: 'POST',
  baseURL: 'https://translation.googleapis.com',
  headers: {
    'Content-Type': 'application/json',
  },
  query: {
    key: googleApiKey
  }
});
import { Watermark } from '@watermarkify/vue-watermark';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Watermark', Watermark);
});

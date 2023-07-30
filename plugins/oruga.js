import {
  OField,
  OInput,
  OSelect,
  OButton,
  OIcon,
  OLoading,
  OModal,
  OSlider
  // Config,
} from '@oruga-ui/oruga-next';
import { bulmaConfig } from '@oruga-ui/theme-bulma';

// const myConfig = Object.assign(bulmaConfig, {

//   modal: {
//     ...bulmaConfig.modal,
//     scroll: 'clip'
//   }
// //   notification: {
// //       ...bulmaConfig.notification,
// //       position: 'bottom-right'
// //   }
// })

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('OField', OField);
  nuxtApp.vueApp.component('OInput', OInput);
  nuxtApp.vueApp.component('OSelect', OSelect);
  nuxtApp.vueApp.component('OButton', OButton);
  nuxtApp.vueApp.component('OIcon', OIcon);
  nuxtApp.vueApp.component('OLoading', OLoading);
  nuxtApp.vueApp.component('OModal', OModal);
  nuxtApp.vueApp.component('OSlider', OSlider);
  // nuxtApp.vueApp.use(Config, myConfig);
});

import {
  OField,
  OInput,
  OSelect,
  OButton,
  OIcon,
  OLoading,
  OModal,
  OSlider,
  OSwitch,
  ODatepicker,
  OTable,
  OTableColumn,
  OMenu,
  OMenuList,
  OMenuItem,
  OSteps,
  OStepItem,
  OTabs,
  OTabItem,
  Config,
} from '@oruga-ui/oruga-next';
import { bulmaConfig } from "@oruga-ui/theme-bulma";

const customConfig = Object.assign(bulmaConfig, {

  notification: {
      ...bulmaConfig.notification,
      position: 'middle-center'
  }
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('OField', OField);
  nuxtApp.vueApp.component('OInput', OInput);
  nuxtApp.vueApp.component('OSelect', OSelect);
  nuxtApp.vueApp.component('OButton', OButton);
  nuxtApp.vueApp.component('OIcon', OIcon);
  nuxtApp.vueApp.component('OLoading', OLoading);
  nuxtApp.vueApp.component('OModal', OModal);
  nuxtApp.vueApp.component('OSlider', OSlider);
  nuxtApp.vueApp.component('OSwitch', OSwitch);
  nuxtApp.vueApp.component('ODatepicker', ODatepicker);
  nuxtApp.vueApp.component('OTable', OTable);
  nuxtApp.vueApp.component('OTableColumn', OTableColumn);
  nuxtApp.vueApp.component('OMenu', OMenu);
  nuxtApp.vueApp.component('OMenuList', OMenuList);
  nuxtApp.vueApp.component('OMenuItem', OMenuItem);
  nuxtApp.vueApp.component('OSteps', OSteps);
  nuxtApp.vueApp.component('OStepItem', OStepItem);
  nuxtApp.vueApp.component('OTabs', OTabs);
  nuxtApp.vueApp.component('OTabItem', OTabItem);
  nuxtApp.vueApp.use(Config, customConfig);
});

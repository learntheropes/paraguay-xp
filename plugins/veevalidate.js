import { Form, Field } from 'vee-validate';
import { defineRule, configure } from "vee-validate";
import { setLocale } from '@vee-validate/i18n';
import { localize  } from '@vee-validate/i18n';
import { required } from '@vee-validate/rules';

import en from '@vee-validate/i18n/dist/locale/en.json';
import es from '@vee-validate/i18n/dist/locale/es.json';
import pt from '@vee-validate/i18n/dist/locale/pt_BR.json';

export default defineNuxtPlugin(nuxtApp => {

  defineRule('required', required);

  const { locale } = nuxtApp.$i18n;

  configure({
    generateMessage: localize({
      en,
      es,
      pt
    }),
  });

  // Add the needed components to Nuxt
  nuxtApp.vueApp.component("VForm", Form);
  nuxtApp.vueApp.component("VField", Field);
  // nuxtApp.vueApp.component("VErrorMessage", ErrorMessage);

  // Initial vee-validate localization setup
  setLocale(locale.value);

  // Update error messages language on locale switch
  nuxtApp.$i18n.onBeforeLanguageSwitch = (_oldLocale, newLocale, _isInitialSetup, _nuxtApp) => {
    setLocale(newLocale);
  };
});


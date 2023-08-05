import { Form, Field } from 'vee-validate';
import { defineRule, configure } from "vee-validate";
import { setLocale } from '@vee-validate/i18n';
import { localize  } from '@vee-validate/i18n';
import { required, integer, between } from '@vee-validate/rules';

import en from '@vee-validate/i18n/dist/locale/en.json';
import es from '@vee-validate/i18n/dist/locale/es.json';
import pt from '@vee-validate/i18n/dist/locale/pt_BR.json';

export default defineNuxtPlugin(nuxtApp => {

  const { t } = nuxtApp.$i18n;

  defineRule('required', required);
  defineRule('integer', integer);
  defineRule('between', between);

  defineRule('code', value => {
    const num = parseInt(value)
    const isCode = Number.isInteger(num) && num >= 100000 && num <= 999999;
    if (!isCode) return t('auth.notValidCode', { value })
    else return true;
  });

  defineRule('betweenCharacters', (value, { min, max}) => {
    if (value.length < min || value.length > max) return t('error.betweenCharacters', { min, max })
    else return true;
  })

  defineRule('minWords', (value, { min }) => {
    if (value.split(' ').length < min) return t('error.minWords', { min })
    else return true;
  })

  const { locale } = nuxtApp.$i18n;

  configure({
    generateMessage: localize({
      en,
      es,
      pt
    }),
  });

  nuxtApp.vueApp.component("VForm", Form);
  nuxtApp.vueApp.component("VField", Field);

  setLocale(locale.value);

  nuxtApp.$i18n.onBeforeLanguageSwitch = (_oldLocale, newLocale, _isInitialSetup, _nuxtApp) => {
    setLocale(newLocale);
  };
});


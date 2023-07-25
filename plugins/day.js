import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import 'dayjs/locale/en'
import 'dayjs/locale/es'
import 'dayjs/locale/pt'

export default defineNuxtPlugin(async nuxtApp => {

  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);

  const { locale } = nuxtApp.$i18n;
  dayjs.locale(locale.value);

  nuxtApp.$i18n.onLanguageSwitched = (_oldLocale, newLocale) => {

    dayjs.locale(newLocale);
  };

  return {
    provide: {
      dayjs,
    }
  };
});


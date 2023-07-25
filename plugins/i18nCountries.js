import countries from "i18n-iso-countries"
import countryPhoneCodes from '~/assets/js/countryPhoneCodes'
import sortBy from 'lodash.sortby'

import * as en from 'i18n-iso-countries/langs/en';
import * as es from 'i18n-iso-countries/langs/es';
import * as pt from 'i18n-iso-countries/langs/pt';

countries.registerLocale(en);
countries.registerLocale(es);
countries.registerLocale(pt);

export default defineNuxtPlugin(nuxtApp => {

  const { locale } = nuxtApp.$i18n;

  return {
    provide: {
      i18nCountries: {
        list: () => {
          return sortBy(countryPhoneCodes.map(country => {
            return {
              countryCode: country.code,
              dialCode: country.dial_code,
              countryName: countries.getName(country.code, locale.value, {
                select: "official"
              })
            }
          }), 'countryName')
        },
        one: (countryCode) => {
          return countries.getName(countryCode, locale.value, {
            select: "official"
          })
        }
      }
    }
  }
})
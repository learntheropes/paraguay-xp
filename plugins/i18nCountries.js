import countries from "i18n-iso-countries"
import countryPhoneCodes from '~/assets/js/countryPhoneCodes'
import sortBy from 'lodash.sortby'

export default defineNuxtPlugin(nuxtApp => {

  const { locale } = nuxtApp.$i18n;

  const modules = import.meta.glob('../node_modules/i18n-iso-countries/langs/*.json',  {
    import: 'default',
    as: 'raw',
    eager: true
  });

  countries.registerLocale(JSON.parse(modules[`../node_modules/i18n-iso-countries/langs/${locale.value}.json`]))

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
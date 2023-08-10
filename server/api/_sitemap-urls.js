import uniqBy from 'lodash.uniqby';
import uniq from 'lodash.uniq';
import flatten from 'lodash.flatten';
import kebabCase from 'lodash.kebabcase';
import { defaultLocale, locales } from '~/assets/js/locales';
import services from '~/assets/js/services';

export default defineEventHandler(async () => {

  const files = await useStorage('content:escorts').getKeys();
  const promises = files.map(file => useStorage('content:escorts').getItem(`${file}`))
  const escorts = await Promise.all(promises)
  const escortsUrls = escorts.map(escort => `escort/${escort.slug}`)

  const agencies = uniqBy(escorts, 'agency').filter(escort => escort.registry.basic.agency).map(escort => escort.registry.basic.agency);
  const agenciesUrls = agencies.map(agency => `agency/${kebabCase(agency)}`).concat([`agency/indipendent`])
  
  const areas = uniqBy(escorts, 'area').filter(escort => escort.registry.services.area).map(escort => escort.registry.services.area);
  const areasUrls = areas.map(area => `area/${kebabCase(area)}`).concat([`area/outcall-only`]);

  const extras = uniq(flatten(escorts.map(escort => escort.registry.extra))).filter(name => name);
  const extrasUrls = extras.map(extra => `extra/${kebabCase(extra)}`);

  const servicesUrls = services.map(service => `service/${kebabCase(service)}`);

  const endpoints = [
    ...escortsUrls, 
    ...agenciesUrls,
    ...areasUrls,
    ...extrasUrls,
    ...servicesUrls,
    ...['', 'news', 'blog']
  ];

  return endpoints.reduce((arr, endpoint) => {

    const getAlternatives = thisLocale => [{
      hreflang: 'x-default',
      href: `/${defaultLocale}/${endpoint}`
    }]
    .concat(locales
      // .filter (locale => locale.code !== thisLocale)
      .map(locale => {
        return {
          hreflang: locale.code,
          href: `/${locale.code}/${endpoint}`
        }
      })
    )
    .concat(locales
      // .filter (locale => locale.code !== thisLocale)
      .map(locale => {
        return {
          hreflang: locale.iso,
          href: `/${locale.code}/${endpoint}`
        }
      })
    )

    const getImages = endpoint => {
      if (endpoint.startsWith('escort/')) {
        const slug = endpoint.split('/')[1];
        const { gallery: { medias }} = useStorage('content:escorts').getItem(`${slug}.json`)
        if (medias && medias.length) {
          return medias.map(media => {
            return {
              loc: `/gallery/modal/${media.modal}`
            }
          })
        }
      }
    }

    locales.map(locale => {

      arr.push({
        loc: `/${locale.code}/${endpoint}`,
        lastMod: new Date(),
        alternatives: getAlternatives(locale.code),
        image: getImages(endpoint)
      })
    });

    return arr;

  }, []);
})
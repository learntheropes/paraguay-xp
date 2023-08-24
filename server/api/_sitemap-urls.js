import uniqBy from 'lodash.uniqby';
import uniq from 'lodash.uniq';
import flatten from 'lodash.flatten';
import kebabCase from 'lodash.kebabcase';
import { defaultLocale, locales } from '~/assets/js/localization';
import services from '~/assets/js/services';

export default defineEventHandler(async () => {

  const {
    public: {
      deploymentDomain
    }
  } = useRuntimeConfig();

  const escortFiles = await useStorage('content:escorts').getKeys();
  const escortPromises = escortFiles.map(file => useStorage('content:escorts').getItem(`${file}`));
  const escorts = await Promise.all(escortPromises);
  const escortsUrls = escorts.map(escort => `escort/${escort.slug}`);

  const agencies = uniqBy(escorts, 'agency').filter(escort => escort.registry.basic.agency).map(escort => escort.registry.basic.agency);
  const agenciesUrls = agencies.map(agency => `agency/${kebabCase(agency)}`).concat([`agency/indipendent`])
  
  const areas = uniqBy(escorts, 'area').filter(escort => escort.registry.services.area).map(escort => escort.registry.services.area);
  const areasUrls = areas.map(area => `area/${kebabCase(area)}`).concat([`area/outcall-only`]);

  const extras = uniq(flatten(escorts.map(escort => escort.registry.extra))).filter(name => name);
  const extrasUrls = extras.map(extra => `extra/${kebabCase(extra)}`);

  const servicesUrls = services.map(service => `service/${kebabCase(service)}`);

  const blogFiles = await useStorage('content:es:blog').getKeys();
  const blogUrls = blogFiles.map(blog => `blog/${blog.split('.')[0]}`);

  const endpoints = [
    ...['', 'news', 'blog'],
    ...escortsUrls, 
    ...agenciesUrls,
    ...areasUrls,
    ...extrasUrls,
    ...servicesUrls,
    ...blogUrls,
  ];

  const getAlternatives = (thisLocale, endpoint) => [{
    hreflang: 'x-default',
    href: `/${defaultLocale}/${endpoint}`
  }]
  // .concat(locales
  //   // .filter (locale => locale.code !== thisLocale)
  //   .map(locale => {

  //     return {
  //       hreflang: locale.code,
  //       href: `/${locale.code}/${endpoint}`
  //     }
  //   })
  // )
  .concat(locales
    .map(locale => {

      return {
        hreflang: locale.iso,
        href: `/${locale.code}/${endpoint}`
      }
    })
  );

  const getImages = async endpoint => {

    if (endpoint.startsWith('escort/')) {

      const slug = endpoint.split('/')[1];

      const { 
        gallery: { 
          medias 
        }
      } = await useStorage('content:escorts').getItem(`${slug}.json`);

      if (medias && medias.length) {

        return medias.map(media => {

          return {
            loc: `${deploymentDomain}/gallery/modal/${media.id}.webp`
          }
        })
      }
    }
  };

  return endpoints.reduce(async (arrPromise, endpoint) => {

    const arr = await arrPromise;

    for (const locale of locales) {

      const alternatives = getAlternatives(locale.code, endpoint)

      const image = await getImages(endpoint);

      arr.push({
        loc: `/${locale.code}/${endpoint}`,
        lastMod: new Date(),
        alternatives,
        image
      })
    }

    return arr;

  }, Promise.resolve([]));
})
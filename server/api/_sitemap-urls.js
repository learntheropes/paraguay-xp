import uniqBy from 'lodash.uniqby';
import uniq from 'lodash.uniq';
import flatten from 'lodash.flatten';
import kebabCase from 'lodash.kebabcase';
import find from 'lodash.find';
import { defaultLocale, locales } from '~/assets/js/localization';
import services from '~/assets/js/services';

export default defineEventHandler(async event => {

  const {
    public: {
      deploymentDomain
    }
  } = useRuntimeConfig();

  const escortFiles = await useStorage('content:escorts').getKeys();
  const escortPromises = escortFiles.map(file => useStorage('content:escorts').getItem(`${file}`));
  const escorts = await Promise.all(escortPromises);
  const escortsUrls = escorts.filter(escort => escort.approved).map(escort => `escort/${escort.slug}`);

  const agencies = uniqBy(escorts, 'agency').filter(escort => escort.registry.basic.agency).map(escort => escort.registry.basic.agency);
  const indipendent = find(escorts, e => e.registry.basic.category === 'indipendent');
  let agenciesUrls = agencies.map(agency => `agency/${kebabCase(agency)}`);
  if (indipendent) agenciesUrls = agenciesUrls.concat([`agency/indipendent`]);

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
    href: `/${endpoint}`
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

        return medias
          .filter(media => media.type === 'image')
          .map(media => {

            return {
              loc: `${deploymentDomain}/gallery/${slug}/modal/${media.id}.webp`
            }
          })
      }
    }
  };

  const getVideos = async endpoint => {

    if (endpoint.startsWith('escort/')) {

      const slug = endpoint.split('/')[1];

      const { 
        gallery: { 
          medias 
        }
      } = await useStorage('content:escorts').getItem(`${slug}.json`);

      if (medias && medias.length) {

        return medias
          .filter(media => media.type === 'video')
          .map(media => {

            return {
              loc: `${deploymentDomain}/gallery/${slug}/modal/${media.id}.mp4`
            }
          })
      }
    }
  };

  return endpoints.reduce(async (arrPromise, endpoint) => {

    const arr = await arrPromise;

    for (const locale of locales) {

      const alternatives = getAlternatives(locale.code, endpoint);
      const image = await getImages(endpoint);
      const video = await getVideos(endpoint);

      arr.push({
        loc: `/${locale.code}/${endpoint}`,
        // lastMod: new Date(),
        alternatives,
        image,
        video
      })
    }

    return arr;

  }, Promise.resolve([]));
})
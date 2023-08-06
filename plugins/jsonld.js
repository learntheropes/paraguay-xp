import find from 'lodash.find';
import { locales } from '~/assets/js/locales';

export default defineNuxtPlugin(nuxtApp => {

  const { 
    public: {
      deploymentDomain,
      whatsappAdmin
    }
  } = useRuntimeConfig();

  const { 
    locale,
    t
  } = nuxtApp.$i18n;
  const inLanguage = find(locales, { code: locale.value }).iso

  return {
    provide: {
      jsonld: {

        logo: () => {
          return {
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            '@id': `${deploymentDomain}#logo`,
            'url': `${deploymentDomain}/favicon.png`,
            'contentUrl': `${deploymentDomain}/favicon.png`,
            'width': 225,
            'height': 223
          }
        },

        organization: () => {
          return {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': `${deploymentDomain}#organization`,
            'name': 'tgexp',
            'url': 'https://tgepx.learntheropes.xyz',
            'telephone': whatsappAdmin,
            'logo': {
              '@id': `${deploymentDomain}#logo`,
            }
          }
        },

        website: () => {
          return {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${deploymentDomain}#website`,
            'url': `${deploymentDomain}/${locale.value}`,
            'name': 'ParaguayXp Website',
            'description': t('index.title'),
            'publisher': {
              '@id': `${deploymentDomain}#organization`
            },
            'inLanguage': inLanguage,
          }
        },

        escortProfilePage: (escort) => {
          console.log('profile', `${deploymentDomain}/${locale.value}/escort/${escort.slug}#breadcrumb`)
          return {
            '@context': 'https://schema.org',
            '@type': [
              'ProfilePage',
              'WebPAge'
            ],
            '@id': `${deploymentDomain}/${locale.value}/escort/${escort.slug}`,
            'url': `${deploymentDomain}/${locale.value}/escort/${escort.slug}`,
            'name': `${nuxtApp.$capitalize(escort.registry.basic.name)} Profile Page`,
            'thumbnail': `${escort.gallery.medias[0].preview}`,
            'image': escort.gallery.medias.map(media => {
              return {
                '@id': `${deploymentDomain}/${locale.value}/image/${media.id}`,
                '@type': 'ImageObject',
                contentUrl: media.modal
              }
            }),
            'dateModified': escort.updatedAt,
            'description': escort.description.head[locale.value],
            'inLanguage': inLanguage,
            'isPartOf': {
              '@id': `${deploymentDomain}#website`
            },
            'breadcrumb': {
              '@id': `${deploymentDomain}/${locale.value}/escort/${escort.slug}#breadcrumb`
            },
            'potentialAction': {
              '@type': 'ReadAction',
              'url': `${deploymentDomain}/${locale.value}/escort/${escort.slug}`,
              'target': {
                '@type': 'EntryPoint',
                'urlTemplate': `${deploymentDomain}/${locale.value}/escort/${escort.slug}`
              }
            }
          }
        },

        escortAdvertiserContentArticle: (escort) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'AdvertiserContentArticle',
            '@id': `${deploymentDomain}/${locale.value}/escort/${escort.slug}#article`,
            'isPartOf': {
              '@id': `${deploymentDomain}/${locale.value}/escort/${escort.slug}`
            },
            'headline': `${escort.description.head[locale.value]}`,
            'dateModified': escort.updatedAt,
            'mainEntityOfPage': {
              '@id': `${deploymentDomain}/${locale.value}/escort/${escort.slug}`
            },
            'articleBody': escort.description.about[locale.value],
            'wordCount': escort.description.about[locale.value].split(' ').length,
            'image': escort.gallery.medias[0].modal,
            'inLanguage': inLanguage
          }
        },

        escortBreadcrumbList: (escort) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': `${deploymentDomain}/${locale.value}/escort/${escort.slug}#breadcrumb`,
            'name': `${escort.slug} Breadcrumb`,
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': t('index.title'),
                'item': `${deploymentDomain}/${locale.value}`
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': t(`level.${escort.level}`),
                'item': `${deploymentDomain}/${locale.value}#${escort.level}`
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': nuxtApp.$capitalize(escort.registry.basic.name),
                'item': `${deploymentDomain}/${locale.value}/escort/${escort.slug}`
              }
            ]
          }
        },

        postWebPage: (_path, title, description) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${deploymentDomain}/${locale.value}${_path}`,
            'url': `${deploymentDomain}/${locale.value}${_path}`,
            'name': `${title} Webpage`,
            'isPartOf': {
              '@id': `${deploymentDomain}#website`
            },
            'breadcrumb': {
              '@id': `${deploymentDomain}/${locale.value}${_path}#breadcrumb`
            },
            'description': description,
            'inLanguage': inLanguage
          }
        },

        postArticle: (_path, title, description, updatedAt, text, toc) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': `${deploymentDomain}/${locale.value}${_path}#article`,
            'url': `${deploymentDomain}/${locale.value}${_path}`,
            'name': `${title} Article`,
            'isPartOf': {
              '@id': `${deploymentDomain}/${locale.value}${_path}`
            },
            'headline': description,
            'dateModified': updatedAt,
            'mainEntityOfPage': {
              '@id': `${deploymentDomain}/${locale.value}${_path}`
            },
            'articleBody': text,
            'wordCount': text.split(' ').length,
            'publisher': {
              '@id': `${deploymentDomain}#organization`
            },
            'author': {
              '@id': `${deploymentDomain}#organization`
            },
            'articleSection': toc.links.map(section => section.text),
            'inLanguage': inLanguage,
            'potentialAction': {
              '@type': 'ReadAction',
              'url': `${deploymentDomain}/${locale.value}${_path}`,
              'target': {
                '@type': 'EntryPoint',
                'urlTemplate': `${deploymentDomain}/${locale.value}${_path}`
              }
            }
          }
        },

        postBreadcrumbList: (_path, title, target) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': `${deploymentDomain}/${locale.value}${_path}#breadcrumb`,
            'name': `${title} Breadcrumb`,
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': t('index.title'),
                'item': `${deploymentDomain}/${locale.value}`
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': (target === 'escort') ? t('blog.forEscorts') : t('blog.forClients'),
                'item': `${deploymentDomain}/${locale.value}/blog/#${target}`
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': title,
                'item': `${deploymentDomain}/${locale.value}${_path}`
              }
            ]
          }
        },
      }
    }
  }
});
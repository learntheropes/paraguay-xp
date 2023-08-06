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
            'height': 223,
            'caption': 'gfexp'
          }
        },

        organization: () => {
          return {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': `${deploymentDomain}}#organization`,
            'name': 'gfexp',
            'url': 'gfexp.net',
            'email': `info@gfexp.net`,
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

        postWebPage: (_path, title, description) => {
          return {
            '@type': 'WebPage',
            '@id': `${deploymentDomain}/${locale.value}${_path}`,
            'url': `${deploymentDomain}/${locale.value}${_path}`,
            'name': `${title} Webpage`,
            'isPartOf': {
              '@id': `${deploymentDomain}#website`
            },
            'breadcrumb': {
              '@id': `https://${deploymentDomain}/${locale.value}${_path}#postbreadcrumb`
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

        postBreadcrumbList: (_path, title) => {
          return {
            '@type': 'BreadcrumbList',
            '@id': `${deploymentDomain}/${locale.value}${_path}#postbreadcrumb`,
            'name': `${title} Breadcrumb`,
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Escorts',
                'item': `${deploymentDomain}/${locale.value}`
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': t('footer.blog'),
                'item': `${deploymentDomain}/${locale.value}/blog`
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
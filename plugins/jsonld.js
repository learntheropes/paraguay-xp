import find from 'lodash.find';
import { locales } from '~/assets/js/localization';

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

        indexWebPage: () => {
          return {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${deploymentDomain}/${locale.value}#webpage`,
            'url': `${deploymentDomain}/${locale.value}`,
            'name': `${t('index.title')} WebPage`,
            'headline': t('index.title'),
            'description':  t('index.description'),

            'isPartOf': {
              '@id': `${deploymentDomain}#website`
            },
            'inLanguage': inLanguage
          }
        },

        indexCollection: (all) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'Collection',
            '@id': `${deploymentDomain}/${locale.value}#collection`,
            'url': `${deploymentDomain}/${locale.value}#collection`,
            'name': `${t('index.title')} Collection`,
            'headline': t('index.title'),	
            'collectionSize': all.length,
            'isPartOf': {
              '@id': `${deploymentDomain}/${locale.value}#webpage`
            },
            'mainEntity': {
              '@type': 'ItemList',
              'numberOfItems': all.length,
              'itemListElement': all.map((item, index) => {
                return {
                  '@type': 'ListItem',
                  'position': index + 1,
                  'name': nuxtApp.$capitalize(item.preview.name),
                  'image': {
                    '@type': 'ImageObject',
                    'contentUrl': item.preview.cover.modal
                  },
                  'url': `${deploymentDomain}/${locale.value}/escort/${item.slug}`
                }
              })
            },
            'inLanguage': inLanguage
          }
        },

        indexArticleClients: ({ text ,body, updatedAt }) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': `${deploymentDomain}/${locale.value}#article-for-clients`,
            'url': `${deploymentDomain}/${locale.value}#article-for-clients`,
            'isPartOf': {
              '@id': `${deploymentDomain}/${locale.value}#webpage`
            },
            'dateModified': updatedAt,
            'articleBody': text,
            'wordCount': text.split(' ').length,
            'articleSection': body.toc.links.map(section => section.text),
            'publisher': {
              '@id': `${deploymentDomain}#organization`
            },
            'author': {
              '@id': `${deploymentDomain}#organization`
            }, 
            'inLanguage': inLanguage,
            'potentialAction': {
              '@type': 'ReadAction',
              'url': `${deploymentDomain}/${locale.value}#article-for-clients`,
              'target': {
                '@type': 'EntryPoint',
                'urlTemplate': `${deploymentDomain}/${locale.value}#article-for-clients`
              }
            }
          }
        },

        newsCollection: (all) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'Collection',
            '@id': `${deploymentDomain}/${locale.value}/news#collection`,
            'url': `${deploymentDomain}/${locale.value}/news`,
            'name': `${t('news.title')} Collection`,
            'headline': t('news.title'),
            'collectionSize': all.length,
            'isPartOf': {
              '@id': `${deploymentDomain}/${locale.value}#webpage`
            },
            'mainEntity': {
              '@type': 'ItemList',
              'numberOfItems': all.length,
              'itemListElement': all.map((item, index) => {
                return {
                  '@type': 'ListItem',
                  'position': index + 1,
                  'name': nuxtApp.$capitalize(item.preview.name),
                  'image': {
                    '@type': 'ImageObject',
                    'contentUrl': item.preview.cover.id
                  },
                  'url': `${deploymentDomain}/${locale.value}/escort/${item.slug}`
                }
              })
            },
            'inLanguage': inLanguage
          }
        },

        agencyCollection: (slug, title, all) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'Collection',
            '@id': `${deploymentDomain}/${locale.value}/agency/${slug}#collection`,
            'url': `${deploymentDomain}/${locale.value}/agency/${slug}`,
            'name': `${title} Collection`,
            'headline': title,
            'collectionSize': all.length,
            'isPartOf': {
              '@id': `${deploymentDomain}/${locale.value}#webpage`
            },
            'mainEntity': {
              '@type': 'ItemList',
              'numberOfItems': all.length,
              'itemListElement': all.map((item, index) => {
                return {
                  '@type': 'ListItem',
                  'position': index + 1,
                  'name': nuxtApp.$capitalize(item.preview.name),
                  'image': {
                    '@type': 'ImageObject',
                    'contentUrl': `/gallery/preview/${item.preview.cover.id}.webp`
                  },
                  'url': `${deploymentDomain}/${locale.value}/escort/${item.preview.slug}`
                }
              })
            },
            'inLanguage': inLanguage
          }
        },

        areaCollection: (slug, title, all) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'Collection',
            '@id': `${deploymentDomain}/${locale.value}/area/${slug}#collection`,
            'url': `${deploymentDomain}/${locale.value}/area/${slug}`,
            'name': `${title} Collection`,
            'headline': title,
            'collectionSize': all.length,
            'isPartOf': {
              '@id': `${deploymentDomain}/${locale.value}#webpage`
            },
            'mainEntity': {
              '@type': 'ItemList',
              'numberOfItems': all.length,
              'itemListElement': all.map((item, index) => {
                return {
                  '@type': 'ListItem',
                  'position': index + 1,
                  'name': nuxtApp.$capitalize(item.preview.name),
                  'image': {
                    '@type': 'ImageObject',
                    'contentUrl': `/gallery/preview/${item.preview.cover.id}.webp`
                  },
                  'url': `${deploymentDomain}/${locale.value}/escort/${item.preview.slug}`
                }
              })
            },
            'inLanguage': inLanguage
          }
        },

        extraWebPage: (slug, title, description) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${deploymentDomain}/${locale.value}/extra/${slug}#webpage`,
            'url': `${deploymentDomain}/${locale.value}/extra/${slug}`,
            'name': `${title} WebPage`,
            'headline': title,
            'description': description,

            'isPartOf': {
              '@id': `${deploymentDomain}#website`
            },
            'inLanguage': inLanguage
          }
        },

        extraCollection: (slug, title, all) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'Collection',
            '@id': `${deploymentDomain}/${locale.value}/extra/${slug}#collection`,
            'url': `${deploymentDomain}/${locale.value}/extra/${slug}#collection`,
            'name': `${title} Collection`,
            'headline': title,
            'collectionSize': all.length,
            'isPartOf': {
              '@id': `${deploymentDomain}/${locale.value}/extra/${slug}#webpage`
            },
            'mainEntity': {
              '@type': 'ItemList',
              'numberOfItems': all.length,
              'itemListElement': all.map((item, index) => {
                return {
                  '@type': 'ListItem',
                  'position': index + 1,
                  'name': nuxtApp.$capitalize(item.preview.name),
                  'image': {
                    '@type': 'ImageObject',
                    'contentUrl': `/cover/preview/${item.preview.cover.id}`
                  },
                  'url': `${deploymentDomain}/${locale.value}/escort/${item.preview.slug}`
                }
              })
            },
            'inLanguage': inLanguage
          }
        },

        extraArticle: (slug, { text ,body, updatedAt }) => {
          if (!updatedAt) return null;
          return {
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': `${deploymentDomain}/${locale.value}/extra/${slug}#article`,
            'url': `${deploymentDomain}/${locale.value}/extra/${slug}#article`,
            'isPartOf': {
              '@id': `${deploymentDomain}/${locale.value}/extra/${slug}#webpage`
            },
            'dateModified': updatedAt,
            'articleBody': text,
            'wordCount': text.split(' ').length,
            'articleSection': body.toc.links.map(section => section.text),
            'publisher': {
              '@id': `${deploymentDomain}#organization`
            },
            'author': {
              '@id': `${deploymentDomain}#organization`
            }, 
            'inLanguage': inLanguage,
            'potentialAction': {
              '@type': 'ReadAction',
              'url': `${deploymentDomain}/${locale.value}/extra/${slug}#article`,
              'target': {
                '@type': 'EntryPoint',
                'urlTemplate': `${deploymentDomain}/${locale.value}/extra/${slug}#article`
              }
            }
          }
        },

        serviceWebPage: (slug, title, description) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${deploymentDomain}/${locale.value}/service/${slug}#webpage`,
            'url': `${deploymentDomain}/${locale.value}/service/${slug}`,
            'name': `${title} WebPage`,
            'headline': title,
            'description': description,

            'isPartOf': {
              '@id': `${deploymentDomain}#website`
            },
            'inLanguage': inLanguage
          }
        },

        serviceCollection: (slug, title, all) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'Collection',
            '@id': `${deploymentDomain}/${locale.value}/service/${slug}#collection`,
            'url': `${deploymentDomain}/${locale.value}/service/${slug}#collection`,
            'name': `${title} Collection`,
            'headline': title,
            'collectionSize': all.length,
            'isPartOf': {
              '@id': `${deploymentDomain}/${locale.value}/service/${slug}#webpage`
            },
            'mainEntity': {
              '@type': 'ItemList',
              'numberOfItems': all.length,
              'itemListElement': all.map((item, index) => {
                return {
                  '@type': 'ListItem',
                  'position': index + 1,
                  'name': nuxtApp.$capitalize(item.preview.name),
                  'image': {
                    '@type': 'ImageObject',
                    'contentUrl': `/gallery/preview/${item.preview.cover.id}.webp`
                  },
                  'url': `${deploymentDomain}/${locale.value}/escort/${item.preview.slug}`
                }
              })
            },
            'inLanguage': inLanguage
          }
        },

        serviceArticle: (slug, { text ,body, updatedAt }) => {
          if (!updatedAt) return null;
          return {
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': `${deploymentDomain}/${locale.value}/service/${slug}#article`,
            'url': `${deploymentDomain}/${locale.value}/service/${slug}#article`,
            'isPartOf': {
              '@id': `${deploymentDomain}/${locale.value}/service/${slug}#webpage`
            },
            'dateModified': updatedAt,
            'articleBody': text,
            'wordCount': text.split(' ').length,
            'articleSection': body.toc.links.map(section => section.text),
            'publisher': {
              '@id': `${deploymentDomain}#organization`
            },
            'author': {
              '@id': `${deploymentDomain}#organization`
            }, 
            'inLanguage': inLanguage,
            'potentialAction': {
              '@type': 'ReadAction',
              'url': `${deploymentDomain}/${locale.value}/service/${slug}#article`,
              'target': {
                '@type': 'EntryPoint',
                'urlTemplate': `${deploymentDomain}/${locale.value}/service/${slug}#article`
              }
            }
          }
        },

        escortProfilePage: (escort) => {
          return {
            '@context': 'https://schema.org',
            '@type': [
              'ProfilePage',
              'WebPAge'
            ],
            '@id': `${deploymentDomain}/${locale.value}/escort/${escort.preview.slug}`,
            'url': `${deploymentDomain}/${locale.value}/escort/${escort.preview.slug}`,
            'name': `${nuxtApp.$capitalize(escort.preview.name)} Profile Page`,
            'thumbnail': `${escort.preview.cover.id}`,
            'image': escort.gallery.medias
              .filter(media => media.type === 'image')
              .map(media => {
                return {
                  '@id': `${deploymentDomain}/${locale.value}/image/${media.id}`,
                  '@type': 'ImageObject',
                  contentUrl: media.modal
                }
              }),
            'dateModified': escort.updatedAt,
            'description': escort.description.title[locale.value],
            'inLanguage': inLanguage,
            'isPartOf': {
              '@id': `${deploymentDomain}#website`
            },
            'breadcrumb': {
              '@id': `${deploymentDomain}/${locale.value}/escort/${escort.preview.slug}#breadcrumb`
            },
            'potentialAction': {
              '@type': 'ReadAction',
              'url': `${deploymentDomain}/${locale.value}/escort/${escort.preview.slug}`,
              'target': {
                '@type': 'EntryPoint',
                'urlTemplate': `${deploymentDomain}/${locale.value}/escort/${escort.preview.slug}`
              }
            }
          }
        },

        escortAdvertiserContentArticle: (escort) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'AdvertiserContentArticle',
            '@id': `${deploymentDomain}/${locale.value}/escort/${escort.preview.slug}#article`,
            'isPartOf': {
              '@id': `${deploymentDomain}/${locale.value}/escort/${escort.preview.slug}`
            },
            'headline': `${escort.description.title[locale.value]}`,
            'dateModified': escort.updatedAt,
            'articleBody': escort.description.about[locale.value],
            'wordCount': escort.description.about[locale.value].split(' ').length,
            'image': escort.preview.cover.id,
            'inLanguage': inLanguage
          }
        },

        escortBreadcrumbList: (escort) => {
          return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': `${deploymentDomain}/${locale.value}/escort/${escort.preview.slug}#breadcrumb`,
            'name': `${escort.preview.slug} Breadcrumb`,
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
                'item': `${deploymentDomain}/${locale.value}/escort/${escort.preview.slug}`
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
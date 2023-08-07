<script setup>
import services from '~/assets/js/services'
import camelCase from 'lodash.camelcase';

definePageMeta({
  auth: false,
});

const { params: { slug }} = useRoute();

const service = camelCase(slug);

if (!services.includes(service)) throw createError({ statusCode: 404 });

const { t } = useI18n();

const {
  public: {
    seoTitle
  }
} = useRuntimeConfig();

const title = t('service.title', { service: t(`service.${service}`) });

const description = t('service.description', { service: t(`service.${service}`) });

useHead({
  title: title + seoTitle,
  meta: [
    {
      id: 'description',
      name: 'description',
      content: description
    },
    {
      id: 'og:title',
      name: 'og:title',
      content: title + seoTitle
    },
    {
      id: 'og:description',
      name: 'og:description',
      content: description
    },
  ],
});

const { $listen } = useNuxtApp();

let all = ref([]);
$listen('serviceEscorts', escorts => {

  all.value = Object.keys(escorts).reduce((arr, level) => {

    escorts[level].forEach(escort => arr.push(escort));
    return arr;
  }, []);
})

let post = ref({
  text: '',
  body: {
    toc: {
      links: []
    }
  },
  updatedAt: null
});
$listen('serviceArticle', ({ text ,body, updatedAt }) => {

  post.value = { text ,body, updatedAt };
})

const { $jsonld } = useNuxtApp();
useJsonld(() => ([
  $jsonld.logo(),
  $jsonld.organization(),
  $jsonld.website(),
  $jsonld.serviceWebPage(slug, title, description),
  $jsonld.serviceCollection(slug, title, all.value),
  $jsonld.serviceArticle(slug, post.value)
]));
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <h1 class="title is-3">{{ title }}</h1>
      <div class="subtitle is-5">{{ description }}</div>
      <ServiceLevels :service="service" id="collection" />
      <ServiceDescription :slug="slug" id="description" />
      <CollectionNavigator :slug="slug" />
    </div>
  </NuxtLayout>
</template>
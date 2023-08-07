<script setup>
import camelCase from 'lodash.camelcase';
import extras from '~/assets/js/extras'

definePageMeta({
  auth: false,
});

const { 
  params: { 
    slug 
  }
} = useRoute();

const extra = camelCase(slug);

if (!(extras.includes(extra))) throw createError({ statusCode: 404 });

const { t } = useI18n();

const {
  public: {
    seoTitle
  }
} = useRuntimeConfig();

const title = t('extra.title', { extra: t(`extra.${extra}`).toLowerCase() });

const description = t('extra.description', { extra: t(`extra.${extra}`).toLowerCase() });

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
$listen('extraEscorts', escorts => {

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
$listen('extraArticle', ({ text ,body, updatedAt }) => {

  post.value = { text ,body, updatedAt };
})

const { $jsonld } = useNuxtApp();
useJsonld(() => ([
  $jsonld.logo(),
  $jsonld.organization(),
  $jsonld.website(),
  $jsonld.extraWebPage(slug, title, description),
  $jsonld.extraCollection(slug, title, all.value),
  $jsonld.extraArticle(slug, post.value)
]));
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <h1 class="title is-3">{{ title }}</h1>
      <div class="subtitle is-5">{{ description }}</div>
      <ExtraLevels :extra="extra" id="collection" />
      <ExtraDescription :slug="slug" id="article" />
      <CollectionNavigator :slug="slug" />
    </div>
  </NuxtLayout>
</template>
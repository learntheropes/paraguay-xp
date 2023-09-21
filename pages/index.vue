<script setup>
definePageMeta({
  auth: false,
});

const { t } = useI18n();

const {
  public: {
    seoTitle
  }
} = useRuntimeConfig();

useHead({
  title: t('index.title') + seoTitle,
  meta: [
    {
      id: 'description',
      name: 'description',
      content: t('index.description')
    },
    {
      id: 'og:title',
      name: 'og:title',
      content: t('index.title') + seoTitle
    },
    {
      id: 'og:description',
      name: 'og:description',
      content: t('index.description')
    },
  ],
});

const { 
  $listen 
} = useNuxtApp();

let all = ref([]);
$listen('indexEscorts', escorts => {

  all.value = Object.keys(escorts).reduce((arr, level) => {

    escorts[level].forEach(escort => arr.push(escort));
    return arr;
  }, []);
})

let postClients = ref({
  text: '',
  body: {
    toc: {
      links: []
    }
  },
  updatedAt: null
});
$listen('indexArticleClients', ({ text ,body, updatedAt }) => {

  postClients.value = { text ,body, updatedAt };
})

const { $jsonld } = useNuxtApp();
useJsonld(() => ([
  $jsonld.logo(),
  $jsonld.organization(),
  $jsonld.website(),
  $jsonld.indexWebPage(),
  $jsonld.indexCollection(all.value),
  // $jsonld.indexArticleClients(postClients.value)
]));
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <h1 class="title is-3">{{ $t('index.title') }}</h1>
      <div class="subtitle is-5">{{ $t('index.subtitle') }} 🇵🇾</div>
      <IndexFilter />
      <IndexLevels id="collection" />
      <CollectionNavigator />
      <IndexInstructions id="article-for-clients" />
    </div>
  </NuxtLayout>
</template>
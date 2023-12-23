<script setup>
import neighbourhoods from '~/assets/js/neighbourhoods'
import cities from '~/assets/js/cities'

const { 
  params: { 
    slug 
  }
} = useRoute();

definePageMeta({
  auth: false,
});

const { t } = useI18n();

const { $capitalize } = useNuxtApp();

const area = (slug === 'outcall-only') ? 'outcall-only' : $capitalize(decodeURIComponent(slug).replace(/-/g,' '));

const {
  public: {
    seoTitle
  }
} = useRuntimeConfig();

const title = (slug === 'outcall-only') ? t('area.titleOutcallOnly') : t('area.titleArea', { area });

const description = (slug === 'outcall-only')
  ? t('area.descriptionOutcallOnly')
  : (neighbourhoods.includes(area)) 
    ? t('area.descriptionNeighbourhood', { area })
    : t('area.descriptionCity', { area });

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

const areas = [].concat(neighbourhoods, cities);

if (!(areas.includes(area)) && (slug !== 'outcall-only')) throw createError({ statusCode: 404 });

const { $listen } = useNuxtApp();
$listen('areaEscorts', escorts => {

  const all = Object.keys(escorts).reduce((arr, level) => {

    escorts[level].forEach(escort => arr.push(escort));
    return arr;
  }, []);

  const { $jsonld } = useNuxtApp();
  useJsonld(() => ([
    $jsonld.logo(),
    $jsonld.organization(),
    $jsonld.website(),
    $jsonld.areaWebPage(slug, title, description),
    $jsonld.areaCollection(slug, title, all),
  ]));
});
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <h1 class="title is-3">{{ title }}</h1>
      <div class="subtitle is-5">{{ description }}</div>
      <AreaLevels :area="area" />
      <CollectionNavigator :slug="slug" />
    </div>
  </NuxtLayout>
</template>
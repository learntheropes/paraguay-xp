<script setup>
import neighbourhoods from '~/assets/js/neighbourhoods'
import cities from '~/assets/js/cities'

const { params: { slug }} = useRoute();

definePageMeta({
  auth: false,
});

const { t } = useI18n();

const { $capitalize } = useNuxtApp();

const area = (slug === 'outcall-only') ? 'outcall-only' : $capitalize(decodeURIComponent(slug).replace(/-/g,' '));

const title = (slug === 'outcall-only') ? t('area.titleOutcallOnly') : t('area.titleArea', { area });

const getDescription = () => {
  if (slug === 'outcall-only') {
    return t('area.descriptionOutcallOnly');
  }
  else if (neighbourhoods.includes(area)) {
    return t('area.descriptionNeighbourhood', { area });
  }
  else {
    return t('area.descriptionCity', { area });
  }
};

const description = getDescription();

useHead({
  title,
  meta: [
    {
      id: 'description',
      name: 'description',
      content: description
    },
    {
      id: 'og:title',
      name: 'og:title',
      content: title
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
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <h1 class="title is-4">{{ title }}</h1>
      <div class="subtitle is-6">{{ description }}</div>
      <AreaLevels :area="area" />
      <CollectionNavigator :slug="slug" />
    </div>
  </NuxtLayout>
</template>
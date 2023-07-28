<script setup>
definePageMeta({
  auth: false,
});

const { t } = useI18n();

const { params: { slug }} = useRoute();

const { $capitalize } = useNuxtApp();

const agency = (slug === 'indipendent') ? 'indipendent' : $capitalize(decodeURIComponent(slug).replace(/-/g,' '));

const title = (agency === 'indipendent') ? t('agency.titleIndipendent') : t('agency.title', { agency });

const description = (agency === 'indipendent') ? t('agency.descriptionIndipendent') : t('agency.description', { agency });

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
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <h1 class="title is-3">{{ title }}</h1>
      <div class="subtitle is-5">{{ description }}</div>
      <AgencyLevels :agency="agency" />
      <CollectionNavigator :slug="slug" />
    </div>
  </NuxtLayout>
</template>
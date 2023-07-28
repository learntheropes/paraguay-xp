<script setup>
definePageMeta({
  auth: false,
});

const { t } = useI18n();

useHead({
  title: t('history.title'),
  meta: [
    {
      id: 'description',
      name: 'description',
      content: t('history.description')
    },
    {
      id: 'og:title',
      name: 'og:title',
      content: t('history.title')
    },
    {
      id: 'og:description',
      name: 'og:description',
      content: t('history.description')
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <h1 class="title is-3">{{ $t('history.title') }}</h1>
      <div class="subtitle is-5">{{ $t('history.description') }}</div>
      <HistoryLevels />
      <CollectionNavigator />
    </div>
  </NuxtLayout>
</template>
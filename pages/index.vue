<script setup>
definePageMeta({
  auth: false,
});

const { t } = useI18n();

useHead({
  title: t('index.title'),
  meta: [
    {
      id: 'description',
      name: 'description',
      content: t('index.description')
    },
    {
      id: 'og:title',
      name: 'og:title',
      content: t('index.title')
    },
    {
      id: 'og:description',
      name: 'og:description',
      content: t('index.description')
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <h1 class="title is-3">{{ $t('index.title') }}</h1>
      <div class="subtitle is-5">{{ $t('index.subtitle') }}</div>
      <IndexLevels />
      <CollectionNavigator />
      <IndexInstructions />
    </div>
  </NuxtLayout>
</template>
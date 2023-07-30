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
  title: t('news.title') + seoTitle,
  meta: [
    {
      id: 'description',
      name: 'description',
      content: t('news.description')
    },
    {
      id: 'og:title',
      name: 'og:title',
      content: t('news.title') + seoTitle
    },
    {
      id: 'og:description',
      name: 'og:description',
      content: t('news.description')
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <h1 class="title is-3">{{ $t('news.title') }}</h1>
      <div class="subtitle is-5">{{ $t('news.description') }}</div>
      <NewsLevels />
      <CollectionNavigator />
    </div>
  </NuxtLayout>
</template>
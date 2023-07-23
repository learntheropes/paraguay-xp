<script setup>
definePageMeta({
  auth: false,
});

const store = useEscortsStore();
const levels = store.levels
const escorts = store.list
const { locale, t } = useI18n();

const {
  title,
  body
} = await queryContent('home', 'clients')
  .locale(locale.value)
  .findOne();

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
      <IndexLevels :levels="levels" :escorts="escorts" />
      <section class="section">
        <h2 class="title is-5">{{ title }}</h2>
        <ContentRendererMarkdown :value="{ body }" class="content"/>
      </section>
    </div>
  </NuxtLayout>
</template>
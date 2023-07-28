<script setup>
definePageMeta({
  auth: false,
});

const { locale } = useI18n();

const {
  public: {
    seoTitle
  }
} = useRuntimeConfig();

const {
  title,
  body
} = await queryContent('legal')
  .locale(locale.value)
  .findOne();

useHead({
  title: title + seoTitle
});
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <h1 class="title is-3">{{ title }}</h1>
      <ContentRendererMarkdown :value="{ body }" class="content"/>
    </div>
  </NuxtLayout>
</template>
<script setup>
const { locale } = useI18n();

const {
  title,
  body
} = await queryContent('home', 'clients')
  .locale(locale.value)
  .findOne();
</script>

<template>
  <section class="section">
    <h2 class="title is-5">{{ title }}</h2>
    <ContentRendererMarkdown :value="{ body }" class="content"/>
  </section>
</template>
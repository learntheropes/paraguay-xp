<script setup>
const { locale } = useI18n();

const {
  title,
  body,
  updatedAt
} = await queryContent('home', 'clients')
  .locale(locale.value)
  .findOne();

const { $parseContentBody } = useNuxtApp();
const text = $parseContentBody(body);

const { $event } = useNuxtApp();
$event('indexArticleClients', { text, body, updatedAt});
</script>

<template>
  <section class="section">
    <h2 class="title is-5">{{ title }}</h2>
    <ContentRendererMarkdown :value="{ body }" class="content"/>
  </section>
</template>
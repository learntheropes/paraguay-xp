<script setup>
const { locale } = useI18n();

const {
  title,
  body,
  updatedAt
} = await queryContent('home', 'clients')
  .locale(locale.value)
  .findOne();

const text = body.children.map(
  one => (one.type === 'text') ? one.value : one.children.map(
    two => (two.type === 'text') ? two.value : two.children.map(
      three => (three.type === 'text') ? three.value : three.children[0].value
    )
  ).join('')
).join('\n');


const { 
  $event 
} = useNuxtApp();
$event('indexArticleClients', { text, body, updatedAt});
</script>

<template>
  <section class="section">
    <h2 class="title is-5">{{ title }}</h2>
    <ContentRendererMarkdown :value="{ body }" class="content"/>
  </section>
</template>
<script setup>
definePageMeta({
  auth: false,
});

const { 
  params: { 
    slug 
  }
} = useRoute();

const { 
  locale 
} = useI18n();

const {
  title,
  description,
  target,
  body
} = await queryContent('blog', slug).locale(locale.value).findOne();
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <h1 class="title is-3">{{ title }}</h1>
      <ContentRendererMarkdown :value="{ body }" class="content"/>
    </div>
  </NuxtLayout>
</template>
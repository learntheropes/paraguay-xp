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
  body,
  _path
} = await queryContent('blog', slug).locale(locale.value).findOne();
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <section class="section">
        <h1 class="title is-4">{{ title }}</h1>
        <div class="subtitle is-6">{{ description }}</div>
        <TableOfContent :toc="body.toc" />
      </section>
    </div>
    <BannerClients v-if="target === 'client'" />
    <BannerEscorts v-if="target === 'escort'" />
    <div class="container">
      <section class="section">
        <ContentRendererMarkdown :value="{ body }" class="content"/>
      </section>
      <SimilarPosts :target="target" :_path="_path" />
      <CollectionNavigator />
    </div>
  </NuxtLayout>
</template>
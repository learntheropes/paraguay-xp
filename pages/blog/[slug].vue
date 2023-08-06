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
  _path,
} = await queryContent('blog', slug).locale(locale.value).findOne();

const text = body.children.map(one => one.children.map(two => (two.type === 'text') ? two.value : two.children[0].value).join('')).join('\n');

const {
  public: {
    seoTitle
  }
} = useRuntimeConfig();

useHead({
  title: title + seoTitle,
  meta: [
    {
      id: 'description',
      name: 'description',
      content: description
    },
    {
      id: 'og:title',
      name: 'og:title',
      content: title + seoTitle
    },
    {
      id: 'og:description',
      name: 'og:description',
      content: description
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <h1 class="title is-3">{{ title }}</h1>
      <div class="subtitle is-5">{{ description }}</div>
      <TableOfContent :toc="body.toc" />
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
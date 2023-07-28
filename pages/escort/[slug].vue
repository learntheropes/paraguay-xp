<script setup>
definePageMeta({
  auth: false,
});

const {
  params: {
    slug
  }
} = useRoute();
const escort = await queryContent('escorts', slug).findOne();

const { locale } = useI18n();
const { $capitalize } = useNuxtApp();

const title = $capitalize(escort.name);
const description = escort.head[locale.value];

const {
  public: {
    deploymentDomain
  }
} = useRuntimeConfig();

useHead({
  title,
  meta: [
    {
      id: 'description',
      name: 'description',
      content: description
    },
    {
      id: 'og:title',
      name: 'og:title',
      content: title
    },
    {
      id: 'og:description',
      name: 'og:description',
      content: description
    },
    {
      id: 'og:image',
      name: 'og:image',
      content: `${deploymentDomain}/gallery/modal/${escort.gallery[0].fileName}`
    },
    {
      id: 'twitter:image',
      name: 'twitter:image',
      content: `${deploymentDomain}/gallery/modal/${escort.gallery[0].fileName}`
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <EscortHeader :escort="escort" />
      <EscortGallery :escort="escort" />
      <EscortAbout :escort="escort" />
      <EscortDetails :escort="escort" />
    </div>
  </NuxtLayout>
</template>
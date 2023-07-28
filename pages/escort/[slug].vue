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

const {
  public: {
    deploymentDomain,
    seoTitle
  }
} = useRuntimeConfig();

const { t } = useI18n();

const title = t('escort.title', { escort: $capitalize(escort.name) });
const description = escort.head[locale.value];

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
      <EscortServices :escort="escort" />
      <EscortAvailability :escort="escort" />
      <EscortRate :escort="escort" />
    </div>
  </NuxtLayout>
</template>
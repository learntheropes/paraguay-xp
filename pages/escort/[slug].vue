<script setup>
definePageMeta({
  auth: false,
});

const { t } = useI18n();

const {
  params: {
    slug
  }
} = useRoute();

let escort;
try {
  escort = await queryContent('escorts', slug).findOne();
} catch (error) {
  // https://github.com/nuxt/nuxt/issues/15432
  showError({
    statusCode: 499,
    statusMessage: 'Escort Not Found',
  });
}

const { locale } = useI18n();
const { $capitalize } = useNuxtApp();

const {
  public: {
    deploymentDomain,
    seoTitle
  }
} = useRuntimeConfig();

const title = t('escort.title', { escort: $capitalize(escort.registry.basic.name) });
const description =  escort.description.title[locale.value];

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
      content: `${deploymentDomain}/gallery/modal/${escort.preview.cover.id}`
    },
    {
      id: 'twitter:image',
      name: 'twitter:image',
      content: `${deploymentDomain}/gallery/modal/${escort.preview.cover.id}`
    },
  ],
});

const { $listen } = useNuxtApp();

$listen('level', level => {
  escort.level = level;

  const { $jsonld } = useNuxtApp();
  useJsonld(() => ([
    $jsonld.logo(),
    $jsonld.organization(),
    $jsonld.website(),
    $jsonld.escortProfilePage(escort),
    $jsonld.escortAdvertiserContentArticle(escort),
    $jsonld.escortBreadcrumbList(escort)
  ]));
});
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <EscortHeader :escort="escort" />
      <EscortAbout :escort="escort" />
      <EscortGallery :escort="escort" />
      <EscortDetails :escort="escort" />
      <EscortServices :escort="escort" />
      <EscortAvailability :escort="escort" />
      <EscortRate :escort="escort" />
      <EscortNavigator :escort="escort" />
      <CollectionNavigator />
    </div>
  </NuxtLayout>
</template>
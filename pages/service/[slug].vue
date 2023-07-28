<script setup>
import camelCase from 'lodash.camelcase';
import services from '~/assets/js/services'

definePageMeta({
  auth: false,
});

const { params: { slug }} = useRoute();

const service = camelCase(slug);

if (!(services.includes(service))) throw createError({ statusCode: 404 });

const { t } = useI18n();

const {
  public: {
    seoTitle
  }
} = useRuntimeConfig();

const title = t('service.title', { service: t(`service.${service}`) });

const description = t('service.description', { service: t(`service.${service}`) });

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
      <ServiceLevels :service="service" />
      <ServiceDescription :slug="slug" />
      <CollectionNavigator :slug="slug" />
    </div>
  </NuxtLayout>
</template>
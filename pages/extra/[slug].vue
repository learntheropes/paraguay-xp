<script setup>
import camelCase from 'lodash.camelcase';
import extras from '~/assets/js/extras'

definePageMeta({
  auth: false,
});

const { params: { slug }} = useRoute();

const extra = camelCase(slug);

if (!(extras.includes(extra))) throw createError({ statusCode: 404 });

const { t } = useI18n();

const title = t('extra.title', { extra: t(`extra.${extra}`).toLowerCase() });

const description = t('extra.description', { extra: t(`extra.${extra}`).toLowerCase() });

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
  ],
});
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <h1 class="title is-3">{{ title }}</h1>
      <div class="subtitle is-5">{{ description }}</div>
      <ExtraLevels :extra="extra" />
      <ExtraDescription :slug="slug" />
      <CollectionNavigator :slug="slug" />
    </div>
  </NuxtLayout>
</template>
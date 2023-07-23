<script setup>
import camelCase from 'lodash.camelcase';
import extras from '~/assets/js/extras'

definePageMeta({
  auth: false,
});

const { params: { slug }} = useRoute();

const extra = camelCase(slug);

if (!(extras.includes(extra))) throw createError({ statusCode: 404 });

const {
  locale,
  t
} = useI18n();

const title = t('extra.title', { extra: t(`extra.${extra}`) });

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
      <section id="collection" class="section">
        <h1 class="title is-4">{{ title }}</h1>
        <div class="subtitle is-6">{{ description }}</div>
        <ExtraLevels :extra="extra" />
      </section>
      <section class="section">
        <ExtraDescription :slug="slug" />
      </section>
    </div>
  </NuxtLayout>
</template>
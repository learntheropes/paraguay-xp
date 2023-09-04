<script setup>
import nuxtStorage from 'nuxt-storage';

definePageMeta({
  layout: 'dashboard'
});

const publication = nuxtStorage.localStorage.getData('publication');
if (publication) {
  const store = usePublicationStore();
  store.setPublication(publication);
}

</script>

<template>
  <NuxtLayout>
    <h1 class="title is-3 is-capitalized">{{ $t('dashboard.title') }}</h1>
    <section class="section">
      <h2 class="title is-5 is-capitalized">{{ $t('dashboard.publications') }}</h2>
      <DashboardPublications />
    </section>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
});
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

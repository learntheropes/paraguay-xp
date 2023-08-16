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
    <section class="section">
      <h2 class="title is-5 is-capitalized">{{ $t('dashboard.payments') }}</h2>
    </section>
    <section class="section">
      <h2 class="title is-5 is-capitalized">{{ $t('dashboard.newPayment') }}</h2>
    </section>
  </NuxtLayout>
</template>

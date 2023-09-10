<script setup>
definePageMeta({
  layout: 'dashboard'
});
const {
  query: {
    name,
    dateOfBirth
  }
} = useRoute();
</script>

<template>
  <NuxtLayout>
    <!-- <h1 class="title is-3 is-capitalized">{{ $t('dashboard.title') }}</h1> -->
    <!-- <h2 class="title is-5 is-capitalized">{{ $t('dashboard.publications') }}</h2> -->
    <DashboardPublications :name="name" :dateOfBirth="dateOfBirth" />
  </NuxtLayout>
</template>

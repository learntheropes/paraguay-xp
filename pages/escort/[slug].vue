<script setup>
definePageMeta({
  auth: false,
});

const {
  params: {
    slug
  }
} = useRoute();
</script>

<template>
  <NuxtLayout>
    <div>{{ slug }}</div>
  </NuxtLayout>
</template>
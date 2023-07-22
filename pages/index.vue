<script setup>
definePageMeta({
  auth: false,
});
const escorts = useEscortsStore();
</script>

<template>
  <NuxtLayout>
    <pre>{{ escorts.steps }}</pre>
    <pre>{{ escorts.list }}</pre>
    <NuxtLink :to="localePath('/dashboard')">Go to dashboard</NuxtLink>
  </NuxtLayout>
</template>
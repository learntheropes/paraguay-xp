<script setup>
definePageMeta({
  layout: "dashboard"
});

const { data } = useAuth();
</script>

<template>
  <NuxtLayout>
    <pre>{{ data }}</pre>
  </NuxtLayout>
</template>

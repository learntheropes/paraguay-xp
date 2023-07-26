<script setup>
definePageMeta({
  auth: false,
});

const {
  params: {
    slug
  }
} = useRoute();

const escort = await queryContent('escorts', slug).findOne();
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <EscortGallery :escort="escort" />
    </div>
  </NuxtLayout>
</template>
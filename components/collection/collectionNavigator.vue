<script setup>
const {
  slug,
} = defineProps({
  slug: {
    type: String || undefined,
  }
});
</script>

<template>
  <section class="section">
    <CollectionByAgency :slug="slug" />
    <CollectionByArea :slug="slug" />
    <CollectionByService :slug="slug" />
    <CollectionByExtra :slug="slug" />
  </section>
</template>
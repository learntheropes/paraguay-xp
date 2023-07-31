<script setup>
const {
  escort,
} = defineProps({
  escort: {
    type: Object,
    required: true
  }
});

const {
  gallery: {
    medias
  }
} = escort;
</script>

<template>
  <section v-if="medias.length" class="section">
    <h2 class="title is-5 is-capitalized">{{ $t('escort.gallery.title') }}</h2>
    <div class="subtitle is-6">{{ $t('escort.gallery.tapToEnlarge') }}</div>
    <EscortGalleryPreview :escort="escort" />
    <EscortGalleryModal />
  </section>
</template>
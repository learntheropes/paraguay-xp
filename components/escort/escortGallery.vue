<script setup>
const {
  escort,
} = defineProps({
  escort: {
    type: Object,
    required: true
  }
});

const { gallery } = escort;
</script>

<template>
  <section v-if="gallery && gallery.length" class="section">
    <h2 class="title is-5 is-capitalized">{{ $t('gallery') }}</h2>
    <div class="subtitle is-6">{{ $t('tapToEnlarge') }}</div>
    <EscortGalleryPreview :escort="escort" />
    <EscortGalleryModal />
  </section>
</template>
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
  <div class="columns is-mobile is-multiline">
    <div v-for="(media, index) of gallery" :key="media.fileId" class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd">
      <EscortGalleryCard :escort="escort" :index="index" />
    </div>
  </div>
</template>
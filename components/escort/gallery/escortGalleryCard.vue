<script setup>
const {
  escort,
  index
} = defineProps({
  escort: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});

const {
  gallery: {
    medias
  }
} = escort; 
const media = medias[index];

const { $event } = useNuxtApp();

const openModal = (medias, index) => {
  $event('openModal', { medias, index });
};
</script>

<template>
  <div class="card">
    <div class="card-image">
      <figure :style="'background-color:black;'" class="image is-square">
        <img
          @click.native="openModal(medias, index)"
          :src="('/gallery/preview/' + media.fileName).split('.')[0] + '.webp'"
          :alt="$t('escort.gallery.previewOf')+' '+ escort.name"
          :title="$t('escort.gallery.previewOf') +' ' + escort.name"
          loading="eager"
          width="288"
          height="288"
        />
        <div v-if="media.fileType !== 'image'" @click.native="openModal(medias, index)" class="is-overlay is-center-center">
          <OIcon icon="play" size="large" variant="info" />
        </div>
      </figure>
    </div>  
  </div>
</template>

<style scoped>
.is-center-center {
  min-height: 100px;
  align-items: center;
  justify-content: center;
  display: flex;
}
.card-image:hover img {
  transform: scale(1.15);
}
</style>
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
  slug,
  registry: {
    basic: {
      name
    }
  },
  gallery: {
    medias
  }
} = escort; 

const { $event } = useNuxtApp();

const openModal = (slug, medias, index) => {
  $event('openModal', { slug, medias, index });
};
</script>

<template>
  <div class="card">
    <div class="card-image">
      <figure :style="'background-color:black;'" class="image is-square">
        <NuxtImg
          preset="preview" 
          @click.native="openModal(slug, medias, index)"
          :src="'/gallery/preview/' + slug + '/' + medias[index].id"
          :alt="$t('escort.gallery.previewOf')+' '+ name"
          :title="$t('escort.gallery.previewOf') +' ' + name"
          loading="eager"
          width="288"
          height="288"
        />
        <div v-if="medias[index].type === 'video'" @click.native="openModal(slug, medias, index)" class="is-overlay is-center-center">
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
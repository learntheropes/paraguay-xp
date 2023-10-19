<script setup>
const {
  slug,
  type,
  id,
  src,
  index
} = defineProps({
  slug: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});
const store = usePublicationStore();

const { $event } = useNuxtApp();

const removeMedia = async () => {
  store.removeOneMedia(index);
  $event('removeOne', index);
  await useFetch(`/api/dashboard/publication/${id}`, {
    key: `delete-${slug}-${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'image/webp'
    },
    body:{ 
      name: slug,
    },
  });
}
</script>

<template>
  <div class="card ltr-equal-height">
    <div class="card-image">
      <figure v-if="type === 'image'" class="image">
        <img :src="src" />
      </figure>
      <video
        v-else
        @canplay="false"
        :controls="false"
        muted
      >
        <source
          :src="src"
        />
      </video>
      <div @click.native="removeMedia" class="card-content is-overlay ltr-is-center-center">
        <OIcon icon="close-circle" size="large"></OIcon>
      </div>
    </div>
  </div>
</template>

<style>
.square-video {
  width: auto;
  aspect-ratio: 1 / 1;
}
</style>


<script setup>
const {
  image,
  index
} = defineProps({
  image: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
});
const store = usePublicationStore();

const isLoading = ref(true);

const onLoad = () => {
  isLoading.value = false;
}

const remove = (index) => {
  store.removeOneMedia(index);
}
</script>

<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-square">
        <NuxtImg preset="preview" @load="onLoad" :src=image.preview />
      </figure>
      <div class="card-content is-overlay ltr-is-center-center">
        <OIcon v-if="image.type === 'video'" icon="play" size="large" variant="info" />
        <div @click="remove(index)">
          <OIcon icon="close-circle" size="large" variant="info" />
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <style scoped>

.image img {
    /* width: auto;
    height: auto; */
    /* max-width: 100%;
    max-height: 100%; */
    object-fit: contain;
}
</style> -->

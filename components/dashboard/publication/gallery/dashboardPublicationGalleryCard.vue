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
    </div>
  </div>
</template>


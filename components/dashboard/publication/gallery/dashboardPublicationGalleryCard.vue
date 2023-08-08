<script setup>
const {
  image,
  index,
  temp
} = defineProps({
  image: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  temp: {
    type: String || undefined
  }
});
const store = usePublicationStore();

let source = ref(null);
try {
  await $fetch(`/gallery/preview/${image.id}.webp`)
  source.value = `/gallery/preview/${image.id}.webp`

} catch (error) {
  source.value = temp
};

const { $event } = useNuxtApp();

const remove = async (index) => {
  store.removeOneMedia(index);
  $event('removeOneTemp', index);
  await removeMedia('modal', image.id);
  await removeMedia('preview', image.id);
}

const removeMedia = async (path, id) => {
  await useFetch(`/api/dashboard/publication/${id}.webp`, {
    key: `delete-${path}-${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'image/webp'
    },
    body:{ 
      path: `public/gallery/${path}`,
      message: `add modal image ${id}.webp`
    },
  });
}
</script>

<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-square">
        <img :src="source" />
      </figure>
      <div @click.native="remove" class="card-content is-overlay ltr-is-center-center">
        <OIcon icon="close-circle" size="large"></OIcon>
      </div>
    </div>
  </div>
</template>


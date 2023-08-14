<script setup>
const {
  id,
  src,
  index
} = defineProps({
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

// let source = ref(null);
// try {
//   await $fetch(`/gallery/preview/${image.id}.webp`)
//   source.value = `/gallery/preview/${image.id}.webp`

// } catch (error) {
//   source.value = temp
// };

const { $event } = useNuxtApp();

const remove = async (index) => {
  store.removeOneMedia(index);
  $event('removeOne', index);
  await removeMedia('modal', id);
  await removeMedia('preview', id);
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
        <img :src="src" />
      </figure>
      <div @click.native="remove" class="card-content is-overlay ltr-is-center-center">
        <OIcon icon="close-circle" size="large"></OIcon>
      </div>
    </div>
  </div>
</template>


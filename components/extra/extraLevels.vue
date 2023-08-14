<script setup>
const {
  extra,
} = defineProps({
  extra: {
    type: String,
    required: true
  }
});

const store = useEscortsStore();
const levels = store.levels;

const escorts = Object.keys(store.list).reduce((obj, levelName) => {
  obj[levelName] = store.list[levelName].filter(escort => escort.preview.extra && escort.preview.extra.includes(extra));
  return obj;
}, {});

const { $event } = useNuxtApp();
$event('extraEscorts', escorts);
</script>

<template>
  <CollectionLevels :levels="levels" :escorts="escorts" />
</template>
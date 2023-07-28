<script setup>
const {
  service,
} = defineProps({
  service: {
    type: String,
    required: true
  }
});

const store = useEscortsStore();
const levels = store.levels;

const escorts = Object.keys(store.list).reduce((obj, levelName) => {
  obj[levelName] = store.list[levelName].filter(escort => escort[service]);
  return obj;
}, {});
</script>

<template>
  <CollectionLevels :levels="levels" :escorts="escorts" />
</template>
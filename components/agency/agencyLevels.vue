<script setup>
const {
  agency,
} = defineProps({
  agency: {
    type: String,
    required: true
  }
});

const store = useEscortsStore();
const levels = store.levels;

const escorts = Object.keys(store.list).reduce((obj, levelName) => {
  obj[levelName] = store.list[levelName].filter(escort => escort.registry.basic.agency.toLowerCase() === agency.toLowerCase());
  return obj;
}, {});
</script>

<template>
  <CollectionLevels :levels="levels" :escorts="escorts" />
</template>
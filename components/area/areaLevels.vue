<script setup>
const {
  area,
} = defineProps({
  area: {
    type: String,
    required: true
  }
});

const store = useEscortsStore();
const levels = store.levels;

const escorts = Object.keys(store.list).reduce((obj, levelName) => {
  obj[levelName] = (area == 'outcall-only')
    ? store.list[levelName].filter(escort => !escort.registry.services.area)
    : store.list[levelName].filter(escort => escort.registry.services.area === area);
  return obj;
}, {});

const { $event } = useNuxtApp();
$event('areaEscorts', escorts);
</script>

<template>
  <CollectionLevels :levels="levels" :escorts="escorts" />
</template>
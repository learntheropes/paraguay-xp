<script setup>
import sortBy from 'lodash.sortby'
const store = useEscortsStore();
const levels = store.levels;

const escorts = Object.keys(store.list).reduce((obj, levelName) => {
  obj[levelName] = sortBy(store.list[levelName], 'updatedAt').reverse();
  return obj;
}, {});

const { $event } = useNuxtApp();
$event('newsEscorts', escorts);
</script>

<template>
  <CollectionLevels :levels="levels" :escorts="escorts" />
</template>
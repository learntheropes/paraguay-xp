<script setup>
const store = useEscortsStore();
const levels = store.levels;
const escorts = ref(store.list);

const {  $listen } = useNuxtApp();

$listen('filterLevels', obj => {

  escorts.value = obj;
});
</script>

<template>
  <CollectionLevels :levels="levels" :escorts="escorts" />
</template>

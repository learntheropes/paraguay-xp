<script setup>
const store = useEscortsStore();
const levels = store.levels;
const escorts = ref(store.list);

const { 
  $event, 
  $listen 
} = useNuxtApp();

$event('indexEscorts', escorts.value)

$listen('filterLevels', obj => {

  escorts.value = obj;
});
</script>

<template>
  <CollectionLevels :levels="levels" :escorts="escorts" />
</template>

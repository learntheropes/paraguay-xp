<script setup>
const store = useEscortsStore();
const levels = store.levels;
const escorts = store.list;
</script>

<template>
  <CollectionLevels :levels="levels" :escorts="escorts" />
</template>

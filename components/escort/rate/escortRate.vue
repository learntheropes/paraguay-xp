<script setup>
const {
  escort,
} = defineProps({
  escort: {
    type: Object,
    required: true
  }
})

const { 
  registry: {
    rate
  }
 } = escort;

const { $numberWithDots } = useNuxtApp();
</script>
<template>
  <section class="section">
    <h2 class="title is-5">{{$t('escort.rate.title')}}</h2>
    <span class="is-3">{{ $numberWithDots(rate) }} {{ $t('index.PYG')}}</span>
  </section>
</template>
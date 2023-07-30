<script setup>
import find from 'lodash.find';
import findIndex from 'lodash.findindex';

const {
  escort,
} = defineProps({
  escort: {
    type: Object,
    required: true
  }
});

const store = useEscortsStore();

const levelName = Object.keys(store.list).filter(levelName => find(store.list[levelName], { slug: escort.slug }))[0];
const { $capitalize } = useNuxtApp();
const escorts = store.list[levelName];

const index = findIndex(escorts, { slug: escort.slug });
const previousEscortIndex = (index - 1 < 0) ? escorts.length - 1 : index - 1;
const nextEscortIndex = (index + 1 >= escorts.length) ? 0 : index + 1;

const previousEscort = escorts[previousEscortIndex];
const nextEscort = escorts[nextEscortIndex];
</script>

<template>
  <section v-if="escorts.length > 1" class="section">
    <h2 class="title is-5">{{ $t('escort.navigator.title', { levelName:  $capitalize($t(levelName)) }) }}</h2>
    <div class="columns is-12 is-vcentered">
      <div class="column is-half">
        <EscortNavigatorPrevious :escort="previousEscort" />
      </div>
      <div class="column is-half is-justify-content-right"> 
        <EscortNavigatorNext :escort="nextEscort" />
      </div>
    </div>
  </section>
</template>
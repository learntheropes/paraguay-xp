<script setup>
import findIndex from 'lodash.findindex';
import find from 'lodash.find';

const {
  escort
} = defineProps({
  escort: {
    type: Object,
    required: true
  }
});

const { t } = useI18n();

const store = useEscortsStore();
const level = Object.keys(store.list).filter(l => find(store.list[l], { slug: escort.slug }))[0];
const escorts = store.list[level];
const { $event } = useNuxtApp();
$event('level', level);

const index = findIndex(escorts, { slug: escort.slug });
const previousEscortIndex = (index - 1 < 0) ? escorts.length - 1 : index - 1;
const nextEscortIndex = (index + 1 >= escorts.length) ? 0 : index + 1;

const previousEscort = escorts[previousEscortIndex];
const nextEscort = escorts[nextEscortIndex];
</script>

<template>
  <section v-if="escorts.length > 1" class="section">
    <h2 class="title is-5">{{ $t('escort.navigator.title', { levelName: $t(`level.${level}`) }) }}</h2>
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
<script setup>
const {
  levels,
  escorts
} = defineProps({
  levels: {
    type: Array,
    required: true
  },
  escorts: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <section class="section">
    <div v-if="![].concat(escorts.diamond, escorts.palladium, escorts.platinum, escorts.esmerald, escorts.gold).length">{{ $t('index.noEscort') }}</div>
    <div v-for="(level, index) of levels" :key="level.name" class="block">
      <div v-if="escorts[level.name].length">
        <h2 class="title is-5 is-capitalized">{{ $t('index.levelName', { level: $t(`level.${level.name}`) }) }} ({{ escorts[level.name].length }})</h2>
        <p class="subtitle is-7">{{ level.range }} {{ $t('index.PYG') }}</p>
        <div class="columns is-mobile is-multiline">
          <div
            v-for="escort of escorts[level.name]"
            :key="escort.slug"
            class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd"
          >
            <CollectionCard :escort="escort" :index="index" class="card-equal-height" />
          </div>  
        </div>
      </div>
    </div>
  </section>
</template>
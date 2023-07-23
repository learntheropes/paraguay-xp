<script setup>
const {
  extra,
} = defineProps({
  extra: {
    type: String,
    required: true
  }
});

const store = useEscortsStore();
const levels = store.levels;

const escorts = Object.keys(store.list).reduce((obj, levelName) => {
  obj[levelName] = store.list[levelName].filter(escort => escort.extra && escort.extra.includes(extra));
  return obj;
}, {});
</script>

<template>
  <div>
    <div v-if="![].concat(escorts.diamond, escorts.palladium, escorts.platinum, escorts.esmerald, escorts.gold).length">{{ $t('index.noEscort') }}</div>
    <div v-for="level of levels" :key="level.name" class="block">
      <div v-if="escorts[level.name].length">
        <h2 class="title is-5 is-capitalized">{{ $t('index.levelName', { level: $t(level.name) }) }} ({{ escorts[level.name].length }})</h2>
        <p class="subtitle is-7">{{ level.range }} {{ $t('index.PYG') }}</p>
        <div class="columns is-mobile is-multiline">
          <div
            v-for="escort of escorts[level.name]"
            :key="escort.slug"
            class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd"
          >
            <IndexCard :escort="escort" class="card-equal-height" />
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import flatten from 'lodash.flatten'
import uniq from 'lodash.uniq'
import camelCase from 'lodash.camelcase';
import kebabCase from 'lodash.kebabcase';

const {
  slug,
} = defineProps({
  slug: {
    type: String || undefined,
  }
});

const store = useEscortsStore();

const all = []
  .concat(store.list.diamond, store.list.palladium, store.list.platinum, store.list.esmerald, store.list.gold)

const names = uniq(flatten(all.map(escort => escort.registry.extra))).filter(name => name && name !== camelCase(slug))
</script>

<template>
  <nav v-if="names.length" class="block">
    <div class="title is-5 is-capitalized">{{$t('extra.plural')}}</div>
    <ul class="columns is-multiline is-mobile">
      <li v-for="name of names" :key="name" class="column is-narrow">
        <OButton
          tag="router-link"
          :to="localePath({ 
            name: 'extra-slug', 
            params: { 
              slug: kebabCase(name) 
            }
          })"
          class="is-capitalized"
          variant="primary"
          outlined
        >{{ $t(`extra.${name}`) }}</OButton>
      </li>
    </ul>
  </nav>
</template>
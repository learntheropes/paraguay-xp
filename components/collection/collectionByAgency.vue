<script setup>
import uniqBy from 'lodash.uniqby';
import sortBy from 'lodash.sortby';
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
  .filter(escort => kebabCase(escort.agency) !== slug);

const paths = sortBy(uniqBy(all, 'agency'), 'agency').map(escort => escort.agency);
</script>

<template>
  <nav v-if="paths.length" class="block">
    <div class="title is-5 is-capitalized">{{$t('agency.plural')}}</div>
    <ul class="columns is-multiline is-mobile">
      <li v-for="path of paths" :key="path" class="column is-narrow">
        <OButton
          tag="router-link"
          :to="localePath({
            name: 'agency-slug',
            params: {
              slug: path.replace(/\s/g,'-').toLowerCase()
            }
          })"
          class="is-capitalized"
          variant="primary"
          outlined
        >{{ (path === 'indipendent') ? $t('agency.indipendents') : path }}</OButton>
      </li>
    </ul>
  </nav>
</template>
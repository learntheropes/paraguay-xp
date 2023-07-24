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
  .filter(escort => escort.area && kebabCase(escort.area) !== kebabCase(slug));

const names = sortBy(uniqBy(all, 'area'), 'area').map(escort => escort.area);
</script>

<template>
  <nav v-if="names.length" class="block">
    <div class="title is-5 is-capitalized">{{$t('area.plural')}}</div>
    <ul class="columns is-multiline is-mobile">
      <li v-for="name of names" :key="name" class="column is-narrow">
        <OButton
          tag="router-link"
          :to="localePath({
            name: 'area-slug',
            params: {
              slug: name.replace(/\s/g,'-').toLowerCase()
            }
          })"
          class="is-capitalized"
          variant="primary"
          outlined
        >{{ name }}</OButton>
      </li>
      <li class="column is-narrow">
        <OButton
          tag="router-link"
          :to="localePath({
            name: 'area-slug',
            params: {
              slug: 'outcall-only'
              }
            })"
            class="is-capitalized"
            variant="primary"
            outlined
          >{{ $t('area.outcallOnly') }}</OButton>
      </li>
    </ul>
  </nav>
</template>
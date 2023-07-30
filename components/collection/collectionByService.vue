<script setup>
import services from '~/assets/js/services'
import camelCase from 'lodash.camelcase';
import kebabCase from 'lodash.kebabcase';

const {
  slug,
} = defineProps({
  slug: {
    type: String || undefined,
  }
});

const filteredServices = services.filter(service => service !== camelCase(slug))

</script>

<template>
  <nav class="block">
    <div class="title is-5 is-capitalized">{{$t('service.plural')}}</div>
    <ul class="columns is-multiline is-mobile">
      <li v-for="service of filteredServices" :key="service" class="column is-narrow">
        <OButton
          tag="router-link"
          :to="localePath({ 
            name: 'service-slug', 
            params: { 
              slug: kebabCase(service) 
            }
          })"
          class="is-capitalized"
          variant="primary"
          outlined
        >{{ $t(`service.${service}`) }}</OButton>
      </li>
    </ul>
  </nav>
</template>
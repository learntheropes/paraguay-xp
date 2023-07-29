<script setup>
import services from '~/assets/js/services';
import kebabCase from 'lodash.kebabcase';
const {
  escort,
} = defineProps({
  escort: {
    type: Object,
    required: true
  }
})

const filteredServices = services.filter(service => escort[service])
</script>

<template>
  <section class="section">
    <h2 class="title is-5 is-capitalized">{{ $t('escort.services.title') }}</h2>
    <div class="field is-grouped is-grouped-multiline">
      <div v-for="service of filteredServices" :key="service" class="control">
        <div class="tags">
          <NuxtLink :to="localePath({ name: 'service-slug', params: { slug: kebabCase(service) }})">
            <span class="tag is-medium is-primary">{{ $t(`escort.services.${service}`) }}</span>
          </NuxtLink>
          <NuxtLink v-if="service === 'apartment'" :to="localePath({ name: 'area-slug', params: { slug: escort.area.replace(/\s/g,'-').toLowerCase() }})">
            <span class="tag is-medium">{{ escort.area }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-if="escort.extra && escort.extra.length" class="field is-grouped is-grouped-multiline">
      <div v-for="extra in escort.extra" :key="extra" class="control">
        <div class="tags">  
          <NuxtLink :to="localePath({ name: 'extra-slug', params: { slug: kebabCase(extra) }})">
            <span class="tag is-medium is-primary">{{ $t(`extra.${extra}`) }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
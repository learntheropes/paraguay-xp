<script setup>
const {
  escort,
} = defineProps({
  escort: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="section">
    <h2 class="title is-5 is-capitalized">{{ $t('escort.services.title') }}</h2>
    <div class="field is-grouped is-grouped-multiline">
      <div v-if="escort.virtual" class="control">
        <div class="tags">
          <span class="tag is-medium is-primary">{{ $t('escort.services.virtual') }}</span>
        </div>
      </div>
      <div v-if="escort.apartment" class="control">
        <div class="tags has-addons">
          <span class="tag is-medium is-primary">{{ $t('escort.services.apartment') }}</span>
          <span class="tag is-medium">{{ escort.area }}</span>
        </div>
      </div>
      <div class="control">
        <div class="tags">      
          <span v-if="escort.hotel" class="tag is-medium is-primary">{{ $t('escort.services.hotel') }}</span>
        </div>
      </div>
      <div class="control">
        <div class="tags">      
          <span v-if="escort.dinner" class="tag is-medium is-primary">{{ $t('escort.services.dinner') }}</span>
        </div>
      </div>
      <div class="control">
        <div class="tags">      
          <span v-if="escort.travel" class="tag is-medium is-primary">{{ $t('escort.services.travel') }}</span>
        </div>
      </div>
    </div>
    <div v-if="escort.extra && escort.extra.length" class="field is-grouped is-grouped-multiline">
      <div v-for="extra in escort.extra" :key="extra" class="control">
        <div class="tags">      
          <span class="tag is-medium is-primary">{{ $t(`extra.${extra}`) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
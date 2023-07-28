<script setup>
const {
  escort,
} = defineProps({
  escort: {
    type: Object,
    required: true
  }
})

const {
  $dayjs,
  $i18nCountries
} = useNuxtApp();
</script>

<template>
  <section class="section">
    <h2 class="title is-5 is-capitalized">{{ $t('escort.details.title') }}</h2>
    <div class="field is-grouped is-grouped-multiline">
      <div v-if="escort.spanish" class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.spanish')}}</span>
          <span class="tag is-medium is-primary">{{ $t(`escort.details.${escort.spanish}`) }}</span>
        </div>
      </div>
      <div v-if="escort.english" class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.english')}}</span>
          <span class="tag is-medium is-primary">{{ $t(`escort.details.${escort.english}`) }}</span>
        </div>
      </div>
      <div v-if="escort.portuguese" class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.portuguese')}}</span>
          <span class="tag is-medium is-primary">{{ $t(`escort.details.${escort.portuguese}`) }}</span>
        </div>
      </div>
    </div>
    <div class="field is-grouped is-grouped-multiline">
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.nationality')}}</span>
          <span class="tag is-medium is-primary">{{ $i18nCountries.one(escort.nationality) }}</span>
        </div>
      </div>
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.age')}}</span>
          <span class="tag is-medium is-primary">{{ $dayjs(new Date()).diff(escort.birthTime, 'years') }} {{ $t('escort.details.years') }}</span>
        </div>
      </div>
    </div>
    <div class="field is-grouped is-grouped-multiline">
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.height')}}</span>
          <span class="tag is-medium is-primary">{{ escort.height }} cm</span>
        </div>
      </div>
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.breast')}}</span>
          <span class="tag is-medium is-primary">{{ escort.breast }} cm</span>
        </div>
      </div>
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.waist')}}</span>
          <span class="tag is-medium is-primary">{{ escort.waist }} cm</span>
        </div>
      </div>
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.hips')}}</span>
          <span class="tag is-medium is-primary">{{ escort.hips }} cm</span>
        </div>
      </div>
    </div>
  </section>
</template>

<!-- <script>
export default {
  props: [
    'escort'
  ],
  computed: {
    isIndividual () {
      return this.$escort.isIndividual(this.escort)
    },
    isDuo () {
      return this.$escort.isDuo(this.escort)
    },
    age () {
      return this.$escort.age(this.escort)
    },
    age1 () {
      return this.$escort.age1(this.escort)
    },
    age2 () {
      return this.$escort.age2(this.escort)
    },
  }
}
</script> -->
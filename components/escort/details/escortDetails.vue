<script setup>
const {
  escort,
} = defineProps({
  escort: {
    type: Object,
    required: true
  }
});

const {
  preview: {
    dateOfBirth
  },
  registry: {
    languages: {
      spanish,
      english,
      portuguese
    },
    basic: {
      nationality
    },
    body: {
      height,
      breast,
      waist,
      hips
    },
  }
} = escort

const {
  $dayjs,
  $i18nCountries
} = useNuxtApp();
</script>

<template>
  <section class="section">
    <h2 class="title is-5 is-capitalized">{{ $t('escort.details.title') }}</h2>
    <div class="field is-grouped is-grouped-multiline">
      <div v-if="spanish" class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.spanish')}}</span>
          <span class="tag is-medium is-primary">{{ $t(`escort.details.${spanish}`) }}</span>
        </div>
      </div>
      <div v-if="english" class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.english')}}</span>
          <span class="tag is-medium is-primary">{{ $t(`escort.details.${english}`) }}</span>
        </div>
      </div>
      <div v-if="portuguese" class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.portuguese')}}</span>
          <span class="tag is-medium is-primary">{{ $t(`escort.details.${portuguese}`) }}</span>
        </div>
      </div>
    </div>
    <div class="field is-grouped is-grouped-multiline">
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.nationality')}}</span>
          <span class="tag is-medium is-primary">{{ $i18nCountries.one(nationality) }}</span>
        </div>
      </div>
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.age')}}</span>
          <span class="tag is-medium is-primary">{{ $dayjs(new Date()).diff(dateOfBirth, 'years') }} {{ $t('escort.details.years') }}</span>
        </div>
      </div>
    </div>
    <div class="field is-grouped is-grouped-multiline">
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.height')}}</span>
          <span class="tag is-medium is-primary">{{ height }} cm</span>
        </div>
      </div>
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.breast')}}</span>
          <span class="tag is-medium is-primary">{{ breast }} cm</span>
        </div>
      </div>
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.waist')}}</span>
          <span class="tag is-medium is-primary">{{ waist }} cm</span>
        </div>
      </div>
      <div class="control">
        <div class="tags has-addons">
          <span class="tag is-medium">{{$t('escort.details.hips')}}</span>
          <span class="tag is-medium is-primary">{{ hips }} cm</span>
        </div>
      </div>
    </div>
  </section>
</template>

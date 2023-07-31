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
  description: {
    about
  },
  updatedAt
} = escort;

const { locale } = useI18n();

const translated = ref(true);

const isTranslated = about.original !== about[locale.value];

const showOriginal = () => {
  translated.value = false
}

const showTranslation = () => {
  translated.value = true
}

const { $dayjs } = useNuxtApp();
</script>

<template>
  <section class="section">
    <h2 class="title is-5">{{ $t('escort.about.title') }}</h2>
    <div class="subtitle is-6">{{$t('blog.published')}} {{ $dayjs(updatedAt).fromNow() }} ({{ $dayjs(updatedAt).format('DD/MM/YYYY') }})</div>
    <div v-if="translated">
        <div class="content has-new-line">{{ about[locale] }}</div>
        <OButton
          v-show="isTranslated"
          @click="showOriginal"
          class="is-text"
          variant="primary"
          inverted
        >{{ $t('escort.about.showOriginal') }}</OButton>
    </div>
    <div v-else>
      <div class="content has-new-line">{{ about.original }}</div>
      <OButton 
        v-show="isTranslated" 
        @click="showTranslation" 
        class="is-text"
        variant="primary"
        inverted
      >{{ $t('escort.about.showTransaltion') }}</OButton>
    </div>
  </section>
</template>
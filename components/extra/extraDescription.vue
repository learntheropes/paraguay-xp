<script setup>
const {
  slug,
} = defineProps({
  slug: {
    type: String,
    required: true
  }
});

const { locale } = useI18n();

const {
  body
} = await queryContent('extra', slug)
  .locale(locale.value)
  .findOne();
</script>

<template>
  <div>
    <h2 class="title is-5">{{ $t('extra.whatAbout') }}</h2>
    <ContentRendererMarkdown :value="{ body }" class="content"/>
  </div>
</template>
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

let text;
try {

  const {
    body
  } = await queryContent('extra', slug)
    .locale(locale.value)
    .findOne();

  text = body;
} catch (error) {

  text = null;
}
</script>

<template>
  <section v-if="body" class="section">
    <h2 class="title is-5">{{ $t('extra.whatAbout') }}</h2>
    <ContentRendererMarkdown :value="{ body: text }" class="content"/>
  </section>
</template>
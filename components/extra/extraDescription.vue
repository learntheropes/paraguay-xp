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

let existingBody, text;
try {

  const {
    body,
    updatedAt
  } = await queryContent('extra', slug)
    .locale(locale.value)
    .findOne();
  existingBody = body;

  const { $parseContentBody } = useNuxtApp();
  text = $parseContentBody(body);

  const { $event } = useNuxtApp();
  $event('extraArticle', { text, body: existingBody, updatedAt});
} catch (error) {

  existingBody = null;
}

</script>

<template>
  <section v-if="existingBody" class="section">
    <h2 class="title is-5">{{ $t('extra.whatAbout') }}</h2>
    <ContentRendererMarkdown :value="{ body: existingBody }" class="content"/>
  </section>
</template>
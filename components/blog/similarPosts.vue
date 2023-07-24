<script setup>
const {
  target,
  _path
} = defineProps({
  target: {
    type: String,
    required: true
  },
  _path: {
    type: String,
    required: true
  }
});

const { locale } = useI18n();

const posts = await queryContent('blog')
  .locale(locale.value)
  .where({
    target,
    _path: {
      $ne: _path
    }
  })
  .only([
    'title',
    '_path',
    'target'
  ])
  .sort({ updatedAt: 1 })
  .find()
</script>

<template>
  <nav v-if="posts.length" class="section">
    <div class="title is-5 is-capitalized">{{ $t('blog.similarPosts') }}</div>
    <ul class="columns is-multiline is-mobile">
      <li v-for="post in posts" :key="post._path" class="column is-narrow">
        <OButton tag="router-link" :to="localePath(post._path)" variant="primary" outlined>{{ post.title }}</OButton>
      </li>
    </ul>
  </nav>
</template>
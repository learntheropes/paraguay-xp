<script setup>
const { locale } = useI18n();

const escortPosts = await queryContent('blog')
  .locale(locale.value)
  .where({
    target: 'escort'
  })
  .only([
    'title', 
    'slug'
  ])
  .find();

const clientPosts = await queryContent('blog')
  .locale(locale.value)
  .where({
    target: 'clients'
  })
  .only([
    'title', 
    'slug'
  ])
  .find();
</script>

<template>
  <nav class="block">
    <div class="title is-5 is-capitalized">{{$t('blog.forClients')}}</div>
    <ul class="columns is-multiline is-mobile">
      <li v-for="post of clientPosts" :key="post.slug" class="column is-narrow">
        <OButton
          tag="router-link"
          :to="localePath({
            name: 'blog-slug',
            params: {
              slug: post.slug
            }
          })"
          class="is-capitalized"
          variant="primary"
          outlined
        >{{ post.title }}</OButton>
      </li>
    </ul>
    <div class="title is-5 is-capitalized">{{$t('blog.forEscorts')}}</div>
    <ul class="columns is-multiline is-mobile">
      <li v-for="post of escortPosts" :key="post.slug" class="column is-narrow">
        <OButton
          tag="router-link"
          :to="localePath({
            name: 'blog-slug',
            params: {
              slug: post.slug
            }
          })"
          class="is-capitalized"
          variant="primary"
          outlined
        >{{ post.title }}</OButton>
      </li>
    </ul>
  </nav>
</template>
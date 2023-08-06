<script setup>
definePageMeta({
  auth: false,
});

const { locale } = useI18n();

const clientPosts = await queryContent('blog')
  .locale(locale.value)
  .where({
    target: 'client'
  })
  .only([
    'title', 
    '_path'
  ])
  .find();

const escortPosts = await queryContent('blog')
  .locale(locale.value)
  .where({
    target: 'escort'
  })
  .only([
    'title', 
    '_path'
  ])
  .find();
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <h1 class="title is-3">{{ $t('footer.blog') }}</h1>
      <div class="title is-5 is-capitalized">{{$t('blog.forClients')}}</div>
      <ul :id="client" class="columns is-multiline is-mobile">
        <li v-for="post of clientPosts" :key="post._path" class="column is-narrow">
          <OButton
            tag="router-link"
            :to="localePath(post._path)"
            class="is-capitalized"
            variant="primary"
            outlined
          >{{ post.title }}</OButton>
        </li>
      </ul>
      <div class="title is-5 is-capitalized">{{$t('blog.forEscorts')}}</div>
      <ul :id="escort" class="columns is-multiline is-mobile">
        <li v-for="post of escortPosts" :key="post._path" class="column is-narrow">
          <OButton
            tag="router-link"
            :to="localePath(post._path)"
            class="is-capitalized"
            variant="primary"
            outlined
          >{{ post.title }}</OButton>
        </li>
      </ul>
      <CollectionNavigator />
    </div>
  </NuxtLayout>
</template>
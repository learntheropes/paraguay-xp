<script setup>
</script>

<template>
  <div class="hero is-success">
    <div class="hero-body has-text-centered">
      <p class="title is-4">{{ $t('index.title') }}</p>
      <p class="subtitle is-6">🇵🇾 {{ $t('index.description') }} 🇵🇾</p>
      <OButton tag="router-link" :to="localePath({ name: 'index' })" variant="info" outlined>{{ $t('blog.viewAll') }}</OButton>
    </div>
  </div>
</template>
<script setup>
</script>

<template>
  <div class="hero is-success">
    <div class="hero-body has-text-centered">
      <p class="title is-4">{{ $t('blog.bannerEscortTitle') }}</p>
      <p class="subtitle is-6">🇵🇾 {{ $t('blog.bannerEscortDescription') }} 🇵🇾</p>
      <OButton tag="router-link" :to="localePath('/dashboard')" variant="info" outlined>{{ $t('navbar.publish') }}</OButton>
    </div>
  </div>
</template>

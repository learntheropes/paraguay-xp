<script setup>
const { 
  public: { 
    whatsappAdmin 
  }
} = useRuntimeConfig();
</script>

<template>
  <Body>
    <LayoutNavbar />
    <div class="container">
      <div class="content has-text-centered">
        <div class="block ltr-has-new-line">
          <span>{{ $t('dashboard.underDevelopment') }}</span>
          &nbsp;
          <NuxtLink :href="'https://wa.me/' + whatsappAdmin.replace('+', '')" target="_blank">{{ whatsappAdmin }}</NuxtLink>
        </div>
      </div>
      <slot />
    </div>
    <LayoutFooter />
  </Body>
</template>
<script setup>
const { 
  public: { 
    whatsappAdmin 
  }
} = useRuntimeConfig();
</script>

<template>
  <Body>
    <div class="full-body">
      <LayoutNavbar />
      <main class="main-content">
        <div class="container">
          <div class="notification is-warning content has-text-centered">
            <div class="block ltr-has-new-line">
              <span>{{ $t('dashboard.underDevelopment') }}</span>
              &nbsp;
              <NuxtLink :href="'https://wa.me/' + whatsappAdmin.replace('+', '')" target="_blank">{{ whatsappAdmin }}</NuxtLink>
            </div>
          </div>
          <slot />
        </div>
      </main>
      <LayoutFooter />
    </div>
  </Body>
</template>
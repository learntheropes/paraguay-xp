<script setup>
const { 
  public: { 
    whatsappAdmin 
  }
} = useRuntimeConfig();
</script>

<template>
  <Body>
    <div class="ltr-full-body">
      <LayoutNavbar />
      <main class="ltr-main-content">
        <div class="container">
          <!-- <section class="section">
            <div class="notification is-warning content has-text-centered">
              <div class="block ltr-has-new-line">
                <span>{{ $t('dashboard.underDevelopment') }}</span>
                &nbsp;
                <NuxtLink :href="'https://wa.me/' + whatsappAdmin.replace('+', '')" target="_blank">{{ whatsappAdmin }}</NuxtLink>
              </div>
            </div>
          </section> -->
          <slot />
        </div>
      </main>
      <LayoutFooter />
    </div>
  </Body>
</template>

<style>
@media screen and (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
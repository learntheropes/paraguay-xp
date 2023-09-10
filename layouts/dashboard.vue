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
          <section class="section">
            <slot />
          </section>
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
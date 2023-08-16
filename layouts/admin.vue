<script setup>
</script>

<template>
  <Body>
    <div class="full-body">
      <LayoutNavbar />
      <main class="main-content">
        <div class="columns">
          <nav class="column is-narrow">
            <section class="section is-medium">
              <LayoutAdminSidebar />
            </section>
          </nav>
          <div class="column">
            <section class="section">
              <slot />
            </section>
          </div>
        </div>
      </main>
      <LayoutFooter />
    </div>
  </Body>
</template>

<style>
</style>
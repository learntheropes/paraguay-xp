<template>
  <Body>
    <div class="ltr-full-body">
      <main class="ltr-main-content">
        <div class="columns">
          <nav class="column is-narrow">
            <section class="section is-medium">
              <layoutAdminSidebar />
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
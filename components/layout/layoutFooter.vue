<script setup>
  const { locale, locales } = useI18n();
  const switchLocalePath = useSwitchLocalePath();
  const availableLocales = computed(() => (locales.value).filter(i => i.code !== locale.value));
  const year = new Date().getFullYear();
  const { isMobile } = useDevice();
</script>

<template>
  <footer class="footer">
    <div class="container">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="buttons">
              <OButton
                :to="localePath('/legal')"
                tag="router-link"
                variant="primary"
                inverted
              >{{ $t('footer.legal') }}</OButton>
              <OButton
                :to="localePath('/news')"
                tag="router-link"
                variant="primary"
                inverted
              >{{ $t('footer.news') }}</OButton>
              <OButton
                :to="localePath('/blog')"
                tag="router-link"
                variant="primary"
                inverted
              >{{ $t('footer.blog') }}</OButton>
            </div>
          </div>
        </div>
        <div v-if="!isMobile" class="level-center">
          <div class="level-item has-text-centered">
            2022 - {{ year }} {{ $t('footer.allRightReserved') }}
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="buttons">
              <OButton
                v-for="locale in availableLocales"
                :key="locale.code"
                tag="router-link"
                :to="switchLocalePath(locale.code)"
                variant="primary"
                inverted
              >{{ locale.name }}</OButton>
            </div>
          </div>
        </div>
        <div v-if="isMobile" class="level-center">
          <div class="level-item has-text-centered">
            2022 - {{ year }} {{ $t('footer.allRightReserved') }}
          </div>
        </div>
      </nav>
    </div>
  </footer>
</template>

<style>
.footer {
  padding-left: 0rem;
  padding-right: 0rem;
}
@media screen and (max-width: 768px) {
  .level-center {
    padding-top: 2rem;
    padding-bottom: 1.5rem;
  }
}
</style>
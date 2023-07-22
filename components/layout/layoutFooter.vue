<script setup>
  const { locale, locales } = useI18n();
  const switchLocalePath = useSwitchLocalePath();
  const availableLocales = computed(() => (locales.value).filter(i => i.code !== locale.value));
</script>

<template>
  <footer class="footer">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <OButton
            :to="localePath('/legal')"
            tag="router-link"
            variant="primary"
            inverted
          >{{ $t('footer.legal') }}</OButton>
        </div>
        <div class="level-item">
          <OButton
            :to="localePath('/bookmarks')"
            tag="router-link"
            variant="primary"
            inverted
          >{{ $t('footer.bookmarks') }}</OButton>
        </div>
        <div class="level-item">
          <OButton
            :to="localePath('/history')"
            tag="router-link"
            variant="primary"
            inverted
          >{{ $t('footer.history') }}</OButton>
        </div>
        <div class="level-item">
          <OButton
            :to="localePath('/admin')"
            tag="router-link"
            variant="primary"
            inverted
          >{{ $t('footer.admin') }}</OButton>
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
    </nav>
    <div class="level">
      <div class="level-item has-text-centered">
        © 2022 - 2050 {{ $t('footer.allRightReserved') }}
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-left: 0rem;
  padding-right: 0rem;
}
</style>
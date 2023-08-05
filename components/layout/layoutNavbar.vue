<script setup>
const { status, signOut } = useAuth();

const {
  locale
} = useI18n();

const logOut = async () => {
  await signOut({
    callbackUrl: `/${locale.value}`
  });
};

const {
  name
} = useRoute();

const isIndex = name === `index___${locale.value}`;

const { $event } = useNuxtApp();

const showFilter = ref(false)

const toggleFilter = (bool) => {
  showFilter.value = bool;
  $event('toggleFilter', bool);
};
</script>

<template>
  <nav class="navbar" role="navigation">
  <div class="navbar-brand">
    <div class="navbar-item">
      <OButton
        :to="localePath('/')"
        tag="router-link"
        variant="success"
        inverted
      >
        <span class="has-text-weight-bold">ParaguayXP</span>
      </OButton>
    </div>
  </div>
  <div class="navbar-menu">
    <div class="navbar-start">
      <div v-if="isIndex" class="navbar-item">
        <OIcon 
          v-if="!showFilter"
          @click.native="toggleFilter(true)"
          icon="magnify"
          variant="primary"
        />
        <OIcon 
          v-else
          @click.native="toggleFilter(false)"
          icon="magnify-close"
          variant="primary"
        />
      </div>
    </div>
    <div class="navbar-end">
      <div v-if="status === 'authenticated'" class="navbar-item">
        <OButton
          :to="localePath('/dashboard')"
          tag="router-link"
          variant="primary"
          inverted
        >
          <OIcon pack="mdi" icon="account-outline" />
        </OButton>
      </div>
      <div v-if="status === 'authenticated'" class="navbar-item">
        <OButton
          @click.native="logOut"
        >{{ $t('navbar.logout') }}</OButton>
      </div>
      <div v-else class="navbar-item">
        <OButton
          :to="localePath('/dashboard')"
          tag="router-link"
          variant="primary"
        >{{ $t('navbar.publish') }}</OButton>
      </div>
    </div>
  </div>
</nav>
</template>

<!-- <style scoped>
.navbar-start{
  flex-grow: 1;
  justify-content: center;
  text-align: center;
}
</style> -->
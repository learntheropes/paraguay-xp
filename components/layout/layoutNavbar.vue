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
    <div class="navbar-end">
      <div v-if="status === 'unauthenticated'" class="navbar-item">
        <OButton
          :to="localePath('/dashboard')"
          tag="router-link"
          variant="primary"
        >{{ $t('navbar.publish') }}</OButton>
      </div>
      <div v-else class="navbar-item">
        <OButton
          :to="localePath('/dashboard')"
          tag="router-link"
          variant="primary"
          inverted
        >
          <OIcon pack="mdi" icon="account-outline" />
        </OButton>
        <OButton
          @click="logOut"
        >{{ $t('navbar.logout') }}</OButton>
      </div>
    </div>
  </div>
</nav>
</template>
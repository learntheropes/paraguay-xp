<script setup>
const isLoading = ref(false);
const store = usePublicationStore();

const validationSchema = {
  accept: {
    acceptPublish: true
  }
}

const acceptText = computed(() => (store.accept) ? t('dashboard.gallery.yes') : t('dashboard.gallery.no'));

const goPrevious = async () => {

await navigateTo(`/${locale.value}/dashboard/publication/gallery`);
}

const publish = async () => {

  isLoading.value = true;
  const { data } = useAuth();

  const age = store.age;

  await useFetch(`/api/dashboard/publication/${publication.slug}`, {
    method: 'POST',
    body: age,
    query: {
      path: `content/ages`
    }
  });

  const publication = {
    phone: data.value.user.email,
    slug: `${store.registry.basic.name.replace(/\s/, '-').toLowerCase()}-${data.value.user.email.replace('+', '')}`,
    accept: store.accept,
    // age: store.age,
    registry: store.registry,
    description: store.description,
    gallery: store.gallery
  }

  await useFetch(`/api/dashboard/publication/${publication.slug}`, {
    method: 'POST',
    body: publication,
    query: {
      path: `content/escorts`
    }
  });

  isLoading.value = false;
}
</script>´

<template>
  <VForm
    name="publish"
    :validation-schema="validationSchema"
    @submit="publish"
  >
    <VField
      name="head"
      :label="$t('dashboard.publish.accept')"
      v-slot="{ handleChange, handleBlur, value, errors }"
      v-model="store.accept"
    >
      <OField
        :label="$t('dashboard.publish.accept')"
        :variant="errors[0] ? 'danger' : null"
        :message="errors[0] ? errors[0] : $t('dashboard.publish.acceptPubication')"
      >
        <OSwitch
          :label="$t('dashboard.publish.accept')"
          :model-value="value"
          @update:modelValue="handleChange"
          @change="handleChange"
          @blur="handleBlur"
        >{{ acceptText }}</OSwitch>
      </OField>
    </VField>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <OField>
            <OButton
              @click.native="goPrevious"
              variant="primary"
              outlined
            >{{  $t('dashboard.publication.previous') }}</OButton>
          </OField>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <OField>
            <OButton
              @click.native="publish"
              variant="primary"
              outlined
            >{{  $t('navbar.publish') }}</OButton>
          </OField>
        </div>
      </div>
    </div>
  </VForm>
</template>
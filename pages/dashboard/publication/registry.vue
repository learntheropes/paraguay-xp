<script setup>
definePageMeta({
  layout: 'dashboard'
});

const store = usePublicationStore();

const validationSchema = {
  name: {
    required: true
  },
  agency: {
    required: true
  },
  nationality: {
    required: true
  }
}

const category = computed({
  get() {
    return store.registry.basic.category
  },
  set(value) {
    if (value === 'indipendent')  store.setAgency(value)
    else store.setAgency(null);
    store.setCategory(value);
  }
});

const { $i18nCountries } = useNuxtApp();
const nationalities = $i18nCountries.list();

const { 
  locale,
  t
} = useI18n();

const categoryText = computed(() => (store.registry.basic.category === 'agency') ? t('agency.singolar') : t('agency.indipendent'));


const goPrevious = async () => {
  await navigateTo(`/${locale.value}/dashboard/publication/age`)
}

const goNext = async () => {
  await navigateTo(`/${locale.value}/dashboard/publication/description`)
}
</script>

<template>
  <NuxtLayout>
    <VForm
      name="registry"
      :validation-schema="validationSchema"
      @submit="goNext"
    >
      <div class="columns is-centered">
        <div class="column is-one-quarter">
          <div class="box">
            <h2 class="title is-4">{{ $t('dashboard.registry.basic.title') }}</h2>
            <VField
              name="name"
              :label="$t('dashboard.registry.basic.name')"
              v-slot="{ handleChange, handleBlur, value, errors }"
              v-model="store.registry.basic.name"
            >
              <OField
                :label="$t('dashboard.registry.basic.name')"
                :variant="errors[0] ? 'danger' : null"
                :message="errors[0] ? errors[0] : ''"
              >
                <OInput
                  :label="$t('dashboard.registry.basic.name')"
                  :model-value="value"
                  @update:modelValue="handleChange"
                  @change="handleChange"
                  @blur="handleBlur"
                  expanded
                />
              </OField>
            </VField>
            <OField
              :label="$t('dashboard.registry.basic.category')"
            >
              <OSwitch
                v-model="category"
                falseValue="indipendent"
                trueValue="agency"
              >{{ categoryText }}</OSwitch>
            </OField>
            <VField
              name="agency"
              :label="$t('agency.singolar')"
              v-slot="{ handleChange, handleBlur, value, errors }"
              v-model="store.registry.basic.agency"
            >
              <OField
                v-show="store.registry.basic.category === 'agency'"
                :label="$t('agency.singolar')"
                :variant="errors[0] ? 'danger' : null"
                :message="errors[0] ? errors[0] : ''"
              >
                <OInput
                  :label="$t('agency.singolar')"
                  :model-value="value"
                  @update:modelValue="handleChange"
                  @change="handleChange"
                  @blur="handleBlur"
                  expanded
                />
              </OField>
            </VField>
            <VField
              name="nationality"
              :label="$t('escort.details.nationality')"
              v-slot="{ handleChange, handleBlur, value, errors }"
              v-model="store.registry.basic.nationality"
            >
              <OField
                :label="$t('escort.details.nationality')"
                :variant="errors[0] ? 'danger' : null"
                :message="errors[0] ? errors[0] : ''"
              >
                <OSelect
                  :model-value="value"
                  @update:modelValue="handleChange"
                  @change="handleChange"
                  @blur="handleBlur"
                  expanded
                >
                  <option
                    v-for="nationality of nationalities"
                    :key="nationality.countryCode"
                    :value="nationality.countryCode"
                  >{{ nationality.countryName }}</option>
                </OSelect>
              </OField>
            </VField>
          </div>
        </div>

        <div class="column is-one-quarter">
          <div class="box">
            <h2 class="title is-4">{{ $t('dashboard.registry.body.title') }}</h2>
          </div>
        </div>
      </div>

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
                native-type="submit"
                variant="primary"
                outlined
              >{{  $t('dashboard.publication.next') }}</OButton>
            </OField>
          </div>
        </div>
      </div>
    </VForm>
  </NuxtLayout>
</template>

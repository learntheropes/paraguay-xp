<script setup>
import Tesseract from 'tesseract.js';
import nuxtStorage from 'nuxt-storage';

definePageMeta({
  layout: 'dashboard'
});

const store = usePublicationStore();

onMounted(() => {
  const publication = nuxtStorage.localStorage.getData('publication');
  if (publication) store.setPublication(JSON.parse(publication));
})

const { locale } = useI18n();

const { $dayjs } = useNuxtApp();

const validationSchema = {
  birthDate: {
    required: true,
  },
  idFront: {
    required: true,
  },
  idBack: {
    required: true,
  },
};

const datepickerSetting = {
  maxDate: new Date($dayjs(new Date()).subtract(18, 'years')),
  showWeekNumber: false,
  firstDayOfWeek: 1,
  modelValue: []
}

const computedDateOfBirth = computed({
  get() {
    return new Date(store.age.dateOfBirth);
  },
  set(value) {
    store.setDateOfBirth(value);
  }
})

const idFront = computed({
  get() {
    return store.age.idFront
  },
  set(file) {
    try {
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        const result = reader.result
        store.setIdFront(result)
        const img = document.getElementById('imgFrontId');
        img.src = result
      };
    } catch (error) {}
  }
});

const idBack = computed({
  get() {
    return store.age.idBack
  },
  set(file) {
    try {
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        const result = reader.result
        store.setIdBack(result)
        const img = document.getElementById('imgBackId');
        img.src = result
      };
    } catch (error) {}
  }
});

const isLoading = ref(false);

const goNext = async () => {

  isLoading.value = true;

  const { data: { text: textFront } } = await Tesseract.recognize(store.age.idFront, 'spa');
  const { data: { text: textBack } } = await Tesseract.recognize(store.age.idBack, 'spa');
  
  const arr = store.age.dateOfBirth.split('/');
  const dateFront = `${arr[1]}-${arr[0]}-${arr[2]}`;
  const dateBack = `${arr[2].substring(2, 4)}${arr[0]}${arr[1]}`;
  const match = (textFront.includes(dateFront) || textBack.includes(dateBack))
  store.setDateMatch(match);

  const ageAtRegistration = $dayjs(new Date()).diff(new Date(store.age.dateOfBirth), 'years');
  store.setAgeAtRegistration(ageAtRegistration);

  isLoading.value = false;

  await navigateTo(`/${locale.value}/dashboard/publication/registry`);
}
</script>

<template>
  <NuxtLayout>
    <OLoading :full-page="true" v-model:active="isLoading" iconSize="large"/>
    <dasboardPublicationSteps :activeStep="1" />
    <div class="notification is-warning has-text-centered">
      <div class="content ltr-has-new-line">{{$t('dashboard.age.warning')}}</div>
    </div>
    <VForm
      name="age"
      :validation-schema="validationSchema"
      @submit="goNext"
    >
      <div class="columns is-centered">
        <div class="column is-narrow">
          <VField
            name="birthDate"
            :label="$t('dashboard.age.birthDate')"
            v-slot="{ handleChange, handleBlur, value, errors }"
            v-model="computedDateOfBirth"
          >
            <OField
              :label="$t('dashboard.age.birthDate')"
              :variant="errors[0] ? 'danger' : null"
              :message="errors[0] ? errors[0] : ''"
            >
              <ODatepicker
                :model-value="value"
                @update:modelValue="handleChange"
                @change="handleChange"
                @blur="handleBlur"
                :locale="locale"
                :showWeekNumber="datepickerSetting.showWeekNumber"
                :firstDayOfWeek="datepickerSetting.firstDayOfWeek"
                :maxDate="datepickerSetting.maxDate"
                :modelValue="datepickerSetting.modelValue"
                inline
              />
            </OField>
          </VField>
          <VField
            name="idFront"
            :label="$t('dashboard.age.idFront')"
            v-slot="{ handleChange, handleBlur, value, errors }"
            v-model="idFront"
          >
            <OField :label="$t('dashboard.age.idFront')">
              <input
                :model-value="value"
                @update:modelValue="handleChange"
                @change="handleChange"
                @blur="handleBlur"
                :name="$t('dashboard.age.idFront')"
                id="idFront"
                ref="idFront"
                style="display:none"
                type="file"
                accept="image/*"
                class="is-hidden-mobile is-hidden-tablet"
              >
            </OField>
            <div class="card ltr-add-margin.bottom">
              <div class="card-image">
                <figure class="image is-square">
                  <img id="imgFrontId" src="/others/white.jpg" class="contain">
                </figure>
                <div @click.native="$refs.idFront.click()" class="card-content is-overlay ltr-is-center-center">
                  <OIcon icon="plus-circle" size="large" />
                </div>
              </div>
            </div>
            <div :class="errors[0] ? 'ltr-error has-text-danger' : 'ltr-error'">{{ errors[0] ? errors[0] : '' }}</div>
          </VField>
          <VField
            name="idBack"
            :label="$t('dashboard.age.idBack')"
            v-slot="{ handleChange, handleBlur, value, errors }"
            v-model="idBack"
          >
            <OField :label="$t('dashboard.age.idBack')">
              <input
                :model-value="value"
                @update:modelValue="handleChange"
                @change="handleChange"
                @blur="handleBlur"
                :name="$t('dashboard.age.idBack')"
                id="idBack"
                ref="idBack"
                style="display:none"
                type="file"
                accept="image/*"
                class="is-hidden-mobile is-hidden-tablet"
              >
            </OField>
            <div class="card ltr-add-margin.bottom">
              <div class="card-image">
                <figure class="image is-square">
                  <img id="imgBackId" src="/others/white.jpg" class="contain">
                </figure>
                <div @click.native="$refs.idBack.click()" class="card-content is-overlay ltr-is-center-center">
                  <OIcon icon="plus-circle" size="large" />
                </div>
              </div>
            </div>
            <div :class="errors[0] ? 'ltr-error has-text-danger' : 'ltr-error'">{{ errors[0] ? errors[0] : '' }}</div>
          </VField>
        </div>
      </div>
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
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

<style scoped>
.contain {
  object-fit: contain;
}
.ltr-add-margin.bottom {
  margin-bottom: 0.75rem;
}
.ltr-error {
  display: block;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}
</style>

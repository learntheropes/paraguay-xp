<script setup>
import services from '~/assets/js/services';
import extras from '~/assets/js/extras'
import neighbourhoods from '~/assets/js/neighbourhoods';
import cities from '~/assets/js/cities';
import { languages, levels } from '~/assets/js/languages';

definePageMeta({
  layout: 'dashboard'
});

const store = usePublicationStore();

const validationSchema = computed(() => {
  return {
    name: {
      required: true
    },
    agency: {
      required: true
    },
    nationality: {
      required: true
    },
    height: {
      required: true,
      integer: true,
      between: {
        min: 100,
        max: 200
      }
    },
    breast: {
      required: true,
      integer: true,
      between: {
        min: 50,
        max: 200
      }
    },
    waist: {
      required: true,
      integer: true,
      between: {
        min: 30,
        max: 100
      }
    },
    hips: {
      required: true,
      integer: true,
      between: {
        min: 50,
        max: 200
      }
    },
    area: {
      required: store.registry.services.incall
    },
    rate: {
      required: true,
      integer: true
    }
  }
})

const category = computed({
  get() {
    return store.registry.basic.category;
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

const cm = ref('cm');

const currency = ref(t('index.currency'));

const serviceText = (service) => store.registry.services[service] ? t('dashboard.gallery.yes') : t('dashboard.gallery.no');

const providedExtras = extras.map((extra, index) => computed({
  get() {
    return store.registry.extra.indexOf(extra) >= 0;
  },
  set(value) {
    if (value) store.setOneExtra(extras[index])
    else store.removeOneExtra(extras[index]);
  }
}));

const extraText = (extra) => store.registry.extra.indexOf(extra) >= 0 ? t('dashboard.gallery.yes') : t('dashboard.gallery.no');

const week = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

const day = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '24:00',
];

const rate = computed({
  get() {
    return store.registry.rate;
  },
  set(value) {
    store.setRate(value);
  }
})

const goNext = async () => {
  await navigateTo(`/${locale.value}/dashboard/publication/description`);
};
</script>

<template>
  <NuxtLayout>
    <VForm
      name="registry"
      :validation-schema="validationSchema"
      @submit="goNext"
    >
      <div class="columns is-centered">
        <div class="column is-one-fifth">
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
        <div class="column in-one-fifth">
          <div class="box">
            <h2 class="title is-4">{{ $t('dashboard.registry.languages.title') }}</h2>
            <OField
              v-for="language of languages"
              :key="language"
              :label="$t(`escort.details.${language}`)"
            >
              <OSelect
                v-model="store.registry.languages[language]"
                expanded
              >
                <option
                  v-for="level of levels"
                  :key="level"
                  :value="level"
                >{{ $t(`escort.details.${level}`) }}</option>
              </OSelect>
            </OField>
          </div>
        </div>
        <div class="column is-one-fifth">
          <div class="box">
            <h2 class="title is-4">{{ $t('dashboard.registry.body.title') }}</h2>
            <VField
              name="height"
              :label="$t('escort.details.height')"
              v-slot="{ handleChange, handleBlur, value, errors }"
              v-model="store.registry.body.height"
            >
              <OField
                :label="$t('escort.details.height')"
                :variant="errors[0] ? 'danger' : null"
                :message="errors[0] ? errors[0] : ''"
              >
                <OInput
                  :label="$t('escort.details.height')"
                  :model-value="value"
                  @update:modelValue="handleChange"
                  @change="handleChange"
                  @blur="handleBlur"
                  expanded
                />
                <OInput disabled v-model="cm" class="cm"/>
              </OField>
            </VField>
            <VField
              name="breast"
              :label="$t('escort.details.breast')"
              v-slot="{ handleChange, handleBlur, value, errors }"
              v-model="store.registry.body.breast"
            >
              <OField
                :label="$t('escort.details.breast')"
                :variant="errors[0] ? 'danger' : null"
                :message="errors[0] ? errors[0] : ''"
              >
                <OInput
                  :label="$t('escort.details.breast')"
                  :model-value="value"
                  @update:modelValue="handleChange"
                  @change="handleChange"
                  @blur="handleBlur"
                  expanded
                />
                <OInput disabled v-model="cm" class="cm"/>
              </OField>
            </VField>
            <VField
              name="waist"
              :label="$t('escort.details.waist')"
              v-slot="{ handleChange, handleBlur, value, errors }"
              v-model="store.registry.body.waist"
            >
              <OField
                :label="$t('escort.details.waist')"
                :variant="errors[0] ? 'danger' : null"
                :message="errors[0] ? errors[0] : ''"
              >
                <OInput
                  :label="$t('escort.details.waist')"
                  :model-value="value"
                  @update:modelValue="handleChange"
                  @change="handleChange"
                  @blur="handleBlur"
                  expanded
                />
                <OInput disabled v-model="cm" class="cm"/>
              </OField>
            </VField>
            <VField
              name="hips"
              :label="$t('escort.details.hips')"
              v-slot="{ handleChange, handleBlur, value, errors }"
              v-model="store.registry.body.hips"
            >
              <OField
                :label="$t('escort.details.hips')"
                :variant="errors[0] ? 'danger' : null"
                :message="errors[0] ? errors[0] : ''"
              >
                <OInput
                  :label="$t('escort.details.hips')"
                  :model-value="value"
                  @update:modelValue="handleChange"
                  @change="handleChange"
                  @blur="handleBlur"
                  expanded
                />
                <OInput disabled v-model="cm" class="cm"/>
              </OField>
            </VField>
          </div>
        </div>
        <div class="column is-one-fifth">
          <div class="box">
            <h2 class="title is-4">{{ $t('escort.services.title') }}</h2>
            <OField
              v-for="service of services"
              :key="service"
              :label="$t(`escort.services.${service}`)"
            >
              <OSwitch
                v-model="store.registry.services[service]"
              >{{ serviceText(service) }}</OSwitch>
            </OField>
            <VField
              name="area"
              v-if="store.registry.services.incall"
              :label="$t('area.singolar')"
              v-slot="{ handleChange, handleBlur, value, errors }"
              v-model="store.registry.services.area"
            >
              <OField
                :label="$t('area.singolar')"
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
                  <optgroup label="Asunción">
                    <option
                      v-for="neighbourhoodOption of neighbourhoods"
                      :key="neighbourhoodOption"
                      :value="neighbourhoodOption"
                    >
                      {{ neighbourhoodOption }}
                    </option>
                  </optgroup>
                  <optgroup label="Paraguay">
                    <option
                      v-for="cityOption of cities"
                      :key="cityOption"
                      :value="cityOption"
                    >
                      {{ cityOption }}
                    </option>
                  </optgroup>
                </OSelect>
              </OField>
            </VField>

            <OField
              v-for="(extra, index) of extras"
              :key="extra"
              :label="$t(`extra.${extra}`)"
            >
              <OSwitch
                v-model="providedExtras[index]"
              >{{ extraText(extra) }}</OSwitch>
            </OField>

            <VField
              name="rate"
              :label="$t('escort.rate.title')"
              v-slot="{ handleChange, handleBlur, value, errors }"
              v-model="rate"
            >
              <OField
                :label="$t('escort.rate.title')"
                :variant="errors[0] ? 'danger' : null"
                :message="errors[0] ? errors[0] : ''"
              >
                <OInput
                  :label="$t('escort.rate.title')"
                  :model-value="value"
                  @update:modelValue="handleChange"
                  @change="handleChange"
                  @blur="handleBlur"
                  expanded
                />
                <OInput disabled v-model="currency" class="cm"/>
              </OField>
            </VField>
          </div>
        </div>
        <div class="column is-one-fifth">
          <div class="box">
            <h2 class="title is-4">{{ $t('dashboard.registry.availability.title') }}</h2>
            <VField
              name="fromDay"
              :label="$t('dashboard.registry.availability.fromDay')"
              v-slot="{ handleChange, handleBlur, value, errors }"
              v-model="store.registry.availability.fromDay"
            >
              <OField
                :label="$t('dashboard.registry.availability.fromDay')"
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
                    v-for="(day, index) of week"
                    :key="day"
                    :value="index"
                  >{{ $t(`escort.availability.${day}`) }}</option>
                </OSelect>
              </OField>
            </VField>
            <VField
              name="toDay"
              :label="$t('dashboard.registry.availability.toDay')"
              v-slot="{ handleChange, handleBlur, value, errors }"
              v-model="store.registry.availability.toDay"
            >
              <OField
                :label="$t('dashboard.registry.availability.toDay')"
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
                    v-for="(day, index) of week"
                    :key="day"
                    :value="index"
                  >{{ $t(`escort.availability.${day}`) }}</option>
                </OSelect>
              </OField>
            </VField>
            <VField
              name="fromHour"
              :label="$t('dashboard.registry.availability.fromHour')"
              v-slot="{ handleChange, handleBlur, value, errors }"
              v-model="store.registry.availability.fromHour"
            >
              <OField
                :label="$t('dashboard.registry.availability.fromHour')"
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
                    v-for="(hour, index) of day"
                    :key="hour"
                    :value="index"
                  >{{ day[index] }}</option>
                </OSelect>
              </OField>
            </VField>
            <VField
              name="toHour"
              :label="$t('dashboard.registry.availability.toHour')"
              v-slot="{ handleChange, handleBlur, value, errors }"
              v-model="store.registry.availability.toHour"
            >
              <OField
                :label="$t('dashboard.registry.availability.toHour')"
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
                    v-for="(hour, index) of day"
                    :key="hour"
                    :value="index"
                  >{{ day[index] }}</option>
                </OSelect>
              </OField>
            </VField>
          </div>
        </div>
      </div>
      <div class="level is-mobile">
        <div class="level-left">
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

<style>
.cm {
  width: 3rem;
  background-color: lightgrey;
}
</style>

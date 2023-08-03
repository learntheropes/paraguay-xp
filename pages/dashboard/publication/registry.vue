<script setup>
import services from '~/assets/js/services';
import extras from '~/assets/js/extras'
import neighbourhoods from '~/assets/js/neighbourhoods';
import cities from '~/assets/js/cities';

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
      required: (store.registry.services.incall) ? true : false
    },
    rate: {
      required: true,
      integer: true
    }
  }
})

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

const cm = ref('cm');

const pyg = ref(t('index.PYG'));

const serviceText = (service) => store.registry.services[service] ? t('dashboard.gallery.yes') : t('dashboard.gallery.no');

const providedExtras = extras.map((extra, index) => computed({
  get() {
    return store.registry.extra.indexOf(extra) >= 0 ? true: false
  },
  set(value) {
    if (value) store.setOneExtra(extras[index])
    else store.removeOneExtra(extras[index])
  }
}));

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
        <div class="column is-one-quarter">
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
              >{{ serviceText(service) }}</OSwitch>
            </OField>

            <VField
              name="rate"
              :label="$t('escort.rate.title')"
              v-slot="{ handleChange, handleBlur, value, errors }"
              v-model="store.registry.rate"
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
                <OInput disabled v-model="pyg" class="cm"/>
              </OField>
            </VField>
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

<style>
.cm {
  width: 3rem;
  background-color: lightgrey;
}
</style>

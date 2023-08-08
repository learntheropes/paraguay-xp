<script setup>
import uniqBy from 'lodash.uniqby'
import sortBy from 'lodash.sortby'
import minBy from 'lodash.minby';
import maxBy from 'lodash.maxby'
import cloneDeep from 'lodash.clonedeep'
import services from '~/assets/js/services';

const { 
  $listen, 
  $event,
  $dayjs,
  $numberWithDots
} = useNuxtApp();

const { isMobile } = useDevice();
const isGapless = (isMobile) ? 'columns is-vcentered is-gapless' : 'columns is-vcentered';

const showFilter = ref(false);

const store = useEscortsStore();

const all = [].concat(
  store.list.diamond, 
  store.list.palladium, 
  store.list.platinum, 
  store.list.esmerald, 
  store.list.gold
);

const service = ref(null);
const area = ref(null);

const defaultRate =[
  store.min,
  store.max
];
const rate = ref([]);

const defaultAge = [
  $dayjs().diff(new Date(maxBy(all, a => a.preview.dateOfBirth).preview.dateOfBirth), 'years'),
  $dayjs().diff(new Date (minBy(all,  a => a.preview.dateOfBirth).preview.dateOfBirth), 'years')
];
const age = ref([]);

const areas = sortBy(
  uniqBy(all, a => a.preview.area),
  a => a.preview.area
)
.filter(escort => escort.preview.area)
.map(escort => escort.preview.area);

const isIncall = computed(() => service.value === 'incall')

const filteredEscorts = computed(() => {

  let filtered = cloneDeep(store.list);

  if (service.value) filtered = Object.keys(store.list).reduce((obj, key )=> {
    obj[key] = filtered[key].filter(escort => escort.preview.services[service.value]) || [];
    return obj;
  }, {});

  if (area.value) filtered = Object.keys(store.list).reduce((obj, key) => {
    obj[key] = filtered[key].filter(escort => escort.previregistryew.services.area === area.value) || [];
    return obj;
  }, {});

  if (rate.value[0]) filtered = Object.keys(store.list).reduce((obj, key) => {
    obj[key] = filtered[key].filter(escort => escort.preview.rate >= rate.value[0]) || [];
    return obj;
  }, {});

  if (rate.value[1]) filtered = Object.keys(store.list).reduce((obj, key) => {
    obj[key] = filtered[key].filter(escort => escort.preview.rate <= rate.value[1]) || [];
    return obj;
  }, {});

  if (age.value[0]) filtered = Object.keys(store.list).reduce((obj, key) => {
    obj[key] = filtered[key].filter(escort => $dayjs().diff(escort.preview.dateOfBirth, 'years') >= age.value[0]) || [];
    return obj;
  }, {});

  if (age.value[1]) filtered = Object.keys(store.list).reduce((obj, key) => {
    obj[key] = filtered[key].filter(escort => $dayjs().diff(escort.preview.dateOfBirth, 'years') <= age.value[1]) || [];
    return obj;
  }, {});

  return filtered;
})

$listen('toggleFilter', (bool) => {

  showFilter.value = bool;
  if (!bool) {
    service.value = null;
    area.value = null;
    rate.value = [];
    age.vale = [];
  };
});

watch(filteredEscorts, filteredEscorts => {

  $event('filterLevels', filteredEscorts);
  },
  {
    deep: true, 
    immediate: true
  }
)
</script>

<template>
  <section v-if="showFilter" class="section">
    <div class="columns is-centered">
      <div class="column is-narrow has-text-centered">
        <div v-if="$device.isMobile" class="columns is-centered is-mobile">
          <div class="column is-three-quarters">
            <OField>
              <OSelect v-model="service" :placeholder="$t('index.filter.byService')" expanded>
                <option v-for="eachService in services" :key="eachService" :value="eachService">
                  {{ $t(`escort.services.${eachService}`) }}
                </option>
              </OSelect>
            </OField>
          </div>
        </div>
        <OField v-else>
          <OSelect v-model="service" :placeholder="$t('index.filter.byService')">
            <option v-for="eachService in services" :key="eachService" :value="eachService">
              {{ $t(`escort.services.${eachService}`) }}
            </option>
          </OSelect>
        </OField>
      </div>
      <div v-if="isIncall" class="column is-narrow has-text-centered">
        <div v-if="$device.isMobile" class="columns is-centered is-mobile">
          <div class="column is-three-quarters">
            <OField>
              <OSelect v-model="area" :placeholder="$t('index.filter.byArea')" expanded>
                <option v-for="eachArea in areas" :key="eachArea" :value="eachArea">
                  {{ eachArea }}
                </option>
              </OSelect>  
            </OField>
          </div>
        </div>
        <OField v-else>
          <OSelect v-model="area" :placeholder="$t('index.filter.byArea')" expanded>
            <option v-for="eachArea in areas" :key="eachArea" :value="eachArea">
              {{ eachArea }}
            </option>
          </OSelect>  
        </OField>
      </div>
      <div class="column is-one-quarter has-text-centered">
        <div :class="isGapless">
          <div class="column is-narrow has-text-grey-light">
            {{ $t('index.filter.byPrice') }}
          </div>
          <div class="column">
            <div v-if="$device.isMobile" class="columns is-centered is-mobile">
              <div class="column is-two-thirds">
                <OField>
                  <OSlider
                    v-model="rate"
                    :min="defaultRate[0]"
                    :max="defaultRate[1]"
                    :step="100000"
                    :customFormatter="val => $numberWithDots(val) + ' ' + $t('index.currency')"
                    ticks
                    tooltipAlways
                  /> 
                </OField> 
              </div>
            </div>
            <OField v-else>
              <OSlider
                v-model="rate"
                :min="defaultRate[0]"
                :max="defaultRate[1]"
                :step="100000"
                :customFormatter="val => $numberWithDots(val) + ' ' + $t('index.currency')"
                ticks
                tooltipAlways
              /> 
            </OField>     
          </div>
        </div>
      </div>
      <div class="column is-one-quarter has-text-centered">
        <div :class="isGapless">
          <div class="column is-narrow has-text-grey-light">
            {{ $t('index.filter.byAge') }}
          </div>
          <div class="column">
            <div v-if="$device.isMobile" class="columns is-centered is-mobile">
              <div class="column is-two-thirds">
                <OField>
                  <OSlider
                    v-model="age"
                    :min="defaultAge[0]"
                    :max="defaultAge[1]"
                    ticks
                    tooltipAlways
                  /> 
                </OField> 
              </div>
            </div>
            <OField v-else>
              <OSlider
                v-model="age"
                :min="defaultAge[0]"
                :max="defaultAge[1]"
                ticks
                tooltipAlways
              /> 
            </OField>        
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const {
  escort,
} = defineProps({
  escort: {
    type: Object,
    required: true
  }
});

const {
  registry: {
    availability: {
      fromDay,
      toDay,
      fromHour,
      toHour
    }
  }
} = escort

const week = {
  0: 'monday',
  1: 'tuesday',
  2: 'wednesday',
  3: 'thursday',
  4: 'friday',
  5: 'saturday',
  6: 'sunday'
}

const day = {
  0: '00:00',
  1: '01:00',
  2: '02:00',
  3: '03:00',
  4: '04:00',
  5: '05:00',
  6: '06:00',
  7: '07:00',
  8: '08:00',
  9: '09:00',
  10: '10:00',
  11: '11:00',
  12: '12:00',
  13: '13:00',
  14: '14:00',
  15: '15:00',
  16: '16:00',
  17: '17:00',
  18: '18:00',
  19: '19:00',
  20: '20:00',
  21: '21:00',
  22: '22:00',
  23: '23:00',
  24: '24:00',
}
</script>

<template>
  <section class="section">
    <h2 class="title is-5">{{$t('dashboard.registry.availability.title')}}</h2>
    <span class="is-5">
      {{ $t(`escort.availability.${week[fromDay]}`) }}
      &nbsp;-&nbsp;
      {{ $t(`escort.availability.${week[toDay]}`) }}
    </span>
    <br>
    <span class="is-5">
      {{ day[fromHour] }}
      &nbsp;-&nbsp;
      {{ day[toHour] }}
    </span>
  </section>
</template>

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
  preview: {
    dateOfBirth,
    name,
    agency
  },
  phone,
} = escort;

const { t } = useI18n();

const { 
  $dayjs, 
  $capitalize 
} = useNuxtApp();

const age = $dayjs(new Date()).diff(dateOfBirth, 'years')

const agencyName = (agency === 'indipendent') ? t('agency.indipendent') : agency;

const message = encodeURIComponent(`Hola *${$capitalize(name)}*. He visto su anuncio en *ParaguayXP*. Me gustaria recibir mas informacion`);
const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phone.replace('+','')}&text=${message}`;
</script>

<template>
  <div>
    <div class="is-hidden-tablet columns is-mobile is-vcentered">
      <div class="column">
        <h1 class="title is-3 is-capitalized">{{ name }}<span class="is-hidden-mobile">&nbsp;({{ age }})</span></h1>
        <p class="subtitle is-5 is-capitalized">{{ agencyName }}</p>
      </div>
      <div class="column is-narrow is-justify-content-right has-text-righ">
        <a :href="whatsappUrl" target="_blank" aria-label="send whatsapp" data-umami-event="whatsapp-message" :data-umami-event-whatsapp="phone">
          <span class="icon is-large"><i class="mdi mdi-72px mdi-whatsapp"></i></span>
        </a>
      </div>
    </div>
    <div class="is-hidden-mobile columns is-vcentered">
      <div class="column is-half">
        <h1 class="title is-3 is-capitalized">{{ name }}<span class="is-hidden-mobile">&nbsp;({{ age }})</span></h1>
        <p class="subtitle is-5 is-capitalized">{{ agencyName }}</p>
      </div>
      <div class="column is-half">
        <div class="columns is-mobile is-half is-justify-content-right is-vcentered">
          <div class="column is-narrow is-justify-content-right">
            <p class="title is-3 is-capitalized has-text-right">{{ phone.replace('+595',0) }}</p>
            <p class="subtitle is-5 has-text-right">{{ phone }}</p>
          </div>
          <div class="column is-narrow">
            <a :href="whatsappUrl" target="_blank" aria-label="send whatsapp" data-umami-event="whatsapp-message" :data-umami-event-whatsapp="phone">
              <span class="icon is-large"><i class="mdi mdi-72px mdi-whatsapp"></i></span>
            </a>
          </div>
        </div>     
      </div>
    </div>
  </div>
</template>

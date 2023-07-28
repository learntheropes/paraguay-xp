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
  name,
  phone,
} = escort;

const { t } = useI18n();

const { 
  $dayjs, 
  $capitalize 
} = useNuxtApp();

const age = $dayjs(new Date()).diff(escort.birthTime, 'years')

const agency = (escort.agency === 'indipendent') ? t('indipendent') : escort.agency;

const message = encodeURIComponent(`Hola *${$capitalize(name)}*. He visto su anuncio en *ParaguayXP*. Me gustaria recibir mas informacion`);
const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phone.replace('+','')}&text=${message}`;
</script>

<template>
  <div>
    <div class="is-hidden-tablet columns is-mobile is-vcentered">
      <div class="column">
        <h1 class="title is-3 is-capitalized">{{ name }}<span class="is-hidden-mobile">&nbsp;({{ age }})</span></h1>
        <p class="subtitle is-5 is-capitalized">{{ agency }}</p>
      </div>
      <div class="column is-narrow is-justify-content-right has-text-righ">
        <a :href="'tel:' + phone" aria-label="phone">
          <OIcon customSize="mdi-72px" icon="phone" varian="primary"></OIcon>
        </a>
      </div>
      <div class="column is-narrow is-justify-content-right has-text-righ">
        <a :href="whatsappUrl" target="_blank" aria-label="whatsapp">
          <OIcon customSize="mdi-72px" icon="whatsapp" variant="primary"></OIcon>
        </a>
      </div>
    </div>
    <div class="is-hidden-mobile columns is-vcentered">
      <div class="column is-half">
        <h1 class="title is-3 is-capitalized">{{ name }}<span class="is-hidden-mobile">&nbsp;({{ age }})</span></h1>
        <p class="subtitle is-5 is-capitalized">{{ agency }}</p>
      </div>
      <div class="column is-half">
        <div class="columns is-mobile is-half is-justify-content-right is-vcentered">
          <div class="column is-narrow is-justify-content-right">
            <p class="title is-3 is-capitalized has-text-right">{{ phone.replace('+595',0) }}</p>
            <p class="subtitle is-5 has-text-right">{{ phone }}</p>
          </div>
          <div class="column is-narrow">
            <a :href="whatsappUrl" target="_blank">
              <OIcon customSize="mdi-72px" icon="whatsapp"></OIcon>
            </a>
          </div>
        </div>     
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  activeStep
} = defineProps({
  activeStep: {
    type: Number,
    required: true
  }
});
const step = ref(activeStep);
const { isMobile } = useDevice();
const columnClass = isMobile ? 'column is-half' : 'column';
</script>

<template>
  <div class="columns is-mobile is-centered">
    <div :class="columnClass">
      <OSteps
        v-model="step"
        :rounded="true"
        :has-navigation="false"
        label-position="bottom"
        :vertical="isMobile"
      >
        <OStepItem step="1" :clickable="false" :label="$t('dashboard.publication.steps.age')" />
        <OStepItem step="2" :clickable="false" :label="$t('dashboard.publication.steps.registry')" />
        <OStepItem step="3" :clickable="false" :label="$t('dashboard.publication.steps.description')" />
        <OStepItem step="4" :clickable="false" :label="$t('dashboard.publication.steps.gallery')" />
        <OStepItem step="5" :clickable="false" :label="$t('dashboard.publication.steps.publish')" />
      </OSteps>
    </div>
  </div>
</template>
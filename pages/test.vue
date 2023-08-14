<script setup>
definePageMeta({
  layout: 'empty'
});

const escorts = await queryContent('escorts')
  .where({
    // until:{
    //   $gte: new Date()
    // }
  })
  .only([
    'preview', 
    'updatedAt' 
  ])
  .find();
</script>

<template>
  <pre>{{ escorts }}</pre>
</template>
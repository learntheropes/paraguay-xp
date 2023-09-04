<script setup>
  definePageMeta({
    // auth: false,
    layout: 'admin',
    middleware: 'admin'
  });

  const {
    params: {
      slug
    }
  } = useRoute();

  const { 
    data: age,
  } = await useFetch(`/api/admin/age/${slug}`);

  const publication = await queryContent('escorts', slug).findOne();

  const approve = async () => {
    await $fetch(`/api/admin/approve/${slug}`, {
      method: 'POST'
    });
  }
</script>

<template>
  <NuxtLayout>
    <OButton @click="approve">Approve</OButton>
    <div class="box">
      <div>{{ age.dateOfBirth }}</div><br>
      <img :src="age.idFront" alt="idFront" /><br>
      <img :src="age.idBack" alt="idBack" /><br>
    </div>
    <pre>{{ JSON.stringify(publication, null, 2) }}</pre>
    <div v-for="media in publication.gallery.medias" :key="media.id">
      <div class="box">
        <div>{{ media.id }}</div><br>
        <img :src="'/gallery/modal/' + media.id" :alt="media.id" />
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
pre {
  width: 80vw;
}
img {
  max-width: 100%;
  max-height: 100vh;
}
</style>
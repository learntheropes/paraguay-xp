<script setup>
definePageMeta({
  // auth: false,
  layout: 'admin',
  middleware: 'admin'
});

const publications = await queryContent('escorts')
  .where({ 
    approved: true 
  })
  .only([
    'preview',
    'phone',
    'updatedAt'
  ])
  .find();

const { $dayjs } = useNuxtApp();
</script>

<template>
  <NuxtLayout>
    <h1 class="title">Approved Publications</h1>
    <OTable :data="publications">
      <OTableColumn v-slot="props" label="Age">
        {{ $dayjs(new Date()).diff(props.row.preview.dateOfBirth, 'years') }}
      </OTableColumn>
      <OTableColumn v-slot="props" label="Name" field="name" sortable searchable>
        {{ props.row.preview.name }}
      </OTableColumn>
      <OTableColumn v-slot="props" label="Phone" field="phone" searchable>
        {{ props.row.phone }}
      </OTableColumn>
      <OTableColumn v-slot="props" label="Agency" field="agency" sortable searchable>
        {{ props.row.preview.agency }}
      </OTableColumn>
      <OTableColumn v-slot="props" label="Updated at" field="updatedAt" sortable>
        {{ $dayjs(props.row.updatedAt).format('YYYY-MM-DD HH:MM') }}
      </OTableColumn>
      <OTableColumn v-slot="props">
        <NuxtLink :to="localePath(`/admin/publications/${props.row.preview.slug}`)" target="_self">View</NuxtLink>
      </OTableColumn>
    </OTable>
  </NuxtLayout>
</template>
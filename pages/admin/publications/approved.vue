<script setup>
definePageMeta({
  layout: "admin",
  middleware: 'admin'
});

const publications = await queryContent('escorts')
  .only([
    'preview',
    'updatedAt'
  ])
  .find();

const { $dayjs } = useNuxtApp();
</script>

<template>
  <div>
    <h1 class="title">Approved Publications</h1>
    <OTable :data="publications">
      <OTableColumn v-slot="props" label="Age">
        {{ $dayjs(new Date()).diff(props.row.preview.dateOfBirth, 'years') }}
      </OTableColumn>
      <OTableColumn v-slot="props" label="Name" field="name" sortable searchable>
        {{ props.row.preview.name }}
      </OTableColumn>
      <OTableColumn v-slot="props" label="Phone" field="phone" searchable>
        {{ props.row.preview.phone }}
      </OTableColumn>
      <OTableColumn v-slot="props" label="Agency" field="agency" sortable searchable>
        {{ props.row.preview.agency }}
      </OTableColumn>
      <OTableColumn v-slot="props" label="Created At" field="createdAt" sortable>
        {{ $dayjs(props.row.updatedAt).format('YYYY-MM-DD HH:MM') }}
      </OTableColumn>
      <OTableColumn v-slot="props">
        <NuxtLink :to="'/admin/publication/'+props.row.preview.slug">
          View
        </NuxtLink>
      </OTableColumn>
  </OTable>
  </div>
</template>
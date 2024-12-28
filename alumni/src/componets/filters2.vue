<template>
    <div class="max-w-3xl mx-auto">
      <div class="p-2">
        <Autocomplete
          :options="[
            { label: 'John Doe', value: 'john-doe', image: 'https://randomuser.me/api/portraits/men/59.jpg' },
            { label: 'Jane Doe', value: 'jane-doe', image: 'https://randomuser.me/api/portraits/women/58.jpg' },
            { label: 'John Smith', value: 'john-smith', image: 'https://randomuser.me/api/portraits/men/59.jpg' },
            { label: 'Jane Smith', value: 'jane-smith', image: 'https://randomuser.me/api/portraits/women/59.jpg' },
            { label: 'John Wayne', value: 'john-wayne', image: 'https://randomuser.me/api/portraits/men/57.jpg' },
            { label: 'Jane Wayne', value: 'jane-wayne', image: 'https://randomuser.me/api/portraits/women/51.jpg' },
          ]"
          v-model="single"
          placeholder="Select person"
          @update:model-value="(value) => console.log(value)"
        />
      </div>
  
      <filters :filterableFields="fields" @filters_update="applyFilters" />
  
      <div v-if="data" v-html="data.about_us"></div>
      <div v-else>Loading...</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Alumni from '../data/alumni.js';
  import filters from '../components/filters.vue';
  
  const { fetchAboutUsData } = Alumni;
  
  const data = ref(null);
  
  onMounted(async () => {
    data.value = await fetchAboutUsData();
    console.log(data.value.about_us);
  });
  
  const single = ref(null);
  const filtersss = ref(null);
  
  // Sample filterable fields
  const fields = [
    { label: "Name", fieldname: "name", fieldtype: "Data" },
    { label: "Email", fieldname: "email", fieldtype: "Data" },
    { label: "Age", fieldname: "age", fieldtype: "Int" },
    { label: "Date of Birth", fieldname: "date_of_birth", fieldtype: "Date" },
    { label: "Status", fieldname: "status", fieldtype: "Data" },
    { label: "Created At", fieldname: "created_at", fieldtype: "Datetime" },
    { label: "Updated At", fieldname: "updated_at", fieldtype: "Datetime" },
    { label: "Price", fieldname: "price", fieldtype: "Currency" },
    { label: "Is Active", fieldname: "is_active", fieldtype: "Bool" },
    { label: "Description", fieldname: "description", fieldtype: "Text" },
    { label: "Category", fieldname: "category", fieldtype: "Select" },
    { label: "Related Link", fieldname: "related_link", fieldtype: "Link" },
  ].map(item => ({ ...item, value: item.fieldname }));
  
  const applyFilters = (filters) => {

    console.log('wwd')
    console.log("Filters applied:", filters);
  };
  </script>
  
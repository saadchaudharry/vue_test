<template>
  <div class="max-w-3xl  mx-auto">

    <h1>test fields </h1>

    <filters :doctype="doctype" @filters_update="applyFilters" />


    <h1>test fields </h1>
    <h1>test fields </h1>
    <h1>test fields </h1>

    <div v-if="data" v-html="data.about_us"></div>
    <div v-else>Loading...</div>  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Alumni from '../data/alumni.js';
import filters from '../componets/filters.vue';
import { createListResource } from 'frappe-ui'

import { Button, Autocomplete, FormControl } from "frappe-ui";

const { fetchAboutUsData } = Alumni;

const data = ref(null);
const doctype = ref('Alumni _');
const filter = ref([]);

const get_fetch = ref([])

const todos = createListResource({
  doctype: doctype.value,
  fields: ['name'],
  filters: [],
  orderBy: 'creation desc',
  start: 0,
  pageLength: 10,
  initialData: [],
});

onMounted(async () => {
  data.value = await fetchAboutUsData();
  console.log(todos.data)

});

const applyFilters = (newFilters) => {
  // console.log('Filters applied:', newFilters);
  todos.filters = newFilters; // Update the filters in todos
  todos.fetch()
  get_fetch.value = todos.data

  console.log(get_fetch.value)



};
</script>
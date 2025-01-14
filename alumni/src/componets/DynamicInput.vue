<template>
    <div>
      <div
        v-if="(filter.fieldtype === 'Date' || filter.fieldtype === 'Datetime') && filter.operator === 'between'"
        class="p-2"
      >
        <DateRangePicker
          v-model="filter.query"
          variant="subtle"
          placeholder="Select Date Range"
          :disabled="false"
        />
      </div>
  
      <div
        v-else-if="filter.fieldtype === 'Link' && filter.operator === '='"
        class="p-2"
       >
        <Autocomplete
          :options="autocompleteOptions"
          v-model="filter.query"
          placeholder="Select person"
        />
      </div>
  
      <div v-else-if="filter.operator === 'is'" class="p-2">
        <Select
          :options="[
            { label: 'Set', value: 'Set' },
            { label: 'Not Set', value: 'Not Set' }
          ]"
          v-model="filter.query"
        />
      </div>
  
      <FormControl
        v-else
        v-model="filter.query"
        :type="getFieldInputType(filter.fieldtype)"
        placeholder="Value"
        class="filter-input"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  import { DateRangePicker, Autocomplete, FormControl, Select } from "frappe-ui";
  import { createResource } from "frappe-ui";
  
  // Props
  const props = defineProps({
    filter: {
      type: Object,
      required: true,
    },
  });
  
  // State
  const autocompleteOptions = ref([]);


function createResourceForFilter(filterOptions) {
  return createResource({
    url: "/api/method/get_list",
    params: { doctype: filterOptions },
    initialData: [],
  });
}

// Watch for changes in `filter` to fetch options
watch(
  () => props.filter,
  (newFilter) => {
    if (newFilter.fieldtype === "Link" && newFilter.operator === "=") {
      // Create resource dynamically based on the filter's options
      const resource = createResourceForFilter(newFilter.options);

      console.log(newFilter.options);

      // Fetch data and update autocomplete options
      resource.fetch().then(() => {

        console.log(resource.data)
        autocompleteOptions.value = resource.data || [];
      });
    }
  },
  { immediate: true, deep: true }
);

  
  // Determine input type for FormControl
  const getFieldInputType = (fieldtype) => {
    const inputTypeMapping = {
      Data: "text",
      Int: "number",
      Date: "date",
      Datetime: "date",
    };
    return inputTypeMapping[fieldtype] || "text";
  };
  </script>
  
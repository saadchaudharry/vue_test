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
      v-else-if="filter.fieldtype === 'Link' && ['=','!='].includes(filter.operator) " class="p-2">
      <Autocomplete
        :options="autocompleteOptions"
        v-model="filter.query"
        :placeholder =filter.label
      />
    </div>


    <div
      v-else-if="filter.fieldtype === 'Select' &&  ['=','!='].includes(filter.operator)" class="p-2">
      <Select
        :options="selectOptions"
        v-model="filter.query"
        :placeholder =filter.label
      />
    </div>

    <div
      v-else-if="filter.fieldtype === 'Time' &&  ['=','>','<','>=','<='].includes(filter.operator)" class="p-2">
      <TextInput
        :type="'time'"
        :ref_for="true"
        size="sm"
        variant="subtle"
        :placeholder =filter.label
        :disabled="false"
        v-model="filter.query"
      />
    </div>
    
    <div v-else-if="filter.operator === 'is'" class="p-2">
      <Select
        :options="[
          { label: 'Set', value: 'set' },
          { label: 'Not Set', value: 'not set' }
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
import { DateRangePicker, Autocomplete, FormControl, Select,TextInput } from "frappe-ui";
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
const selectOptions = ref([]);

// fetch autocompletedata for link fields
function createResourceForFilter(filterOptions) {
  return createResource({
    url: "/api/method/frappe.desk.search.search_link",
    params: {
      "txt": '' ,
      "doctype": filterOptions,
      "ignore_user_permissions": 0,
      "page_length": 100000
    },
    initialData: [],
  });
}

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



// Watch for changes in `filter` to fetch options
watch(() => props.filter,(newFilter) => {

  if (newFilter.fieldtype === "Link" && ['=','!='].includes(newFilter.operator)) {
    const resource = createResourceForFilter(newFilter.options);
      resource.fetch().then(() => {
        autocompleteOptions.value = resource.data?.map(d => ({ ...d, label: d.value })) || [];
    });
  }

  // make select options string as per frappe ui select component
  if (newFilter.fieldtype === "Select" && ['=','!='].includes(newFilter.operator) ) {
    selectOptions.value = newFilter.options.split('\n').map(status => ({ value: status, label: status }))
  }




},
{ immediate: true, deep: true }
);


</script>


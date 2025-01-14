<template>
  <div class="filter-container">
    <div class="filter-header">
      <Button label="Add Filter" @click="addFilter" />
      <Button
        v-if="filters.length"
        label="Clear All"
        class="ml-2"
        variant="danger"
        @click="clearFilters"
      />
    </div>

    <div class="bg-grey">
      <div v-for="(filter, index) in filters" :key="index" class="filter-row">
        <!-- Autocomplete for selecting fieldname -->
        <Autocomplete
          :options="drop_down"
          v-model="filter.fieldname" 
          placeholder="Field"
          class="filter-input"
          @update:modelValue="(value) => onFieldChange(value,index)" 
        />
        
        <!-- FormControl for selecting operator -->
        <FormControl
          v-model="filter.operator"
          type="select"
          :options="getOperators(filter.fieldtype)"
          placeholder="Operator"
          class="filter-input"
        />
        
        <!-- FormControl for value input -->
        <DynamicInput
            :filter="filter"
          />

        <!-- Remove button for filter -->
        <Button
          icon="x"
          variant="ghost"
          @click="removeFilter(index)"
          class="remove-filter"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineEmits } from "vue";
import { Button, Autocomplete, FormControl } from "frappe-ui";
import DynamicInput from "./DynamicInput.vue";
import { createResource } from "frappe-ui";

// Props
const props = defineProps({
  doctype: {
    type: String,
    required: true,
  },
});

// Emits
const emit = defineEmits(["filters_update"]);

// Reactive state
const filters = ref([]);
const drop_down = ref([]); // Initialize with props but fetch dynamically if empty
const isLoadingFields = ref(false); // Tracks API call status

// Fetch fields based on doctype
const resource = createResource({
    url: "/api/method/get_fields",
    params: { doctype: props.doctype },
    initialData: []

});


// Fetch filterable fields on component mount
onMounted(() => {
  resource.fetch().then(() => {
    drop_down.value = resource.data
  });
});



// Add a new blank filter
const addFilter = () => {
  filters.value.push({
    label: null,
    fieldname: null,
    operator: null,
    query: null,
    fieldtype: null,
    options: null,
  });
};

// Remove a filter by index
const removeFilter = (index) => {
  filters.value.splice(index, 1);
};

// Clear all filters
const clearFilters = () => {
  filters.value = [];
};

// Get operators based on field type
const getOperators = (fieldtype) => {
  const operatorMapping = {
    Data: ["=", "like", "not like", "in", "not in", "is"],
    Int: ["=", "!=", ">", "<", ">=", "<=", "in", "not in", "is"],
    Float: ["=", "!=", ">", "<", ">=", "<=", "in", "not in", "is"],
    Date: ["=", "!=", ">", "<", ">=", "<=", "between", "is"],
    Link: ["=", "in", "not in", "is not", "is"],
    Select: ["=", "!=", "in", "is"],
    Check: ["is"],
    Time: ["=", ">", "<", ">=", "<=", "is"],
    Datetime:["=", "!=", ">", "<", ">=", "<=", "between", "is"]
  };
  return operatorMapping[fieldtype] || ["="];
};

// Update filter's field type when field name is selected
const onFieldChange = (value, index) => {
  const field = drop_down.value.find((f) => f.fieldname === value.fieldname);
  if (field) {
    Object.assign(filters.value[index], {
      fieldtype: field.fieldtype,
      label: field.label,
      value: field.value,
      fieldname: field.fieldname,
      options: field.options,
    });
  }
};

// Watch for filter changes and emit to parent
watch(
  filters,
  (newFilters) => {
    emit("filters_update", newFilters);
  },
  { deep: true, immediate: true }
);


</script>

<style>
.filter-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.filter-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.filter-input {
  min-width: 150px;
}
.remove-filter {
  margin-left: 0.5rem;
}
</style>

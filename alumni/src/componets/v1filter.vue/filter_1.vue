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
          <FormControl
            v-model="filter.query"
            :type="getFieldInputType(filter.fieldtype)"
            placeholder="Value"
            class="filter-input"
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
  import { ref, watch,defineEmits } from "vue"; // Vue utilities
  import { Button, Autocomplete, FormControl } from "frappe-ui";
  
  // Props
  const props = defineProps({
    filterableFields: {
      type: Array,
      required: true,
    },
  });
  
  // Reactive filters array
  const drop_down = ref(props.filterableFields);
  
  
  // Reactive filters array
  const filters = ref([]);
  
  // Add a new blank filter
  const addFilter = () => {
    filters.value.push({
      label: null,
      fieldname: null,
      operator: null,
      query: null,
      fieldtype: null,
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
  
  // Fetch operators based on field type
  const getOperators = (fieldtype) => {
    const operatorMapping = {
      Data: ["=", "like", "not like", "in", "not in", "is", "is not"],
      Int: ["=", "!=", ">", "<", ">=", "<=", "in", "not in"],
      Float: ["=", "!=", ">", "<", ">=", "<=", "in", "not in"],
      Date: ["=", "!=", ">", "<", ">=", "<=", "between", "in", "not in"],
      Link: ["=", "in", "not in", "is", "is not"],
      Select: ["=", "in", "not in"],
      Check: ["=", "is", "is not"],
      Time: ["=", ">", "<", ">=", "<="],
    };
  
    return operatorMapping[fieldtype] || ["="];
  };
  
  
  // Determine the input type for the value field
  const getFieldInputType = (fieldtype) => {
    const inputTypeMapping = {
      Data: "text",
      Int: "number",
      Date: "date",
    };
    return inputTypeMapping[fieldtype] || "text";
  };
  
  // Update filter's fieldtype when fieldname is selected
  const onFieldChange = (value, index) => {
  
    const field = props.filterableFields.find((f) => f.fieldname === value.fieldname);
    if (field) {
      filters.value[index].fieldtype = field.fieldtype;  
      filters.value[index].label = field.label;  
      filters.value[index].value = field.value;  
      filters.value[index].fieldname = field.fieldname;
  
    }
  
  };
  
  // Emit the updated filters to the parent
  const emit = defineEmits(["filters_update"]);
  watch(filters, (newFilters) => {
     emit("filters_update", newFilters);
  }, { deep: true, immediate: true }); // Added deep and immediate options
  
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
  
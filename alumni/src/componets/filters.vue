<template>


  <Popover>
    <template #target="{ togglePopover }">
      <Button @click="togglePopover(); initiateFilter()" >
        Filter
      </Button>
    </template>
    <template #body-main>
      <div class="p-2 text-ink-gray-9">

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

      <div class="flex items-center gap-2 border-t pt-2">


        <Button
          :variant="'ghost'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="+ Add a Filter"
          :loading="false"
          :loadingText="null"
          :disabled="false"
          :link="null"
          @click="addFilter()"
        >
          + Add a Filter
        </Button>


        <div class="flex gap-2 ml-auto">
          <Button
            :variant="'subtle'"
            :ref_for="true"
            theme="gray"
            size="sm"
            label="Clear Filters"
            :loading="false"
            :loadingText="null"
            :disabled="false"
            :link="null"
            @click="clearFilters"
          >
            Clear Filters
          </Button>
          <Button
            :variant="'solid'"
            :ref_for="true"
            theme="gray"
            size="sm"
            label="Apply filters"
            :loading="false"
            :loadingText="null"
            :disabled="false"
            :link="null"
            @click="applyFilters()"
          >
          Apply filters
          </Button>



        </div>
      </div>


      </div>
    </template>
  </Popover>




</template>

<script setup>
import { ref, watch, onMounted, defineEmits,onBeforeMount } from "vue";
import { Button, Autocomplete, FormControl,Popover } from "frappe-ui";
import DynamicInput from "./DynamicInput.vue";
import { createResource } from "frappe-ui";

// Props
const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
});

// Emits
const emit = defineEmits(["filters_update"]);

// Reactive state
const filters = ref([]);
const drop_down = ref(props.fields); // Initialize with props but fetch dynamically if empty

// Add a new blank filter on toggle if not filter exists
const initiateFilter = () => {
      if (filters.value.length <= 0) {
        addFilter();
      }
  };



// onMounted(()=>{
//   emit("filters_update", getApiFilters());
// })




// Add a new blank filter
const addFilter = () => {
  filters.value.push({
    doctype: null,
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
  emit("filters_update", getApiFilters());

};

// Clear all filters
const clearFilters = () => {
  filters.value = [];
  emit("filters_update", getApiFilters());

};


const getOperators = (fieldtype) => {
  const operatorMapping = {
    Attach: ["=", "is"],
    AttachImage: ["=", "is"],
    Barcode: ["=", "is"],
    Button: ["=", "is"],
    Check: ["is"],
    Code: ["=", "is"],
    Color: ["=", "is"],
    // ColumnBreak: ["=", "is"],
    Currency: ["=", "!=", ">", "<", ">=", "<=", "in", "not in", "is"],
    Data: ["=", "like", "not like", "in", "not in", "is"],
    Date: ["=", "!=", ">", "<", ">=", "<=", "between", "is"],
    Datetime: [">", "<", ">=", "<=", "between", "is"],
    Duration: ["=", "!=", ">", "<", ">=", "<=", "is"],
    DynamicLink:["=", "like", "not like", "in", "not in", "is"],
    Float: ["=", "!=", ">", "<", ">=", "<=", "in", "not in", "is"],
    // Fold: ["=", "is"],
    Geolocation: ["=", "is"],
    Heading: ["=", "is"],
    HTML: ["=", "is"],
    HTMLEditor: ["=", "is"],
    Icon: ["=", "is"],
    Image: ["=", "is"],
    Int: ["=", "!=", ">", "<", ">=", "<=", "in", "not in", "is"],
    JSON: ["=", "is"],
    Link: ["=", "in", "not in", "is not", "is"],
    LongText: ["=", "like", "not like", "in", "not in", "is"],
    MarkdownEditor: ["=", "is"],
    Password: ["=", "is"],
    Percent: ["=", "!=", ">", "<", ">=", "<=", "is"],
    Phone: ["=", "is"],
    ReadOnly: ["=", "is"],
    Rating: ["=", "!=", ">", "<", ">=", "<=", "in", "not in", "is"],
    Select: ["=", "!=", "in", "is"],
    Signature: ["=", "is"],
    SmallText: ["=", "like", "not like", "in", "not in", "is"],
    // TabBreak: ["=", "is"],
    // Table: ["=", "is"],
    // TableMultiSelect: ["=", "is"],
    Text: ["=", "like", "not like", "in", "not in", "is"],
    TextEditor: ["=", "is"],
    Time: ["=", ">", "<", ">=", "<=", "is"],
  };

  // Return operators for the given field type or default to ["=", "is"].
  return operatorMapping[fieldtype] || ["=", "is"];
};


// Update filter's field type when field name is selected
const onFieldChange = (value, index) => {
  const field = drop_down.value.find((f) => f.fieldname === value.fieldname);
  if (field) {
    Object.assign(filters.value[index], {
      doctype:field.doctype,
      fieldtype: field.fieldtype,
      label: field.label,
      value: field.value,
      fieldname: field.fieldname,
      options: field.options,
    });
  }
};



// Generate API-ready filters
const getApiFilters = () => {
  return filters.value
    .filter(
      (filter) =>
        filter.fieldname && filter.operator && (filter.query !== null && filter.query !== undefined)
    )
    .map((filter) => {
      const field = drop_down.value.find((f) => f.fieldname === filter.fieldname);

      let queryValue = filter.query;

      // For link fields, extract the value if query is an object
      if (filter.fieldtype === "Link" && typeof queryValue === "object") {
        queryValue = queryValue?.value || null;
      }

      // For "in" and "not in" operators, ensure queryValue is an array
      if (["in", "not in"].includes(filter.operator) && typeof queryValue === "string") {
        queryValue = queryValue.split(",").map((item) => item.trim());
      }

      // For "between" operator, convert queryValue to an array if it's a string
      if (filter.operator === "between" && typeof queryValue === "string") {
        queryValue = queryValue.split(",").map((item) => item.trim());
      }

      return [
        field.doctype,
        field?.fieldname || filter.fieldname,
        filter.operator,
        queryValue,
      ];
    });
};


const applyFilters = () => {
  console.log('qwdqw')
  emit("filters_update", getApiFilters());
};





// Watch for filter changes and emit to parent
// watch(filters,() => {
  
//     emit("filters_update", getApiFilters());
//     console.log(filters)
//   },
//   { deep: true, immediate: true }
// );


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

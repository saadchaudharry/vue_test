<template>
    <div class="inline-flex rounded-md shadow-sm p-0 m-0" role="group">
      <div class="p-0 m-0">
        <Button
          :variant="'ghost'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="Button"
          class="first-button"
          @click="toggleIcon"
        >
          <span class="material-icons text-gray-600 text-sm">{{ iconState }}</span>
        </Button>
      </div>
      <div class="p-0 m-0">
        <Autocomplete
          :options="fields"
          v-model="SortByField"
          placeholder="Select Fields"
          @update:modelValue="emitChange"
          class="py-0"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from "vue";
  import { Button, Autocomplete } from "frappe-ui";
  
  // Props
  const props = defineProps({
    fields: {
      type: Array,
      required: true,
    },
  });
  
  // Emits
  const emit = defineEmits(["change"]);
  
  const iconState = ref("arrow_upward");
  const fields = ref(props.fields.filter(field => field.fieldtype === 'Date' || field.fieldtype === 'Datetime'));
  const SortByField = ref({ label: "Last Modified", value: "modified" });
  const SortByState = ref("desc");
  
  function toggleIcon() {
    SortByState.value = SortByState.value === "desc" ? "asc" : "desc";
    iconState.value = iconState.value === "arrow_upward" ? "arrow_downward" : "arrow_upward";
  
    emitChange();
  }
  
  function emitChange() {

    console.log( `${SortByState.value} ${SortByField.value.value} `)


    emit("change", { SortByField: SortByField.value.value, SortByState: SortByState.value });
  }


  </script>
  
  <style scoped>
  .material-icons {
    font-size: 15px;
  }
  
  /* First button: Remove left rounded corners */
  .first-button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  </style>
  
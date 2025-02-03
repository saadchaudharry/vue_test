<template>
    <div class="flex">
      <TabButtons
        :buttons="[
            { label: '20', value: '20' },
            { label: '100', value: '100' },
            { label: '500', value: '500' }
        ]"
        v-model="currentCount"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineEmits } from "vue";
  import { TabButtons } from "frappe-ui";
  
  const currentCount = ref("20"); // default is {label: '20', value: '20'}
  const emit = defineEmits(["change"]);
  
  // Emit the new value whenever currentTab changes
  watch(currentCount, (newVal) => {
    console.log(currentCount.value)
    emit("change", newVal);
  });
  </script>
  
  <style>
  /* Add any custom styles here */
  </style>
  
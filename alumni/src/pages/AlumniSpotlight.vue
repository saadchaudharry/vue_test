<template>
    <div class="max-w-3xl  mx-auto">
      <div v-if="data" v-html="data.spotlight"></div>
      <div v-else>Loading...</div>  </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import Alumni from '../data/alumni.js';
  const { fetchAboutUsData } = Alumni;
  
  const data = ref(null);
  
  onMounted(async () => {
    data.value = await fetchAboutUsData();
  });
  
  
  </script>
  
<template>
  <div class="flex h-screen overflow-y-auto">
    <navbar />
    <div class="flex-1 h-screen overflow-y-auto transition-all duration-300">
      <mainHeader />
      <div class="pt-20 max-w-3xl mx-auto px-4">

        <router-view />
     
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';

import navbar from './pages/navbar.vue';
import mainHeader from './pages/mainHeader.vue';





</script>

<style scoped>
@media (min-width: 768px) {
  .sidebar-toggle {
    display: none;
  }
}
</style>
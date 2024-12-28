<template>
  <!-- Sidebar -->
  <div id="sidebar" class="text-sm w-64   bg-white   fixed md:relative md:translate-x-0 
            transform transition-transform duration-300 z-50 h-full 
            -translate-x-full md:w-64 md:block  overflow-y-auto border" style="scrollbar-width: thin;">


    <div class="p-4 border-b flex justify-between items-center bg-magicbus_primary">
      <h1 class="text-xl font-bold text-gray-800">Frappe School</h1>
      <!-- Close button for mobile -->
      <button class="block md:hidden text-gray-800" onclick="toggleSidebar()">
        <span class="material-icons">close</span>
      </button>
    </div>


    <nav class="flex-1 p-4 ">
      
      <ul class="space-y-2 py-4" v-for="section in sections" :key="section.title" :id="section.title">
        <h2 class="text-sm text-gray-400 uppercase font-semibold mb-2 flex items-center">
          <span class="material-icons text-gray-600 mr-2">{{ section.icon }}</span>
          {{ section.title }}
        </h2>
        <li v-for="link in section.links" :key="link.name">
          <router-link :to="{ name: link.routeName }"
            class="flex pt-1 pl-8 align-middle items-center text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded">
            {{ link.name }}
          </router-link>
        </li>
      </ul>

    </nav>



    <div class="p-4 border-t">
      <button class="text-gray-600 text-sm flex items-center">
        <!-- <span class="material-icons mr-2">keyboard_arrow_left</span> -->
        <!-- Collapse -->
      </button>
    </div>


  </div>
</template>
<script setup>
import { ref } from 'vue';
const sections = ref([
  {
    title: "Home",
    icon: "home",
    links: [
      { name: "About Us", routeName: "AboutUs" },
      { name: "Alumni Spotlight", routeName: "Spotlight" }
    ]
  },
  // {
  //   title: "My Learnings",
  //   icon: "school",
  //   links: [
  //     { name: "My Learning", routeName: "AboutUs" },
  //     { name: "Available Courses", routeName: "AvailableLearning" }
  //   ]
  // },
  // {
  //   title: "Events",
  //   icon: "event",
  //   links: [
  //     { name: "Upcoming Event", routeName: "AboutUs" },
  //     { name: "Event Gallery", routeName: "AboutUs" },
  //     { name: "Video Gallery", routeName: "AboutUs" }
  //   ]
  // },
  // {
  //   title: "Get Involved",
  //   icon: "group",
  //   links: [
  //     { name: "Refer a Young Person", routeName: "AboutUs" },
  //     { name: "Alumni Led Sessions", routeName: "AboutUs" },
  //     { name: "Mentor a Young Person", routeName: "AboutUs" },
  //     { name: "Tell Us Your Story", routeName: "AboutUs" },
  //     { name: "Join as a Volunteer", routeName: "AboutUs" }
  //   ]
  // },
  // {
  //   title: "Alumni Network",
  //   icon: "people",
  //   links: [
  //     { name: "My Batchmates", routeName: "AboutUs" },
  //     { name: "Alumni in My City", routeName: "AboutUs" },
  //     { name: "Alumni Directory", routeName: "AboutUs" }
  //   ]
  // },
  {
    title: "Job Portal",
    icon: "work",
    links: [
      { name: "Apply for a Job", routeName: "AboutUs" }
    ]
  },
  {
    title: "News and Updates",
    icon: "announcement",
    links: [
      { name: "News and Updates", routeName: "AboutUs" }
    ]
  },
  {
    title: "My Profile",
    icon: "account_circle",
    links: [
      { name: "Profile", routeName: "AboutUs" },
      { name: "Update Work Experience", routeName: "AboutUs" }
    ]
  },
  {
    title: "Chat with MB Dost",
    icon: "chat",
    links: [
      { name: "Chat with MB Dost", routeName: "AboutUs" }
    ]
  }
]);
</script>

<style></style>
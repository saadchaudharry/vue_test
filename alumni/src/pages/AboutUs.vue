<template>
  <div class="max-w-3xl mx-auto">
    <!-- Show loading state for filters -->
    <div v-if="fields_loaded"> 

      <div class="inline-flex justify-end space-x-3  p-0 m-0" role="group">

      
          <Button
            :variant="'subtle'"
            :ref_for="true"
            theme="gray"
            size="sm"
            label="Button"
            :loading="false"
            :loadingText="null"
            :disabled="false"
            :link="null"
          >
            refresh
          </Button>

        <filters 
          :fields="fields_list" 
          @filters_update="applyFilters" 
        />

        <orderBy :fields="fields_list" />

        <Button
          :variant="'solid'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="Button"
          :loading="false"
          :loadingText="null"
          :disabled="false"
          :link="null"
        >
          +Add
        </Button>

        </div>  

        <br>
        <br>

          <ListView
            class="h-[150px]"
            :columns="[
              {
                label: 'Name',
                key: 'name',
                width: 3,
              },
              {
                label: 'Email',
                key: 'email',
                width: '200px',
              },
              {
                label: 'Role',
                key: 'role',
              },
              {
                label: 'Status',
                key: 'status',
              },
            ]"
            :rows="[]"

            row-key="id"

            :options="{
                selectable: true,
                showTooltip: true,
                resizeColumn: true,
                emptyState: {
                  title: 'No records found',
                  description: 'Create a new record to get started',
                  button: {
                    label: 'New Record',
                    variant: 'solid',
                    onClick: () => console.log('New Record'),
                  },
                },
              }"


          />



        <Pagination :modelValue="20" />

    </div>
    <div v-else>
      Loading filters...
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted,watch,onBeforeMount } from 'vue'
import { createResource, createListResource } from 'frappe-ui'
import { ListView } from 'frappe-ui'


import filters from '../componets/filters.vue';
import orderBy from '../componets/orderby.vue';
import Pagination from '../componets/Pagination.vue';

// Initialize with empty array
const fields_list = ref([])
const fields_loaded = ref(false)
const doctype = ref('Alumni Event')

// Fetch fields with error handling
const resource = createResource({
  url: "/api/method/get_fields",
  params: { doctype: doctype.value },
  initialData: []

})


// Fetch filterable fields on component mount
onBeforeMount(() => {
  resource.fetch()
    .then(() => {
      fields_list.value = resource.data;
      fields_loaded.value = true;
    })
    .catch((error) => {
      fields_loaded.value = true;
    });
});


const applyFilters = (newFilters) => {

  console.log(newFilters)

};
</script>
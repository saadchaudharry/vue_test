<template>
  <div class="max-w-3xl mx-auto">
    <!-- Loading state -->
    <div v-if="!fields_loaded" class="p-4 text-gray-500">
      <Spinner class="w-8" />
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Action bar -->
      <div class="flex justify-end gap-3 mb-8" role="toolbar">
        <Button variant="subtle" @click="refreshData">Refresh</Button>
        
        <filters 
          :fields="fields_list" 
          @filters_update="applyFilters" 
        />

        <orderBy 
          :fields="fields_list" 
          @change_sort_by="applySortBy" 
        />

        <Button variant="solid">+ Add</Button>
      </div>

      <!-- List view -->
        <ListView
          class="h-[350px] mb-8"
          :columns="columns_label"
          :rows="data_list?.data || []"
          row-key="name"
          :options="listViewOptions"
        />

      <!-- Pagination -->
      <Pagination 
        :modelValue="page_length"  
        @change_pagination="applyPagination"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, shallowRef } from 'vue'
import { createResource, createListResource, Spinner } from 'frappe-ui'
import { ListView } from 'frappe-ui'

// Components
import filters from '../componets/filters.vue'
import orderBy from '../componets/orderby.vue'
import Pagination from '../componets/Pagination.vue'

// Constants
const DOCTYPE = 'ToDo'
const listViewOptions = {
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
  }
}

// Reactive state
const fields_list = ref([])
const fields_loaded = ref(false)
const filters_list = ref([])
const sort_by = ref('modified desc')
const page_length = ref(20)

// shallowRef
const data_list = shallowRef(null)

// Computed properties
const columns = computed(() => [
  'name',
  ...fields_list.value
    .filter(field => field.in_list_view)
    .map(field => field.fieldname)
]);

const columns_label = computed(() => [
  { label: 'name', fieldname: 'name', key: 'name' },
  ...fields_list.value
    .filter(field => field.in_list_view)
    .map(field => ({
      label: field.label,
      fieldname: field.fieldname,
      key: field.fieldname
    }))
]);


// Data fetching for fields
const fieldsResource = createResource({
  url: "/api/method/get_fields",
  params: { doctype: DOCTYPE },
  onSuccess(data) {
    fields_list.value = data
    fields_loaded.value = true
    
    // Initialize data list after fields are loaded
    data_list.value = createListResource({
      doctype: DOCTYPE,
      fields: columns.value,
      orderBy: sort_by.value,
      pageLength: page_length.value,
      filters: filters_list.value,
      auto: false
    })
    data_list.value.fetch()
  },
  onError() {
    fields_loaded.value = true
  }
})












// Combined watcher for filters, sorting and pagination
watch(
  [filters_list, sort_by, page_length], 
  () => {
    if (!data_list.value) return
    data_list.value.update({
      filters: filters_list.value,
      orderBy: sort_by.value,
      pageLength: page_length.value
    })
    data_list.value.reload()
  }
)

// Event handlers
const applyFilters = (newFilters) => {
  filters_list.value = newFilters
}

const applySortBy = (newSortBy) => {
  sort_by.value = newSortBy
}

const applyPagination = (newPageLength) => {
  page_length.value = newPageLength
}

const refreshData = () => data_list.value?.reload()

// Initial fetch
onMounted(() => fieldsResource.fetch())
</script>
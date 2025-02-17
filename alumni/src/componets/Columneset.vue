<template>
  <Popover>
    <template #target="{ togglePopover }">
      <Button @click="togglePopover()">
        Columns
      </Button>
    </template>
    <template #body-main>
      <div class="p-2 text-ink-gray-9">
        <div class="text-sm font-medium text-gray-700 py-2">Visible Columns</div>

        <!-- Active Fields List -->
        <draggable 
          :list="list_view_colunms" 
          ghost-class="ghost" 
          item-key="fieldname"
          group="fields"
          @change="handleChange"
        >
          <template #item="{ element }">
            <div class="flex cursor-grab items-center justify-between gap-6 rounded px-2 py-1.5 text-base text-gray-800 hover:bg-gray-100">
              <div class="flex items-center gap-2">
                <span class="material-icons text-gray-600 text-sm">menu</span>
                <div>{{ element.label }}</div>
              </div>
            </div>
          </template>
        </draggable>

        <hr>
        <div class="text-sm font-medium text-gray-700 py-2">Available Columns</div>

        <!-- Available Fields List -->
        <draggable 
          :list="fields_list" 
          ghost-class="ghost" 
          item-key="fieldname"
          group="fields"
        >
          <template #item="{ element }">
            <div class="flex cursor-grab items-center justify-between gap-6 rounded px-2 py-1.5 text-base text-gray-800 hover:bg-gray-100">
              <div class="flex items-center gap-2">
                <span class="material-icons text-gray-600 text-sm">menu</span>
                <div>{{ element.label }}</div>
              </div>
            </div>
          </template>
        </draggable>

        <hr>

        <Button
          variant="ghost"
          theme="gray"
          size="sm"
          label="Reset to Default"
          class="w-full !justify-start !text-gray-600 mt-1"
          @click="console.log('DADADA')"
        />
        
      </div>
    </template>
  </Popover>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Popover } from 'frappe-ui'
import draggable from 'vuedraggable'

const emit = defineEmits(['fieldsChanged'])


const props = defineProps({
  fields: {
    type: Array,
    required: true,
  }
});

const staticField = { label: 'Name', fieldname: 'name', key: 'name','width':"11rem", };

const dialog1 = ref(false)

const list_view_colunms = ref(
  [
    staticField, 
    ...props.fields
      .filter(field => field.in_list_view && field.fieldname !== 'name')
      .map(field => ({
        label: field.label,
        fieldname: field.fieldname,
        key: field.fieldname,
        width: field.width
      }))
  ]
);

const fields_list = ref(
  props.fields
    .filter(field => field.in_list_view !== 1 && field.fieldname !== 'name')
    .map(field => ({
      label: field.label,
      fieldname: field.fieldname,
      key: field.fieldname,
      width: field.width
    }))
);




// Sync props with local refs while preserving "name"
watch(() => props.fields, (newVal) => {
  list_view_colunms.value = [
    staticField,
    ...newVal
      .filter(field => field.in_list_view && field.fieldname !== 'name')
      .map(field => ({
        label: field.label,
        fieldname: field.fieldname,
        key: field.fieldname,
        width: field.width
      }))
  ];
});

const handleChange = () => {
  emit('fieldsChanged', list_view_colunms.value);
}


</script>

<style scoped>
.material-icons {
  font-size: 14px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
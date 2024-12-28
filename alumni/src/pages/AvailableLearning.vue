<template>
  <div class="p-6">
    <Card 
      :title="'Card with Image'" 
      :subtitle="'A descriptive subtitle.'" 
      :loading="false"
    >
      <!-- Image Slot -->
      <template v-slot:image>
        <img 
          src="https://via.placeholder.com/600x400" 
          alt="Card Image" 
          class="w-full h-auto object-cover rounded-lg"
        />
      </template>

      <!-- Default Content -->
      <template v-slot:default>
        <p>This is the content inside the card. It appears below the image.</p>
      </template>

      <!-- Left Actions -->
      <template v-slot:actions-left>
        <button class="btn">Left Action</button>
      </template>

      <!-- Right Actions -->
      <template v-slot:actions>
        <button class="btn">Right Action</button>
      </template>
    </Card>
  </div>
</template>

<script>

export default {

};
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>

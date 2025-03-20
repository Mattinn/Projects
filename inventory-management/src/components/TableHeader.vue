<script setup lang="ts">
  defineProps<{ header: string }>()
</script>

<template>
  <th class="border-b border-gray-200 p-4 pt-0 pb-3 font-medium text-gray-600">
    {{ header }}
  </th>
</template>

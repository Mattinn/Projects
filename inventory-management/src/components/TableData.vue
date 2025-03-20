<script setup lang="ts">
  defineProps<{ data: number | string }>()
</script>

<template>
  <td class="border-b border-gray-100 p-4 text-gray-500">
    {{ data }}
  </td>
</template>

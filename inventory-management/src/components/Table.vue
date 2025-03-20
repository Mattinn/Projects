<script setup lang="ts">
  import type { Item } from "../types/item"
  import TableHeader from './TableHeader.vue'
  import TableData from './TableData.vue'
  import Spinner from './Spinner.vue'

  defineProps<{ loading: boolean, data: Item[] }>()
  const emit = defineEmits(['itemSelected'])
</script>

<template>
  <table class="w-full table-fixed border-collapse text-sm">
    <thead>
      <tr>
        <TableHeader header="ID"  class="pl-8"  />
        <TableHeader header="Name" />
        <TableHeader header="Quantity" />
        <TableHeader header="SKU" />
        <TableHeader header="Description" class="hidden sm:table-cell" />
        <TableHeader header="Price" class="pr-8" />
      </tr>
    </thead>
    <tbody>
      <tr v-if="loading" class="h-24">
        <td :colspan="6" class="text-center">
          <Spinner />
        </td>
      </tr>
      <tr v-else v-for="item in data" :key="item.id" class="hover:bg-gray-100 hover:cursor-pointer" @click="$emit('itemSelected', item)" >
        <TableData :data="item.id ?? ''" class="pl-8" />
        <TableData :data="item.name" />
        <TableData :data="item.quantity" />
        <TableData :data="item.sku" />
        <TableData :data="item.description" class="hidden sm:table-cell" />
        <TableData :data="`${item.price.toFixed(2)} €`" class="pr-8" />
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed, inject } from "vue"
  import { useRouter } from 'vue-router'
  import type { Item } from "../types/item"
  import { fetchItems } from "../api"
  import Table from "@/components/Table.vue"

  const items = ref<Item[]>([])
  const loading = ref(true)
  const router = useRouter()
  const notification = ref("")
  const filterText = ref("")
  const eventBus = inject<{ emit: (event: string, payload: any) => void }>('eventBus')
  const showToast = (message: string, type: 'success' | 'error') => eventBus?.emit('show-toast', { message, type })

  const loadItems = async () => {
    try {
      const data = await fetchItems()
      items.value = data
    } catch (err) {
      notification.value = (err as Error).message
      showToast(notification.value, 'error')
    } finally {
      loading.value = false
    }
  }

  const handleItemSelected = (item: Item) => {
    const { id, name } = item
    if(!id) {
      notification.value = `${name} is missing id property`
      showToast(notification.value, 'error')
      return
    }
    router.push(`/item/${id}`)
  }

  const filteredItems = computed(() => {
    if (!filterText.value) {
      return items.value
    }

    const filter = filterText.value.toLowerCase()
    return items.value.filter(item =>
      item.name.toLowerCase().includes(filter) ||
      item.sku.toLowerCase().includes(filter)
    )
  })

  const totalValue = computed(() => items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0))

  onMounted(loadItems)
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <input type="text" v-model="filterText" class="w-1/2 p-2 rounded-lg outline bg-white hover:shadow-lg focus:!shadow-lg" placeholder="Filter by name or sku.." />
      <button class="!bg-blue-500 text-white rounded-md hover:!bg-blue-600 focus:!bg-blue-600" @click="$router.push('/item/')">Add new item</button>

    </div>
    <div class="overflow-auto rounded-lg outline bg-white my-20">
      <div class="my-8 overflow-hidden">
        <Table :data="filteredItems" :loading="loading" @itemSelected="handleItemSelected" />
      </div>
    </div>

    <h2 >Estimated total value: <b>{{ totalValue.toFixed(2) }} €</b></h2>
  </div>
</template>

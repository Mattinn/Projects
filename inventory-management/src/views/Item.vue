<script setup lang="ts">
  import { ref, reactive, onMounted, inject } from "vue"
  import { useRoute } from "vue-router"
  import type { Item } from "../types/item"
  import { fetchItem, addItem, updateItem, deleteItem } from '../api'
  import router from "../router"

  const eventBus = inject<{ emit: (event: string, payload: any) => void }>('eventBus')
  const route = useRoute()
  const id = Number(route.params.id)
  const notification = ref('')
  
  
  const errors = ref<{ name?: string, quantity?: string, price?: string }>({})

  const item = reactive<Item>({
    name: '',
    quantity: 0,
    sku: '',
    description: '',
    price: 0
  })

  const showToast = (message: string, type: 'success' | 'error') => eventBus?.emit('show-toast', { message, type })

  const loadItem = async () => {
    try {
      const data = await fetchItem(id)
      item.name = data.name
      item.quantity = data.quantity
      item.sku = data.sku
      item.description = data.description
      item.price = data.price
    } catch (err) {
      notification.value = (err as Error).message
      showToast(notification.value, 'error')
    }
  }

  const handleAdd = async () => {
    try {
      console.log(item)
      const addedItem = await addItem(item)
      showToast(`${addedItem.name} added`, 'success')
      router.push('/')
    } catch (err) {
      notification.value = (err as Error).message
      handleErrors()
    }
  }

  const handleUpdate = async () => {
    try {
      const updated = await updateItem(id, item)
      showToast(`${updated.name} updated`, 'success')
      router.push('/')
    } catch (err) {
      notification.value = (err as Error).message
      handleErrors()
    }
  }

  //Util that adds a space after each comma in the notification message
  const formatNotification = (message: string) => message.replace(/,/g, ', ')

  const handleErrors = () => {
    // the notification ref will contain all the errors that occurred during the API call in a comma separated list 
    showToast(formatNotification(notification.value), 'error')
    errors.value = {}
    // Validate that the inputs are correctly populated in the UI and display the appropriate error message 
    if (!item.name) {
      errors.value.name = 'Name is required'
    }
    // Validate that the quantity and price both have non-negative numbers
    if ((!item.quantity && item.quantity !== 0) || item.quantity < 0) {
      errors.value.quantity = 'Must be a non-negative number'
    }
    if ((!item.price && item.price !== 0) || item.price < 0) {
      errors.value.price = 'Must be a non-negative number'
    }
  }

  const handleDelete = async () => {
    try {
      await deleteItem(id)
      showToast('Item deleted', 'success')
      router.push('/')
    } catch (err) {
      notification.value = (err as Error).message
      showToast(notification.value, 'error')
      
    }
  }

  onMounted(() => {
    // fetch the item if the ID is present in the URL
    if (id) {
      loadItem()
    }
  })
</script>

<template>
  <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input type="text" id="name" v-model="item.name" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
    </div>
    <div>
      <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
      <input type="number" id="quantity" v-model="item.quantity" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      <p v-if="errors.quantity" class="text-red-500 text-sm">{{ errors.quantity }}</p>
    </div>
    <div>
      <label for="sku" class="block text-sm font-medium text-gray-700">SKU</label>
      <input type="text" id="sku" v-model="item.sku" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
    </div>
    <div>
      <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
      <input type="number" id="price" v-model="item.price" step="0.01" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      <p v-if="errors.price" class="text-red-500 text-sm">{{ errors.price }}</p>
    </div>
    <div class="md:col-span-2">
      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
      <textarea id="description" v-model="item.description" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
    </div>
    <div v-if="id" class="md:col-span-2 flex justify-around">
      <button class="mt-4 px-4 py-2 !bg-blue-500 text-white rounded-md hover:!bg-blue-600 focus:!bg-blue-600" @click.prevent="$router.push('/')">Back</button>
      <button class="mt-4 px-4 py-2 !bg-red-500 text-white rounded-md hover:!bg-red-600 focus:!bg-red-600" @click.prevent="handleDelete">Delete</button>
      <button type="submit" class="mt-4 px-4 py-2 !bg-green-500 text-white rounded-md hover:!bg-green-600 focus:!bg-green-600" @click.prevent="handleUpdate">Update</button>
    </div>
    <div v-else class="md:col-span-2 flex justify-around">
      <button class="mt-4 px-4 py-2 !bg-blue-500 text-white rounded-md hover:!bg-blue-600 focus:!bg-blue-600" @click.prevent="$router.push('/')">Back</button>
      <button type="submit" class="mt-4 px-4 py-2 !bg-green-500 text-white rounded-md hover:!bg-green-600" @click.prevent="handleAdd">Add</button>
    </div>
  </form>
</template>

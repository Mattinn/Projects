number<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import eventBus from '../eventBus'

  const message = ref('')
  const type = ref<'success' | 'error'>('success')
  const showToast = ref(false)

  const dismissToast = () => {
    showToast.value = false
  }

  onMounted(() => {
    eventBus.on('show-toast', (payload: { message: string, type: 'success' | 'error' }) => {
      message.value = payload.message
      type.value = payload.type
      showToast.value = true
    })
  })

  //Fade toasts out after 5 sec if not dismissed
  watch(showToast, (newValue) => {
    if (newValue) {
      setTimeout(() => {
        dismissToast()
      }, 5000)
    }
  })
</script>

<template>
  <transition name="fade">
    <div v-if="showToast" class="fixed border-2 font-bold top-4 mt-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-2 rounded-lg shadow-lg flex items-center"
         :class="type === 'success' ? 'bg-green-500 border-green-800' : 'bg-red-500 border-red-800'">
      <span class="flex-grow"><p>{{ message }}</p></span>
      <button @click="dismissToast" class="ml-4 text-black hover:text-gray-400">X</button>
    </div>
  </transition>
</template>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
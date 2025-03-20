<template>
  <div class="flex justify-center items-center h-full">
    <img src="@/assets/holvi.png" alt="Fetching..." class="w-12 h-12 animate-spin"  />
  </div>
</template>

<style scoped>
  @keyframes spin {
    0% {
      transform: rotate(0deg)
    }

    100% {
      transform: rotate(360deg)
    }
  }
</style>
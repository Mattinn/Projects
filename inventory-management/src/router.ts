import { createRouter, createWebHistory } from 'vue-router'
import Inventory from './views/Inventory.vue'
import Item from './views/Item.vue'

const routes = [
  {
    path: '/',
    name: 'Inventory',
    component: Inventory
  },
  {
    path: '/item/',
    name: 'AddItem',
    component: Item
  },
  {
    path: '/item/:id',
    name: 'UpdateItem',
    component: Item
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
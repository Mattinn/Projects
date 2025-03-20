import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Toast from '@/components/Toast.vue'
import eventBus from './eventBus'
import router from './router'

const app = createApp(App).use(router)
app.provide('eventBus', eventBus)
app.mount('#app')

const toastApp = createApp(Toast)
toastApp.provide('eventBus', eventBus)
toastApp.mount('#toast')

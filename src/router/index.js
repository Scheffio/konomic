import { createRouter, createWebHistory } from 'vue-router'
import SettingsView from '../views/SettingsView.vue'
import OrderBook from '../views/OrderBook.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/order_book',
      name: 'order_book',
      component: OrderBook
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/order_book',
      name: 'order_book',
      component: () => import('../views/OrderBook.vue')
    }
  ]
})

export default router

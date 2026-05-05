import { createRouter, createWebHistory } from 'vue-router'
import GameIndexView from '../views/GameIndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GameIndexView,
    },
    {
      path: '/gameindex',
      name: 'gameindex',
      component: () => import('../views/GameIndexView.vue'),
    },
    {
      path: '/managegames',
      name: 'managegames',
      component: () => import('../views/ManageGames.vue')
    }
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/quiniela',
    name: 'Quiniela',
    component: () => import('../views/Quiniela.vue')
  },
  {
    path: '/mis-pronosticos',
    name: 'MyPredictions',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/tabla-general',
    name: 'Leaderboard',
    component: () => import('../views/Leaderboard.vue')
  },
  {
    path: '/reglas',
    name: 'Rules',
    component: () => import('../views/Rules.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router

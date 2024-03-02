import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Manage from '@/views/Manage.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/manage',
    component: Manage
  }
]

// the createWebHistory function uses the History Api of the browser under the hood
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), //this enables history
  routes
})

export default router

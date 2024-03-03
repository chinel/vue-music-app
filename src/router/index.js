import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Manage from '@/views/Manage.vue'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/about',
    component: About,
    name: 'about'
  },
  {
    path: '/manage-music',
    // alias: '/manage',
    component: Manage,
    name: 'manage'
  },
  {
    path: '/manage',
    redirect: {
      name: 'manage'
    }
  },
  {
    path: '/:catchAll(.*)*',
    redirect: {
      name: 'home'
    }
  }
]

// the createWebHistory function uses the History Api of the browser under the hood
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), //this enables history
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

export default router

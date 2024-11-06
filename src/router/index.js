import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '@/stores/user'

const Home = () => import('@/views/Home.vue')
const About = () => import('@/views/About.vue')
const Manage = () => import('@/views/Manage.vue')
const Song = () => import('@/views/Song.vue')

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
    name: 'song',
    path: '/song/:id',
    component: Song
  },
  {
    path: '/manage-music',
    // alias: '/manage',
    component: Manage,
    name: 'manage',
    beforeEnter: (to, from, next) => {
      //console.log('Manage Auth Guard Record..')
      next()
    },
    meta: {
      requiresAuth: true // this will be used to determine if a route requires authentication
    }
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

router.beforeEach((to, from, next) => {
  //  console.log('Global Guard')
  //console.log(to)

  //console.log(to.meta)
  if (!to.meta.requiresAuth) {
    next()
    return
  }
  const store = useUserStore()

  if (store.userLoggedIn) {
    next()
  } else {
    next({
      name: 'home'
    })
  }
})

export default router

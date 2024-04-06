import './assets/base.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { registerSw } from 'virtual:pwa-register'

import App from './App.vue'
import router from './router'
import VeeValidatePlugin from './includes/validation'
import { auth } from './includes/firebase'
import i18n from './includes/i18n'
import Icon from './directives/icons'
import GlobalComponents from './includes/_globals'
import progressBar from './includes/progress-bar'
import 'nprogress/nprogress.css'

// registerSw({ immediate: true })

progressBar(router) // here we will pass the router object to have access to its properties in the file

let app

auth.onAuthStateChanged(() => {
  //check if app is undefined and only initialize the app if undefined
  if (!app) {
    app = createApp(App)
    app.directive('icon', Icon)
    app.use(createPinia())
    app.use(router)
    app.use(i18n)
    app.use(VeeValidatePlugin, { foo: 'hello' })
    app.use(GlobalComponents)
    app.mount('#app')
  }
})

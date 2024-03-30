import './assets/base.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VeeValidatePlugin from './includes/validation'
import { auth } from './includes/firebase'

import Icon from './directives/icons'

let app

auth.onAuthStateChanged(() => {
  //check if app is undefined and only initialize the app if undefined
  if (!app) {
    app = createApp(App)
    app.directive('icon', Icon)
    app.use(createPinia())
    app.use(router)
    app.use(VeeValidatePlugin, { foo: 'hello' })

    app.mount('#app')
  }
})

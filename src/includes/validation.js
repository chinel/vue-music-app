import { Form as VeeForm, Field as VeeField } from 'vee-validate'
export default {
  install(app, options) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
  }
}

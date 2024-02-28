<template>
  <div
    class="text-white font-bold text-center p-4 rounded mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_msg }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
        name="email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
        name="password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="login_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      tab: 'login',

      loginSchema: {
        email: 'required|email',
        password: 'required'
      },

      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_msg: 'Please wait!, we are logging you in.'
    }
  },
  methods: {
    login(values) {
      this.login_in_submission = true
      this.login_show_alert = true

      setTimeout(() => {
        console.log(values)
        this.login_alert_variant = 'bg-green-500'
        this.login_alert_msg = 'Success! You are now logged in.'
      }, 6000)
    }
  }
}
</script>
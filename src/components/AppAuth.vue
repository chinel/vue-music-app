<template>
  <!-- Auth Modal -->
  <div class="fixed z-50 inset-0 overflow-y-auto" id="modal" :class="hiddenClass">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">{{ $t('auth.header') }}</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click="modalVisibility = false">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                @click="tab = 'login'"
                class="block rounded py-3 px-4 transition"
                href="#"
                :class="{
                  ' hover:text-white text-white bg-blue-600': tab === 'login',
                  'hover:text-blue-600': tab === 'register'
                }"
                >{{ $t('auth.loginTab') }}</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                @click="tab = 'register'"
                class="block rounded py-3 px-4 transition"
                href="#"
                :class="{
                  ' hover:text-white text-white bg-blue-600': tab === 'register',
                  'hover:text-blue-600': tab === 'login'
                }"
                >{{ $t('auth.registerTab') }}</a
              >
            </li>
          </ul>

          <!-- Login Form -->
          <app-login-form v-if="tab === 'login'"></app-login-form>
          <!-- Registration Form -->
          <app-register-form v-else></app-register-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppLoginForm from '@/components/LoginForm.vue'
import AppRegisterForm from '@/components/RegisterForm.vue'
import useModalStore from '@/stores/modal'
import { mapState, mapWritableState } from 'pinia'
export default {
  name: 'AppAuth',
  components: {
    AppLoginForm,
    AppRegisterForm
  },
  data() {
    return {
      tab: 'login'
    }
  },
  computed: {
    ...mapState(useModalStore, ['hiddenClass']),
    ...mapWritableState(useModalStore, {
      modalVisibility: 'isOpen'
    })
  }
}
</script>

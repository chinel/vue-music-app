<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-between items-center py-5 px-4">
      <!-- App Name -->
      <div>
        <router-link
          class="text-white font-bold uppercase text-2xl mr-4"
          :to="{ name: 'home' }"
          exact-active-class="no-active"
          >Music</router-link
        >
      </div>
      <div class="flex items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'about' }">About</router-link>
          </li>
          <!-- Navigation Links -->
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">Manage</router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores, mapState, mapWritableState } from 'pinia'
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'

export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useModalStore, useUserStore),
    ...mapWritableState(useModalStore, ['isOpen'])
  },
  methods: {
    toggleAuthModal() {
      this.isOpen = !this.isOpen
      //console.log(this.isOpen)
    },
    signOut() {
      this.userStore.signout() //using the mapstores approach
      if (this.$route.meta.requiresAuth) {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>

import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async register(values) {
      //this returns methods and properties we will use to communicate with the authentication service
      const userCredentials = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      )
      await usersCollection.doc(userCredentials.user.uid).set({
        userId: userCredentials.user.uid,
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country
      })

      await userCredentials.user.updateProfile({
        displayName: values.name
      })
      this.userLoggedIn = true
    },
    async authenticate(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password)
      this.userLoggedIn = true
    },
    async signout() {
      await auth.signOut()
      this.userLoggedIn = false
    }
  }
})

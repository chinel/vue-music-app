import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage' // we need to import all service we want to use

const firebaseConfig = {
  apiKey: 'AIzaSyDNZWvcCUph7snr9pEicOTWtDci8EMHChw',
  authDomain: 'vue-music-app-65268.firebaseapp.com',
  projectId: 'vue-music-app-65268',
  storageBucket: 'vue-music-app-65268.appspot.com',
  messagingSenderId: '533131990859', // this is for push notification
  appId: '1:533131990859:web:0e4af13fad3cb7df253ace',
  measurementId: 'G-KW5WRKKPT4'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth() // This will be reusable reference so that we don't call this multiple times in our app

const db = firebase.firestore()

const usersCollection = db.collection('users')

export { auth, db, usersCollection }

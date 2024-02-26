import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDNZWvcCUph7snr9pEicOTWtDci8EMHChw',
  authDomain: 'vue-music-app-65268.firebaseapp.com',
  projectId: 'vue-music-app-65268',
  storageBucket: 'vue-music-app-65268.appspot.com',
  messagingSenderId: '533131990859', // this is for push notification
  appId: '1:533131990859:web:0e4af13fad3cb7df253ace',
  measurementId: 'G-KW5WRKKPT4'
}

export default firebase.initializeApp(firebaseConfig)

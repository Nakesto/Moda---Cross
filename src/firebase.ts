// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAuth } from "firebase/auth";
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAvK2Alv-P8ygKmBP2GZ2Ytt9o9NeApsLM',
  authDomain: 'moda-65a6b.firebaseapp.com',
  databaseURL:
    'https://moda-65a6b-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'moda-65a6b',
  storageBucket: 'moda-65a6b.appspot.com',
  messagingSenderId: '463174871608',
  appId: '1:463174871608:web:f4a1f449387d4dafe4d4cd',
  measurementId: 'G-Y4TYJF478N',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
export const providerGoogle = new GoogleAuthProvider()
export const providerFacebook = new FacebookAuthProvider()

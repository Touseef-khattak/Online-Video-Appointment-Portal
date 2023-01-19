import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// FIREBASE SETUP
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyA1b289JTRMfr5WuOprj57nj6OfdCKzeR4",
  authDomain: "wowpk-internal.firebaseapp.com",
  databaseURL: "https://wowpk-internal.firebaseio.com",
  projectId: "wowpk-internal",
  storageBucket: "wowpk-internal.appspot.com",
  messagingSenderId: "561628268386",
  appId: "1:561628268386:web:34a208e8cf98434d90ce3b",
  measurementId: "G-Z6QT28PZ4H"
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(registration => {
        console.log('Firebase messaging service worker registered: ', registration);
      }).catch(err => {
    console.log('Firebase messaging service worker registration failed: ', err);
  });
}
initializeApp(firebaseConfig);


const Pinia = createPinia()
Pinia.use(piniaPluginPersistedstate)

createApp(App).use(Pinia).use(router).mount('#app')

import firebase from 'firebase/compat/app'
import 'firebase/compat/messaging'
import "firebase/messaging/sw";

var firebaseConfig = {
    apiKey: "AIzaSyA1b289JTRMfr5WuOprj57nj6OfdCKzeR4",
    authDomain: "wowpk-internal.firebaseapp.com",
    databaseURL: "https://wowpk-internal.firebaseio.com",
    projectId: "wowpk-internal",
    storageBucket: "wowpk-internal.appspot.com",
    messagingSenderId: "561628268386",
    appId: "1:561628268386:web:34a208e8cf98434d90ce3b",
    measurementId: "G-Z6QT28PZ4H"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const messaging = firebaseApp.messaging();

export default messaging

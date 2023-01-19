self.importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
self.importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
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

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.message,
        icon:'favicon.ico',
        data: { url:payload.data.onClick }, //the url which we gonna use later
    };
    console.log('Message received Back Ground. ', payload);
    return self.registration.showNotification(notificationTitle,notificationOptions);
});
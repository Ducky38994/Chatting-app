importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBK4pJpKtFPs19-J051xR6t77SBHYrg1k8",
    authDomain: "subpls-2c774.firebaseapp.com",
    projectId: "subpls-2c774",
    messagingSenderId: "834082653588",
    appId: "1:834082653588:web:a7b266363aa864249f3b81"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon
    });
});

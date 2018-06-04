// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
// importScripts('/__/firebase/3.9.0/firebase-app.js');
// importScripts('/__/firebase/3.9.0/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

importScripts('https://www.gstatic.com/firebasejs/4.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.2/firebase-messaging.js');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAf_oJi6fgm6-ZrVPeOVdW2DDoeu3v5SxY",
    authDomain: "leadershipplatform-158316.firebaseapp.com",
    databaseURL: "https://leadershipplatform-158316.firebaseio.com",
    projectId: "leadershipplatform-158316",
    storageBucket: "leadershipplatform-158316.appspot.com",
    messagingSenderId: "438289288307"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/images/manifest/icon-48x48.png',
      sound: 'default',
      badge: '1',
      click_action: "https://leadershipplatform-158316.firebaseapp.com/daily-thoughts"
    };
  
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
  });
  // [END background_handler]
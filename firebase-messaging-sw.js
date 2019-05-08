
importScripts('https://www.gstatic.com/firebasejs/4.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.2/firebase-messaging.js');

// Initialize Firebase
// Public App
var config = {
  apiKey: "AIzaSyAf_oJi6fgm6-ZrVPeOVdW2DDoeu3v5SxY",
  authDomain: "leadershipplatform-158316.firebaseapp.com",
  databaseURL: "https://leadershipplatform-158316.firebaseio.com",
  projectId: "leadershipplatform-158316",
  storageBucket: "leadershipplatform-158316.appspot.com",
  messagingSenderId: "438289288307"
};

// Test App
// var config = {
//     apiKey: "AIzaSyBJH4pbQEzEpxtEomcnYjlUfsiFC5nqHoQ",
//     authDomain: "glp-test.firebaseapp.com",
//     databaseURL: "https://glp-test.firebaseio.com",
//     projectId: "glp-test",
//     storageBucket: "glp-test.appspot.com",
//     messagingSenderId: "805735980290"
// };

firebase.initializeApp(config);

const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/images/manifest/icon-48x48.png',
    sound: 'default',
    badge: '1'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
  // [END background_handler]
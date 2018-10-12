/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* Sign In and Main Content */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '../../../@polymer/polymer/polymer-element.js';

import '../../../polymerfire/firebase-app.js';
import '../../../polymerfire/firebase-auth.js';
import './my-app.js';
import './sign-in.js';
import { setPassiveTouchGestures } from '../../../@polymer/polymer/lib/utils/settings.js';
import { Polymer } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
import { importHref } from '../../../@polymer/polymer/lib/utils/import-href.js';
var _platform;
var nav = window.navigator;
var _ua = window.navigator.userAgent;

var plat = function() {
    var plat = '';

    if((/iphone|ipod|ipad/i).test(_ua) && (nav.platform.match(/iPhone|iPod|iPad/i))) plat = 'iOS';
    if((/macintosh/i).test(_ua) && (nav.platform.match(/MacIntel/i))) plat = 'MacOS';
    if((/android/i).test(_ua) && (nav.platform.match(/Linux/i))) plat = 'Android';
    if((/windows nt/i).test(_ua) && (nav.platform.match(/Win32/i))) plat = 'Windows';
    if((/windows nt/i).test(_ua) && (nav.platform.match(/Win64/i))) plat = 'Windows';
    if((/windows phone/i).test(_ua)) plat = 'WindowsPhone';

    if(nav.platform.match(/Win32/i)) plat = 'Windows';
    else if(nav.platform.match(/Win64/i)) plat = 'Windows';
    else if(nav.platform.match(/MacIntel/i)) plat = 'MacOS';
    else if(nav.platform.match(/iPhone|iPod|iPad/i)) plat = 'iOS';
    else if(nav.platform.match(/blackberry/i)) plat = 'BlackBerry';

    return plat;
};

_platform = plat();
localStorage.setItem("platform", _platform);

setPassiveTouchGestures(true);
/**
 * @customElement
 * @polymer
 */
Polymer({
  _template: html`
    <!-- Public App -->
    <!-- <firebase-app
        auth-domain="leadershipplatform-158316.firebaseapp.com"
        database-url="https://leadershipplatform-158316.firebaseio.com"
        api-key="AIzaSyAf_oJi6fgm6-ZrVPeOVdW2DDoeu3v5SxY"
        storage-bucket="leadershipplatform-158316.appspot.com"
        messaging-sender-id="438289288307">  -->

    <!-- Corporate App -->
    <!-- <firebase-app
        auth-domain="glp-corporate.firebaseapp.com"
        database-url="https://glp-corporate.firebaseio.com"
        api-key="AIzaSyCnpQlwku48ga6bR7Y3Sl94H-fazbzCgus"
        storage-bucket="glp-corporate.appspot.com"
        messaging-sender-id="127713036395">
    </firebase-app> -->
    
    <!-- Test App -->    
    <firebase-app auth-domain="glp-test.firebaseapp.com" database-url="https://glp-test.firebaseio.com" api-key="AIzaSyBJH4pbQEzEpxtEomcnYjlUfsiFC5nqHoQ" storage-bucket="glp-test.appspot.com" messaging-sender-id="805735980290">
    </firebase-app>

    <style>
      :host {display: block;background-color: #f6f6f6;}

        /* ============ Snack Bar ======================== */
        #snackbar {
            visibility: hidden;
            min-width: 250px;
            margin-left: -120px;
            background-color: var(--paper-green-400);
            color: #fff;
            text-align: center;
            border-radius: 2px;
            padding: 10px;
            position: fixed;
            z-index: 1;
            left: 40%;
            bottom: 30px;
            font-size: 14px;
            white-space: pre-wrap;
            display: flex;
        }
        #snackbar.show {
            visibility: visible;
            -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
            animation: fadein 0.5s, fadeout 0.5s 2.5s;
        }
        /* .snacklogo {
            background-image: url('../../images/manifest/icon-48x48.png');
            background-repeat: no-repeat;
            background-size: contain;
            display: block;
            height: 48px;
            width: 48px;
        } */
        .snackmsg{
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            text-align: left;
        }
        @-webkit-keyframes fadein {
            from {bottom: 0; opacity: 0;} 
            to {bottom: 30px; opacity: 1;}
        }

        @keyframes fadein {
            from {bottom: 0; opacity: 0;}
            to {bottom: 30px; opacity: 1;}
        }
        @-webkit-keyframes fadeout {
            from {bottom: 30px; opacity: 1;} 
            to {bottom: 0; opacity: 0;}
        }
        @keyframes fadeout {
            from {bottom: 30px; opacity: 1;}
            to {bottom: 0; opacity: 0;}
        }
    </style>
    <app-location route="{{route}}" use-hash-as-path=""></app-location>
    <app-route route="{{route}}" pattern="/lead/:follow_id/:nextpage" data="{{routeData}}" tail="{{subroute}}">
   </app-route>
    
        <template id="mainTemplate" is="dom-if" if="{{signedIn}}">
            <firebase-query app-name="[main]" id="qryuser" path="/users" order-by-child="uid" equal-to="{{user.uid}}" data="{{userdata}}">
            </firebase-query>

            <!-- <template is="dom-if" if="[[isEqual(user.uid,_user.uid)]]"> -->
            <my-app notcompanyadmin="{{notcompanyadmin}}" approvethoughts="[[approveThoughts]]" addthoughts="[[addThoughts]]" addarticle="[[addArticle]]" hidecompany="[[hidecompany]]" mythoughts="[[myThoughts]]" _user="[[_user]]" _companyid="[[_user.companyID]]" hidemenu="[[hidemenu]]" hidesubmenu="[[hidesubmenu]]" _publicid="[[_publicid]]"></my-app>
            <!-- </template> -->

            <!-- <template is="dom-if" if="[[!isEqual(user.uid,_user.uid)]]">
                <sign-in></sign-in>
            </template> -->
            
        </template>
        <template is="dom-if" if="[[!signedIn]]">
            <sign-in></sign-in>
        </template>
        
    <div id="snackbar">
        <!-- <div id="snacklogo" class="snacklogo">
        </div> -->
        <div class="snackmsg">
            <div id="snacktitle" class="snacktitle"></div>
            <div id="snackbody" class="snackbody"></div>
        </div>
    </div>

    <firebase-auth id="auth" user="{{user}}" provider="google" status-known="{{statusKnown}}" on-error="handleError" signed-in="{{userSignedIn}}">
    </firebase-auth>
`,

  is: 'ldp-app',

  properties: { 
     user: {
         type: Object
     },
     _selected: {
          type: Number,
          value: 0,
          notify: true
      },
      uid: String,
     addThoughts: {
         type: Boolean
     },
     hidemenu: {
         type: Boolean,
         value: true,
         notify: true
     },
     hidesubmenu: {
         type: Boolean,
         value: true,
         notify: true
     },
     approveThoughts: {
         type: Boolean
     },
     notcompanyadmin: {
         type: Boolean,
         value: true,
         notify: true
     },
     addArticle: {
         type: Boolean
     },
     myThoughts: {
         type: Boolean,
         value: false
     },
     hidecompany: {
         type: Boolean,
         value: true,
         notify: true
     },
     statusKnown: {
         type: Object
     },
     userdata: {
          type: Object,
          notify: true,
          observer: '_onUserDataReceived'
      },
     _user: {
         type: Object,
         notify: true
     },
     _companyID: String,
     signedIn: {
         type: Boolean,
         notify: true,
     },
     userSignedIn: {
         type: Boolean,
         observer: 'userLoggedIn'
     },
     routeData: {
      type: String,
      observer: "_onrouteData"
    },
  },

  ready: function(){
      var that = this;
      
      // public app id
      // var appID = "AIzaSyAf_oJi6fgm6-ZrVPeOVdW2DDoeu3v5SxY";
      
      // Test app id
      var appID = "AIzaSyBJH4pbQEzEpxtEomcnYjlUfsiFC5nqHoQ";

      // Corporate app id
      // var appID = "AIzaSyCnpQlwku48ga6bR7Y3Sl94H-fazbzCgus"
      
      var logged = localStorage.getItem("firebase:authUser:"+appID+":[DEFAULT]");

      // set messaging
      const messaging = firebase.messaging();
      
      if(logged) {
          this.signedIn = true;
          // Get a reference to the database service
          var database = firebase.database();

          // Request for Permission
          this.requestPermission();

          // [START refresh_token]
          // Callback fired if Instance ID token is updated.
          messaging.onTokenRefresh(function() {
              messaging.getToken()
              .then(function(refreshedToken) {
                  return messaging.getToken();
              })
              .then(function(currentToken) {
                  if (currentToken) {
                      if((/android|windows|windowsphone/i).test(_platform)){
                          setTokenSentToServer(false);
                          setTokenToLocalStorage(currentToken);
                          sendTokenToServer();
                      }
                      
                  }
              })
              .catch(function(err) {
                  console.log('Unable to retrieve refreshed token ', err);
              });

              // [END request_permission]
              function setTokenToLocalStorage(currentToken) {
                  var previousToken = window.localStorage.getItem('currentToken');

                  if(previousToken == undefined || previousToken == "undefined" || previousToken == null || previousToken == "null") previousToken = "";

                  if (currentToken) {
                      var data = {
                          "uid": that.user.uid,
                          "previousToken": previousToken,
                          "currentToken":currentToken
                      }
                      
                      database.ref('/data-modelling/userWriteable/tokenRefresh/'+that.user.uid).set(data);
                  }
                  
                  window.localStorage.setItem('currentToken', currentToken);
              }
              function sendTokenToServer() {
                  if (!isTokenSentToServer()) {

                      // Update user fcmToken
                      // var updates = {};
                      // updates['/users/' + this._user.userID+'/fcmToken'] = localStorage.getItem('currentToken');
                      // setTokenSentToServer(true);
                  } 
              }
              function isTokenSentToServer() {
                  return window.localStorage.getItem('sentToServer') == 1;
              }
              function setTokenSentToServer(sent) {
                  window.localStorage.setItem('sentToServer', sent ? 1 : 0);
              }
              
          });
          // [END refresh_token]
      }
      else this.signedIn = false;

      setTimeout(function(){if(that.signedIn === false) that.loadPage('sign-in') }, 1000);

      // [START receive_message]
      // Handle incoming messages. Called when:
      // - a message is received while the app has focus
      // - the user clicks on an app notification created by a sevice worker
      //   `messaging.setBackgroundMessageHandler` handler.
      var msg = messaging.onMessage(function(payload) {
          
          showSnackBar(payload.notification);
          
          // [START_EXCLUDE]
          // Update the UI to include the received message.

          // this.appendMessage(payload);
          // [END_EXCLUDE]
      });

      var x = dom(this.root).querySelector('#snackbar');
      var snacktitle = dom(this.root).querySelector('#snacktitle');
      var snackbody = dom(this.root).querySelector('#snackbody');

      function showSnackBar(msg){
          // var x = this.$.snackbar;

          snacktitle.innerHTML = msg.title;
          snackbody.innerHTML = msg.body;
          x.className = "show";
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 10000);
      }
      // [END receive_message]

      
  },

  requestPermission: function() {
      // set messaging
      const messaging = firebase.messaging();

      // [START request_permission]
      messaging.requestPermission()
      .then(function() {
          return messaging.getToken();
      })
      .then(function(currentToken) {
          if (currentToken) {
              setTokenToLocalStorage(currentToken);
          } 
      })
      .catch(function(err) {
          // console.log('Unable to get permission to notify.', err);
      });
      // [END request_permission]
      function setTokenToLocalStorage(currentToken) {
          window.localStorage.setItem('currentToken', currentToken);
      }
  },

  // Send the Instance ID token your application server, so that it can:
  // - send messages back to this app
  // - subscribe/unsubscribe the token from topics
  sendTokenToServer: function() {
      // Get a reference to the database service
      var database = firebase.database();

      if (!this.isTokenSentToServer()) {
          console.log("Token not sent to server.");
          // Update user fcmToken
          // var updates = {};
          // updates['/users/' + this._user.userID+'/fcmToken'] = localStorage.getItem('currentToken');
          // database.ref().update(updates);

          // this.setTokenSentToServer(true);
      } 
  },

  isTokenSentToServer: function() {
      return window.localStorage.getItem('sentToServer') == 1;
  },

  setTokenSentToServer: function(sent) {
      window.localStorage.setItem('sentToServer', sent ? 1 : 0);
  },

  userLoggedIn: function(){
      if(this.userSignedIn === true) {
          this.signedIn = true;
          var database = firebase.database();
          var userRef = database.ref('users').orderByChild("uid").equalTo(this.user.uid);
          
          var that = this;
          // set messaging
          const messaging = firebase.messaging();

          messaging.getToken()
          .then(function(refreshedToken) {
              return messaging.getToken();
          })
          .then(function(currentToken) {
              if((/android|windows|windowsphone/i).test(_platform)){
                  var previousToken = window.localStorage.getItem('currentToken');
                  if(previousToken == undefined || previousToken == "undefined" || previousToken == null || previousToken == "null") previousToken = "";

                  if (currentToken) {
                      var data = {
                          "uid": that.user.uid,
                          "previousToken": previousToken,
                          "currentToken":currentToken
                      }
                      
                      database.ref('/data-modelling/userWriteable/tokenRefresh/'+that.user.uid).set(data);
                  }
              }
              
          })
          .catch(function(err) {
              console.log('Unable to retrieve refreshed token ', err);
          });

          userRef.on('child_added', function(snapshot, prevChildKey) {
              var newUser = snapshot.val();
              that._user = newUser;
              that._companyID = that._user.companyID;
              that._publicid = "-LEiZPT-C2PyLu_YLKNU";

              that.approveThoughts = false;

              // set user name and logo
              localStorage.setItem("fullName", that._user.firstName+' '+that._user.lastName);
              
              if(that._user.photoURL != undefined || that._user.photoURL) {
                  localStorage.setItem("userLogo", that._user.photoURL);
              }else{
                  localStorage.setItem("userLogo", "../images/default-user.png");
              }

              if((that._user.userType == 4) || (that._user.userType == 5) || (that._user.userType == 6) || (that._user.userType == 7) || (that._user.userType == 9) || (that._user.userType == 3) || (that._user.userType == 8)){
                  that.hidemenu = false;

                  if((that._user.userType === 5) || (that._user.userType === 3) || (that._user.userType === 8)) that.hidesubmenu = true; 
                  else that.hidesubmenu = false;                
              }
              else{
                  that.hidemenu = true;  
                  that.hidesubmenu = true;
              }

              if(that._user.userType === 7) that.notcompanyadmin = false; 
              else that.notcompanyadmin = true;
          });

          this.$.mainTemplate.render();
      };
  },

  _onrouteData: function(newData, oldData){
      if(newData != undefined){
          if(newData.follow_id != undefined){
              localStorage.setItem("follow_id", ""+newData.follow_id);

              // public appID
              // var appID = "AIzaSyAf_oJi6fgm6-ZrVPeOVdW2DDoeu3v5SxY";

              // Test app id
              var appID = "AIzaSyBJH4pbQEzEpxtEomcnYjlUfsiFC5nqHoQ";

              // Corporate app id
              // var appID = "AIzaSyCnpQlwku48ga6bR7Y3Sl94H-fazbzCgus"
              var logged = localStorage.getItem("firebase:authUser:"+appID+":[DEFAULT]");
              
              if(logged) {
                  window.location = "./company-thoughts";
              }
          }
      }
  },

  loadPage: function(page){
      var resolvedPageUrl = this.resolveUrl(page + '.html');
      importHref(
          resolvedPageUrl,
          null,
          'sign-in.html',
          true);
  },

  _onUserDataReceived: function(newData, oldData){
      var newCount = 0;
      
      if(newData != undefined){
          newCount = newData.length;
          if(newCount == 0){
              this.loadPage('sign-in');
              return;
          }
      }
    for (var item in newData) {
      if(newData[item] != undefined){
          this._user = newData[item];
          
          this._companyID = this._user.companyID;
          this._publicid = "-LEiZPT-C2PyLu_YLKNU";

          this.approveThoughts = false;

          // set user name and logo
          localStorage.setItem("fullName", this._user.firstName+' '+this._user.lastName);
          
          if(this._user.photoURL != undefined || this._user.photoURL) {
              localStorage.setItem("userLogo", this._user.photoURL);
          }else{
              localStorage.setItem("userLogo", "../images/default-user.png");
          }

          // rights for standard user
          // if(this._user.userType == 8){
          //     this.hidemenu = true;
          //     this.hidesubmenu = true;
          // }
          // else 
          if((this._user.userType == 4) || (this._user.userType == 5) || (this._user.userType == 6) || (this._user.userType == 7) || (this._user.userType == 9) || (this._user.userType == 3) || (this._user.userType == 8)){
              this.hidemenu = false;

              if((this._user.userType === 5) || (this._user.userType === 3) || (this._user.userType === 8)) this.hidesubmenu = true; 
              else this.hidesubmenu = false;                
          }
          else{
              this.hidemenu = true;  
              this.hidesubmenu = true;
          }

          if(this._user.userType === 7) this.notcompanyadmin = false; 
          else this.notcompanyadmin = true;
      }
      
    }
  },

  isEqual: function(a, b) {
      var c = a === b;

      if(c === false){
          // this.showSnackBar("Please Sign Up before loggin in.");
      }
      return c;
  },

  showSnackBar: function(msg){
      var x = this.$.snackbar;
      x.innerHTML = msg;
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
});

/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* iron elements */
/* Paper items */
/* Firebase Auth */
/* Firebase Query */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { Element } from '../../../@polymer/polymer/polymer-element.js';

import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../paper-search/paper-search-bar.js';
import '../../../@polymer/paper-dialog/paper-dialog.js';
import '../../../@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '../../../@polymer/paper-toggle-button/paper-toggle-button.js';
import '../../../@polymer/paper-radio-group/paper-radio-group.js';
import '../../../@polymer/paper-radio-button/paper-radio-button.js';
import '../../../@polymer/iron-collapse/iron-collapse.js';
import '../../../@polymer/paper-styles/shadow.js';
import '../../../@polymer/iron-image/iron-image.js';
import '../../../@polymer/iron-pages/iron-pages.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../gold-password-input/gold-password-input.js';
import '../../../@polymer/paper-input/paper-textarea.js';
import '../../../polymerfire/firebase-app.js';
import '../../../polymerfire/firebase-auth.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-database-behavior.js';
import './app-icons.js';
import './shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
class UserProfile extends Element {
  static get template() {
    return html`
    <style include="w3-styles"></style>
    <style include="shared-styles">

      paper-button.indigo {
        background-color: var(--paper-indigo-500);
        color: white;
        padding-top: 10px;
        margin: 0 auto;
        min-width: 96px;
        font-family: 'Roboto', 'Noto', sans-serif;
        font-weight: normal;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
      }
      paper-icon-button{
        margin: auto;
      }
      .buttons{
        margin: 10px;
        display: inline-block;
      }
      .user{
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
      }
      .user > .user-details{
        flex-grow: 8;
      }
      .user-details > h3{
        margin: 6px 0;
        color: black
      }
      .user-details > paper-input{
        padding: 0;
      }
      .user > .user-avatar{
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
        flex-grow: 2;
        /* margin-right: 30px; */
      }
      .user-avatar-current {
        background-image: url('../images/profile/default-user.png');
        background-repeat: no-repeat;
        background-size: cover;
        display: block;
        height: 120px;
        width: 120px;
        /* margin-top: 20px;
        margin-bottom: 20px; */
        margin: auto auto;
        border-radius: 6px;
        border: 1px;
      }
      @media screen and (max-width: 800px){
        .user{
          display: flex;
          flex-wrap: nowrap;
          flex-direction: column;
        }

        .buttons{
          flex-direction: row;
          margin: 10px;
          display: inline-block;
        }
    }
    .modal-list{
      max-height: 66vh; 
      overflow-y: auto;
    }
    /* width */
			::-webkit-scrollbar {
				width: 6px;
			}
			::-webkit-scrollbar-track {
				-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
				border-radius: 10px;
			}
			::-webkit-scrollbar-thumb {
				border-radius: 10px;
				-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
			}

    </style>
  <div class="add-thought w3-padding-small">
    <form class="new-thought">
      <div class="w3-row">
          <b class="w3-text-blue"><h3>User Profile</h3></b>
        <hr>
      </div>
      <div class="w3-row modal-list">
        <div class="w3-half">
          <section class="user-avatar w3-center w3-padding w3-margin-bottom">
            <div class="user-avatar-current" id="userAvatar" style\$="[[_photo(photo)]]"></div>
          </section>
          <div class="w3-row w3-center">
            <label class="paper-font-button w3-teal" style="cursor: pointer; color:#fff; border-radius: 6px; padding: 6px;" for="local_photo_input">
                Account Avatar
              </label>
              <input id="local_photo_input" type="file" accept="image/*" on-change="handlePhoto">
          </div>
          <div class="w3-row w3-padding w3-margin-top">
            <div class="w3-row"><label id="labelPostsEmail" class="w3-small w3-text-grey">Receive email notificatios for new posts?</label></div>
            <paper-radio-group selected\$="[[selectedPost(user.receiveEmails)]]" id="postSubscription" name="postSubscription">
              <paper-radio-button id="postsSubscribe" name="postsSubscribe">Subscribe</paper-radio-button>
              <paper-radio-button id="postsUnsubscribe" name="postsUnsubscribe">Unsubscribe</paper-radio-button>
            </paper-radio-group>
            <div class="w3-row w3-margin-top"><label id="labelPLDPEmail" class="w3-small w3-text-grey">Receive email notificatios for PLDP tasks?</label></div>
            <paper-radio-group selected\$="[[selectedPLDP(user.receivePLDPEmails)]]" id="pldpSubscription" name="pldpSubscription">
              <paper-radio-button id="pldpSubscribe" name="pldpSubscribe">Subscribe</paper-radio-button>
              <paper-radio-button id="pldpUnsubscribe" name="pldpUnsubscribe">Unsubscribe</paper-radio-button>
            </paper-radio-group>
            
          </div>
        </div>
        <div class="w3-half">
          <div class="w3-row w3-padding w3-margin-top">
            <paper-input id="firstName" name="firstName" always-float-label="" label="First Name" type="text" auto-validate="" value="[[user.firstName]]" required=""></paper-input>
            <paper-input id="lastName" name="lastName" always-float-label="" label="Last Name" type="text" auto-validate="" value="[[user.lastName]]" required=""></paper-input>
            <paper-input id="emailAddress" name="emailAddress" always-float-label="" label="Email Address (readonly)" type="email" auto-validate="" value="[[user.email]]" readonly="">
            </paper-input>
            <paper-textarea autocapitalize="sentences" char-counter="" rows="3" multiple="" always-float-label="" label="Biography" type="text" id="biography" name="biography" value="[[user.biography]]">
            </paper-textarea>
            <paper-input id="userurl" name="userurl" always-float-label="" label="Personalized Invite Link" value="[[user.userURL]]" type="text" readonly="">
              </paper-input>
            <h3>Password</h3>
            <gold-password-input id="passwordinput" name="passwordinput" always-float-label="" label="New Password" reveal="" suffix="" required="" strength-meter="" minlength="6" error-message="The password must contain at least 6 characters"></gold-password-input>
            <gold-password-input id="confirmPassword" name="confirmPassword" always-float-label="" label="Confirm Password" reveal="" suffix="" required="" strength-meter="" minlength="6" error-message="The password must contain at least 6 characters"></gold-password-input>
          </div>
          
        </div>
      </div>
      <div class="w3-row w3-border-top">
        <div class="buttons">
          <!-- <paper-button raised class="w3-deep-orange" on-tap="_closeParentModal">CANCEL</paper-button> -->
          <paper-button raised="" on-tap="updateProfile" class="w3-blue w3-text-white"><iron-icon icon="app:send"></iron-icon>&nbsp;UPDATE</paper-button>
        </div>
      </div>
      
    </form>
  </div>

  
    <div id="snackbar"></div>
`;
  }

  static get is() { return 'user-profile'; }

  static get properties() {
    return {
      quotes: Object,
      user: {
          type: Object
      },
      _companyid: String,
      photo: {
        type: String
      }
    };
  }
  handlePhoto(e){
      var photoSelected = e.target.files[0];

      // compress photo ready to upload
      this.resizeImage(photoSelected, "photo");
      
      // compress thumbnail for upload
      this.resizeImage(photoSelected, "thumbnail");

      var selectedImage = URL.createObjectURL(photoSelected);

      this.photo = selectedImage;

      // this.$.userAvatar.style.display = "block";
  }

  copyLink(){
    var userurl = dom(this.root).querySelector('#userurl');
    var res = this.copy(userurl.value);

    if(res){
      this.showSnackBar("Link copied to clipboard!");
    }
  }

  copy(text) {
    var input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input)
    return result;
  }

  _closeParentModal(e){
    var parentNode = dom(this).parentNode;
    // ios 11 bug caret position
            // if ( iOS && iOS11 ) {
                // parentNode.removeIOSBugfix();
            // }
    $(parentNode).parents('.ldp-modal').css('display', 'none');
  }

  selectedPost(r){
    if(r != undefined){
      if(r == true){
        this.$.postSubscription.selected = "postsSubscribe";
      }else{
        this.$.postSubscription.selected = "postsUnsubscribe";
      }
    }else{
      this.$.postSubscription.selected = "postsSubscribe";
    }
  }

  selectedPLDP(r){
    if(r != undefined){
      if(r == true){
        this.$.pldpSubscription.selected = "pldpSubscribe";
      }else{
        this.$.pldpSubscription.selected = "pldpUnsubscribe";
      }
    }else{
      this.$.pldpSubscription.selected = "pldpSubscribe";
    }
  }

  updateProfile(){
    let firstName = this.$.firstName.value;
    let lastName = this.$.lastName.value;
    let biography = this.$.biography.value;
    // var email = this.$.emailAddress.value;
    let password = this.$.passwordinput.value;
    let confirmPassword = this.$.confirmPassword.value;
    var that = this;

    var postSubscription = this.$.postSubscription.selected;
    var pldpSubscription = this.$.pldpSubscription.selected;

    if(postSubscription == "postsSubscribe"){
      var receiveEmails = true;
    }else{
      var receiveEmails = false;
    }

    if(pldpSubscription == "pldpSubscribe"){
      var receivePLDPEmails = true;
    }else{
      var receivePLDPEmails = false;
    }        

    let firstNameVal = this.$.firstName.validate();
    let lastNameVal = this.$.lastName.validate();
    // var emailVal = this.$.emailAddress.validate();

    let photo = this.$.local_photo_input.files[0];
    let photoDownloadURL = "";
    let thumbnailURL = "";
    let photo_upload, thumbnail_upload;
    let timeInMs = Date.now();

    // validate names
    if(!firstName || !firstNameVal){
      this.showSnackBar("Firstname is required!");
      return;
    }
    if(!lastName || !lastNameVal){
      this.showSnackBar("Lastname is required!");
      return;
    }
    // if(!email || !emailVal){
    //   this.showSnackBar("Email is required!");
    //   return;
    // }
    let passVal, confirmVal;
    if(password){
      passVal = this.$.passwordinput.validate();
      confirmVal = this.$.confirmPassword.validate();

      if(!passVal){
        this.showSnackBar("Password is required!");
        return;
      }

      if(!confirmVal){
        this.showSnackBar("Confirm Password is required!");
        return;
      }

      if(password !== confirmPassword){
        this.showSnackBar("Password and Confirm Password are not matching!");
        return;
      }

    }

    // Get a reference to the database service
    let database = firebase.database();
    let storage = firebase.storage();

    let userID = this.user.userID;

    // Update user data 
    let updates = {};
    updates['/users/' + userID+'/firstName'] = firstName;
    updates['/users/' + userID+'/lastName'] = lastName;
    updates['/users/' + userID+'/receiveEmails'] = receiveEmails;
    updates['/users/' + userID+'/receivePLDPEmails'] = receivePLDPEmails;
    updates['/users/' + userID+'/biography'] = biography;
    updates['/user/' + this.user.uid+'/receiveEmails'] = receiveEmails;
    updates['/user/' + this.user.uid+'/receivePLDPEmails'] = receivePLDPEmails;
    updates['/user/' + this.user.uid+'/biography'] = biography;
    if(password && passVal){
      var user = firebase.auth().currentUser;

      user.updatePassword(password).then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });

      user.updateProfile({
        displayName: firstName+" "+lastName
      }).then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });
    }

    database.ref().update(updates).then(function (){
      // that.showSnackBar("User updated Successfully!");
    }).catch(function(error) {
      that.showSnackBar("There was an error updating user detais, please try again!")
      console.log(error);
      // An error happened.
      return;
    });

    var subscriber = {
      userID:this.user.userID,
      companyID:this.user.companyID,
      email:this.user.email,
      dateRegistered:Date.now()
    }
    var subscribe = {};

    // subscribe user
    if(receiveEmails == true){
      subscribe["unsubscribed/"+this.user.userID]=null;
      subscribe["subscribed/"+this.user.userID]=subscriber;

      var usersubscribed = database.ref().update(subscribe).then(() =>{
          return console.log("Subscribed: ",receiveEmails);
      }); 
    }else{
      subscribe["unsubscribed/"+this.user.userID]=subscriber;
      subscribe["subscribed/"+this.user.userID]=null;

      var usersubscribed = database.ref().update(subscribe).then(() =>{
          return console.log("Subscribed: ",receiveEmails);
      }); 
    }

    // check if the media has been uploaded
    if(photo != undefined){
      // ref for photo and thubnails
      let refPhotos = storage.ref('photos/'+photo.name+timeInMs);
      let refThumbnail = storage.ref('thumbnails/thumbnail'+photo.name+timeInMs);

      // get compressed photo and thumbnail ready to upload
      photo_upload = sessionStorage.getItem("userphoto");
      thumbnail_upload = sessionStorage.getItem("userthumbnail");

      //upload thumbNail
      // Data URL string
      var thumbnailTask = refThumbnail.putString(thumbnail_upload, 'data_url');

      // var thumbnailTask = refThumbnail.put(photo);
      thumbnailTask.on('state_changed', 
        function progress(snapshot){
          var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        function error(err){
          that.showSnackBar("Error updating user profile picture!");
          return;
        },
        function complete(){
          thumbnailURL = thumbnailTask.snapshot.downloadURL;

          // Update user thumbnail 
          let thumbnailupdate = {};
          thumbnailupdate['/users/' + userID+'/thumbnailURL'] = thumbnailURL;
          database.ref().update(thumbnailupdate);
        }
      );

      //upload Photo
      // Data URL string
      let photoTask = refPhotos.putString(photo_upload, 'data_url');

      photoTask.on('state_changed', 
        function progress(snapshot){
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // this.showSnackBar("Uploading Photo...");
        },
        function error(err){
          that.showSnackBar("Error updating user profile picture!");
          return;
        },
        function complete(){
          // get download url for photo
          photoDownloadURL = photoTask.snapshot.downloadURL;
          // Update user thumbnail 
          let photoupdate = {};
          photoupdate['/users/' + userID+'/photoURL'] = photoDownloadURL;
          database.ref().update(photoupdate);
        }
      );
    }

    var that = this;

    setTimeout(myFunction, 2000);
    function myFunction(){
      that.removeFromParent();
    }

    this.showSnackBar("User updated Successfully!");

    this.$.passwordinput.value = "";
    this.$.confirmPassword.value = "";

    if(password && passVal){
      this.$.currentPassword.value = password;
    }
    
  }

  removeFromParent(){
    var a = dom(this).parentNode;
    $(a).siblings('#spancloseUserProfile').trigger('click');
  }

  showSnackBar(msg){
    var x = this.$.snackbar;

    x.innerHTML = msg;

    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
  }
  _photo(photo){
    let photo_url = "background-image: url('../images/profile/default-user.png');";

    if (photo) { 
      photo_url = "background-image: url('"+photo+"');";
    }

    return photo_url;
  }
  resizeImage(file, imgType) {
    var reader = new FileReader();
    reader.onloadend = function() {
    
      var tempImg = new Image();
      tempImg.src = reader.result;
      tempImg.onload = function() {

        if(imgType == "thumbnail"){
          var MAX_WIDTH = 400;
          var MAX_HEIGHT = 300;
        }else{
          var MAX_WIDTH = 800;
          var MAX_HEIGHT = 600;
        }
        
        var tempW = tempImg.width;
        var tempH = tempImg.height;
        if (tempW > tempH) {
            if (tempW > MAX_WIDTH) {
              tempH *= MAX_WIDTH / tempW;
              tempW = MAX_WIDTH;
            }
        } else {
            if (tempH > MAX_HEIGHT) {
              tempW *= MAX_HEIGHT / tempH;
              tempH = MAX_HEIGHT;
            }
        }

        var canvas = document.createElement('canvas');
        canvas.width = tempW;
        canvas.height = tempH;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0, tempW, tempH);

        // return data url
        var dataURL = canvas.toDataURL("image/jpeg");

        if(imgType == "thumbnail"){
          sessionStorage.setItem("userthumbnail", dataURL);
        }else{
          sessionStorage.setItem("userphoto", dataURL);
        }
      }
    }
    reader.readAsDataURL(file);
  }
}

window.customElements.define(UserProfile.is, UserProfile);

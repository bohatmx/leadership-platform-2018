/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { Element } from '../../../@polymer/polymer/polymer-element.js';

import '../../../@polymer/paper-button/paper-button.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';

class FollowButton extends Element {
  static get template() {
    return html`
    <style include="w3-styles"></style>
    <style include="shared-styles">
        :host {
            display: block;
        }
    </style>

    <paper-button on-tap="followUser" data="{{_journaluser}}" class\$="followBTN {{isFollowingStyle(_journaluser)}}">{{isFollowing(_journaluserid)}}</paper-button>

    <paper-button on-="" on-tap="followUser" data="[[item.dailyThoughtID]]" class\$="followBTN [[isFollowingStyle(item.journalUserID)]]">[[isFollowing(item.journalUserID)]]</paper-button>
`;
  }

  static get is() { return 'follow-button'; }
  ready(){
      super.ready();
  }
  static get properties() {
      return {
          user: {
              type: Object,
              notify: true
          },
          _journaluserid:{
              type: String
          }
      };
  }

  isFollowing(journalUserID){
      if(this.user.following != undefined){
          if(this.user.following){
          let following =  this.user.following;
          let isfollowing = following[journalUserID];

          return isfollowing ? 'Following' : 'Follow';
          }else return "Follow";
      }else return "Follow";
      
  }

  isFollowingStyle(journalUserID){
      let userID = this.user.userID;

      if(userID === journalUserID){
          return "w3-hide";
      }
      else{
          if(this.user.following){
              let following =  this.user.following;
              let isfollowing = following[journalUserID];

              return isfollowing ? 'following' : '';
          }
          else {return "";}

      }
      
  }
  followUser(e){
      let database = firebase.database();
      let itemID = e.target.data;

      let filteredArray = this.findObjectByKey(this.thoughtsData, "dailyThoughtID", itemID);

      let following = e.target.innerHTML;
      let userID = this.user.userID;
      var that = this;
      var myPhoto = "";

      let journalUserID = filteredArray.journalUserID;
      let journalUserName = filteredArray.journalUserName;
      var followDate = Date.now();
      // let journalUserName = e.target.parentNode.firstChild.nextSibling.innerText;

      if(this.user.photoURL != undefined || this.user.photoURL != ""){
          myPhoto = this.user.photoURL;
      }else{
          myPhoto = "";
      }

      if(myPhoto == undefined){
          myPhoto = "";
      }

      if(following == "Follow"){
          $(e.target).addClass('following');

          e.target.innerHTML = "Following";
          that.updateFollowBTN(journalUserID, following);

          var photoURL = "";
          if(filteredArray.photoURL != undefined || filteredArray.photoURL != ""){
              photoURL = filteredArray.photoURL;
          }else{
              photoURL = "";
          }

          if(photoURL == undefined){
              photoURL = "";
          }

          var theirdata = {
              "firstName":filteredArray.journalUserName,
              "lastName":"",
              "companyName":filteredArray.companyName,
              "dateRegistered":followDate,
              "photoURL":photoURL,
              "userID":journalUserID
          }

          var mydata = {
              "firstName":that.user.firstName,
              "lastName":that.user.lastName,
              "companyName":that.user.companyName,
              "dateRegistered": followDate,
              "photoURL":myPhoto,
              "userID": userID
          }

          var updates = {}
          updates["users/"+userID+"/following/"+journalUserID]=theirdata;
          updates["users/"+journalUserID+"/follower/"+userID]=mydata;
          updates["followers/"+journalUserID+"/"+userID]=mydata;

          return database.ref().update(updates).then(() =>{
              return console.log("Following");
          });

      }else{
          that.isFollowingStyle(journalUserID);

          $(e.target).removeClass('following');
          e.target.innerHTML = "Follow";
          that.updateFollowBTN(journalUserID, following);

          var updates = {}
          updates["users/"+userID+"/following/"+journalUserID]=null;
          updates["users/"+journalUserID+"/follower/"+userID]=null;
          updates["followers/"+journalUserID+"/"+userID]=null;

          return database.ref().update(updates).then(() =>{
              return console.log("Unfollowed");
          });
          
      }

  }
}
window.customElements.define(FollowButton.is, FollowButton);

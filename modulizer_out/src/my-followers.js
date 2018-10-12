/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* <link rel="import" href="../bower_components/polymer/polymer-element.html"> */
/* Firebase Auth */
/* <link rel="import" href="../bower_components/polymerfire/firebase-auth.html"> */
/* Firebase Query */
/* <link rel="import" href="../bower_components/polymerfire/firebase-query.html">
<link rel="import" href="../bower_components/polymerfire/firebase-database-behavior.html"> */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '../../../@polymer/paper-button/paper-button.js';

import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/iron-image/iron-image.js';
import './preview-profile.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
import { Element } from '../../../@polymer/polymer/polymer-element.js';

class MyFollowers extends Element {
  static get template() {
    return html`
    <style include="w3-styles"></style>
    <style include="shared-styles">
        :host {
            display: block;
        }
        .selected{
            background-color: tomato;
            width: 100%;
            min-height: 10px;
        }

        .modal-list{
            max-height: 80vh; 
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

    <!-- <firebase-query
        id="qryusers"
        path="/users"
        data="{{usersData}}">
    </firebase-query> -->

    <div class="w3-row w3-text-white">
        <div id="Followers" class="w3-col s6 w3-card-2" style="cursor: pointer;" on-tap="toggleFollow">
            <paper-ripple></paper-ripple>
            <div id="followersTab" class="w3-padding-large">
                Followers
            </div>
        </div>
        <div id="Following" class="w3-col s6 w3-card-2" style="cursor: pointer;" on-tap="toggleFollow">
            <paper-ripple></paper-ripple>
            <div id="followingTab" class="w3-padding-large">
                Following
            </div>
        </div>
    </div>
    <div id="selectedTab" class="w3-row selected"></div>
    <div class="w3-container modal-list">
        <div class="w3-large w3-center" style="padding:8px;">
            <b class="w3-text-dark-grey"><iron-icon icon="app:group"></iron-icon>&nbsp;{{follow}}</b>
        </div>
        <ul class="w3-ul w3-card-2 w3-hoverable w3-margin-bottom">
            <!-- <hr> -->
            <template id="resultList" is="dom-repeat" items="[[mylist]]" as="item" filter="_filter" sort="_sort" observe="dateRegistered">
                <li class="w3-bar" style="padding: 8px 0; cursor: pointer;" data="[[item]]" on-tap="_previewProfile">
                <img class="w3-bar-item w3-circle" style="width:42px; height: 42px;" src="[[_profilePhoto(item.photoURL)]]">
                    <div class="w3-bar-item">
                        <span class="w3-medium w3-text-blue">[[item.firstName]] [[item.lastName]]</span><br>
                        <span>[[item.companyName]]</span>
                    </div>
                </li>
            </template>
        </ul>
    </div>
    <div id="preview-profile" class="ldp-modal w3-animate-zoom">
        <div class="ldp-modal-content w3-round max-modal-width">
            <div>
                <span id="close-followers" data="preview-profile" on-click="_closeProfileModal" class="w3-button w3-display-topright w3-medium w3-red w3-text-white" style="z-index: 999;">×</span>
                <div class="w3-row">
                    <preview-profile _userid="{{_userid}}" userobj="{{userobj}}"></preview-profile>
                </div>
            </div>
        </div>
    </div>
`;
  }

  static get is() { return 'my-followers'; }
  ready(){
      super.ready();
  }
  static get properties() {
      return {
          user: {
              type: Object,
              observer: '_usersDataChange',
              notify: true,
          },
          _companyid: String,
          follow: {
              type: String,
              observer: 'refreshFilter',
              notify: true
          },
          userobj: {
              type: Object,
              notify: true
          },
          _userid: {
              type: String,
              notify: true
          },
      };
  }

  _usersDataChange(newData, oldData) {
  }
  _sort(a, b) {  
			if (a.dateRegistered > b.dateRegistered) return -1;
			if (a.dateRegistered < b.dateRegistered) return 1;
			return 0;
  }
  _profilePhoto(photo){
      let photo_url = "../images/default-user.png";

      if(photo == undefined){
          photo_url = "../images/default-user.png";
      }else if(photo == ""){
          photo_url = "../images/default-user.png";
      }else{
          photo_url = ''+photo+'';
      }

      return photo_url;
  }
  toggleFollow(e){
      return this.follow = e.currentTarget.id;
  }

  refreshFilter() {
      var selectedTab = this.$.selectedTab;
      var followersTab = this.$.followersTab;
      var followingTab = this.$.followingTab;

      if(this.follow == 'Followers'){
          selectedTab.style = "background-color: #ff5722!important;";
          followersTab.style = "background-color: #ff5722!important;";
          followingTab.style = "background-color: #616161!important;";
          this.mylist = [];

          if(this.user.follower != undefined){
              this.mylist = this._toArray(this.user.follower);
          }
      }else{
          selectedTab.style = "background-color: #ff5722!important;";
          followersTab.style = "background-color: #616161!important;";
          followingTab.style = "background-color: #ff5722!important;";

          this.mylist = [];
          
          if(this.user.following != undefined){
              this.mylist = this._toArray(this.user.following);
          }
      }
      
      this.$.resultList.render();
  }

  _toArray(obj) {
      if(obj != undefined){
          return Object.keys(obj).map(function(key) {
              var retObj = {};
              retObj = obj[key];
              retObj.key = key;
              return retObj;
              // return obj[key];
      });
      }
  }

  _filter (person) {
      if(person.firstName != undefined) return true
      else return false;
  }
  _previewProfile(e){
      var data = e.currentTarget.data;
      var userdata = data;
      var photoURL = this._profilePhoto(userdata.photoURL);
      
      this.userobj = {
          journalUserName: userdata.firstName+" "+userdata.lastName,
          journalUserID: userdata.key,
          companyName: userdata.companyName,
          photoURL: photoURL
      }

      this._userid = userdata.key;
      this._openProfileModal();

      // this._captureClicks(e.currentTarget.postitem, "viewedUserProfile", this.userobj);
  }
  _openProfileModal(){
      var modal = dom(this.root).querySelector('#preview-profile');
      modal.style.display = 'block';
  }
  _closeProfileModal(){
      var modal = dom(this.root).querySelector('#preview-profile');
      modal.style.display = 'none';
  }

  _formate_date(dt){
      var date = new Date(dt);
      var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
      var hours = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
      var minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
      var locale = 'en-us';
      var month = date.toLocaleString(locale, { month: "long" });
      var year = date.getFullYear();
      var am_pm = date.getHours() >= 12 ? "PM" : "AM"

      return day+' '+month+' '+year+' '+hours+':'+minutes+" "+am_pm;
  }
}
window.customElements.define(MyFollowers.is, MyFollowers);

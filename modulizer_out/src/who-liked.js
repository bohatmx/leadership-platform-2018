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

class WhoLiked extends Element {
  static get template() {
    return html`
    <style include="w3-styles"></style>
    <style include="shared-styles">
        :host {
            display: block;
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
    <!-- <firebase-query
        id="qryusers"
        path="/users"
        data="{{usersData}}">
    </firebase-query> -->
    <div>
        <div class="w3-large w3-center" style="padding:20px 15px">
            <b class="w3-text-blue"><iron-icon icon="app:favorite"></iron-icon>&nbsp;Liked By</b>
        </div>
        <div class="modal-list w3-padding">
            <ul class="w3-ul w3-card-2 w3-hoverable w3-margin-bottom">
                <!-- <hr> -->
                <template id="resultList" is="dom-repeat" items="[[likes]]" as="item" sort="_sort" observe="likesDate">
                    <li class="w3-bar" style="padding: 8px 0; cursor: pointer;" data="[[item]]" on-tap="_previewProfile">
                    <img class="w3-bar-item w3-circle" style="width:42px; height: 42px;" src="[[_profilePhoto(item.photoURL)]]">
                        <div class="w3-bar-item">
                            <span class="w3-medium w3-text-blue">[[item.journalUserName]]</span><br>
                            <span>[[item.companyName]]</span>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
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

  static get is() { return 'who-liked'; }
  ready(){
      super.ready();
  }
  static get properties() {
      return {
          likesdata: {
              type: Object,
              notify: true,
              observer: "_likesDataChanged"
          },
          likes: {
              type: Object,
              observer: "refreshFilter",
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
  _likesDataChanged(){
      if(this.likesdata != undefined){
          this.likes = this._toArray(this.likesdata);
      }
  }
  refreshFilter() {
      this.$.resultList.render();
  }

  _filter (person) {
      if(this.likesdata !== undefined){
          let isliking = this.likesdata[person.userID];
          return isliking;
      }
      return false;
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
  _toArray(obj) {
      if(obj != undefined){
          return Object.keys(obj).map(function(key) {
              var retObj = {};
              retObj = obj[key];
              return retObj;
              // return obj[key];
      });
      }
  }
  _sort(a, b) {  
			if (a.likesDate > b.likesDate) return -1;
			if (a.likesDate < b.likesDate) return 1;
			return 0;
  }
  _previewProfile(e){
      var data = e.currentTarget.data;
      var userdata = data;
      var photoURL = this._profilePhoto(userdata.photoURL);
      
      this.userobj = {
          journalUserName: userdata.journalUserName,
          journalUserID: userdata.journalUserID,
          companyID: userdata.companyID,
          companyName: userdata.companyName,
          photoURL: photoURL
      }

      this._userid = userdata.journalUserID;
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
}
window.customElements.define(WhoLiked.is, WhoLiked);

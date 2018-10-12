/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* Firebase */
/* Firebase Auth */
/* Firebase Query */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { Element } from '../../../@polymer/polymer/polymer-element.js';

import '../../../@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../../../@polymer/app-layout/app-header/app-header.js';
import '../../../@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '../../../@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../@polymer/paper-dialog/paper-dialog.js';
import '../../../@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '../../../@polymer/iron-icons/iron-icons.js';
import '../../../@polymer/iron-image/iron-image.js';
import '../../../@polymer/iron-list/iron-list.js';
import '../../../paper-search/paper-search-bar.js';
import '../../../@polymer/paper-dialog/paper-dialog.js';
import '../../../@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../polymerfire/firebase-app.js';
import '../../../polymerfire/firebase-auth.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-database-behavior.js';
import './thought-card-attachments.js';
import './comments-box.js';
import './play-media.js';
import './shared-styles.js';
import './w3-styles.js';
import './delete-pldp.js';
import './edit-post.js';
import './app-icons.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
class PLDPPodcasts extends Element {
  static get template() {
    return html`
    <firebase-query id="podcasts" path="/myPLDP/podcasts" order-by-child="PLDPUserID" equal-to="[[user.userID]]" limit-to-last="15" data="{{podcastsData}}">
    </firebase-query>

    <style include="w3-styles"></style>
    <style include="shared-styles">
      .avatar {
        height: 40px;
        width: 40px;
        border-radius: 0px;
        box-sizing: border-box;
        background-color: #DDD;
      }

      .podcast-item{
        max-width:600px;
      }

      app-header{
        height: 96px; 
        top: 112px;
      }

      app-toolbar{
        background-color: #000;
        color: #fff;
      }

    </style>
    
    <div class="main-card">
      <div id="play-media" class="w3-modal w3-animate-zoom">
        <div class="w3-modal-content w3-round max-modal-width">
          <div>
            <span id="close-media" data="play-media" on-click="_closeMediaModal" class="w3-button w3-display-topright w3-medium w3-red w3-text-white">×</span>
            <div class="w3-medium" style="padding:20px 50px">
              <b class="w3-text-dark-grey"><iron-icon icon="app:play-circle-outline"></iron-icon>&nbsp;[[media_title]]</b>
            </div>
            <div class="w3-row">
              <play-media loadsrc="{{loadsrc}}"></play-media>
            </div>
          </div>
        </div>
      </div>
      <template is="dom-repeat" items="[[podcastsData]]" as="item">
        <div class="podcast-item" id="modal-[[item.podcastID]]">
          <div class="modal-div w3-animate-zoom">
            <div class="w3-card w3-white" style="border-radius:5px; border:1px solid #bbb">
              <div class="container card-header w3-row">
                  <delete-pldp user="[[user]]" item="[[item]]" itemtype="podcasts" entityid="[[item.podcastID]]"></delete-pldp>
                <div class="card-avatar w3-left" style\$="[[_profilePhoto(item.photoURL)]]"></div>
                <div class="container card-company-container">
                  <div class="row card-postedby w3-medium">[[item.userName]]</div>
                  <div class="row card-company">[[item.companyName]]</div>
                </div>
                <div class="thought-date">
                  [[_formate_date(item.dateRegistered)]]
                </div>
              </div>
              <div class="w3-row w3-relative" id="modal-content-[[item.podcastID]]">
                <span class="w3-button w3-display-topright w3-red w3-medium w3-hide closer-for-modal">×</span>
                <div title="[[_getPodcastName(item.storageName)]]" class="w3-left w3-padding-small" id="listen[[item.dateRegistered]]" on-tap="_handleClick" data="[[item.url]]">
                  <img src="/images/[[item.podcastDescription]].png" style="width: 60px">
                </div>
                <div class="w3-rest w3-padding">
                  <div title="[[_getPodcastName(item.storageName)]]" class="w3-padding-small w3-text-grey" id="col[[item.dateRegistered]]" name="[[item.dateRegistered]]" on-tap="_handleClick" data="[[item.url]]">
                    <b>[[_getPodcastName(item.storageName)]]</b>
                  </div>
                </div>
              </div>
              <comments-box user="[[user]]" item="[[item]]" thetype="[[item.podcastDescription]]" entityid="[[item.podcastID]]" firebaseref="podcasts"></comments-box>
            </div>
          </div>
        </div>
      </template>
    </div>
`;
  }

  static get is() { return 'pldp-podcasts'; }
  static get properties() {
    return {
      user: {
        type: Object
      },
      _companyid: String,
      podcastsData: {
        type: Object,
        observer: '_onpodcastsDataDataReceived'
      }
    };
  }
  _onpodcastsDataDataReceived(newData, oldData){
    this.podcastsData.sort(function(a, b) {
    var nameA = a.dateRegistered; // ignore upper and lowercase
    var nameB = b.dateRegistered; // ignore upper and lowercase
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    return 0;
    });
  }
  getClassForItem(item, selected) {
    return selected ? 'item expanded' : 'item';
  }
  _getPodcastName(storageName){
    let strName = '';
    strName = storageName.slice(storageName.lastIndexOf('/')+1);
    strName = strName.replace(new RegExp('_', 'g'), ' ');
    return strName;
  }
  _handleClick(e){
            var podcastClicked = dom(this.root).querySelector('#'+e.currentTarget.id).data;
            var podcastTitle = dom(this.root).querySelector('#'+e.currentTarget.id).title;

            var src = this.getMediaURL(podcastClicked);
            this.media_title = podcastTitle;

            this.loadsrc = src;
            this._openMediaModal();
        }

  _openMediaModal(){
      var modal = dom(this.root).querySelector('#play-media');
      modal.style.display = 'block';
  }

  _closeMediaModal(){
      this.loadsrc = "";
      var modal = dom(this.root).querySelector('#play-media');
      modal.style.display = 'none';
  }
  findObjectByKey(array, key, value) {
      for (var i = 0; i < array.length; i++) {
          if (array[i][key] === value) {
              return array[i];
          }
      }
      return null;
  }
  _formate_date(dt){
            var date = new Date(dt);
            var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
            var locale = 'en-us';
            var month = date.toLocaleString(locale, { month: "long" });
            var year = date.getFullYear();

            return day+' '+month+' '+year;
        }
  _profilePhoto(photo){
            let photo_url = "background-image: url('../images/default-user.png');";

            if(photo == undefined){
                photo_url = "background-image: url('../images/default-user.png');";
            }else if(photo == ""){
                photo_url = "background-image: url('../images/default-user.png');";
            }else{
                photo_url = "background-image: url('"+photo+"');";
            }

            return photo_url;
        }
  getMediaURL(url){
            var res = "";
            var checkHTTP;

            if(url.includes("youtu")){
                var youtubeID = this.getYoutubeID(url);
                res = "https://www.youtube.com/embed/"+youtubeID;
            }else{
                checkHTTP = url.indexOf("http:");
                if(checkHTTP == -1) res = url;
                else res = url.replace("http:", "https:");
            }

            return res;
        }
  getYoutubeID(youtubeURL) {
var str = youtubeURL;
var n = str.indexOf("=");
var x = str.indexOf("&");
var res = "";

if(n == -1){
n = str.indexOf("youtu.be");
if(x == -1) res = str.substring(n+9);
else res = str.substring(n+9, x);
}else{
if(x == -1) res = str.substring(n+1);
else res = str.substring(n+1, x);
}

return res;
  }
}

window.customElements.define(PLDPPodcasts.is, PLDPPodcasts);

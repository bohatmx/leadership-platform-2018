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
import '../../../@polymer/iron-collapse/iron-collapse.js';
import '../../../@polymer/paper-styles/shadow.js';
import '../../../@polymer/iron-image/iron-image.js';
import '../../../@polymer/iron-pages/iron-pages.js';
import './shared-styles.js';
import './thought-card-attachments.js';
import './comments-box.js';
import '../../../polymerfire/firebase-app.js';
import '../../../polymerfire/firebase-auth.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-database-behavior.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
class ThoughtsManagement extends Element {
  static get template() {
    return html`
      <template is="dom-if" if="[[_companyid]]">
      <firebase-query id="dailythought" path="/dailyThoughts" order-by-child="companyID_status" equal-to="[[_companyid]]_pending" limit-to-last="20" data="{{thoughtsData}}">
      </firebase-query>
      
    </template>

    <style include="shared-styles">
      :host {
					/* Label and underline color when the input is focused */
					--paper-input-container-focus-color: #fff;

					/* Label and underline color when the input is invalid */
					--paper-input-container-invalid-color: red;

					/* Input foreground color */
					--paper-input-container-label:{
						font-size: 12px;
						margin-bottom: 4px;
						color: #757575;
					};
					--paper-input-container-input-focus:{
						font-size: 14px;
						margin-bottom: 4px;
						color: var(--app-primary-text);
					};
				}
				.rate-color-post {
					--rating-icon-color: var(--app-primary-color);
					--rating-ink-color: var(--app-primary-color);
				}
				.rate-color {
					--rating-icon-color: #9e9e9e;
					--rating-ink-color: #9e9e9e;
				}
				.pageComments{
					padding: 0 8px;
					background-color: #f7f7f7;
				}
				.comment-date{
					color: #9e9e9e !important;
				}
				.comment-msg{
				 color: var(--app-primary-text);
				}
				.comment-input{
					background-color: #ffffff;
					padding: 0 16px;
					border-radius: 2px;
				}
				.comment-area{
					display: flex;
					flex-direction: row;
					padding-bottom: 10px;
					padding-top: 10px;
				}
				.comment-input{
					flex-grow: 8;
					margin-left: -10px;
				}
				.comment-btn{
					margin: 10px;
					color: var(--app-primary-color);
				}
				.header-det{
					flex-grow: 9;
					display: flex;
				}
				.header-actions{
					flex-grow: 1;
					align-content: flex-end;
					justify-content: center;
				}
				.thought-rate-title, .thought-rate-subtitle{
					text-align: center;
				}
				.thought-rate-title{
					font-family: sans-serif;
					white-space: wrap;
					margin: 12px 0;
				}
				.thought-rate-subtitle{
					font-style: italic;
				}
				@media screen and (max-width: 900px) {
					.main-card{
						margin: 0px;
					}
				}
				.pldp-link{
					text-decoration: none;
					text-transform: uppercase;
					text-align: -webkit-center;
					display: flex;
					align-items: center;
					color: var(--paper-dialog-button-color, var(--primary-color));
					-webkit-user-select: none;
					user-select: none;
					padding: 0 8px 0 2px;
				}
				.thought-prevImg{
					display: flex;
					height: 280px;
					width: 100%;
					border-radius: 1px;
					text-align: center;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					margin-bottom: 1px;
				}
				.thoughtItems{
					position: absolute;
				}
				.thoughtItems > .thoughtTitle{
					line-height: 16px;
					font-size: 16px;
				}
				.thoughtItems > .thoughtSubtitle{
					margin-top: 16px;
					line-height: 12px;
					font-size: 12px;
					font-style: italic;
				}

				.previewFooter{
					display: flex;
					position: absolute;
					width: 100%;
					max-width: 600px;
					margin-bottom: 6px;
					bottom: 10px;
					left:10px;
					font-size: 10pt!important;
				}
      .arrow-back {
      color: white;
      --paper-icon-button-ink-color: white;
      }
      .rate-top-flex{
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
      }
      .rate-top-flex > .rate-title{
        flex-grow: 8;
      }
      .rate-title > h1{
        font-size: 20px;
        margin: 0;
        padding: 4px;
        text-align: center;
      }
      
      .thought-rate-title, .thought-rate-subtitle{
        text-align: center;
      }
      .thought-rate-title{
        font-family: sans-serif;
        white-space: wrap;
        margin: 12px 0;
      }
      .thought-rate-subtitle{
        font-style: italic;
      }
    @media screen and (max-width: 1010px){

        #videoPlayer{
          width: 100%;
          height: auto;
          left: 0px;
          top: 0px;
          opacity: 1;
        }

        .video-side{
          display: block;
          margin: 10px auto;
          max-height: 200px;
        }
    }

    @media screen and (max-width: 500px){

      #videoPlayer{
        width: 100%;
        height: auto;
        left: 0px;
        top: 0px;
        opacity: 1;
      }

      .video-side{
        display: block;
        margin: 10px auto;
        height: auto;
      }
    }
    </style>
    <style include="w3-styles"></style>

<div class="row background-indigo rate-top-flex">
  <div class="rate-title">
    <h1 class="w3-text-blue">Pending Messages</h1>
  </div>
</div>

<div class="container">
    <paper-dialog id="imgDialog" class="image-dailog">
      <!-- <h2>Scrollable</h2> -->
      <paper-dialog-scrollable>
          <iron-image class="thought-expand-img" sizing="cover" src="" id="showImage"></iron-image>
      </paper-dialog-scrollable>
      <div class="buttons">
        <paper-button dialog-dismiss="">Close</paper-button>
      </div>
    </paper-dialog>
  </div>
  <div class="container">
      <paper-dialog id="pldpDialog">
        <h2><paper-icon-button icon="app:check" class="blue"></paper-icon-button>Approving Thought</h2>
        <hr>
          <p id="thoughtTitle" class="thought-rate-title"></p>
          <p id="thoughtAuthor" class="thought-rate-title paper-font-caption"></p>
        <hr>
        <div class="buttons">
          <paper-button dialog-dismiss="">CLOSE</paper-button>
          <paper-button on-tap="declineThought">DECLINE</paper-button>
          <paper-button on-tap="approveThought">APPROVE</paper-button>
        </div>
      </paper-dialog>
    </div>
  <div class="container">
      <paper-dialog id="videoDialog" class="add-dailog">
          <!-- <paper-dialog-scrollable> -->
          <div class="container video-side">
            <video id="videoPlayer" controls="" controlslist="nodownload">
              <source id="videoPlayer1" src="" type="video/mp4">
              <source id="videoPlayer2" src="" type="video/ogg">
              Your browser does not support video.
            </video>
          </div>
          <!-- </paper-dialog-scrollable> -->
        <div class="buttons">
          <paper-button dialog-dismiss="">Close</paper-button>
        </div>
      </paper-dialog>
    </div>
    <section class="thought-card" id="thoughts-Holder">
        <div class="main-card">
          <div class="spinner">
            <paper-spinner active="{{isloading}}"></paper-spinner>
            <div style="width: 100%; padding-top: 10px;" class="w3-row w3-center" id="spinnerMessage">{{loadingmessage}}</div>
          </div>
          <template id="thoughtsList" is="dom-repeat" items="[[thoughtsData]]" as="item" sort="_sort" observe="dateScheduled">
            <div class="modal-div w3-animate-zoom">
              
              <div class="card-container fadeInUp">
                <span class="w3-button w3-display-topright w3-red w3-medium w3-hide closer-for-modal" style="z-index:999999;">×</span>
                <div class="container card-header">
                  <div class="header-det w3-row">
                    <div class="card-avatar" style\$="[[_profilePhoto(item.photoURL)]]"></div>
                    <div class="container card-company-container">
                      <div class="row card-postedby w3-medium">
                        <div>[[item.journalUserName]]</div>
                      </div>
                      <div class="row card-company">[[item.companyName]]</div>
                    </div>
                    <div class="thought-date">
                      [[_formate_date(item.dateScheduled)]]
                    </div>
                  </div>
                </div>
              
                <div class="container" style="cursor: pointer;" on-tap="_openApproveDialog">
                  <div class="row">
                    <div id="pending[[item.dateRegistered]]" data="[[item.dailyThoughtID]]" class="thought-img" style\$="[[_photo(item.photos, item.textColor)]]">
                      <div id="mask[[item.dateRegistered]]" data="[[item.dailyThoughtID]]" class="thought-mask"></div>
                      <div class="w3-row">
                        <div class="thought-title" id="title[[item.dateRegistered]]" data="[[item.dailyThoughtID]]">
                          [[item.title]]
                        </div>
                        <div class="thought-author" id="author[[item.dateRegistered]]" data="[[item.dailyThoughtID]]">
                          [[item.subtitle]]
                        </div>
                      </div>
                      <div class="previewFooter">
                        <iron-image src="[[item.logo]]" style="width:36px; height:36px; padding:2px" preload="" sizing="cover"></iron-image>
                        <div class="previewText">
                          <div id="thoughtSlogan">[[item.slogan]]</div>
                          <div id="thoughtWebsite">[[item.website]]</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        
                <thought-card-attachments user="[[user]]" itemid="[[item.dailyThoughtID]]" item="[[item]]" thetype="dailyThoughts" thoughtype="[[thoughtype]]"></thought-card-attachments>
                <comments-box user="[[user]]" firebaseref="dailyThoughts" opened="[[_openedcomments]]" item="[[item]]" thetype="Thought" entityid="[[item.dailyThoughtID]]"></comments-box>
              </div>
            </div>
          </template>
        </div>
      </section>
  <!-- <div class="cards-wrapper">
      <template is="dom-repeat" items="[[thoughtsData]]" as="item">
          <div class="main-card-container">
              <div class="container card-header">
                  <div class="card-avatar" style\$="[[_profilePhoto(item.photoURL)]]"></div>
                  <div class="container card-company-container">
                    <div class="row card-company">[[item.companyName]]</div>
                    <div class="row card-postedby">[[item.journalUserName]]</div>
                  </div>
              </div>
      
              <div class="container" style="cursor: pointer;" on-tap="_openApproveDialog">
                <div class="row">
                  <div id="pending[[item.dateRegistered]]" data="[[item.dailyThoughtID]]" class="thought-img" style\$="[[_photo(item.photos)]]">
                    <div id="date[[item.dateRegistered]]" data="[[item.dailyThoughtID]]" class="thought-date">
                      [[item.stringDateRegistered]]
                    </div>
                    <div id="title[[item.dateRegistered]]" data="[[item.dailyThoughtID]]" class="thought-title">
                      [[item.title]]
                    </div>
                    <div id="author[[item.dateRegistered]]" data="[[item.dailyThoughtID]]" class="thought-author">
                      [[item.subtitle]]
                    </div>
                  </div>
                </div>
              </div>

              <div class="container">
                  <div class="row">
                      <div class="card-actions">
                          <div class="horizontal justified">
                              <paper-icon-button class="blue" icon="myicons:small-link" on-click="toggle" data="[[item.dateRegistered]]" id="blue[[item.dateRegistered]]"></paper-icon-button>
                              <paper-icon-button class="green" icon="myicons:small-mic" on-click="toggle" data="[[item.dateRegistered]]" id="green[[item.dateRegistered]]"></paper-icon-button>
                              <paper-icon-button icon="myicons:small-videocam" on-click="toggle" data="[[item.dateRegistered]]" id="cam[[item.dateRegistered]]"></paper-icon-button>
                              <paper-icon-button class="red" icon="myicons:small-image" on-click="toggle" data="[[item.dateRegistered]]" id="red[[item.dateRegistered]]"></paper-icon-button>
                          </div>
                          <div class="horizontal justified">
                              <paper-button class="blue thought-actions">[[_objLen(item.urls)]]</paper-button>
                              <paper-button class="green thought-actions">[[_objLen(item.podcasts)]]</paper-button>
                              <paper-button class="thought-actions">[[_objLen(item.videos)]]</paper-button>
                              <paper-button class="red thought-actions">[[_objLen(item.photos)]]</paper-button>
                          </div>
                      </div>
                  </div>
                </div>

                <div class="container more-container">
                  <iron-collapse id="collapse[[item.dateRegistered]]">
                    <iron-pages selected="[[_selected]]" attr-for-selected="page-name">
                      <div page-name="page-1-[[item.dateRegistered]]" id="page1[[item.dateRegistered]]">
                          <template is="dom-repeat" items="{{_toArray(item.urls)}}" as="item1">
                              <div class="container block-display">
                                <a class="more-links" target="_blank" href="[[item1.url]]">[[item1.title]]</a>
                              </div>
                          </template>
                      </div>
                      <div page-name="page-2-[[item.dateRegistered]]" id="page2[[item.dateRegistered]]">
                        <template is="dom-repeat" items="{{_toArray(item.podcasts)}}" as="item1">
                            <div class="row audio-container card-shadow">
                                <audio preload="auto" id="podcastPlayer[[item.dateRegistered]]" controls controlslist="nodownload" style="max-width: 240px;">
                                  <source id="podcastPlayer1[[item.dateRegistered]]" src="[[item1.url]]" type="audio/ogg">
                                  <source id="podcastPlayer2[[item.dateRegistered]]" src="[[item1.url]]" type="audio/mpeg">
                                </audio>
                                <div class="row podcast-text" id="col[[item1.dateRegistered]]" name="[[item1.dateRegistered]]" onmouseover="" style="cursor: pointer;">
                                    [[_getPodcastName(item1.storageName)]]
                                </div>
                            </div>
                        </template>
                      </div>
                      <div page-name="page-3-[[item.dateRegistered]]" id="page3[[item.dateRegistered]]">
                          <template is="dom-repeat" items="{{_toArray(item.videos)}}" as="item1">
                              <div class="container videos-list">
                                <div class="video-thumbnail">
                                  <video class="vidThumbnail" width="100px">
                                    <source src="[[item1.url]]" type="video/mp4">
                                    <source src="[[item1.url]]" type="video/ogg">
                                    Your browser does not support video.
                                  </video>
                                </div>
                                <div class="video-desc">
                                    <div class="row podcast-text" id="col[[item1.dateRegistered]][[item.dateRegistered]]" name="[[item1.dateRegistered]][[item.dateRegistered]]" on-tap="_videoClick" data="[[item1.url]]" onmouseover="" style="cursor: pointer;">
                                        [[_getVideoName(item1.storageName)]]
                                    </div>
                                </div>
                              </div>
                            </template>
                      </div>
                      <div page-name="page-4-[[item.dateRegistered]]" id="page4[[item.dateRegistered]]">
                          <div class="row">
                            <template is="dom-repeat" items="{{_toArray(item.photos)}}" as="item1">
                                <iron-image id="img[[item1.dateRegistered]]" class="avatar" sizing="cover" src="[[item1.url]]" on-click="_dialogImgOpen" onmouseover="" style="cursor: pointer;"></iron-image>
                              </template>
                          </div>
                      </div>
                    </iron-pages> 
                  </iron-collapse>
                </div>
      
          </div>
      </template>
    </div> -->
    <div id="snackbar"></div>
`;
  }

  static get is() { return 'thoughts-management'; }
  static get properties() {
    return {
      quotes: Object,
      user: {
          type: Object
      },
      _companyid: String,
      previouspage: String,
      thoughtsData: {
        type: Object,
        observer: '_onthoughtsDataReceived'
      },
      _selected: String,
      opened: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },
      lastSelected: {
        type: String,
        value: ''
      }
    };
  }
  connectedCallback() { 
    super.connectedCallback();
  }
  _openApproveDialog(e){
    let pendingThought = dom(this.root).querySelector('#'+e.target.id).data;

    var filteredArray = this.findObjectByKey(this.thoughtsData, "dailyThoughtID", pendingThought);

    this.$.thoughtTitle.innerHTML = '"'+filteredArray.title+'"';
    this.$.thoughtAuthor.innerHTML = filteredArray.subtitle;

    sessionStorage.setItem("pendingThoughtID",pendingThought);
    sessionStorage.setItem("pendingDailyThoughtType",filteredArray.dailyThoughtType);
    
    this.$.pldpDialog.open();
  }
  approveThought(){
    this.updateThought('approved');
  }
  declineThought(){
    this.updateThought('declined');
  }
  updateThought(status){
    var d = Date.now();
    var e = new Date(d);
    e.setSeconds(0,0);
    var newDate = Date.parse(e);

    let pendingThought = sessionStorage.getItem("pendingThoughtID");
    let DailyThoughtType = sessionStorage.getItem("pendingDailyThoughtType");

    var filteredArray = this.findObjectByKey(this.thoughtsData, "dailyThoughtID", pendingThought);
    var dateScheduled = filteredArray.dateScheduled;
    var topLeader_status = filteredArray.topLeader_status;

    if(dateScheduled > newDate){
      status = "unpublished";
    }else{
      topLeader_status = topLeader_status+"_"+status;
    }

    var DailyThoughtType_status = DailyThoughtType +"_"+status;
    var status = status;
    var companyID_status = this.user.companyID+"_"+status;
    var publish_status = this.user.companyID+"_"+status;

    // Get a reference to the database service
    var database = firebase.database();

    // Update the pldp's notification data to false
    var updates = {};
    updates['/dailyThoughts/' + pendingThought+'/dailyThoughtType_status'] = DailyThoughtType_status;
    updates['/dailyThoughts/' + pendingThought+'/status'] = status;
    updates['/dailyThoughts/' + pendingThought+'/companyID_status'] = companyID_status;
    updates['/dailyThoughts/' + pendingThought+'/topLeader_status'] = topLeader_status;
    updates['/dailyThoughts/' + pendingThought+'/publish_status'] = publish_status;

    database.ref().update(updates);

    this.$.pldpDialog.close();

    this.showSnackBar("Thought "+status+"!");
  }
  showSnackBar(msg){
    var x = this.$.snackbar;

    x.innerHTML = msg;

    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
  findObjectByKey(array, key, value) {
      for (var i = 0; i < array.length; i++) {
          if (array[i][key] === value) {
              return array[i];
          }
      }
      return null;
  }
  _getVideoName(storageName){
    let strName = '';
    strName = storageName.slice(storageName.lastIndexOf('/')+1);
    strName = strName.replace(new RegExp('_', 'g'), ' ');
    return strName;
  }
  _videoClick(e){      
    var videoClicked = dom(this.root).querySelector('#'+e.target.id).data;

    var videoPlayer = dom(this.root).querySelector('#videoPlayer');
    var videoPlayer1 = dom(this.root).querySelector('#videoPlayer1');
    var videoPlayer2 = dom(this.root).querySelector('#videoPlayer2');

    videoPlayer1.src = videoClicked;
    videoPlayer2.src = videoClicked;

    videoPlayer.load();
    this.$.videoDialog.open();
  }
  _dialogImgOpen(e){
    var a = dom(this.root).querySelector('#'+e.target.id).src;
    var b = this.$.showImage;
    b.src = a;
    this.$.imgDialog.open();
  }
  _getPodcastName(storageName){
    let strName = '';
    strName = storageName.slice(storageName.lastIndexOf('/')+1);
    strName = strName.replace(new RegExp('_', 'g'), ' ');
    return strName;
  }
  _toArray(obj) {
    if(obj != undefined){
      return Object.keys(obj).map(function(key) {
        // console.log('Key: '+key);
        //  console.log('Value: '+obj[key].length);
        return obj[key];
    });
    }
    
  }
  _objLen(obj) {
    let len = 0;
    if(obj != undefined){
      // console.log('Value: '+Object.keys(obj).length);
      len = Object.keys(obj).length;
    }
    return len;
  }
  toggle(e){
    var a = dom(this.root).querySelector('#'+e.target.id).data;

    var selectedElem = e.target.id;

    this.opened = dom(this.root).querySelector('#collapse'+a).opened;
        
    var res = selectedElem.substring(0, 3);
    
    if(res == 'blu'){
      this._selected = 'page-1-'+a;
    }else if(res == 'gre'){
      this._selected = 'page-2-'+a;
    }else if(res == 'cam'){
      this._selected = 'page-3-'+a;
    }else if(res == 'red'){
      this._selected = 'page-4-'+a;
    }

    if((this.lastSelected == this._selected) && (this.opened)){
      dom(this.root).querySelector('#collapse'+a).toggle();
    }

    if((this.lastSelected == this._selected) && (!this.opened)){
      dom(this.root).querySelector('#collapse'+a).toggle();
    }

    if((this.lastSelected != this._selected) && (!this.opened)){
      dom(this.root).querySelector('#collapse'+a).toggle();
    }

    this.lastSelected = this._selected;

  }
  _onthoughtsDataReceived(newData, oldData){
  }
  _sort(a, b) {  
            if (a.dateScheduled > b.dateScheduled) return -1;
            if (a.dateScheduled < b.dateScheduled) return 1;
            return 0;
        }
  _getURLS(urls, page, dateReg){
    let selectedElem = page+dateReg;

    var eleM = dom(this.root).querySelector('#'+selectedElem);
    let url = '';
    var newElem;

    for (var item in urls) { 

      url += '<div>'+urls[item].title+'</div>';
    }

    return dom(eleM).innerHTML = url;
  }
  _photo(photos, textColor){
    if(textColor == undefined){
                var color = '#ffffff';
            }else{
                var color = textColor;
            }
            let photo_url = "background-image: url('../data/land.jpg'); color: "+color+";";

            for (var item in photos) { 
                photo_url = "background-image: url('"+photos[item].url+"'); color: "+color+";";
            }

            return photo_url;
  }
  _profilePhoto(photo){
    let photo_url = "background-image: url('../images/profile/default-user.png');";

    if(photo == undefined){
      photo_url = "background-image: url('../images/profile/default-user.png');";
    }else if(photo == ""){
      photo_url = "background-image: url('../images/profile/default-user.png');";
    }else{
      photo_url = "background-image: url('"+photo+"');";
    }

    return photo_url;
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
            var hours = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
            var minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
            var locale = 'en-us';
            var month = date.toLocaleString(locale, { month: "long" });
            var year = date.getFullYear();
            var am_pm = date.getHours() >= 12 ? "PM" : "AM"

            return day+' '+month+' '+year+' '+hours+':'+minutes+" "+am_pm;
        }
}

window.customElements.define(ThoughtsManagement.is, ThoughtsManagement);

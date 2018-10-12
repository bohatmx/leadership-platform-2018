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
/* <link rel="import" href="../bower_components/polymer/lib/elements/dom-if.html"> */
/* Firebase Auth */
/* Firebase Query */
/* <link rel="import" href="app-icons.html">
<link rel="import" href="shared-styles.html"> */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '../../../@polymer/paper-icon-button/paper-icon-button.js';

import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/paper-dialog/paper-dialog.js';
import '../../../@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '../../../polymerfire/firebase-auth.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-database-behavior.js';
import '../../../@polymer/iron-image/iron-image.js';
import './play-media.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
import { importHref } from '../../../@polymer/polymer/lib/utils/import-href.js';
import { Element } from '../../../@polymer/polymer/polymer-element.js';
class ThoughtCardAttachments extends Element {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style include="w3-styles">
      .action-item{
        float: left;
        margin: 5px;
        border:1px solid #888;
        box-shadow: 0px 0px 10px #aaa;
        border-radius:20px;
        background-color: #fbfbfb;
        color:#404e57;
        position: relative;
        cursor: pointer;
      }

      .action-item.nbr{
        padding:8px;
        border-radius:4px;
        box-shadow: 0px 0px 10px #ddd;
        border-color:#ccc;
        border-radius:0px !important;
      }

      .tca{
        display: none;
        flex-flow:row;
        flex-wrap: wrap;
        display: none;
      }

      .tca.visible{
        display:flex !important;
      }

      .action-item a{
        text-decoration: none;
        text-transform: none;
      }

      .action-item .remove-btn{
        padding: 3px;
        border:1px solid #fff;
        border-radius: 50%;
        background-color: #aaa;
        color:#fff; 
      }

      .action-item .remove-btn:hover {
        background-color: rgb(207, 33, 33);
      }
      .action-item .remove-btn.abs{
        position:absolute;
        top:-8px;
        right: -8px;
      }

      .action-item .remove-btn iron-icon{
        padding:0px 0px 0px 2px !important;
        font-size:11pt;
      }

      .action-item iron-icon{
        margin:2px 2px 0px 2px;
      }

      iframe{
        border: none;
        margin: 0px; padding:0px;
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
      
    </style>
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

    <div class="w3-row">
      <div class="card-actions">
        <div class="horizontal justified">
          <paper-icon-button class="w3-text-blue" icon="myicons:small-link" on-click="_toggle" data-tca="tca-links"></paper-icon-button>
          <paper-icon-button class="w3-text-green" icon="myicons:small-mic" on-click="_toggle" data-tca="tca-podcasts"></paper-icon-button>
          <paper-icon-button class="w3-text-grey" icon="myicons:small-videocam" on-click="_toggle" data-tca="tca-videos"></paper-icon-button>
          <paper-icon-button class="w3-text-red" icon="myicons:small-image" on-click="_toggle" data-tca="tca-photos"></paper-icon-button>
          <!-- <paper-icon-button class="w3-text-brown" icon="myicons:small-share" data="[[item.dailyThoughtID]]" id="share[[item.dateRegistered]]"></paper-icon-button> -->
          <paper-button id="pldp[[item.dateRegistered]]" class="w3-text-red thought-actions pldp-text w3-small" data="[[item.dailyThoughtID]]" on-tap="_openPLDP" hidden\$="[[ispldp]]">My PLDP</paper-button>
        </div>
        <div class="horizontal justified">
          <paper-button class="w3-text-blue thought-actions" on-click="_toggle" data-tca="tca-links">[[_objLen(item.urls)]]</paper-button>
          <paper-button class="w3-text-green thought-actions" on-click="_toggle" data-tca="tca-podcasts">[[_objLen(item.podcasts)]]</paper-button>
          <paper-button class="w3-text-grey thought-actions" on-click="_toggle" data-tca="tca-videos">[[_objLen(item.videos)]]</paper-button>
          <paper-button class="w3-text-red thought-actions" on-click="_toggle" data-tca="tca-photos">[[_objLen(item.photos)]]</paper-button>
        </div>
      </div>
    </div>
    <div class="w3-container">
      <div class="tca-links tca">
        <template is="dom-repeat" items="{{_toArray(item.urls)}}" as="item1">
          <div class="container action-item w3-row">
            <template is="dom-if" if="[[_isEqual(item.journalUserID, user.userID)]]">
              <div class="w3-right remove-btn w3-circle w3-center" data="[[item1.lpUID]]" datatype="Link" dataval="[[itemid]]" on-tap="_deleteThisAttachment">
                <iron-icon icon="myicons:delete"></iron-icon>
              </div>
            </template>
            <div class="w3-rest w3-padding-small" style="max-width: 280px;">
              <a id="article[[item1.dateRegistered]]" class="more-links" target="_blank" href="[[item1.url]]" on-tap="_openArticle" data="[[item1.title]]">
                <iron-icon icon="myicons:small-link" class="w3-text-blue"></iron-icon>[[item1.title]]
              </a>
            </div>
          </div>
        </template>
      </div>
      <div class="tca-podcasts tca">
        <template is="dom-repeat" items="{{_toArray(item.podcasts)}}" as="item1">
          <div class="container action-item w3-row nbr">
            <template is="dom-if" if="[[_isEqual(item.journalUserID, user.userID)]]">
              <div class="w3-right remove-btn w3-circle w3-center abs" data="[[item1.lpUID]]" datatype="podcast" dataval="[[itemid]]" on-tap="_deleteThisAttachment">
                <iron-icon icon="myicons:delete"></iron-icon>
              </div>
            </template>
            <div id="podcast[[item1.dateRegistered]]" title="[[item.title]]" class="w3-rest w3-padding-small" on-tap="_openPodcast" data="[[item1.url]]" style="max-width: 280px;">
              <iron-icon icon="myicons:small-mic" class="w3-text-green"></iron-icon>[[item.subtitle]] [[item1.storageName]]
            </div>
          </div>
        </template>
      </div>
      <div class="tca-videos tca">
        <template is="dom-repeat" items="{{_toArray(item.videos)}}" as="item1">
          <div class="container videos-list action-item nbr">
            <template is="dom-if" if="[[_isEqual(item.journalUserID, user.userID)]]">
              <div class="w3-right remove-btn w3-circle abs" data="[[item1.lpUID]]" datatype="Video" dataval="[[itemid]]" on-tap="_deleteThisAttachment">
                <iron-icon icon="myicons:delete"></iron-icon>
              </div>
            </template>
            <div id="divthumb[[item1.dateRegistered]]" class="video-thumbnail" on-tap="_openVideo" data="[[item1.url]]" name="[[item.title]]" uploadtype="[[item1.UploadExternal]]">
              <template is="dom-if" if="[[_isEqual(item1.UploadExternal, 'videxternal')]]">
                <img id="img[[item1.dateRegistered]][[item.dateRegistered]]" style="max-width:120px" src\$="[[getYoutubeThumbnail(item1.url)]]" alt="LP" uploadtype="[[item1.UploadExternal]]" data="[[item1.url]]">
              </template>
              <template is="dom-if" if="[[_isEqual(item1.UploadExternal, 'vidupload')]]">
                <video id="thumb[[item1.dateRegistered]]" style="max-width:120px; cursor: pointer;" data="[[item1.url]]" on-click="_openVideo" uploadtype="[[item1.UploadExternal]]" poster="../data/play.png">
                  <source src="[[item1.url]]" type="video/mp4">
                  <source src="[[item1.url]]" type="video/ogg">
                  Your browser does not support video.
                </video>
              </template>
            </div>
          </div>
        </template>
      </div>
      <div class="tca-photos tca">
        <template is="dom-repeat" items="{{_toArray(item.photos)}}" as="item1">
          <div class="container action-item nbr" data="[[item1.url]]" on-tap="_changeParentPhoto">
            <img src="[[item1.url]]" style="width:150px">
            <template is="dom-if" if="[[_isEqual(item.journalUserID, user.userID)]]">
              <div class="w3-right remove-btn w3-circle abs" data="[[item1.lpUID]]" datatype="Photo" dataval="[[itemid]]" on-tap="_deleteThisAttachment">
                <iron-icon icon="myicons:delete"></iron-icon>
                <!-- <span id="delURL[[item1.dateRegistered]]" data="[[item1.lpUID]]" dataval="[[itemid]]"></span> -->
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <div class="ldp-modal">
      <div class="ldp-modal-content" style="max-width:600px;resize: both;overflow: auto;">
        <span class="w3-display-topright w3-padding w3-red w3-text-white" on-tap="_closeVideo" style="z-index: 999; cursor: pointer;">×</span>
        <div class="w3-white w3-card-2 w3-round">
          <div class="w3-row" style="padding:3px">
            <iframe id="videoPlayer" width="100%" height="400" src="" autoplay="false" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="">
            </iframe>
            <video src="" id="videoPlayerUpload" controls="" autoplay="">
              <source id="videoPlayerUpload1" src="" type="video/mp4">
              <source id="videoPlayerUpload2" src="" type="video/ogg">
              Your browser does not support video.
            </video>
          </div>
          <div class="w3-padding-large w3-medium w3-text-dark-grey"><i>{{videoname}}</i></div>
        </div>
      </div>
    </div>

		<div class="container">
      <paper-dialog id="deleteDialog">
        <paper-icon-button icon="myicons:cancel" class="red"></paper-icon-button>
        <h3 id="discardTitle"></h3>
        <hr>
          <p id="thoughtTitle" class="thought-rate-title"></p>
          <p id="thoughtAuthor" class="thought-rate-title paper-font-caption"></p>
        <hr>
        <div class="buttons">
          <paper-button dialog-dismiss="">CANCEL</paper-button>
          <paper-button on-tap="deleteThought">DISCARD</paper-button>
        </div>
      </paper-dialog>
    </div>
    <paper-dialog id="pldpDialog">
      <h2><paper-icon-button icon="myicons:event-note" class="blue"></paper-icon-button>My PLDP</h2>
      <hr>
      <paper-dialog-scrollable>
          <p>Based on what you just read / watched / listened to, would you like to add an Action to your PLDP (Personal Leadership Development Plan)?</p>
      </paper-dialog-scrollable>
      <hr>
      <div class="buttons">
        <paper-button dialog-dismiss="" class="w3-text-red">Close</paper-button>
        <a href="my-pldp" name="name" class="pldp-link" on-tap="_addToPLDP">Proceed</a>
      </div>
    </paper-dialog>
`;
  }

  static get is() { return 'thought-card-attachments'; }
  static get properties() {
    return {
      user: {
        type: Object
      },
      videourl: {type:String},
      videoname: {type:String},
      thoughtype: {type: String},
      itemid: {type: String},
      thetype: {type: String},
      item: {
        type: Object
      },
      ispldp: {
        type: Boolean,
        value: false
      }
    };
  }

  _captureClicks(res, obj){
    var database = firebase.database();
    var userID = this.user.userID;
    var userName = this.user.firstName + " " + this.user.lastName;
    var myPhoto;
    var myCompanyID = this.user.companyID;
    var myCompanyName = this.user.companyName;
    var dateRegistered = Date.now();
    var postType = "thoughts";

    if(this.user.photoURL != undefined || this.user.photoURL != ""){
                myPhoto = this.user.photoURL;
            }else{
                myPhoto = "";
            }

            if(myPhoto == undefined){
                myPhoto = "";
    }
    
    if(this.thetype == "dailyThoughts"){
      postType = "thoughts";
    }else if(this.thetype == "news"){
      postType = "articles"
    }

    var journalID = this.itemid;
    var journalUserID = this.item.journalUserID;
    var journalUserName = this.item.journalUserName;
    var journalCompanyID = this.item.companyID;
    var journalCompanyName = this.item.companyName;
    var journalDateRegistered = this.item.dateRegistered;
    var journalPhotoURL;
    
    if(this.item.photoURL != undefined || this.item.photoURL != ""){
                journalPhotoURL = this.item.photoURL;
            }else{
                journalPhotoURL = "";
            }

            if(journalPhotoURL == undefined){
                journalPhotoURL = "";
    }

    var data = {
      userID: userID,
      userName: userName,
      myPhoto: myPhoto,
      myCompanyID: myCompanyID,
      myCompanyName: myCompanyName,
      dateRegistered: dateRegistered,
      postType: postType,
      journalID: journalID,
      journalUserID: journalUserID,
      journalUserName: journalUserName,
      journalCompanyID: journalCompanyID,
      journalCompanyName: journalCompanyName,
      journalDateRegistered: journalDateRegistered,
      journalPhotoURL: journalPhotoURL,
      clickType:"posts",
      clickArea:res,
      clickItem:obj
    }

    database.ref('user-clicks').push(data);
  }

  _openArticle(e){
    var obj = {
      itemID: e.currentTarget.id,
      title: e.currentTarget.data,
      ref: e.currentTarget.href
    }

    this._captureClicks("openedLink", obj);
  }

  _setPoster(){
    var platform = localStorage.getItem("platform");
    if((platform == undefined) || (platform == "")){
      return "../data/play.png";
    }
    else if((platform == "iOS") || (platform == "Android")){
      return "../data/play.png";
    }

    return "";
    
  }

  _changeParentPhoto(e){
    var url = e.currentTarget.data;
    var parent = dom(this).parentNode;
    $(parent).find('.thought-img').css('background-image', "url('"+url+"&qwe3')");
  }

  _notYouTube(url){
    return this.getMediaURL(url) == url;
  }

  _closeVideo(e){
    var modal = dom(this.root).querySelectorAll('.ldp-modal');
    var modalCloser = dom(this.root).querySelectorAll('.ldp-modal-close');
            this.videourl = "";
            this.videoname = "";

    var videoPlayer = dom(this.root).querySelector('#videoPlayer');
            videoPlayer.src = "";

            var videoPlayerUpload = dom(this.root).querySelector('#videoPlayerUpload');
            var videoPlayerUpload1 = dom(this.root).querySelector('#videoPlayerUpload1');
            var videoPlayerUpload2 = dom(this.root).querySelector('#videoPlayerUpload2');
            
            videoPlayerUpload.src = "";
            videoPlayerUpload1.src = "";
            videoPlayerUpload2.src = "";

    $(modalCloser).addClass('w3-hide');
    $(modal).css('display', 'none');
  }

  _openPodcast(e){
            var podcastClicked = dom(this.root).querySelector('#'+e.currentTarget.id).data;
    var podcastTitle = dom(this.root).querySelector('#'+e.currentTarget.id).title;
    var itemID = e.currentTarget.id;

            var src = this.getMediaURL(podcastClicked);
            this.media_title = podcastTitle;

            this.loadsrc = src;
    this._openMediaModal();

    var obj = {
      itemID: itemID,
      title: podcastTitle,
      ref: src
    }

    this._captureClicks("listenedTo", obj);
        }

  _openMediaModal(){
    var modal = dom(this.root).querySelector('#play-media');
    this.loadPage('play-media');
            modal.style.display = 'block';
        }

  _closeMediaModal(){
this.loadsrc = "";
      var modal = dom(this.root).querySelector('#play-media');
      modal.style.display = 'none';
}

  loadPage(page){
    var resolvedPageUrl = this.resolveUrl(page + '.html');
    importHref(
        resolvedPageUrl,
        null,
        page + '.html',
        true);
  }

  _openVideo(e){
    var name = e.currentTarget.name;
    var url = e.currentTarget.data;
    this.videoname = name;
    var itemID = e.currentTarget.id;

    var uploadtype = e.currentTarget.uploadtype;

    if(uploadtype == "videxternal"){
      this.videourl = this.getMediaURL(url);
      var videoPlayer = dom(this.root).querySelector('#videoPlayer');
      videoPlayer.style = "display: block;";

      var videoPlayerUpload = dom(this.root).querySelector('#videoPlayerUpload');
      var videoPlayerUpload1 = dom(this.root).querySelector('#videoPlayerUpload1');
      var videoPlayerUpload2 = dom(this.root).querySelector('#videoPlayerUpload2');

      videoPlayerUpload.src = "";
      videoPlayerUpload1.src = "";
      videoPlayerUpload2.src = "";

      videoPlayerUpload.style = "display: none;";

      videoPlayer.src = this.videourl;

      var obj = {
        itemID: itemID,
        title: this.videoname,
        ref: this.videourl
      }

      this._captureClicks("viewed", obj);
    }else{
      this.videourl = this.getMediaURL(url);

      var videoPlayer = dom(this.root).querySelector('#videoPlayer');
      videoPlayer.style = "display: none;";
      videoPlayer.src = "";

      var videoPlayerUpload = dom(this.root).querySelector('#videoPlayerUpload');
      videoPlayerUpload.style = "display: block; width:100%; max-height: 400px;";

      var videoPlayerUpload1 = dom(this.root).querySelector('#videoPlayerUpload1');
      var videoPlayerUpload2 = dom(this.root).querySelector('#videoPlayerUpload2');
      
      // var src = this.getMediaURL(videoClicked);
      videoPlayerUpload.src = this.videourl;
      videoPlayerUpload1.src = this.videourl;
      videoPlayerUpload2.src = this.videourl;

      var obj = {
        itemID: itemID,
        title: this.videoname,
        ref: this.videourl
      }

      this._captureClicks("viewed", obj);
    }

    var modal = dom(this.root).querySelectorAll('.ldp-modal');
    var modalCloser = dom(this.root).querySelectorAll('.ldp-modal-close');

    $(modalCloser).removeClass('w3-hide');
    $(modal).css('display', 'block');
  }

  _isYouTube(url){
    return this.getMediaURL(url) != url;
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

  getYoutubeThumbnail(youtubeURL) {
      var res = this.getYoutubeID(youtubeURL);
      return "https://img.youtube.com/vi/"+res+"/0.jpg";
  }

  _isEqual(a,b){
    return a === b;
  }

  _toggle(e){
    var actionClicked = $(e.currentTarget);
    var tca = actionClicked.data('tca');

    console.log("tca: ", tca);

    actionClicked.toggleClass('inSelection').siblings().removeClass('inSelection');
    var tcaParent = actionClicked.parents('.w3-row').siblings('.w3-container');

    tcaParent.find('.tca').removeClass('visible');

    if(actionClicked.hasClass('inSelection')){
      tcaParent.find('.'+tca).addClass('visible');
    }
    else{
      tcaParent.find('.'+tca).removeClass('visible');
    }

    this._captureClicks(tca, "icon");
  }

  _getVideoName(storageName){
let strName = '';
if(storageName != undefined){
strName = storageName.slice(storageName.lastIndexOf('/')+1);
        strName = strName.replace(new RegExp('_', 'g'), ' ');
}
      return strName;
  }

  _toArray(obj) {
      if(obj != undefined){
					return Object.keys(obj).map(function(key) {
              var retObj = {};
              retObj = obj[key];
              // assign object id to lpUID
              retObj['lpUID'] = key;
              return retObj;
              // return obj[key];
      });
      }
  }

  _objLen(obj) {
      let len = 0;
      if(obj != undefined){
					len = Object.keys(obj).length;
      }
      return len;
  }

  _openPLDP(e){
      var thoughtID = dom(this.root).querySelector('#'+e.target.id).data;
      sessionStorage.setItem("PLDP_MasterClassAdd", thoughtID);
this.$.pldpDialog.open();
this._captureClicks("Open PLDP", "button");
  }

  closePLDPDialog(){
      this.$.pldpDialog.close();
  }

  findObjectByKey(array, key, value) {
					for (var i = 0; i < array.length; i++) {
                  if (array[i][key] === value) {
                          return array[i];
                  }
					}
					return null;
  }

  _deleteThisAttachment(e){
    var itemID = e.currentTarget.data;
    var itemType = e.currentTarget.getAttribute('datatype');
    
    this.$.discardTitle.innerHTML = "<iron-icon icon='myicons:delete' class='w3-text-red'></iron-icon> Discard "+itemType;
            this.$.thoughtTitle.innerHTML = 'Are you sure that you want to remove this '+itemType+'?';
            this.$.thoughtAuthor.innerHTML = '';

    $(this.$.discardTitle).attr('itemid', itemID);
    $(this.$.discardTitle).attr('itemtype', itemType);

            this.$.deleteDialog.open();
  }

  deleteThought(){
    var typestoEnd = {
      'Link':'urls',
      'Video':'videos',
      'podcast':'podcasts',
      'Photo':'photos',
    }
    this.$.deleteDialog.close();
    var itemID = $(this.$.discardTitle).attr('itemid');
    var itemType = $(this.$.discardTitle).attr('itemtype');

    var database = firebase.database();
            database.ref(this.thetype+'/'+this.itemid+'/'+typestoEnd[itemType]+'/'+ itemID).remove();
  }

  _addToPLDP(){
      
      this.item.PLDPUserID = this.user.userID;
      this.item.PLDPUserName = this.user.firstName+" "+this.user.lastName;

      // instantiate db
      let database = firebase.database();

      let ref = database.ref('myPLDP/'+this.thetype);
      let pldpKey = this.user.userID+'_____'+this.itemid;
delete this.item['$key']; //remove the $key property
      ref.child(pldpKey).set(this.item);
this.closePLDPDialog();
this._captureClicks("Save to PLDP", "dialog");
  }
}

window.customElements.define(ThoughtCardAttachments.is, ThoughtCardAttachments);

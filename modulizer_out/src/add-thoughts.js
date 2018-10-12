/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* iron elements  */
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
import '../../../@polymer/paper-progress/paper-progress.js';
import '../../../@polymer/paper-toast/paper-toast.js';
import '../../../@polymer/paper-spinner/paper-spinner.js';
import '../../../@polymer/iron-collapse/iron-collapse.js';
import '../../../@polymer/paper-styles/shadow.js';
import '../../../@polymer/iron-image/iron-image.js';
import '../../../@polymer/iron-pages/iron-pages.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-input/paper-textarea.js';
import '../../../@polymer/paper-radio-group/paper-radio-group.js';
import '../../../@polymer/paper-radio-button/paper-radio-button.js';
import '../../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../../@polymer/paper-item/paper-item.js';
import '../../../@polymer/paper-listbox/paper-listbox.js';
import '../../../@polymer/paper-dialog/paper-dialog.js';
import '../../../@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '../../../datetime-picker/datetime-picker.js';
import '../../../datetime-picker/date-picker.js';
import '../../../datetime-picker/time-picker.js';
import '../../../l2t-paper-color/l2t-paper-color.js';
import '../../../polymerfire/firebase-app.js';
import '../../../polymerfire/firebase-auth.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-storage-multiupload.js';
import '../../../polymerfire/firebase-storage-upload-task.js';
import '../../../polymerfire/firebase-storage-ref.js';
import '../../../polymerfire/firebase-database-behavior.js';
import './voice-recorder.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
class AddThoughts extends Element {
  static get template() {
    return html`
  <style include="w3-styles"></style>
  <style include="shared-styles">
    paper-icon-button {
      color: var(--app-secondary-text);
    --paper-icon-button-ink-color: var(--app-secondary-text);;
    }
    
    .add-thought-icons{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
    }
    paper-button.indigo {
        background-color: var(--app-status-color);
        color: var(--app-secondary-text);
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
    #authorInput {text-transform: capitalize!important;}
    .buttons{
      margin-top: 14px;
      display: block;
    }
    .article-input-flex{
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
    }
    .article-input-flex > .article-inputbox{
      flex-grow: 9;
    }
    .article-input-flex > .article-btn{
      flex-grow: 1;
    }
    .datetime{
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
    }
    .dateScheduled{
      margin-right: 18px;
      /* border-bottom: 1px solid; */
      flex-grow: 6;
    }
    .timeScheduled{
      /* border-bottom: 1px solid; */
      flex-grow: 4;
    }
    .advanced-settings{
      padding: 16px;
      background-color: #efefef;
      border-radius: 4px;
    }
    /* The Modal (background) */
    .modal {
            display: none; /* Hidden by default */
            position: absolute; /* Stay in place */
            z-index: 1; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
            -webkit-animation-name: fadeIn; /* Fade in the background */
            -webkit-animation-duration: 0.4s;
            animation-name: fadeIn;
            animation-duration: 0.4s;
        }
        /* Modal Content */
        .modal-content {
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          background-color: #fefefe;
          width: 100%;
          -webkit-animation-name: slideIn;
          -webkit-animation-duration: 0.4s;
          animation-name: slideIn;
          animation-duration: 0.4s;
        }
        /* The Close Button */
        .close-modal {
            color: white;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        .close-modal:hover,
        .close-modal:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
        .modal-header {
            padding: 2px 16px;
            background-color: #3b0013;
            color: white;
        }
        .modal-body {padding: 2px 16px;}
        .modal-footer {
            padding: 2px 16px;
            background-color: #3b0013;
            color: white;
        }
        /* Add Animation */
        @-webkit-keyframes slideIn {
            from {bottom: -300px; opacity: 0} 
            to {bottom: 0; opacity: 1}
        }
        @keyframes slideIn {
            from {bottom: -300px; opacity: 0}
            to {bottom: 0; opacity: 1}
        }
        @-webkit-keyframes fadeIn {
            from {opacity: 0} 
            to {opacity: 1}
        }
        @keyframes fadeIn {
            from {opacity: 0} 
            to {opacity: 1}
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
          max-width: 598px;
        }
        .thoughtItems > .thoughtTitle{
          font-size: 16px;
        }
        .thoughtItems > .thoughtSubtitle{
          margin-top: 16px;
          font-size: 12px;
          font-style: italic;
        }
        .previewFooter{
          display: flex;
          position: absolute;
          bottom: 0;
          width: 100%;
          max-width: 600px;
          margin-bottom: 6px;
        }
        .previewText{
          display: -webkit-flex;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: 0 16px;
        }

  </style>
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
  <!-- The Modal -->
<div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
        <span id="closeModal" class="close-modal">×</span>
        <h2>Post Preview</h2>
      </div>
      <div class="modal-body">
          
      </div>
      <div class="thought-prevImg" id="thoughtImg">
        <iron-image style="width: 100%; height: 280px; max-width: 600px;" id="imagePreview" src="" preload="" sizing="cover"></iron-image>
        <div class="thoughtItems">
            <div class="thoughtTitle">[[thoughtTitle]]</div>
            <div class="thoughtSubtitle">[[thoughtSubtitle]]</div>
        </div>
        <div class="previewFooter">
          <iron-image src="[[company.companyLogo]]" style="width:46px; height:46px; padding:2px" preload="" sizing="cover"></iron-image>
          <div class="previewText">
            <div id="thoughtSlogan">[[thoughtSlogan]]</div>
            <div id="thoughtWebsite">[[thoughtWebsite]]</div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
    <div class="container">
      <div class="add-thought">
        <form>
          <paper-textarea autocapitalize="" maxlength="240" char-counter="" rows="2" multiple="" always-float-label="" label="Enter thought" type="text" id="thoughtInput" name="thoughtInput" auto-validate="" value="{{thoughtTitle::input}}" tabindex="0">
          </paper-textarea>
          <paper-input id="authorInput" name="authorInput" maxlength="60" char-counter="" always-float-label="" label="Enter thought author" type="text" auto-validate="" value="{{thoughtSubtitle::input}}" autocapitalize="" tabindex="1"></paper-input>
          <br>
          <label><small>Schedule Date &amp; TIme</small></label><br>
          <div class="datetime">
            <paper-input class="dateScheduled" id="dateScheduled" name="dateScheduled" always-float-label="" label="Date" type="date" auto-validate="" value\$="[[_defaultDate()]]" tabindex="2"></paper-input>
            <paper-input class="timeScheduled" id="timeScheduled" name="timeScheduled" always-float-label="" label="Time" type="time" auto-validate="" value\$="[[_defaultTime()]]" tabindex="3"></paper-input>
          </div>
          <br>
            <paper-radio-group hidden="[[isEqual(user.userType, 3)]]" selected\$="[[selectedPost(user.userType)]]" id="postInternalGlobal" name="postInternalGlobal">
              <paper-radio-button hidden="[[!isEqual(user.userType, 4)]]" id="postInternal" name="postInternal">{{internalCaption}}</paper-radio-button>
              <paper-radio-button hidden="[[!isEqual(user.userType, 4)]]" id="postGlobally" name="postGlobally">Post Globally</paper-radio-button>
              <!-- Hide i-lead option for the GC public users -->
              <paper-radio-button hidden="[[isEqual(user.companyID, '-LEiZPT-C2PyLu_YLKNU')]]" id="postILead" name="postILead">Post I-LEAD</paper-radio-button>
            </paper-radio-group>
          <hr>
          <label class="paper-font-caption">Attach</label>
          <div class="horizontal justified add-thought-icons">
              <paper-icon-button class="w3-text-blue" icon="myicons:small-link" on-click="toggle" id="blueLink"></paper-icon-button>
              <paper-icon-button class="w3-text-green" icon="myicons:small-mic" on-click="toggle" id="greenMic"></paper-icon-button>
              <paper-icon-button icon="myicons:small-videocam" class="w3-text-dark-grey" on-click="toggle" id="camVideo"></paper-icon-button>
              <paper-icon-button class="w3-text-red" icon="myicons:small-image" on-click="toggle" id="redImage"></paper-icon-button>
          </div>

          <div class="container more-container">
              <iron-collapse id="collapseAddThought">
                <iron-pages selected="[[_selected]]" attr-for-selected="page-name">
                  <div page-name="page-1" id="page1" style="border: 2px solid blue; padding: 0 8px;">
                      <div class="container"><paper-input type="text" name="articleDesc" id="articleDesc" always-float-label="" label="Enter Article Title"></paper-input></div>
                    <div class="row article-input-flex">
                        <div class="article-inputbox">
                            <paper-input type="url" name="urlInput" id="urlInput" always-float-label="" label="Enter Article Link"></paper-input>
                        </div>
                        <div class="article-btn">
                            <paper-icon-button class="app-btn-background" icon="app:check" on-tap="handleArticle"></paper-icon-button>
                        </div>
                    </div>
                      <div class="container more-links" id="articleUrl">
                      </div>
                  </div>
                  <div page-name="page-2" id="page2" style="border: 2px solid green; padding: 0 8px;">
                    <paper-radio-group id="PodcastExternalRecord" name="PodcastExternalRecord">
                        <paper-radio-button id="podcastexternal" name="podcastexternal" on-click="togglePodcast">External Link</paper-radio-button>
                        <paper-radio-button id="podcastrecord" name="podcastrecord" on-click="togglePodcast">Record Voicemail</paper-radio-button>
                        <paper-radio-button id="greenopodcast" name="greenopodcast" on-click="toggleNone">None</paper-radio-button>
                      </paper-radio-group>
                      <iron-collapse id="collapsePodcast">
                        <iron-pages selected="[[_podcastoption]]" attr-for-selected="page-name">
                          <div page-name="page-externalpodcast" id="externalpodcast" style="border: 2px solid tomato; padding: 8px 8px; margin-bottom: 10px;">
                            <div class="container"><paper-input type="text" name="podcastDesc" id="podcastDesc" always-float-label="" label="Enter Podcast Title"></paper-input></div>
                            <div class="row article-input-flex">
                                <div class="article-inputbox">
                                    <paper-input type="url" name="podcasturlInput" id="podcasturlInput" always-float-label="" label="Enter Podcast Link"></paper-input>
                                </div>
                                <div class="article-btn">
                                    <paper-icon-button class="app-btn-background" icon="app:check" on-tap="handlePodcastURL"></paper-icon-button>
                                </div>
                            </div>
                            <div class="container more-links" id="podcastUrl">
                            </div>
                          </div>
                          <div page-name="page-recordpodcast" id="recordpodcast" style="overflow: auto;">
                           <voice-recorder id="voiceRecorder"></voice-recorder>
                          </div>
                        </iron-pages>
                      </iron-collapse>
                    
                  </div>
                  <div page-name="page-3" id="page3" style="border: 2px solid black; padding: 0 8px;">
                    <paper-radio-group id="VidUploadExternal" name="VidUploadExternal">
                      <paper-radio-button id="videxternal" name="videxternal" on-click="toggleVid">External Link</paper-radio-button>
                      <paper-radio-button id="vidupload" name="vidupload" on-click="toggleVid">Upload Video</paper-radio-button>
                      <paper-radio-button id="camNovideo" name="camNovideo" on-click="toggleNone">None</paper-radio-button>
                    </paper-radio-group>
                    <iron-collapse id="collapseVideo">
                      <iron-pages selected="[[_vidoption]]" attr-for-selected="page-name">
                        <div page-name="page-externalvid" id="externalvid" style="border: 2px solid tomato; padding: 8px 8px; margin-bottom: 10px;">
                          <div class="container"><paper-input type="text" name="videoDesc" id="videoDesc" always-float-label="" label="Enter Video Title"></paper-input></div>
                          <div class="row article-input-flex">
                            <div class="article-inputbox">
                              <paper-input type="url" name="videourlInput" id="videourlInput" always-float-label="" label="Enter Youtube Link"></paper-input>
                            </div>
                            <div class="article-btn">
                              <paper-icon-button class="app-btn-background" icon="app:check" on-tap="handleVideoURL"></paper-icon-button>
                            </div>
                          </div>
                          <div class="container more-links" id="videoUrl">
                          </div>
                        </div>
                        <div page-name="page-uploadvid" id="uploadvid" style="border: 2px solid rgb(20, 148, 99); padding: 8px 8px; margin-bottom: 10px;">
                          <div style="width:100%;" id="hideRemoveVideo" hidden="">
                            <paper-button class="app-primary-text-color" raised="" on-tap="removeVideo">Remove Video</paper-button>
                          </div>
                          <label for="video_input" class="paper-font-body2" style="cursor: pointer; margin-top: 10px;">
                            <paper-icon-button class="blue" icon="app:ondemand-video"></paper-icon-button>
                            Select Video from Gallery
                          </label>
                          <form id="selectVideoForm">
                            <input type="file" id="video_input" accept="video/*,video/mp4" on-change="handleVideo">
                          </form>
                          <div class="videos-list">
                            <video id="videoPlayer" style="width:100%; max-height:250px;" controls="" controlslist="nodownload">
                              <source id="videoPlayer1" src="" type="video/mp4">
                              <source id="videoPlayer2" src="" type="video/ogg">
                              <source id="videoPlayer3" src="" type="video/webm">
                              Your browser does not support video.
                              </video>
                          </div>
                        </div>
                      </iron-pages>
                    </iron-collapse>
                  </div>
                  <div page-name="page-4" id="page4">
                      <div class="row">
                        <div class="uploadButtons">
                          <div class="image-upload">
                            <table class="upload-options" style="border: 2px solid red; padding: 0 8px;">
                              <tbody><tr>
                                <td class="paper-font-caption" colspan="2">
                                  <div style="width:100%;" id="hideRemoveImage" hidden="">
                                    <paper-button class="app-primary-text-color" raised="" on-tap="removeImage">Remove Image</paper-button>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="paper-font-caption" colspan="2">
                                  <strong>Gallery:</strong>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label for="local_photo_input" style="cursor: pointer;">
                                    <paper-icon-button class="app-primary-text-color" icon="app:local-library"></paper-icon-button>
                                    Select Image
                                  </label>
                                  <form id="selectImageForm">
                                    <input id="local_photo_input" type="file" on-change="handlePhoto" accept="image/*">
                                  </form>
                                </td>
                              </tr>
                            </tbody></table>
                          </div>
                        </div>
                        <div class="selectedImages">
                          <iron-image id="imgPicked" class="new-thought-avatar" sizing="contain" src="" onmouseover="" style="cursor: pointer;"></iron-image>
                        </div>
                      </div>
                    </div>
                </iron-pages> 
              </iron-collapse>
            </div>
          <div class="video-progress">
            <firebase-storage-multiupload id="fs" path="/videos" upload-tasks="{{uploadedFiles}}" on-error="catchError" force-unique="">
            </firebase-storage-multiupload>
            <hr>
            <template is="dom-repeat" items="[[uploadedFiles]]">
              <div style="padding: 20px">
                <firebase-storage-upload-task task="[[item]]" id="task-[[index]]" bytes-transferred="{{item.bytesTransferred}}" total-bytes="{{item.totalBytes}}" state="{{item.state}}" download-url="{{item.downloadUrl}}" metadata="{{item.metadata}}" path="{{item.path}}">
                </firebase-storage-upload-task>
                <p><em>Video Upload State: [[item.state]]</em></p>
                <template is="dom-if" if="[[!isEqual(item.state, 'success')]]">
                  <paper-progress value="{{item.bytesTransferred}}" min="0" max="{{item.totalBytes}}" style="width: 100%;">
                  </paper-progress>
                  <br>
                </template>
                <template is="dom-if" if="{{isEqual(item.state, 'success')}}">
                  <firebase-storage-ref path="{{item.path}}" storage-uri="{{gsUri}}" id="ref-[[index]]" metadata="{{item.refMetadata}}" download-url="{{item.refDownloadUrl}}">
                  </firebase-storage-ref>
                  <p>[[_uploadComplete(item.refDownloadUrl)]]</p>
                </template>
                <template is="dom-if" if="[[!isEqual(item.state, 'success')]]">
                  <template is="dom-if" if="[[isEqual(item.state, 'running')]]">
                    <button on-tap="cancel" value="{{index}}">Cancel</button>
                    <button on-tap="pause" value="{{index}}">Pause</button>
                  </template>
                  <template is="dom-if" if="[[isEqual(item.state, 'paused')]]">
                    <button on-tap="resume" value="{{index}}">Resume</button>
                  </template>
                </template>
                <br>
              </div>
            </template>
          </div> 
          <div class="advanced-settings">
            <label><h3>Advanced Settings</h3></label>
            <l2t-paper-color id="textColor" style="width: 50%" label="Text color select"></l2t-paper-color>
            <paper-input id="slogan" name="slogan" always-float-label="" label="Company Slogan" type="text" value="{{company.companySlogan}}"></paper-input>
            <paper-input id="website" name="website" always-float-label="" label="Website" type="text" value="{{company.companyWebsite}}"></paper-input>
            <paper-button class="app-primary-text-color" raised="" on-tap="previewPost">Preview Post</paper-button>
          </div>
          <hr>
          <div class="buttons">
            <paper-button raised="" class="w3-blue" on-tap="postThought">
              <iron-icon icon="app:send"></iron-icon>&nbsp;SUBMIT
            </paper-button>
          </div>
        </form>
      </div>
    </div>
    <div id="snackbar"></div>
`;
  }

  static get is() { return 'add-thoughts'; }
  ready(){
    super.ready();
    sessionStorage.setItem("closeElement", false);

    var modal = dom(this.root).querySelector('#myModal');
    var span = dom(this.root).querySelector('#closeModal');

    span.addEventListener('click', function(e){
        modal.style.display = "none";
    });
    
  }
  connectedCallback() { 
    super.connectedCallback(); /* ... */
    // console.log("attached");
  }
  static get properties() {
    return {
      user: {
        type: Object
      },
      company: {
        type: Object,
        observer: '_companyChanged'
      },
      addedit: {
        type: Number,
        observer: '_addeditChanged'
      },
      _companyid: String,
      previouspage: String,
      _selected: String,
      _vidoption: String,
      opened: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },
      lastSelected: {
        type: String,
        value: ''
      },
      lastSelectedVid: {
        type: String,
        value: ''
      },
      lastSelectedPodcast: {
        type: String,
        value: ''
      },
      selectedImageObj: {
        type: Object
      },
      selectedImage: String,
      progressVal: String,
      articleObj: {
        type: Object,
        value: []
      },
      podcastObj: {
        type: Object,
        value: []
      },
      videoObj: {
        type: Object,
        value: []
      },
      editObj: {
        type: Array
      },
      uploadTasks: {
        type: Array,
        observer: '_uploadTasksChanged'
      },
      uploadedFiles: {
        type: Array,
      },
      thoughtTitle: String,
      thoughtSubtitle: String,
      internalCaption: {
        type: String,
        value: "Post Organisational"
      }
    };
  }
  _companyChanged(){
    if(this.company != undefined){
      if(this.company.companyID == "-LEiZPT-C2PyLu_YLKNU") this.internalCaption = "Post I-LEAD"
      else this.internalCaption = "Post Organisational";
    }
  }

  selectedPost(user_type){
    if(user_type == 4){
      return "postInternal";
    }else{
      return "postILead";
    }

  }
  previewPost(){
    var modal = dom(this.root).querySelector('#myModal');
    var imagePreview = dom(this.root).querySelector('#imagePreview');
    var thoughtImg = dom(this.root).querySelector('#thoughtImg');
    
    var textColor = dom(this.root).querySelector('#textColor').value;

    if(this.$.imgPicked.src != ""){
      imagePreview.src = this.$.imgPicked.src;
    }else{
      if(this.editObj != undefined){
        var photoURL = this._photo(this.editObj.photos);
      }else{
        var photoURL = "../data/land.jpg";
      }

      imagePreview.src = photoURL;

    }

    if(textColor == undefined){
      textColor = '#ffffff';
    }

    thoughtImg.style = 'color: '+textColor+';';

    var slogan = this.$.slogan.value;
    var website = this.$.website.value;
    
    this.thoughtSlogan = slogan;
    this.thoughtWebsite = website;

    modal.style.display = "block";
  }
  removeFromParent(){
    var a = dom(this).parentNode;
    $(a).siblings('#spanCloseItemModal').trigger('click');
  }
  _addeditChanged(){
    this.isaddedit();
  }
  _defaultDate(){
    var dateScheduled = new Date();
    
    var year = this.returnDatePart(dateScheduled, "year");
    var month = this.returnDatePart(dateScheduled, "month");
    var day = this.returnDatePart(dateScheduled, "day");
    var hours = this.returnDatePart(dateScheduled, "hours");
    var minutes = this.returnDatePart(dateScheduled, "minutes");

    return year+"-"+month+"-"+day;
  }
  _defaultTime(){
    var dateScheduled = new Date();

    var year = this.returnDatePart(dateScheduled, "year");
    var month = this.returnDatePart(dateScheduled, "month");
    var day = this.returnDatePart(dateScheduled, "day");
    var hours = this.returnDatePart(dateScheduled, "hours");
    var minutes = this.returnDatePart(dateScheduled, "minutes");

    return hours+":"+minutes;
  }
  isaddedit(){
    if(this.addedit == undefined) this.addedit = 0;

    // if(this.addedit == 0) this.$.thoughtCaption.innerHTML = "Add Thought";
    else if(this.addedit == 1){
      this.clearArray(this.editObj);
      // this.$.thoughtCaption.innerHTML = "Edit Thought";

      let editThoughtStr = ''+sessionStorage.getItem("editThoughtStr");

      this.editObj = JSON.parse(editThoughtStr);

      if(!this.editObj == undefined || this.editObj != null){

        var dateScheduled = new Date(this.editObj.dateScheduled);

        var year = this.returnDatePart(dateScheduled, "year");
        var month = this.returnDatePart(dateScheduled, "month");
        var day = this.returnDatePart(dateScheduled, "day");
        var hours = this.returnDatePart(dateScheduled, "hours");
        var minutes = this.returnDatePart(dateScheduled, "minutes");

        this.$.dateScheduled.value = year+"-"+month+"-"+day;
        this.$.timeScheduled.value = hours+":"+minutes;

        // set titles
        this.$.thoughtInput.value = this.editObj.title;
        this.$.authorInput.value = this.editObj.subtitle;
        if(this.editObj.dailyThoughtType == 1) this.$.postInternalGlobal.selected = "postInternal";
        else if (this.editObj.dailyThoughtType == 2) this.$.postInternalGlobal.selected = "postGlobally";
        else this.$.postInternalGlobal.selected = "postILead";

        // var thoughtTitle = Polymer.dom(this.root).querySelector('#thoughtTitle');
        // var thoughtSubtitle = Polymer.dom(this.root).querySelector('#thoughtSubtitle');

        this.thoughtTitle = this.editObj.title;
        this.thoughtSubtitle = this.editObj.subtitle;

        var slogan = this.editObj.slogan || this.company.companySlogan || '';
        var website = this.editObj.website || this.company.companyWebsite || '';
        var logo = this.editObj.logo || this.company.companyLogo || '';
        var textColor = this.editObj.textColor || '#ffffff';

        var thoughtImg = dom(this.root).querySelector('#thoughtImg');
        dom(this.root).querySelector('#textColor').value = textColor;
        var imagePreview = dom(this.root).querySelector('#imagePreview');

        thoughtImg.style = 'color: '+textColor+';';
        
        this.thoughtSlogan = slogan;
        this.thoughtWebsite = website;

        if(this.$.imgPicked.src != ""){
          imagePreview.src = this.$.imgPicked.src;
        }else{
          var photoURL = this._photo(this.editObj.photos);
          imagePreview.src = photoURL;
        }

      }
    } 
  }
  showSnackBar(msg){
    var x = this.$.snackbar;

    x.innerHTML = msg;

    x.className = "show";
    setTimeout(function(){
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  _photo(photos){
    let photo_url = "../data/land.jpg";

    if(photos == undefined){
      photo_url = "../data/land.jpg";
    }else{
      for ( var item in photos) { 
      photo_url = photos[item].url;
    }
    }
    return photo_url;
  }
  _removeItems(){
    // if(this.addedit == 1){
      // reset objects
      this.$.thoughtInput.value = "";
      this.$.authorInput.value = "";
      this.$.postInternalGlobal.selected = "postInternal";

      // reset photo viewer
      this.$.imgPicked.src = "";

      // reset audio
      // Audio files

      // reset articles object
      this.clearArray(this.podcastObj);

      // reset articles object
      this.clearArray(this.videoObj);

      // reset articles object
      this.clearArray(this.articleObj);

      this.addedit = -1;

      sessionStorage.removeItem("editThoughtID");
      sessionStorage.removeItem("editThoughtStr");
      sessionStorage.removeItem("photo_upload");
      sessionStorage.removeItem("thumbnail_upload");
    // }
  }
  removeImage(){
      this.$.imgPicked.src = "";
      this.$.hideRemoveImage.style = "display: none";
      var selectImageForm = dom(this.root).querySelector('#selectImageForm');
      selectImageForm.reset();
      sessionStorage.removeItem("thumbnail_upload");
      sessionStorage.removeItem("photo_upload");
  }
  handlePhoto(e){
      // console.log('photo: '+e.target.id);
      // console.log('photo: '+e.target.files[0].name);

      var photoSelected = e.target.files[0];

      // compress photo ready to upload
      this.resizeImage(photoSelected, "photo");

      // compress thumbnail for upload
      this.resizeImage(photoSelected, "thumbnail");

      var selectedImage = URL.createObjectURL(photoSelected);

      this.$.imgPicked.src = selectedImage;
      this.$.hideRemoveImage.style = "display: block";
  }
  _dialogImgOpen(e){
    var a = dom(this.root).querySelector('#'+e.target.id).src;
    var b = this.$.showImage;
    b.src = a;
    this.$.imgDialog.open();
  }
  handleArticle(){
    let articleDesc = this.$.articleDesc.value;
    let urlInput = this.$.urlInput.value;

    let timeInMs = Date.now();
    let datetime = new Date(timeInMs).toUTCString();
    let urlObj = {};

    if(articleDesc == undefined){
      articleDesc = "";
    }

    if(urlInput == undefined){
      urlInput = "";
    }

    // check url input if len > 0
    if(urlInput.length > 0){
      let articleLink = document.createElement('a');
      let articleDiv = document.createElement('div');
      let articleSpan = document.createElement('span');

      articleLink.setAttribute("class","more-links block-display links-a");
      articleLink.target="_blank";
      articleLink.href=urlInput;

      articleDiv.setAttribute('id', 'div'+timeInMs);
      articleDiv.setAttribute('class', 'links-div');

      articleSpan.setAttribute('class', 'links-span');
      articleSpan.setAttribute('id', 'span'+timeInMs);
      articleSpan.innerHTML = "&times;";

      articleSpan.setAttribute('index', timeInMs);

      var articleobj = this.articleObj;

      articleSpan.addEventListener('click', function(e){
          var a = dom(this).parentNode;
          var b = dom(a).parentNode;
          
          var index = e.target.getAttribute('index');
          var removeIndex = articleobj.map(function(item) { return item.id; }).indexOf(index);
          articleobj.splice(removeIndex,1);

          b.removeChild(a);
      });

      // check if article title is provided
      if(articleDesc.length > 0)
        articleLink.innerHTML=articleDesc;
      else{
        articleLink.innerHTML=urlInput;
        articleDesc = urlInput;
      }

      articleDiv.appendChild(articleLink);
      articleDiv.appendChild(articleSpan);

      // add article to div for preview
      this.$.articleUrl.appendChild(articleDiv);

      // create new url object
      urlObj = {
        companyID: this.user.companyID,
        companyName: this.user.companyName,
        dateRegistered: Date.parse(datetime),
        stringDateRegistered: datetime,
        title: articleDesc,
        url: urlInput
      }

      console.log('urlObj',urlObj)
      console.log('article obj before push', this.articleObj);
      // push new object to final article object
      this.articleObj.push(urlObj);
      console.log('article obj after push', this.articleObj);

      // this.showSnackBar("Article added successfully!");
    }
    // re-initialize the text objects
    this.$.articleDesc.value = "";
    this.$.urlInput.value = "";
  }
  handlePodcastURL(){
    let podcastDesc = this.$.podcastDesc.value;
    let podcasturlInput = this.$.podcasturlInput.value;

    let timeInMs = Date.now();
    let datetime = new Date(timeInMs).toUTCString();
    let urlObj = {};

    if(podcastDesc == undefined){
      podcastDesc = "";
    }

    if(podcasturlInput == undefined){
      podcasturlInput = "";
    }

    // check url input if len > 0
    if(podcasturlInput.length > 0){
      let podcastLink = document.createElement('a');
      let podcastDiv = document.createElement('div');
      let podcastSpan = document.createElement('span');

      podcastLink.setAttribute("class","more-links block-display links-a");
      podcastLink.target="_blank";
      podcastLink.href=podcasturlInput;

      podcastDiv.setAttribute('id', 'div'+timeInMs);
      podcastDiv.setAttribute('class', 'links-div');

      podcastSpan.setAttribute('class', 'links-span');
      podcastSpan.setAttribute('id', 'span'+timeInMs);
      podcastSpan.innerHTML = "&times;";

      podcastSpan.setAttribute('index', timeInMs);

      var podcastobj = this.podcastObj;

      podcastSpan.addEventListener('click', function(e){
          var a = dom(this).parentNode;
          var b = dom(a).parentNode;
          
          var index = e.target.getAttribute('index');
          var removeIndex = podcastobj.map(function(item) { return item.id; }).indexOf(index);
          podcastobj.splice(removeIndex,1);

          b.removeChild(a);
      });

      // check if article title is provided
      if(podcastDesc.length > 0)
        podcastLink.innerHTML=podcastDesc;
      else{
        podcastLink.innerHTML=podcasturlInput;
        podcastDesc = podcasturlInput;
      }

      podcastDiv.appendChild(podcastLink);
      podcastDiv.appendChild(podcastSpan);

      // add article to div for preview
      this.$.podcastUrl.appendChild(podcastDiv);

      // create new url object
      urlObj = {
        companyID: this.user.companyID,
        companyName: this.user.companyName,
        dateRegistered: Date.parse(datetime),
        stringDateRegistered: datetime,
        title: podcastDesc,
        url: podcasturlInput
      }
      // push new object to final article object
      this.podcastObj.push(urlObj);

      // this.showSnackBar("Article added successfully!");
    }
    // re-initialize the text objects
    this.$.podcastDesc.value = "";
    this.$.podcasturlInput.value = "";
  }
  catchError(e) {
    console.log(e.detail.message);
  }
  cancel(e) {
    dom(this.root).querySelector('#task-' + e.target.value).cancel();
  }
  resume(e) {
    dom(this.root).querySelector('#task-' + e.target.value).resume();
  }
  pause(e) {
    dom(this.root).querySelector('#task-' + e.target.value).pause();
  }
  download(e) {
    dom(this.root).querySelector('#ref-' + e.target.value).getDownloadURL().then(function(d) {
      console.log(d)
      window.open(d, '_blank')
    })
  }
  deleteFile(e) {
    dom(this.root).querySelector('#ref-' + e.target.value).delete().then(function(d) {
      console.log(d)
    })
  }
  _uploadTasksChanged(uploadTasks) {
    console.log(uploadTasks);
  }
  _uploadedFilesChanged(uploadedFiles) {
    console.log(uploadedFiles);
  }
  isEqual(a, b) {
    return a === b;
  }
  isNotILeader() {
    var userType = this.user.userType;

    console.log("user type", userType);

    if(userType != 3 || userType == undefined){
      return true;
    }

    return false;
  }
  uploadVideo() {
    dom(this.root).querySelector('#fs').upload(dom(this.root).querySelector('#video_input').files)
  }
  uploadPodcast() {
    dom(this.root).querySelector('#fs').upload(dom(this.root).querySelector('#podcast_input').files)
  }
  _uploadComplete(url){
    if(url != undefined){
      var downloadURL = url;
      var videoID = sessionStorage.getItem("newVideoKey");
      var newThoughtKey = sessionStorage.getItem("newThoughtKey");
      var refThoughtVideo = sessionStorage.getItem("refThoughtVideo");

      if(refThoughtVideo != null){
        var database = firebase.database();
        var videoupdates = {};
        var thoughtupdates = {};

        videoupdates['/videos/'+videoID+'/url'] = downloadURL;
        database.ref().update(videoupdates);

        thoughtupdates['/dailyThoughts/'+newThoughtKey+'/videos/'+refThoughtVideo+'/url'] = downloadURL;
        database.ref().update(thoughtupdates);

        sessionStorage.removeItem("newVideoKey");
        sessionStorage.removeItem("refThoughtVideo");

        // reset video
        var videoPlayer = dom(this.root).querySelector('#videoPlayer');
        var videoPlayer1 = dom(this.root).querySelector('#videoPlayer1');
        var videoPlayer2 = dom(this.root).querySelector('#videoPlayer2');
        var videoPlayer3 = dom(this.root).querySelector('#videoPlayer3');

        videoPlayer1.src = "";
        videoPlayer2.src = "";
        videoPlayer3.src = "";
        videoPlayer.src = "";

        this.showSnackBar("Thought posted successfully!");

        this._removeItems();
        var that = this;

        setTimeout(myFunction, 3000);
        function myFunction(){
          that.removeFromParent();
        }

        dom(this.root).querySelector('#fs').reset();

        window.location.reload();
      }
    }
  }
  removeVideo(){
    var selectVideoForm = dom(this.root).querySelector('#selectVideoForm');
    var videoPlayer = dom(this.root).querySelector('#videoPlayer');
    var videoPlayer1 = dom(this.root).querySelector('#videoPlayer1');
    var videoPlayer2 = dom(this.root).querySelector('#videoPlayer2');
    var videoPlayer3 = dom(this.root).querySelector('#videoPlayer3');

    videoPlayer1.src = "";
    videoPlayer2.src = "";
    videoPlayer3.src = "";

    videoPlayer.load();

    selectVideoForm.reset();

    this.$.hideRemoveVideo.style = 'display: none;';
  }
  handleVideo(e){
    // console.log('video'+e.target.files[0].name);

    var videoSelected = e.target.files[0];

    var vidURL = URL.createObjectURL(videoSelected);

    var videoPlayer = dom(this.root).querySelector('#videoPlayer');
    var videoPlayer1 = dom(this.root).querySelector('#videoPlayer1');
    var videoPlayer2 = dom(this.root).querySelector('#videoPlayer2');
    var videoPlayer3 = dom(this.root).querySelector('#videoPlayer3');

    videoPlayer1.src = vidURL;
    videoPlayer2.src = vidURL;
    videoPlayer3.src = vidURL;

    videoPlayer.load();

    this.$.hideRemoveVideo.style = 'display: block;';
  }
  uploadVoicemail(voicemail, audioObj){
    var podcastupdates = {};
    var thoughtupdates = {};

    // File or Blob
    var filename = new Date().toISOString()+'.wav';
    var downloadURL='';
    var database = firebase.database();

    // Create the file metadata
    var metadata = {
    contentType: 'audio/wav'
    };

    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('podcasts/' + filename).put(voicemail[0], metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
    }, function(error) {

    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
        case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

        case 'storage/canceled':
        // User canceled the upload
        break;

        case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
    }, function() {
        // Upload completed successfully, now we can get the download URL
        var newThoughtKey = audioObj.dailyThoughtID;
        
        downloadURL = uploadTask.snapshot.downloadURL;

        // new keys for podcast
        var newPodcastKey = database.ref().child('podcasts').push().key;

        // write video data to new thoughts collection
        var refThoughtPodcast = database.ref().child('dailyThoughts/' + newThoughtKey +'/podcasts').push().key;

        audioObj.url = downloadURL;
        audioObj.storageName = filename;
        audioObj.podcastID = newPodcastKey;

        var podcastThoughtUpd = {};
        podcastThoughtUpd['dailyThoughts/' + newThoughtKey +'/podcasts/' + refThoughtPodcast] = audioObj;
        database.ref().update(podcastThoughtUpd);

        // write podcast data to collection
        var podcastupdates = {};
        podcastupdates['/podcasts/' + newPodcastKey] = audioObj;
        database.ref().update(podcastupdates);
    });
  }
  handleVideoURL(){
    let videoDesc = this.$.videoDesc.value;
    let videourlInput = this.$.videourlInput.value;

    let timeInMs = Date.now();
    let datetime = new Date(timeInMs).toUTCString();
    let urlObj = {};

    if(videoDesc == undefined){
      videoDesc = "";
    }

    if(videourlInput == undefined){
      videourlInput = "";
    }

    // check url input if len > 0
    if(videourlInput.length > 0){
      let videoLink = document.createElement('a');
      let videoDiv = document.createElement('div');
      let videoSpan = document.createElement('span');

      videoLink.setAttribute("class","more-links block-display links-a");
      videoLink.target="_blank";
      videoLink.href=videourlInput;

      videoDiv.setAttribute('id', 'div'+timeInMs);
      videoDiv.setAttribute('class', 'links-div');

      videoSpan.setAttribute('class', 'links-span');
      videoSpan.setAttribute('id', 'span'+timeInMs);
      videoSpan.innerHTML = "&times;";

      var vidobj = this.videoObj;

      videoSpan.setAttribute('index', timeInMs);

      videoSpan.addEventListener('click', function(e){
          var a = dom(this).parentNode;
          var b = dom(a).parentNode;
          
          var index = e.target.getAttribute('index');
          var removeIndex = vidobj.map(function(item) { return item.id; }).indexOf(index);
          vidobj.splice(removeIndex,1);

          b.removeChild(a);
      });

      // check if article title is provided
      if(videoDesc.length > 0)
        videoLink.innerHTML=videoDesc;
      else{
        videoLink.innerHTML=videourlInput;
        videoDesc = videourlInput;
      }

      videoDiv.appendChild(videoLink);
      videoDiv.appendChild(videoSpan);

      // add article to div for preview
      this.$.videoUrl.appendChild(videoDiv);

      // create new url object
      urlObj = {
        id: ""+timeInMs,
        companyID: this.user.companyID,
        companyName: this.user.companyName,
        dateRegistered: Date.parse(datetime),
        stringDateRegistered: datetime,
        title: videoDesc,
        url: videourlInput
      }
      // push new object to final article object
      this.videoObj.push(urlObj);

      // this.showSnackBar("Article added successfully!");
    }
    // re-initialize the text objects
    this.$.videoDesc.value = "";
    this.$.videourlInput.value = "";
  }
  findIndexInData(array, key, value) {
      for (var i = 0; i < array.length; i++) {
          if (array[i][key] === value) {
              return i;
          }
      }
      return -1;
  }
  createPhotoElement(){
    var divImg = document.createElement('div');
    divImg.style.color = 'blue';
    divImg.innerHTML = "test is working";
    this.$.page4.appendChild(divImg);
  }

  toggleNone(e){
    var selectedElem = e.target.id;
    this.opened = dom(this.root).querySelector('#collapseAddThought').opened;
    var res = selectedElem.substring(0, 3);
    
    if(res == 'gre'){
      this._selected = 'page-2';
      dom(this.root).querySelector('#collapsePodcast').opened = false;
    }else if(res == 'cam'){
      this._selected = 'page-3';
      dom(this.root).querySelector('#collapseVideo').opened = false;
    }

    if((this.lastSelected == this._selected) && (this.opened)){
      dom(this.root).querySelector('#collapseAddThought').toggle();
    }

    if((this.lastSelected == this._selected) && (!this.opened)){
      dom(this.root).querySelector('#collapseAddThought').toggle();
    }

    if((this.lastSelected != this._selected) && (!this.opened)){
      dom(this.root).querySelector('#collapseAddThought').toggle();
    }
    this.lastSelected = this._selected;

  }
  toggle(e){
    var selectedElem = e.target.id;

    this.opened = dom(this.root).querySelector('#collapseAddThought').opened;
        
    var res = selectedElem.substring(0, 3);
    
    if(res == 'blu'){
      this._selected = 'page-1';
    }else if(res == 'gre'){
      this._selected = 'page-2';
    }else if(res == 'cam'){
      this._selected = 'page-3';
    }else if(res == 'red'){
      this._selected = 'page-4';
    }

    if((this.lastSelected == this._selected) && (this.opened)){
      dom(this.root).querySelector('#collapseAddThought').toggle();
    }

    if((this.lastSelected == this._selected) && (!this.opened)){
      dom(this.root).querySelector('#collapseAddThought').toggle();
    }

    if((this.lastSelected != this._selected) && (!this.opened)){
      dom(this.root).querySelector('#collapseAddThought').toggle();
    }
    this.lastSelected = this._selected;
  }
  toggleVid(e){
    var selectedElem = e.target.id;
    this.opened = dom(this.root).querySelector('#collapseVideo').opened;
    
    if(selectedElem == 'videxternal'){
      this._vidoption = 'page-externalvid';
    }else if(selectedElem == 'vidupload'){
      this._vidoption = 'page-uploadvid';
    }

    if((this.lastSelectedVid == this._vidoption) && (this.opened)){
      dom(this.root).querySelector('#collapseVideo').toggle();
    }

    if((this.lastSelectedVid == this._vidoption) && (!this.opened)){
      dom(this.root).querySelector('#collapseVideo').toggle();
    }

    if((this.lastSelectedVid != this._vidoption) && (!this.opened)){
      dom(this.root).querySelector('#collapseVideo').toggle();
    }
    this.lastSelectedVid = this._vidoption;
  }
  togglePodcast(e){
    var selectedElem = e.target.id;
    
    this.opened = dom(this.root).querySelector('#collapsePodcast').opened;
    
    if(selectedElem == 'podcastexternal'){
      this._podcastoption = 'page-externalpodcast';
    }else if(selectedElem == 'podcastrecord'){
      this._podcastoption = 'page-recordpodcast';
    }

    if((this.lastSelectedPodcast == this._podcastoption) && (this.opened)){
      dom(this.root).querySelector('#collapsePodcast').toggle();
    }

    if((this.lastSelectedPodcast == this._podcastoption) && (!this.opened)){
      dom(this.root).querySelector('#collapsePodcast').toggle();
    }

    if((this.lastSelectedPodcast != this._podcastoption) && (!this.opened)){
      dom(this.root).querySelector('#collapsePodcast').toggle();
    }
    this.lastSelectedPodcast = this._podcastoption;
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
              sessionStorage.setItem("thumbnail_upload", dataURL);
            }else{
              sessionStorage.setItem("photo_upload", dataURL);
            }
          }
      }
      reader.readAsDataURL(file);
  }
  formatDate(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hours = '' + d.getHours(),
    minutes = '' + d.getMinutes(),
    seconds = '' + d.getSeconds(),
    milliseconds = '' + d.getMilliseconds();

    var today = new Date(),
    thisYear = today.getFullYear();

    // get week day name Sunday - Saturday
    var dayName = this.getDayMonthStr(d.getDay(), "day", true);

    // get month name
    var monthName = this.getDayMonthStr(d.getMonth(), "month", true);

    // add preceding zeros where needed
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;
    if (milliseconds.length < 2) milliseconds = '0' + milliseconds;

    // format thoughts date
    // Monday, 04 December 2017 14:21:56
    var thoughtDate = dayName+", "+day+" "+monthName+" "+year+" "+hours+":"+minutes+":"+seconds;

    return thoughtDate;
    // return [year, month, day].join('-');
  }
  returnDatePart(date, part) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hours = '' + d.getHours(),
    minutes = '' + d.getMinutes(),
    seconds = '' + d.getSeconds(),
    milliseconds = '' + d.getMilliseconds();

    var today = new Date(),
    thisYear = today.getFullYear();

    // get week day name Sunday - Saturday
    var dayName = this.getDayMonthStr(d.getDay(), "day", true);

    // get month name
    var monthName = this.getDayMonthStr(d.getMonth(), "month", true);

    // add preceding zeros where needed
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;
    if (milliseconds.length < 2) milliseconds = '0' + milliseconds;

    if(part == "year") {
      return year;
    }
    else if(part == "month"){
      return month;
    }
    else if(part == "day"){
      return day;
    }
    else if(part == "hours"){
      return hours;
    }
    else if(part == "minutes"){
      return minutes;
    }
    else if(part == "seconds"){
      return seconds;
    }
  }
  getDayMonthStr(val, dateParam, long){
    // days
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var daysShort = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];

    // Months
    var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September","October", "November", "December"];
    var monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep","Oct", "Nov", "Dec"];

    if(dateParam == "day" && long == true){
      // return day in long format
      return days[val];
    }
    else if(dateParam == "day" && long == false){
      // return days in short
      return daysShort[val];
    }
    if(dateParam == "month" && long == true){
      // return month in long format
      return monthNames[val];
    }
    else if(dateParam == "month" && long == false){
      // return month in short
      return monthNamesShort[val];
    }
    
  }
  postThought(){
    // declare and initialize variables
    var title = this.$.thoughtInput.value;
    var subtitle = this.$.authorInput.value;
    var postInternalGlobal = this.$.postInternalGlobal.selected;
    var confirmedDate = this.$.dateScheduled.value;
    var selectedTime = this.$.timeScheduled.value;

    let active = true;
    let company_status = "";
    let VidUploadExternal = this.$.VidUploadExternal.selected;
    let PodcastExternalRecord = this.$.PodcastExternalRecord.selected;
    var voicemail = [];
    this.clearArray(voicemail);
    var voiceRecorder = dom(this.root).querySelector('#voiceRecorder');

    var userType = sessionStorage.getItem("user"+this.user.userType);
    var user_type = "user"+this.user.userType;
    var publish_status = "";

    var photoURL = "";

    if(this.user.photoURL != undefined || this.user.photoURL != ""){
      photoURL = this.user.photoURL;
    }else{
      photoURL = "";
    }

    if(photoURL == undefined){
      photoURL = "";
    }

    if(this.$.imgPicked.src != ""){
      var photo = this.$.local_photo_input.files[0];
    }else{
      var photo = undefined;
    }

    // advanced settings
    var textColor = this.$.textColor.value;
    var website = this.$.website.value;
    var slogan = this.$.slogan.value;
    var logo = this.company.companyLogo || '';

    if(textColor == undefined){
      textColor = "#ffffff";
    }
    if(website == undefined){
      website = "";
    }
    if(slogan == undefined){
      slogan = "";
    }
    if(logo == undefined){
      logo = "";
    }

    var photoDownloadURL = "";
    var thumbnailURL = "";

    // var uploader = this.$.uploader;
    var journalUserID = this.user.userID;
    var journalUserName = this.user.firstName+" "+this.user.lastName;

    var companyID = this.user.companyID;
    var companyName = this.user.companyName;

    var photo_upload, thumbnail_upload;

    // Validate thought date
    if ((confirmedDate == undefined) || (confirmedDate.trim() == "")){
      this.showSnackBar("Please select schedule date!");
      return;
    };
    // Validate pldp time
    if ((selectedTime == undefined)){
      this.showSnackBar("Please select schedule time!");
      return;
    };

    // get date and time
    var timeInMs = Date.now();
    var datetime = new Date(timeInMs);
    var datetimeMilli = Date.parse(datetime);

    // format date
    datetime = this.formatDate(datetime);

    var concatDateTime = confirmedDate + " "+selectedTime;
    var getDatePart = this.splitDate(confirmedDate, "-");
    var actualDate = getDatePart[1]+"/"+getDatePart[2]+"/"+getDatePart[0]+" "+selectedTime+":00";

    var stringDateScheduled = new Date(actualDate);
    var dateScheduled = Date.parse(stringDateScheduled);
    var checkStatus = "";
    var topLeader_status = "false";

    if(datetimeMilli > dateScheduled){
      checkStatus = sessionStorage.getItem("APPROVED");
    }else{
      checkStatus = sessionStorage.getItem("UNPUBLISHED");
    }
    if(checkStatus == "") checkStatus = "unpublished";

    //set status
    var status = checkStatus;

    // format date
    datetime = this.formatDate(datetime);
    stringDateScheduled = this.formatDate(actualDate);

    // Validate thought
    if ((title == undefined) || (title.trim() == "")){
      this.showSnackBar("Please enter the thought!");
      return;
    }

    // Validate thought author
    if ((subtitle == undefined) || (subtitle.trim() == "")){
      this.showSnackBar("Please enter the thought author!");
      return;
    }

    // Post internal
    if(postInternalGlobal == 'postInternal'){
      var DailyThoughtDescription = sessionStorage.getItem("DESC_INTERNAL_DAILY_THOUGHT");
      var DailyThoughtType = 1;
    }
    // Post global
    if(postInternalGlobal == 'postGlobally'){
      var DailyThoughtDescription = sessionStorage.getItem("DESC_GLOBAL_DAILY_THOUGHT");
      var DailyThoughtType = 2;
    }

    // Post i-lead
    if(postInternalGlobal == 'postILead'){
      var DailyThoughtDescription = sessionStorage.getItem("DESC_ILEAD_DAILY_THOUGHT");
      var DailyThoughtType = 3;
    }
    
    // Platinum User,  Platinum Admin, Company Admin, Daily Thoughts, I-Leader
    if ((user_type == 'user4') || (user_type == 'user7') || (user_type == 'user6') || (user_type == 'user9') || (user_type == 'user3')) {
        var DailyThoughtType_status = DailyThoughtType +"_"+status;
        // var status = sessionStorage.getItem("APPROVED");
        var companyID_status = this.user.companyID+"_"+status;

        if(user_type == 'user4') topLeader_status = 'true';
        if(status == 'approved') topLeader_status = topLeader_status+'_'+status;
    }
    // Gold User - Master Contributor
    else if (user_type == 'user5') {
      if(postInternalGlobal == 'postILead'){
        // set public company ID and status
        var DailyThoughtType_status = DailyThoughtType +"_"+status;
        var companyID_status = "-LEiZPT-C2PyLu_YLKNU_"+status;
        // status here can approved or unpublished
        publish_status = "-LEiZPT-C2PyLu_YLKNU_"+status;
      }else{
        var DailyThoughtType_status = DailyThoughtType +"_"+sessionStorage.getItem("PENDING");
        status = sessionStorage.getItem("PENDING");
        var companyID_status = this.user.companyID+"_"+sessionStorage.getItem("PENDING");
        // status here can approved or unpublished
        publish_status = this.user.companyID+"_"+status;
      }
    } 
    else {
      this.showSnackBar('This account is not authorised to post, Please contact the Admin.');
      return;
    }
    /*
    HC - Global Contributor
    MC - Master Contributor

    If(HC + Global) then Appears on HC 
    If(HC + Internal) then Appears on Org
    If(LDP User) then Appears on Daily
    If(MC) then Appears on Org after approval

    Create a new Node publish_status (publish for section & status)
    If(HC + Global) => hc_approved/pending/unpublished/declined
    If(HC + Internal) => org_approved/pending/unpublished/declined
    If(LDP USer) => daily_approved/pending/unpublished/declined
    If(MC) => org_approved/pending/unpublished/declined - usually starts with pending
    */ 

    // IF HC Posts Global
    if((user_type == 'user4') && (DailyThoughtType == 2)){
      // status here can approved or unpublished
      publish_status = "hc_"+status;
    }
    // IF HC Posts Internal
    else if((user_type == 'user4') && (DailyThoughtType == 1)){
      // status here can approved or unpublished
      publish_status = this.user.companyID+"_"+status;
    }
    // company admin or platinum admin or i-leader
    else if((user_type == 'user7') || (user_type == 'user6') || (user_type == 'user3')){
      // status here can approved or unpublished
      publish_status = this.user.companyID+"_"+status;
    }
    // Daily thoughts user
    else if(user_type == 'user9'){
      // status will be approved or unpublished
      publish_status = "daily_"+status;
    }

    if(postInternalGlobal == 'postILead'){
      // set public company ID and status
      var DailyThoughtType_status = DailyThoughtType +"_"+status;
      var companyID_status = "-LEiZPT-C2PyLu_YLKNU_"+status;
      // status here can approved or unpublished
      publish_status = "-LEiZPT-C2PyLu_YLKNU_"+status;
      companyID = "-LEiZPT-C2PyLu_YLKNU";
    }

    if(user_type == 'user9'){
      // status will be approved or unpublished
      publish_status = "daily_"+status;
      var DailyThoughtType_status = DailyThoughtType +"_"+status;
      var companyID_status = this.user.companyID+"_"+status;
      companyID = this.user.companyID;
    }

    if(VidUploadExternal == 'vidupload'){
      // Validate video file
      var vidfile = dom(this.root).querySelector('#video_input').files[0];

      if (vidfile == undefined){
        this.showSnackBar("Please upload video file !");
        return;
      }else{
        this.uploadVideo();
      }
    }

    if(PodcastExternalRecord == 'podcastrecord'){
      voicemail = voiceRecorder.voicemail();
    }

    // Get a reference to the database service
    var database = firebase.database();
    var storage = firebase.storage();

    // check if the media has been uploaded
    if(photo != undefined){
      // ref for photo and thubnails
      var refPhotos = storage.ref('photos/'+photo.name+timeInMs);
      var refThumbnail = storage.ref('thumbnails/thumbnail'+photo.name+timeInMs);

      // new keys for photo and thumbnails
      var newPhotoKey = database.ref().child('photos').push().key;
      var newThumbnailKey = database.ref().child('thumbnails').push().key;

      // get compressed photo and thumbnail ready to upload
      photo_upload = sessionStorage.getItem("photo_upload");
      thumbnail_upload = sessionStorage.getItem("thumbnail_upload");
    }

    // Add Thought
    if(this.addedit == 0){
      // Get a key for a new thought.
      var newThoughtKey = database.ref().child('dailyThoughts').push().key;

      // fix data
      var data = {
        active: true,
        companyID: companyID,
        companyName: this.user.companyName,
        dailyThoughtID: newThoughtKey,
        companyID_status: companyID_status,
        dailyThoughtDescription: DailyThoughtDescription,
        dailyThoughtType: DailyThoughtType,
        dailyThoughtType_status: DailyThoughtType_status,
        status: status,
        dateRegistered: datetimeMilli,
        dateScheduled: dateScheduled,
        dateUpdated: 0,
        journalUserID: this.user.userID,
        journalUserName: this.user.firstName+" "+this.user.lastName,
        stringDateRegistered: datetime,
        stringDateScheduled: stringDateScheduled,
        subtitle: subtitle,
        title: title,
        userType: userType,
        photoURL: photoURL,
        logo: logo,
        website: website,
        slogan: slogan,
        textColor: textColor,
        topLeader_status: topLeader_status,
        publish_status: publish_status
      }

      // Write the new thought's data
      var updates = {};
      updates['/dailyThoughts/' + newThoughtKey] = data;
      database.ref().update(updates);
    }
    else{
      // Get a key for a new thought.
      var newThoughtKey = this.editObj.dailyThoughtID;

      // Update the pldp's notification data to false
      var data = {};
      data['/dailyThoughts/' + newThoughtKey+'/dailyThoughtDescription'] = DailyThoughtDescription;
      data['/dailyThoughts/' + newThoughtKey+'/dailyThoughtType'] = DailyThoughtType;
      data['/dailyThoughts/' + newThoughtKey+'/dailyThoughtType_status'] = DailyThoughtType_status;
      data['/dailyThoughts/' + newThoughtKey+'/companyID_status'] = companyID_status;
      // data['/dailyThoughts/' + newThoughtKey+'/dateRegistered'] = Date.parse(datetimeMilli);
      data['/dailyThoughts/' + newThoughtKey+'/dateScheduled'] = dateScheduled;
      // data['/dailyThoughts/' + newThoughtKey+'/stringDateRegistered'] = datetime;
      data['/dailyThoughts/' + newThoughtKey+'/stringDateScheduled'] = stringDateScheduled;
      data['/dailyThoughts/' + newThoughtKey+'/subtitle'] = subtitle;
      data['/dailyThoughts/' + newThoughtKey+'/title'] = title;
      data['/dailyThoughts/' + newThoughtKey+'/photoURL'] = photoURL;

      data['/dailyThoughts/' + newThoughtKey+'/logo'] = logo;
      data['/dailyThoughts/' + newThoughtKey+'/website'] = website;
      data['/dailyThoughts/' + newThoughtKey+'/slogan'] = slogan;
      data['/dailyThoughts/' + newThoughtKey+'/textColor'] = textColor;
      data['/dailyThoughts/' + newThoughtKey+'/topLeader_status'] = topLeader_status;
      data['/dailyThoughts/' + newThoughtKey+'/status'] = status;
      data['/dailyThoughts/' + newThoughtKey+'/publish_status'] = publish_status;

      database.ref().update(data);

      sessionStorage.removeItem("editThoughtID");
      sessionStorage.removeItem("editThoughtStr");
      this.clearArray(this.editObj);
    }
    // End addedit thought

    // Add url to thought
    var urlCount = Object.keys(this.articleObj).length;

    for (var i = 0; i < urlCount; i++) {
      var urls = {
        companyID: this.articleObj[i].companyID,
        companyName: this.articleObj[i].companyName,
        dateRegistered: this.articleObj[i].dateRegistered,
        stringDateRegistered: this.articleObj[i].stringDateRegistered,
        title: this.articleObj[i].title,
        url: this.articleObj[i].url
      }

      var refUrl = database.ref('dailyThoughts/' + newThoughtKey +'/urls');
      refUrl.push(urls);

      // remove/clear any existing achor elements
      var element = this.$.articleUrl;
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }

    this.clearArray(this.articleObj);
    // Podcast Section
    if(PodcastExternalRecord == 'podcastrecord'){
      // create photo object
      // podcastDescription = Recording, podcastType = 1 
      // podcastDescription = Podcast, podcastType = 2 
      var audioObj = {
        active: true,
        company_status: companyID+"_"+active,
        companyID: companyID,
        companyName: companyName,
        dailyThoughtID: newThoughtKey,
        dateRegistered: datetimeMilli,
        dateScheduled: dateScheduled,
        podcastDescription: 'Recording',
        podcastSize: 0,
        podcastType: 1,
        stringDateRegistered: datetime,
        stringDateScheduled: stringDateScheduled,
        userID: journalUserID,
        userName: journalUserName
      }

      // Add podcast to thought
      voicemail = voiceRecorder.voicemail();

      if (voicemail[0] != undefined || voicemail.length > 0){
        this.uploadVoicemail(voicemail, audioObj);
      }

    }else if(PodcastExternalRecord == "podcastexternal"){
      // Add podcast to thought
      urlCount = 0;
      urlCount = Object.keys(this.podcastObj).length;

      for (var i = 0; i < urlCount; i++) {
        // new keys for podcast
        var newPodcastKey = database.ref().child('podcasts').push().key;

        // create photo object
        // podcastDescription = Recording, podcastType = 1 
        // podcastDescription = Podcast, podcastType = 2 
        var audioObj = {
          active: true,
          company_status: companyID+"_"+active,
          companyID: companyID,
          companyName: companyName,
          dailyThoughtID: newThoughtKey,
          dateRegistered: this.podcastObj[i].dateRegistered,
          dateScheduled: this.podcastObj[i].dateRegistered,
          podcastDescription: 'Podcast',
          podcastID: newPodcastKey,
          podcastSize: 0,
          podcastType: 2,
          storageName: this.podcastObj[i].title,
          stringDateRegistered: this.podcastObj[i].stringDateRegistered,
          stringDateScheduled: this.podcastObj[i].stringDateRegistered,
          url: this.podcastObj[i].url,
          userID: journalUserID,
          userName: journalUserName
        }

        // write podcast data to new thoughts collection
        var refThoughtPodcast = database.ref('dailyThoughts/' + newThoughtKey +'/podcasts');
        refThoughtPodcast.push(audioObj);

        // write podcast data to collection
        var podcastupdates = {};
        podcastupdates['/podcasts/' + newPodcastKey] = audioObj;
        database.ref().update(podcastupdates);

        // remove/clear any existing achor elements
        var element = this.$.podcastUrl;
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
    }
    // End Podcast Section

    
    // Video Section
    if(VidUploadExternal == 'vidupload'){
      // video file to upload
      var video = dom(this.root).querySelector('#video_input').files[0];

      if (video != undefined){
        // new keys for video
        var newVideoKey = database.ref().child('videos').push().key;
        sessionStorage.setItem("newVideoKey", newVideoKey);
        sessionStorage.setItem("newThoughtKey", newThoughtKey);

        // create video object
        var vidObj = {
          active: active,
          company_status: companyID+"_"+active,
          caption: video.name,
          companyID: companyID,
          companyName: companyName,
          dailyThoughtID: newThoughtKey,
          videoID: newVideoKey,
          description: title,
          date: datetimeMilli,
          dateRegistered: datetimeMilli,
          dateUploaded: datetimeMilli,
          dateUpdated: 0,
          UploadExternal: VidUploadExternal,
          storageName: video.name,
          stringDate: datetime,
          stringDateUploaded: datetime,
          stringDateRegistered: datetime,
          url: "",
          userID: journalUserID,
          userName: journalUserName,
          photoURL: photoURL,
          videoSize: video.size,
          lengthInSeconds: 0
        }

        // write video data to new thoughts collection
        var refThoughtVideo = database.ref().child('dailyThoughts/' + newThoughtKey +'/videos').push().key;
        sessionStorage.setItem("refThoughtVideo", refThoughtVideo);

        var videoThoughtUpd = {};
        videoThoughtUpd['dailyThoughts/' + newThoughtKey +'/videos/' + refThoughtVideo] = vidObj;
        database.ref().update(videoThoughtUpd);

        // write video data to collection
        var videoupdates = {};
        videoupdates['/videos/' + newVideoKey] = vidObj;
        database.ref().update(videoupdates);
      }
    } //Post External
    else if(VidUploadExternal == 'videxternal'){
      //External link to video file
      // Add video to thought
      urlCount = 0;
      urlCount = Object.keys(this.videoObj).length;

      for (var i = 0; i < urlCount; i++) {
        // new keys for video
        var newVideoKey = database.ref().child('videos').push().key;

        var vidObj = {
          active: active,
          company_status: companyID+"_"+active,
          caption: this.videoObj[i].title,
          companyID: companyID,
          companyName: companyName,
          dailyThoughtID: newThoughtKey,
          date: datetimeMilli,
          dateRegistered: datetimeMilli,
          dateUpdated: 0,
          UploadExternal: VidUploadExternal,
          dateUploaded: datetimeMilli,
          description: title,
          lengthInSeconds: 0,
          storageName: this.videoObj[i].title,
          stringDate: datetime,
          stringDateUploaded: datetime,
          stringDateRegistered: datetime,
          url: this.videoObj[i].url,
          userID: journalUserID,
          userName: journalUserName,
          photoURL: photoURL,
          videoID: newVideoKey,
          videoSize: 0
        }

        // write video data to new thoughts collection
        var refThoughtVideo = database.ref('dailyThoughts/' + newThoughtKey +'/videos');
        refThoughtVideo.push(vidObj);

        // write video data to collection
        var videoupdates = {};
        videoupdates['/videos/' + newVideoKey] = vidObj;
        database.ref().update(videoupdates);

        // remove/clear any existing achor elements
        var element = this.$.videoUrl;
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
    }
    // End Video Section

    // Upload Photo
    if(photo != undefined){
      //upload thumbNail
      // Data URL string
      var thumbnailTask = refThumbnail.putString(thumbnail_upload, 'data_url');

      // var thumbnailTask = refThumbnail.put(photo);
      thumbnailTask.on('state_changed', 
        function progress(snapshot){
          var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // uploader.value = percentage;
          // this.showSnackBar("Uploading photo thumbnail...");
        },
        function error(err){
        },
        function complete(){
          // uploader.value = 0;
          thumbnailURL = thumbnailTask.snapshot.downloadURL;

          var thumbnailtime = Date.now();
          var thumbnaildate = new Date(thumbnailtime).toUTCString();

          // create thumbnail object
          var thumbnailObj = {
            date: thumbnailtime,
            filePath: photo.name,
            stringDate: thumbnaildate,
            thumbnailID: newThumbnailKey,
            url: thumbnailURL
          }

          // write thumbnail data to collection
          var thumbnailupdates = {};
          thumbnailupdates['/thumbnails/' + newThumbnailKey] = thumbnailObj;
          database.ref().update(thumbnailupdates);
        }
      );

      //upload Photo
      // Data URL string
      var photoTask = refPhotos.putString(photo_upload, 'data_url');
      // var photoTask = refPhotos.put(photo);

      photoTask.on('state_changed', 
        function progress(snapshot){
          var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // uploader.value = percentage;
          // this.showSnackBar("Uploading Photo...");
        },
        function error(err){
        },
        function complete(){
          // reset uploader value
          // uploader.value = 0;
          // get download url for photo
          photoDownloadURL = photoTask.snapshot.downloadURL;
          // photo date
          var phototime = Date.now();
          var photodate = new Date(phototime).toUTCString();

          // create photo object
          var photoObj = {
            bytes: photo.size,
            caption: photo.name,
            dailyThoughtID: newThoughtKey,
            date: phototime,
            dateRegistered: phototime,
            dateUploaded: phototime,
            height: 0,
            imageSize: photo.size,
            stringDate: photodate,
            stringDateRegistered: photodate,
            stringDateUploaded: photodate,
            thumbNailUrl: thumbnailURL,
            title: title,
            url: photoDownloadURL,
            photoID: newPhotoKey,
            userID: journalUserID,
            userName: journalUserName,
            width: 0
          }

          // write photo data to new thoughts collection
          var refThoughtPhoto = database.ref('dailyThoughts/' + newThoughtKey +'/photos');
          refThoughtPhoto.push(photoObj);

          // write thumbnail data to collection
          var photoupdates = {};
          photoupdates['/photos/' + newPhotoKey] = photoObj;
          database.ref().update(photoupdates);
        }
      );
    }

    if((VidUploadExternal != 'vidupload') || (PodcastExternalRecord != 'podcastrecord')){
      if (video == undefined){
        this.showSnackBar("Thought posted successfully!");
      }else{
        this.showSnackBar("Thought posted successfully!");
      }

      this._removeItems();
      var that = this;

      setTimeout(myFunction, 3000);
      function myFunction(){
        that.removeFromParent();
      }
    }
  }
  splitDate(date, char){
    return date.split(char);
  }
  clearArray(array) {
    if(array != undefined){
      while (array.length) {
        array.pop();
      }
    }
  }
}

window.customElements.define(AddThoughts.is, AddThoughts);

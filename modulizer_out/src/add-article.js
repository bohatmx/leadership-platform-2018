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
/* Firebase */
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
import '../../../datetime-picker/datetime-picker.js';
import '../../../datetime-picker/date-picker.js';
import '../../../datetime-picker/time-picker.js';
import '../../../@polymer/iron-collapse/iron-collapse.js';
import '../../../@polymer/paper-styles/shadow.js';
import '../../../@polymer/iron-pages/iron-pages.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-radio-group/paper-radio-group.js';
import '../../../@polymer/paper-radio-button/paper-radio-button.js';
import '../../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../../@polymer/paper-item/paper-item.js';
import '../../../@polymer/paper-listbox/paper-listbox.js';
import '../../../@polymer/iron-autogrow-textarea/iron-autogrow-textarea.js';
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
class AddArticle extends Element {
  static get template() {
    return html`
      <style include="w3-styles"></style>
      <style include="shared-styles">
        paper-icon-button {
          color: var(--app-secondary-text);
          --paper-icon-button-ink-color: var(--app-secondary-text);;
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
        .add-thought-icons{
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
        }
        .read-article-photo {
          display: none;
          border-radius: 6px;
          background-size: contain;
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
      </style>
  
      <div class="container">
        <div class="add-thought">
          <paper-radio-group selected="manualContent" id="manualOrExternal" name="manualOrExternal" on-tap="toggleArticle">
            <paper-radio-button id="manualContent" name="manualContent">Manual Article Content</paper-radio-button>
            <paper-radio-button id="externalLink" name="externalLink">External Article Link</paper-radio-button>
          </paper-radio-group>
          <hr>
          <label class="paper-font-body2" style="cursor: pointer; margin-top: 10px;" for="local_photo_input">
            Load Article Image
            <paper-icon-button class="w3-text-red" icon="myicons:small-image" id="redImage"></paper-icon-button>
          </label>
          <form id="selectImageForm">
            <input id="local_photo_input" type="file" accept="image/*" on-change="handlePhoto">
          </form>
          <div class="horizontal justified add-thought-icons" id="loadArticleImage">            
            <div style="width:100%;" id="hideRemoveImage" hidden="">
              <paper-button style="width:100%;" class="app-primary-text-color" raised="" on-tap="removeImage">Remove Image</paper-button>
            </div>
          </div>
          <div id="articlePhoto" class="read-article-photo" style="background-image: url('[[photo]]');">
          </div>
          <paper-input label="Enter Article Title" type="text" id="articleTitle" maxlength="240" char-counter="" autocapitalize="" tabindex="0">
          </paper-input>
          <paper-input label="Enter Author Name" type="text" id="articleAuthor" maxlength="100" char-counter="" autocapitalize="" tabindex="1">
          </paper-input>
          <paper-input type="url" name="articleLink" id="articleLink" label="Enter Article Link" tabindex="2"></paper-input>
          <br>
          <label><small>Schedule Date &amp; TIme</small></label><br>
          <div class="datetime">
            <paper-input class="dateScheduled" id="dateScheduled" name="dateScheduled" always-float-label="" label="Date" type="date" auto-validate="" value\$="[[_defaultDate()]]"></paper-input>
            <paper-input class="timeScheduled" id="timeScheduled" name="timeScheduled" always-float-label="" label="Time" type="time" auto-validate="" value\$="[[_defaultTime()]]"></paper-input>
          </div>
          <br>
          <paper-radio-group selected="postInternal" id="postInternalGlobal" name="postInternalGlobal">
            <paper-radio-button id="postInternal" name="postInternal">Post Internal</paper-radio-button>
            <paper-radio-button id="postGlobally" name="postGlobally">Post Globally</paper-radio-button>
          </paper-radio-group>
          <hr>
          <br>
          <label class="paper-font-caption">Attach</label>
          <div class="horizontal justified add-thought-icons">
            <paper-icon-button class="w3-text-blue" icon="myicons:small-link" on-click="toggle" id="blueLink"></paper-icon-button>
            <paper-icon-button class="w3-text-green" icon="myicons:small-mic" on-click="toggle" id="greenMic"></paper-icon-button>
            <paper-icon-button icon="myicons:small-videocam" class="w3-text-dark-grey" on-click="toggle" id="camVideo"></paper-icon-button>
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
                        <div page-name="page-recordpodcast" id="recordpodcast">
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
                                  <paper-input type="url" name="videourlInput" id="videourlInput" always-float-label="" label="Enter Video Link"></paper-input>
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
                            <input type="file" accept="video/*,video/mp4" id="video_input" on-change="handleVideo">
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
            <hr>
            <br>
          <iron-autogrow-textarea style="width: 100%;" id="articleContent" rows="10" placeholder="Enter article content"></iron-autogrow-textarea>
          <br>
          <div class="buttons">
            <paper-button raised="" class="w3-blue" on-tap="_saveNewArticle">
              <iron-icon icon="app:send"></iron-icon>&nbsp;SUBMIT
            </paper-button>
          </div>
        </div>
      </div>
      <div id="snackbar"></div>
`;
  }

  static get is() { return 'add-article'; }
  ready(){
    super.ready();
    sessionStorage.setItem("closeElement", false);
    // hide external link object
    this.$.articleLink.value = "";
    this.$.articleLink.style = "display: none;";
  }
  static get properties() {
    return {
      user: {
        type: Object
      },
      addedit: {
        type: Number,
        observer: '_addeditChanged'
      },
      company: {
        type: Object
      },
      editObj: {
        type: Array
      },
      _companyid: String,
      previouspage: String,
      title: String,
      subtitle: String,
      id: String,
      aid: String,
      ratetype: String,
      orderrateby: String,
      photo: String,
      _selected: String,
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
      uploadTasks: {
        type: Array,
        observer: '_uploadTasksChanged'
      },
      uploadedFiles: {
        type: Array,
      },
    };
  }
  removeImage(){
    this.$.hideRemoveImage.style = "display: none";
    this.$.articlePhoto.style.display = "none";
    this.photo = "";
    var selectImageForm = dom(this.root).querySelector('#selectImageForm');
    selectImageForm.reset();
    sessionStorage.removeItem("thumbnail_upload");
    sessionStorage.removeItem("photo_upload");
  }
  _addeditChanged(){
    this.isaddedit();
  }
  isaddedit(){
    if(this.addedit == undefined) this.addedit = 0;
      // if(this.addedit == 0) this.$.thoughtCaption.innerHTML = "Add Thought";
    else if(this.addedit == 1){
      this.clearArray(this.editObj);

      let editArticleStr = ''+sessionStorage.getItem("editArticleStr");
      this.editObj = JSON.parse(editArticleStr);

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
        this.$.articleTitle.value = this.editObj.title;
        this.$.articleAuthor.value = this.editObj.subtitle;
        if(this.editObj.dailyThoughtType == 1) this.$.postInternalGlobal.selected = "postInternal";
        else this.$.postInternalGlobal.selected = "postGlobally";

        if(this.editObj.manualOrExternal == "externalLink"){
          this.$.manualOrExternal.selected = "externalLink";
          // show external link
          this.$.articleLink.style = "display: block;";
          this.$.articleLink.value = this.editObj.articleLink;
          
          // hide manual content objects
          this.$.articleContent.value = "";
          // this.removeImage();
          // this.$.loadArticleImage.style = "display: none;";
          this.$.articleContent.style = "display: none; ";

          }else{
            this.$.manualOrExternal.selected = "manualContent";
            // hide external link object
            this.$.articleLink.value = "";
            this.$.articleLink.style = "display: none;";

            // show manual content objects
            this.$.selectImageForm.reset();
            // this.$.loadArticleImage.style = "display: flex;";
            this.$.articleContent.style = "display: block; width: 100%;";
            this.$.articleContent.value = this.editObj.body;
            
          }

        }

      }
  
  }
  toggleArticle(e){
    var selected = e.target.id;

    if(selected === "manualContent"){
      // hide external link object
      this.$.articleLink.value = "";
      this.$.articleLink.style = "display: none;";

      // show manual content objects
      this.$.articleContent.value = "";
      this.$.selectImageForm.reset();
      // this.$.loadArticleImage.style = "display: flex;";
      this.$.articleContent.style = "display: block;";
    }else{
      // show external link
      this.$.articleLink.value = "";
      this.$.articleLink.style = "display: block;";

      // hide manual content objects
      this.$.articleContent.value = "";
      this.removeImage();
      // this.$.loadArticleImage.style = "display: none;";
      this.$.articleContent.style = "display: none;";
    }
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
    var uploadTask = storageRef.child('testrecording/' + filename).put(voicemail[0], metadata);

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
        var newsID = audioObj.newsID;
        
        downloadURL = uploadTask.snapshot.downloadURL;

        // new keys for podcast
        var newPodcastKey = database.ref().child('podcasts').push().key;

        // write audio data to new articles collection
        var refThoughtPodcast = database.ref().child('news/' + newsID +'/podcasts').push().key;

        audioObj.url = downloadURL;
        audioObj.storageName = filename;
        audioObj.podcastID = newPodcastKey;

        var podcastThoughtUpd = {};
        podcastThoughtUpd['news/' + newsID +'/podcasts/' + refThoughtPodcast] = audioObj;
        database.ref().update(podcastThoughtUpd);

        // write podcast data to collection
        var podcastupdates = {};
        podcastupdates['/podcasts/' + newPodcastKey] = audioObj;
        database.ref().update(podcastupdates);
    });
  }
  handlePhoto(e){
      var photoSelected = e.target.files[0];

      // compress photo ready to upload
      this.resizeImage(photoSelected, "photo");

      // compress thumbnail for upload
      this.resizeImage(photoSelected, "thumbnail");

      var selectedImage = URL.createObjectURL(photoSelected);

      this.photo = selectedImage;

      this.$.articlePhoto.style.display = "block";
      this.$.hideRemoveImage.style = "display: block";
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
  uploadVideo() {
    dom(this.root).querySelector('#fs').upload(dom(this.root).querySelector('#video_input').files)
  }
  _uploadComplete(url){
    if(url != undefined){
      var downloadURL = url;
      var videoID = sessionStorage.getItem("newVideoKey");
      var newArticleKey = sessionStorage.getItem("newArticleKey");
      var refThoughtVideo = sessionStorage.getItem("refThoughtVideo");

      var database = firebase.database();
      var videoupdates = {};
      var thoughtupdates = {};

      videoupdates['/videos/'+videoID+'/url'] = downloadURL;
      database.ref().update(videoupdates);

      thoughtupdates['/news/'+newArticleKey+'/videos/'+refThoughtVideo+'/url'] = downloadURL;
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

      dom(this.root).querySelector('#fs').clearTasks();

      return "Upload Completed Successfully!"
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
  showSnackBar(msg){
    var x = this.$.snackbar;

    x.innerHTML = msg;

    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
  _saveNewArticle(){
    let author = this.$.articleAuthor.value;
    let title = this.$.articleTitle.value;
    let content = this.$.articleContent.value;
    let articleLink = this.$.articleLink.value;

    let postInternalGlobal = this.$.postInternalGlobal.selected;
    let manualOrExternal = this.$.manualOrExternal.selected;

    let photo = this.$.local_photo_input.files[0];
    
    let photoDownloadURL = "";
    let thumbnailURL = "";
    let photo_upload, thumbnail_upload;

    let journalUserID = this.user.userID;
    let journalUserName = this.user.firstName+" "+this.user.lastName;

    var userType = sessionStorage.getItem("user"+this.user.userType);
    var user_type = "user"+this.user.userType;

    let PodcastExternalRecord = this.$.PodcastExternalRecord.selected;
    var voicemail = [];
    this.clearArray(voicemail);
    var voiceRecorder = dom(this.root).querySelector('#voiceRecorder');

    let VidUploadExternal = this.$.VidUploadExternal.selected;

    var photoURL = "";

    if(this.user.photoURL != undefined || this.user.photoURL != ""){
      photoURL = this.user.photoURL;
    }else{
      photoURL = "";
    }

    if(photoURL == undefined){
      photoURL = "";
    }

    var confirmedDate = this.$.dateScheduled.value;
    var selectedTime = this.$.timeScheduled.value;

    let companyID = this.user.companyID;
    let companyName = this.user.companyName;

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
    // convert to Milli
    var datetimeMilli = Date.parse(datetime);

    var concatDateTime = confirmedDate + " "+selectedTime;
    var getDatePart = this.splitDate(confirmedDate, "-");
    var actualDate = getDatePart[1]+"/"+getDatePart[2]+"/"+getDatePart[0]+" "+selectedTime+":00";

    var stringDateScheduled = new Date(actualDate);
    var dateScheduled = Date.parse(stringDateScheduled);

    var checkStatus = "";
    var topLeader_status = "false";

    if(datetimeMilli > dateScheduled){
      checkStatus = sessionStorage.getItem("APPROVED");
      console.log(checkStatus);
      // return;
    }else{
      checkStatus = sessionStorage.getItem("UNPUBLISHED");
      console.log(checkStatus);
      // return;
    }
    if(checkStatus == "") checkStatus = "unpublished";

    //set status
    var status = checkStatus;
    console.log(dateScheduled);

    // format date
    datetime = this.formatDate(datetime);
    stringDateScheduled = this.formatDate(actualDate);

    if(manualOrExternal === "manualContent"){
      // Validate article content
      if ((content == undefined) || (content.trim() == "")){
        this.showSnackBar("Please enter article content!");
        return;
      }

      articleLink = "";

    }else{
      // this.photo = "";
      content = "";
    }
    
    // Validate title
    if ((title == undefined) || (title.trim() == "")){
      this.showSnackBar("Please enter article title!");
      return;
    }
    // Validate article author
    if ((author == undefined) || (author.trim() == "")){
      this.showSnackBar("Please enter article author!");
      return;
    }
    
    // Post internal
    if(postInternalGlobal == 'postInternal'){
      var DailyThoughtDescription = sessionStorage.getItem("DESC_INTERNAL_DAILY_THOUGHT");
      var DailyThoughtType = 1;
      // sessionStorage.getItem("INTERNAL_DAILY_THOUGHT");
    }
    // Post global
    if(postInternalGlobal == 'postGlobally'){
      var DailyThoughtDescription = sessionStorage.getItem("DESC_GLOBAL_DAILY_THOUGHT");
      var DailyThoughtType = 2;
      // sessionStorage.getItem("GLOBAL_DAILY_THOUGHT");
    }

    if(PodcastExternalRecord == 'podcastrecord'){
      voicemail = voiceRecorder.voicemail();
    }
    
    // Platinum User,  Platinum Admin, Company Admin
    if ((user_type == 'user4') || (user_type == 'user7') || (user_type == 'user6') || (user_type == 'user9')) {
      var DailyThoughtType_status = DailyThoughtType +"_"+status;
      var companyID_status = this.user.companyID+"_"+status;

      if(user_type == 'user4') topLeader_status = 'true';
      if(status == 'approved') topLeader_status = topLeader_status+'_'+status;
    }
    // Gold User
    else if (user_type == 'user5') {
        var DailyThoughtType_status = DailyThoughtType +"_"+sessionStorage.getItem("PENDING");
        status = sessionStorage.getItem("PENDING");
        var companyID_status = this.user.companyID+"_"+sessionStorage.getItem("PENDING");
    } else {
      this.showSnackBar('This account is not authorised to post, Please contact the Admin.');
      return;
    }

    if(VidUploadExternal == 'vidupload'){
      // Validate video file
      var vidfile = dom(this.root).querySelector('#video_input').files[0];

      if (vidfile == undefined){
        this.showSnackBar("Please upload video file !");
        return;
      }
    }

    // Get a reference to the database service
    var database = firebase.database();
    var storage = firebase.storage();

    // Add Thought
    if(this.addedit == 0 || this.addedit == undefined){
      // Get a key for a new article.
      var newArticleKey = database.ref().child('news').push().key;

      // fix data
      var data = {
        articleDate: 0,
        companyID: companyID,
        companyName: companyName,
        newsID: newArticleKey,
        dateRegistered: datetimeMilli,
        dateScheduled: dateScheduled,
        dateUpdated: 0,
        articleTypeDescription: DailyThoughtDescription,
        articleType: DailyThoughtType,
        journalUserID: journalUserID,
        journalUserName: journalUserName,
        stringDateRegistered: datetime,
        stringDateScheduled: stringDateScheduled,
        subtitle: author,
        title: title,
        body: content,
        userType: userType,
        photoURL: photoURL,
        companyID_status: companyID_status,
        dailyThoughtDescription: DailyThoughtDescription,
        dailyThoughtType: DailyThoughtType,
        dailyThoughtType_status: DailyThoughtType_status,
        status: status,
        articleLink: articleLink,
        manualOrExternal: manualOrExternal,
        topLeader_status: topLeader_status
      }

      // Write the new article's data
      var updates = {};
      updates['/news/' + newArticleKey] = data;
      database.ref().update(updates);
    }
    else{
      // Get a key for a new thought.
      var newArticleKey = this.editObj.newsID;

      // Update the pldp's notification data to false
      var data = {};
      data['/news/' + newArticleKey+'/articleTypeDescription'] = DailyThoughtDescription;
      data['/news/' + newArticleKey+'/articleType'] = DailyThoughtType;
      data['/news/' + newArticleKey+'/dailyThoughtType_status'] = DailyThoughtType_status;
      data['/news/' + newArticleKey+'/dailyThoughtType'] = DailyThoughtType;
      data['/news/' + newArticleKey+'/dailyThoughtDescription'] = DailyThoughtDescription;

      data['/news/' + newArticleKey+'/dateScheduled'] = dateScheduled;
      data['/news/' + newArticleKey+'/stringDateScheduled'] = stringDateScheduled;

      data['/news/' + newArticleKey+'/stringDateScheduled'] = stringDateScheduled;
      data['/news/' + newArticleKey+'/subtitle'] = author;
      data['/news/' + newArticleKey+'/title'] = title;
      data['/news/' + newArticleKey+'/body'] = content;
      data['/news/' + newArticleKey+'/photoURL'] = photoURL;
      data['/news/' + newArticleKey+'/articleLink'] = articleLink;
      data['/news/' + newArticleKey+'/manualOrExternal'] = manualOrExternal;
      data['/news/' + newArticleKey+'/topLeader_status'] = topLeader_status;
      data['/news/' + newArticleKey+'/status'] = status;
      data['/news/' + newArticleKey+'/companyID_status'] = companyID_status;

      database.ref().update(data);

      sessionStorage.removeItem("editnewsID");
      sessionStorage.removeItem("editArticleStr");
      this.clearArray(this.editObj);
    }


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

      var refUrl = database.ref('news/' + newArticleKey +'/urls');
      refUrl.push(urls);

      // remove/clear any existing achor elements
      var element = this.$.articleUrl;
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }

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
        newsID: newArticleKey,
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
          companyID: companyID,
          companyName: companyName,
          newsID: newArticleKey,
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
        var refThoughtPodcast = database.ref('news/' + newArticleKey +'/podcasts');
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
        sessionStorage.setItem("newArticleKey", newArticleKey);

        // create video object
        var vidObj = {
          active: active,
          company_status: companyID+"_"+active,
          caption: video.name,
          companyID: companyID,
          companyName: companyName,
          newsID: newArticleKey,
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

        this.uploadVideo();

        // write video data to new thoughts collection
        var refThoughtVideo = database.ref().child('news/' + newArticleKey +'/videos').push().key;
        sessionStorage.setItem("refThoughtVideo", refThoughtVideo);

        var videoThoughtUpd = {};
        videoThoughtUpd['news/' + newArticleKey +'/videos/' + refThoughtVideo] = vidObj;
        database.ref().update(videoThoughtUpd);

        // write video data to collection
        var videoupdates = {};
        videoupdates['/videos/' + newVideoKey] = vidObj;
        database.ref().update(videoupdates);
      }
    } //Post External
    else if(VidUploadExternal == 'videxternal'){
      // Add video to thought
      urlCount = 0;
      urlCount = Object.keys(this.videoObj).length;

      for (var i = 0; i < urlCount; i++) {
        // new keys for video
        var newVideoKey = database.ref().child('videos').push().key;

        // create photo object
        // podcastDescription = Recording, podcastType = 1 
        // podcastDescription = Podcast, podcastType = 2 
        var vidObj = {
          active: true,
          caption: this.videoObj[i].title,
          companyID: companyID,
          companyName: companyName,
          newsID: newArticleKey,
          date: this.videoObj[i].dateRegistered,
          dateRegistered: this.videoObj[i].dateRegistered,
          dateUpdated: 0,
          dateUploaded: this.videoObj[i].dateRegistered,
          description: title,
          lengthInSeconds: 0,
          storageName: this.videoObj[i].title,
          stringDate: this.videoObj[i].stringDateRegistered,
          stringDateRegistered: this.videoObj[i].stringDateRegistered,
          stringDateUploaded: this.videoObj[i].stringDateRegistered,
          url: this.videoObj[i].url,
          videoID: newVideoKey,
          videoSize: 0,
          userID: journalUserID,
          userName: journalUserName,
          photoURL: photoURL,
        }
        // write video data to new thoughts collection
        var refThoughtVideo = database.ref('news/' + newArticleKey +'/videos');
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
    

    // check if the media has been uploaded
    if(photo != undefined && this.photo != ""){
      // ref for photo and thubnails
      var refPhotos = storage.ref('photos/'+photo.name+timeInMs);
      var refThumbnail = storage.ref('thumbnails/thumbnail'+photo.name+timeInMs);

      // new keys for photo and thumbnails
      var newPhotoKey = database.ref().child('photos').push().key;
      var newThumbnailKey = database.ref().child('thumbnails').push().key;

      // get compressed photo and thumbnail ready to upload
      photo_upload = sessionStorage.getItem("photo_upload");
      thumbnail_upload = sessionStorage.getItem("thumbnail_upload");

      //upload thumbNail
      // Data URL string
      var thumbnailTask = refThumbnail.putString(thumbnail_upload, 'data_url');

      // var thumbnailTask = refThumbnail.put(photo);
      thumbnailTask.on('state_changed', 
      function progress(snapshot){
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      function error(err){
      },
      function complete(){
        thumbnailURL = thumbnailTask.snapshot.downloadURL;

        var thumbnailtime = Date.now();
        var thumbnaildate = datetime;

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

      photoTask.on('state_changed', 
      function progress(snapshot){
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // this.showSnackBar("Uploading Photo...");
      },
      function error(err){
      },
      function complete(){
        // get download url for photo
        photoDownloadURL = photoTask.snapshot.downloadURL;
        // photo date
        var phototime = Date.now();
        // var photodate = this.formatDate(phototime);

        // create photo object
        var photoObj = {
          bytes: photo.size,
          caption: photo.name,
          newsID: newArticleKey,
          date: phototime,
          dateRegistered: datetime,
          dateUploaded: datetime,
          height: 0,
          imageSize: photo.size,
          stringDate: datetime,
          stringDateRegistered: datetime,
          stringDateUploaded: datetime,
          thumbNailUrl: thumbnailURL,
          title: title,
          url: photoDownloadURL,
          photoID: newPhotoKey,
          userID: journalUserID,
          userName: journalUserName,
          width: 0
        }
        // write photo data to new thoughts collection
        var refArticlePhoto = database.ref('news/' + newArticleKey +'/photos');
        refArticlePhoto.push(photoObj);

        // write thumbnail data to collection
        var photoupdates = {};
        photoupdates['/photos/' + newPhotoKey] = photoObj;
        database.ref().update(photoupdates);
      }
      );
    }

    this.$.articleAuthor.value = "";
    this.$.articleTitle.value = "";
    this.$.articleContent.value = "";
    // reset articles object
    this.clearArray(this.articleObj);
    this.clearArray(this.podcastObj);
    this.clearArray(this.videoObj);
    this.photo = "";
    this.$.articlePhoto.style.display = "none";
    var selectImageForm = dom(this.root).querySelector('#selectImageForm');
    selectImageForm.reset();
    this.$.articleLink.value = "";

    this.showSnackBar("New article posted successfully!");

    // this.removeFromParent();
    var that = this;
    setTimeout(myFunction, 3000);
    function myFunction(){
      that.removeFromParent();
    }
  }
  removeFromParent(){
    var a = dom(this).parentNode;
    $(a).siblings('#spanCloseItemModal').trigger('click');
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
      // push new object to final article object
      this.articleObj.push(urlObj);

      // this.showSnackBar("Article added successfully!");
    }
    // re-initialize the text objects
    this.$.articleDesc.value = "";
    this.$.urlInput.value = "";
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
window.customElements.define(AddArticle.is, AddArticle);

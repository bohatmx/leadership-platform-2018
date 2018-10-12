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
import '../../../@polymer/paper-toast/paper-toast.js';
import '../../../datetime-picker/datetime-picker.js';
import '../../../datetime-picker/date-picker.js';
import '../../../datetime-picker/time-picker.js';
import '../../../@polymer/iron-collapse/iron-collapse.js';
import '../../../@polymer/paper-styles/shadow.js';
import '../../../@polymer/iron-pages/iron-pages.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-radio-group/paper-radio-group.js';
import '../../../@polymer/paper-radio-button/paper-radio-button.js';
import '../../../polymerfire/firebase-app.js';
import '../../../polymerfire/firebase-auth.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-storage-multiupload.js';
import '../../../polymerfire/firebase-storage-upload-task.js';
import '../../../polymerfire/firebase-storage-ref.js';
import '../../../polymerfire/firebase-database-behavior.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
var checkStatus = "";

class AddVideo extends Element {
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
      input[type="file"] {
        display: block;
        margin-top: 0;
        opacity: 1!important;
      }
    </style>
      <div class="container">
        <div class="add-thought">
          <paper-input label="Enter Video Title" type="text" id="videoTitle" maxlength="240" char-counter="" autocapitalize="" tabindex="0">
          </paper-input>
          <paper-input label="Enter Video Author" type="text" id="videoAuthor" maxlength="100" char-counter="" autocapitalize="" tabindex="1">
          </paper-input>
          <br>
          <label><small>Schedule Date &amp; TIme</small></label><br>
          <div class="datetime">
            <paper-input class="dateScheduled" id="dateScheduled" name="dateScheduled" always-float-label="" label="Date" type="date" auto-validate="" value\$="[[_defaultDate()]]" tabindex="2"></paper-input>
            <paper-input class="timeScheduled" id="timeScheduled" name="timeScheduled" always-float-label="" label="Time" type="time" auto-validate="" value\$="[[_defaultTime()]]" tabindex="3"></paper-input>
          </div>
          <br>
          <paper-radio-group selected="postInternal" id="postInternalGlobal" name="postInternalGlobal">
            <paper-radio-button id="postInternal" name="postInternal">Post Internal</paper-radio-button>
            <paper-radio-button id="postGlobally" name="postGlobally">Post Globally</paper-radio-button>
          </paper-radio-group>
          <hr>
          <br>
          <label class="paper-font-caption">Attach Video</label>
          <br>
          <paper-radio-group id="UploadExternal" name="UploadExternal">
            <paper-radio-button id="external" name="external" on-click="toggle">External Link</paper-radio-button>
            <paper-radio-button id="upload" name="upload" on-click="toggle">Upload Video</paper-radio-button>
          </paper-radio-group>
          <br>
          <div class="container more-container">
            <iron-collapse id="collapseAddThought">
              <iron-pages selected="[[_selected]]" attr-for-selected="page-name">
                <div page-name="page-2" id="page2" style="border: 2px solid green; padding: 0 8px;">
                  <div class="row article-input-flex">
                    <div class="article-inputbox">
                      <paper-input type="url" name="videourlInput" id="videourlInput" always-float-label="" label="Enter Youtube Link"></paper-input>
                    </div>
                  </div>
                  <div class="container more-links" id="videoUrl">
                  </div>
                </div>
                <div page-name="page-3" id="page3" style="border: 2px solid black; padding: 0 8px;">
                  <br>
                  <firebase-storage-multiupload id="fs" path="/testvideos" upload-tasks="{{uploadedFiles}}" on-error="catchError" force-unique="">
                  </firebase-storage-multiupload>
                  <form id="selectVideoForm">
                    <input id="file-uploader" type="file" accept="video/*" on-change="fileSelected"> 
                  </form>
                  <div style="width:100%;" id="hideRemoveVideo" hidden="">
                    <paper-button style="color:#810029; background:#eaeaea; margin-top: 16px;" raised="" on-tap="removeVideo">Remove Video</paper-button>
                  </div>
                  <br>
                  <hr>
                  <template is="dom-repeat" items="[[uploadedFiles]]">
                    <div style="padding: 20px">
                      <firebase-storage-upload-task task="[[item]]" id="taskvideos" bytes-transferred="{{item.bytesTransferred}}" total-bytes="{{item.totalBytes}}" state="{{item.state}}" download-url="{{item.downloadUrl}}" metadata="{{item.metadata}}" path="{{item.path}}">
                      </firebase-storage-upload-task>
                      <p><em>State: [[item.state]]</em></p><br>
                      <template is="dom-if" if="[[!isEqual(item.state, 'success')]]">
                        <paper-progress value="{{item.bytesTransferred}}" min="0" max="{{item.totalBytes}}" style="width: 100%;">
                        </paper-progress>
                        <br>
                      </template>
                      <template is="dom-if" if="{{isEqual(item.state, 'success')}}">
                        <firebase-storage-ref path="{{item.path}}" storage-uri="{{gsUri}}" id="ref-[[index]]" metadata="{{item.refMetadata}}" download-url="{{item.refDownloadUrl}}">
                        </firebase-storage-ref>
                        <br>
                        <p>[[_uploadComplete(item.refDownloadUrl, item.totalBytes)]]</p>
                      </template>

                      <template is="dom-if" if="[[!isEqual(item.state, 'success')]]">
                        <template is="dom-if" if="[[isEqual(item.state, 'running')]]">
                          <paper-button on-tap="cancel" value="{{index}}">Cancel</paper-button>
                          <paper-button on-tap="pause" value="{{index}}">Pause</paper-button>
                        </template>
                        <template is="dom-if" if="[[isEqual(item.state, 'paused')]]">
                          <paper-button on-tap="resume" value="{{index}}">Resume</paper-button>
                        </template>
                      </template>
                      <br>
                    </div>
                  </template>
                </div>
              </iron-pages> 
            </iron-collapse>
          </div>
          <br>
          <div class="buttons">
            <paper-button raised="" class="w3-blue" on-tap="_saveNewVideo">
              <iron-icon icon="app:send"></iron-icon>&nbsp;SUBMIT
            </paper-button>
          </div>
        </div>
      </div>
      <div id="snackbar"></div>
      <paper-toast id="toaster"></paper-toast>
`;
  }

  static get is() { return 'add-video'; }
  ready(){
    super.ready();
    sessionStorage.setItem("closeElement", false);
    // console.log("ready");
    // this.isaddedit();
  }
  static get properties() {
    return {
      user: {
        type: Object
      },
      _companyid: String,
      previouspage: String,
      title: String,
      subtitle: String,
      id: String,
      _selected: String,
      videoKey: String,
      opened: {
        type: Boolean,
        reflectToAttribute: true,
        value: true
      },
      lastSelected: {
        type: String,
        value: ''
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
      item: {
        type: Object,
        value: null
      },
    };
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
  catchError(e) {
    dom(this.root).querySelector('#toaster').show({
      text: e.detail.message
    });
  }
  cancel(e) {
    dom(this.root).querySelector('#taskvideos').cancel();
  }
  resume(e) {
    dom(this.root).querySelector('#taskvideos').resume();
  }
  pause(e) {
    dom(this.root).querySelector('#taskvideos').pause();
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
  removeVideo(){
    this.$.hideRemoveVideo.style = "display: none";
    var selectVideoForm = dom(this.root).querySelector('#selectVideoForm');
    selectVideoForm.reset();
  }
  fileSelected(){
    this.$.hideRemoveVideo.style = "display: block";
  }
  isEqual(a, b) {
    return a === b;
  }
  upload() {
    dom(this.root).querySelector('#fs').upload(dom(this.root).querySelector('#file-uploader').files)
  }
  _uploadComplete(url, size){
    if(url != undefined){
      var downloadURL = url;
      var videoID = sessionStorage.getItem("newvideoKey");

      if(videoID != null){
        var active = true;
        if(checkStatus == "unpublished") active = false;
        
        var database = firebase.database();
        var updates = {};
        updates['/videos/'+videoID+'/active'] = active;
        updates['/videos/'+videoID+'/company_status'] = "general_"+active;
        updates['/videos/'+videoID+'/videoSize'] = size;
        updates['/videos/'+videoID+'/url'] = downloadURL;
        database.ref().update(updates);

        sessionStorage.removeItem("newvideoKey");

        dom(this.root).querySelector('#fs').reset();

        this.showSnackBar("Video uploaded successfully!");
        this.removeItems();

        window.location.reload();

        var that = this;
        setTimeout(myFunction, 3000);
        function myFunction(){
          that.removeFromParent();
        }

        this.uploadedFiles = null;
      }
    }
  }

  showSnackBar(msg){
    var x = this.$.snackbar;

    x.innerHTML = msg;

    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
  _saveNewVideo(){
    let author = this.$.videoAuthor.value;
    let title = this.$.videoTitle.value;
    let videourlInput = this.$.videourlInput.value;
    var postInternalGlobal = this.$.postInternalGlobal.selected;
    let active = true;
    let company_status = "general";

    let UploadExternal = this.$.UploadExternal.selected;

    let journalUserID = this.user.userID;
    let journalUserName = this.user.firstName+" "+this.user.lastName;
    var userType = sessionStorage.getItem("user"+this.user.userType);
    var user_type = "user"+this.user.userType;
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

    // format date
    datetime = this.formatDate(datetime);
    stringDateScheduled = this.formatDate(actualDate);

    // Get a reference to the database service
    var database = firebase.database();

    // Validate title
    if ((title == undefined) || (title.trim() == "")){
      this.showSnackBar("Please enter video title !");
      return;
    }
    // Validate video author
    if ((author == undefined) || (author.trim() == "")){
      this.showSnackBar("Please enter video author !");
      return;
    }
    // Validate thought date
    if ((confirmedDate == undefined) || (confirmedDate.trim() == "")){
      this.showSnackBar("Please select schedule date !");
      return;
    };
    // Validate video time
    if ((selectedTime == undefined)){
      this.showSnackBar("Please select schedule time !");
      return;
    };
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

    // Post Upload
    if(UploadExternal == 'upload'){
      // Validate video file
      var audio = dom(this.root).querySelector('#file-uploader').files[0];

      if (audio == undefined){
        this.showSnackBar("Please upload video file !");
        return;
      }else{
        // Get a key for a new video.
        var newvideoKey = database.ref().child('videos').push().key;

        sessionStorage.setItem("newvideoKey", newvideoKey);

        this.upload();
        videourlInput = "";
        active = false;
      }
    } //Post External
    else if(UploadExternal == 'external'){
      // Validate video link
      if ((videourlInput == undefined) || (videourlInput.trim() == "")){
        this.showSnackBar("Please enter video External URL !");
        return;
      }else{
        // Get a key for a new video.
        var newvideoKey = database.ref().child('videos').push().key;

        sessionStorage.setItem("newvideoKey", newvideoKey);

        active = true;
      }
    }else{
      this.showSnackBar("Please attach video !");
      return;
    }

    if(checkStatus == "unpublished") active = false;

    this.videoKey = newvideoKey;

      // create photo object
      var videoObj = {
        active: active,
        company_status: company_status+"_"+active,
        caption: title,
        companyID: companyID,
        companyName: companyName,
        videoID: newvideoKey,
        description: title,
        date: datetimeMilli,
        dateRegistered: datetimeMilli,
        dateUploaded: datetimeMilli,
        dateScheduled: dateScheduled,
        dateUpdated: 0,
        UploadExternal: UploadExternal,
        storageName: title,
        title: title,
        author: author,
        stringDate: datetime,
        stringDateUploaded: datetime,
        stringDateRegistered: datetime,
        stringDateScheduled: stringDateScheduled,
        url: videourlInput,
        userID: journalUserID,
        userName: journalUserName,
        photoURL: photoURL,
        videoSize: 0,
        lengthInSeconds: 0,
        companyID_status: companyID_status,
        dailyThoughtDescription: DailyThoughtDescription,
        dailyThoughtType: DailyThoughtType,
        dailyThoughtType_status: DailyThoughtType_status,
        status: status,
        topLeader_status: topLeader_status
      }
      // write video data to collection
      var videoupdates = {};
      videoupdates['/videos/' + newvideoKey] = videoObj;
      database.ref().update(videoupdates);

      if(UploadExternal == 'external'){
        this.showSnackBar("Video uploaded successfully!");
        this.removeItems();

        var that = this;
        setTimeout(myFunction, 3000);
        function myFunction(){
          that.removeFromParent();
        }
      }
  }
  removeFromParent(){
    var a = dom(this).parentNode;
    $(a).siblings('#spanCloseItemModal').trigger('click');
  }
  removeItems(){
    this.$.videoAuthor.value = "";
    this.$.videoTitle.value = "";
    this.$.videourlInput.value = "";
    this.$.postInternalGlobal.selected = "postInternal";
    this.videoKey = "";

    // reset video object
    this.clearArray(this.videoObj);
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
    
    if((res == 'gre') || (selectedElem == 'external')){
      this._selected = 'page-2';
    }else if((res == 'cam') || (selectedElem == 'upload')){
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
window.customElements.define(AddVideo.is, AddVideo);

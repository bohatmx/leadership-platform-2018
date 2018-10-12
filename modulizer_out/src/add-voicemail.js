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

import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/app-media/app-media-video.js';
import '../../../@polymer/app-media/app-media-audio.js';
import '../../../@polymer/app-media/app-media-waveform.js';
import '../../../@polymer/paper-toast/paper-toast.js';
import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/iron-image/iron-image.js';
import '../../../@polymer/paper-radio-group/paper-radio-group.js';
import '../../../polymerfire/firebase-app.js';
import '../../../polymerfire/firebase-auth.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-storage-multiupload.js';
import '../../../polymerfire/firebase-storage-upload-task.js';
import '../../../polymerfire/firebase-storage-ref.js';
import '../../../polymerfire/firebase-database-behavior.js';
import './my-recorder.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
var AudioContex;
var context;
var audioBuffer = [];
var myArrayBuffer, nowBuffering, source;
var newBlob = new Blob();
var podcast_ID='';
var checkStatus = "";

var audio_context;
var recorder;
var processor;

class AddVoicemail extends Element {
  static get template() {
    return html`
    <style include="w3-styles"></style>
    <style include="shared-styles">
        :host {
            position: relative;
            display: block;
            overflow: hidden;
        }

        :host(.recording) #waveform {
            transform: translateY(0);
            transition-delay: 0s;
        }

        :host(.recording) {
            opacity: 1;
            transition-delay: 0s;
        }

        app-media-waveform {
            height: 40px;
        }
        paper-icon-button {
            color: var(--app-secondary-text);
            --paper-icon-button-ink-color: var(--app-secondary-text);
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
        .recorder-icons{
            color: var(--app-status-color);
            font-size: 20px;
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
        .recorder-area{
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #2e2e2e;
            border-radius: 6px;
            color: #fff;
            height: auto;
            padding: 16px;
            
        }
        .maroon{
            background-color: #8a0f36;
        }
        .record-btns{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }
    </style>


    <div class="container">
        <paper-input label="Enter Voicemail Title" type="text" id="podcastTitle" maxlength="240" char-counter="" autocapitalize="" tabindex="0">
        </paper-input>
        <br>
        <label><small>Schedule Date &amp; TIme</small></label><br>
        <div class="datetime">
            <paper-input class="dateScheduled" id="dateScheduled" name="dateScheduled" always-float-label="" label="Date" type="date" auto-validate="" value\$="[[_defaultDate()]]" tabindex="1"></paper-input>
            <paper-input class="timeScheduled" id="timeScheduled" name="timeScheduled" always-float-label="" label="Time" type="time" auto-validate="" value\$="[[_defaultTime()]]" tabindex="2"></paper-input>
        </div>
        <br>
        <br>
        <paper-radio-group selected="postInternal" id="postInternalGlobal" name="postInternalGlobal">
        <paper-radio-button id="postInternal" name="postInternal">Post Internal</paper-radio-button>
        <paper-radio-button id="postGlobally" name="postGlobally">Post Globally</paper-radio-button>
        </paper-radio-group>
        <hr>
        <br>
        <div class="recorder-area">
            <iron-image src="../data/mic.png" style="width:auto; height:160px;" preload="" sizing="contain"></iron-image>
            <div class="w3-center">
                <div id="msg" class="w3-center w3-padding w3-small">Max 2 minutes.</div>
                <div id="timeobj" class="w3-center w3-padding w3-xxlarge"></div>
                <div id="log" class="w3-center w3-padding"></div>
            </div>
            <!-- <pre id="log"></pre> -->
            <br>
            <div class="record-btns">
                <paper-button id="startrecord" style="margin-right: 16px;" class="maroon" on-tap="startRecording" raised="">record</paper-button>
                <paper-button style="background:#eaeaea;" id="stoprecord" class="w3-text-red" on-tap="stopRecording" disabled="" raised="">stop</paper-button>
            </div>
            <h4 class="w3-center">Recording</h4>
            <div id="recordingslist" class="record-btns"></div>
            <div style="width:100%;" id="hideRemoveRecording" hidden="" class="w3-center w3-padding">
                <paper-button style="color:#810029; background:#eaeaea; margin-bottom: 6px;" raised="" on-tap="removeRecordings">Delete</paper-button>
            </div>
        </div>
        <br>
        <br>
        <div class="buttons">
            <paper-button id="btnsubmit" raised="" class="w3-blue" on-tap="_saveNewVoicemail">
                <iron-icon icon="app:send"></iron-icon>&nbsp;SUBMIT
            </paper-button>
        </div>   
    </div>
    <div id="snackbar"></div>
`;
  }

  static get is() { return 'add-voicemail'; }
  ready(){
  super.ready();
  sessionStorage.setItem("closeElement", false);
}
  static get properties() {
    return {
        recording: {
            type: Blob,
            observer: '_recordingChanged'
          },
        recordings: {
            type: Array,
            value() {
                return [];
            }
        },
        user: {
        type: Object
        },
        timer: Number,
        _companyid: String,
        previouspage: String,
        uploadTasks: {
        type: Array,
        observer: '_uploadTasksChanged'
        },
        uploadedFiles: {
        type: Array,
        },
    };
  }

  catchError(e) {
      dom(this.root).querySelector('#toaster').show({
      text: e.detail.message
      });
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
  upload() {
      console.log('recordings: '+audioBuffer[0]);
      dom(this.root).querySelector('#fs').upload(audioBuffer[0]);
  }
  _uploadComplete(url, size){
      if(url != undefined){
          var downloadURL = url;
          var podcastID = sessionStorage.getItem("newPodcastKey");
          let journalUserID = this.user.userID;
          let journalUserName = this.user.firstName+" "+this.user.lastName;
          var active = true;

          if(checkStatus == "unpublished") active = false;

          var database = firebase.database();
          var updates = {};
          updates['/podcasts/'+podcastID+'/active'] = active;
          updates['/podcasts/'+podcastID+'/company_status'] = "general_"+active;
          updates['/podcasts/'+podcastID+'/userID'] = journalUserID;
          updates['/podcasts/'+podcastID+'/userName'] = journalUserName;
          updates['/podcasts/'+podcastID+'/podcastSize'] = size;
          updates['/podcasts/'+podcastID+'/url'] = downloadURL;
          database.ref().update(updates);

          sessionStorage.removeItem("newPodcastKey");

          dom(this.root).querySelector('#fs').clearTasks();

          this.showSnackBar("New voicemail uploaded successfully!");

          return "Upload Completed Successfully!";
      }
  }
  _saveNewVoicemail(){
      let author = "";
      let title = this.$.podcastTitle.value;
      var postInternalGlobal = this.$.postInternalGlobal.selected;
      let podcasturlInput = "";
      let active = true;
      let company_status = "general";

      let UploadExternal = "upload";

      let journalUserID = this.user.userID;
      let journalUserName = this.user.firstName+" "+this.user.lastName;
      var photoURL = "";

      if(this.user.photoURL != undefined || this.user.photoURL != ""){
      photoURL = this.user.photoURL;
      }else{
      photoURL = "";
      }

      if(photoURL == undefined){
      photoURL = "";
      }

      let companyID = this.user.companyID;
      let companyName = this.user.companyName;

      var confirmedDate = this.$.dateScheduled.value;
      var selectedTime = this.$.timeScheduled.value;

      var userType = sessionStorage.getItem("user"+this.user.userType);
      var user_type = "user"+this.user.userType;

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

      // Validate title
      if ((title == undefined) || (title.trim() == "")){
      this.showSnackBar("Please enter voicemail title !");
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
          if (this.recorded == false){
              this.showSnackBar("Please record the voicemail !");
              return;
          }else{
              // this.upload();
              this.uploadFile();
              podcasturlInput = "";
              active = false;
          }
      }

      if(checkStatus == "unpublished") active = false;

      // Get a reference to the database service
      var database = firebase.database();

      // Get a key for a new podcast.
      var newPodcastKey = database.ref().child('podcasts').push().key;

      sessionStorage.setItem("newPodcastKey", newPodcastKey);

      this.podcastKey = newPodcastKey;
      
      podcast_ID = newPodcastKey;

      // create photo object
      // podcastDescription = Recording, podcastType = 1 
      // podcastDescription = Podcast, podcastType = 2 
      var audioObj = {
          active: active,
          company_status: company_status+"_"+active,
          companyID: companyID,
          companyName: companyName,
          podcastID: newPodcastKey,
          dateRegistered: datetimeMilli,
          dateScheduled: dateScheduled,
          podcastDescription: 'Voicemail',
          UploadExternal: UploadExternal,
          podcastSize: 0,
          podcastType: 1,
          storageName: title,
          title: title,
          author: author,
          stringDateRegistered: datetime,
          stringDateScheduled: stringDateScheduled,
          url: podcasturlInput,
          userID: journalUserID,
          userName: journalUserName,
          photoURL: photoURL,
          companyID_status: companyID_status,
          dailyThoughtDescription: DailyThoughtDescription,
          dailyThoughtType: DailyThoughtType,
          dailyThoughtType_status: DailyThoughtType_status,
          status: status,
          topLeader_status: topLeader_status
      }

      // write podcast data to collection
      var podcastupdates = {};
      podcastupdates['/podcasts/' + newPodcastKey] = audioObj;
      database.ref().update(podcastupdates);

      var element = this.$.recordingslist;
      while (element.firstChild) {
          element.removeChild(element.firstChild);
      }

      this.removeItems();

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
  removeItems(){
      this.$.podcastTitle.value = "";
      this.podcastKey = "";
      this.$.postInternalGlobal.selected = "postInternal";
      var recordingslist = this.$.recordingslist;

      this.clearArray(this.recordings);
      this.clearArray(audioBuffer);

      this.$.log.innerHTML = "";

      while (recordingslist.firstChild) {
          recordingslist.removeChild(recordingslist.firstChild);
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
  splitDate(date, char){
    return date.split(char);
  }

  //   recorder js functions
  init() {
      var that = this;
      try {
      // webkit shim
      // window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      
      // audio_context = new AudioContext;
      audio_context = null;
      if (typeof AudioContext !== "undefined")
      {
          audio_context = new AudioContext();

          console.log("Created AudioContext");
      }
      else if (typeof webkitAudioContext !== "undefined")
      {
          audio_context = new webkitAudioContext();
          console.log("Created webkitAudioContext");
      }
      else
      {
          alert('No web audio support in this browser!');
          return;
      }
      
      processor = audio_context.createScriptProcessor(4096, 2, 2);
      processor.connect(audio_context.destination);
      } catch (e) {
          alert('No web audio support in this browser!');
      }
      
      //navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      //  __log('No live audio input: ' + e);
      //});
      if (navigator.getUserMedia) {
          this.__log('Recording...'); 
          navigator.getUserMedia({audio: true}, this.startUserMedia, function(e) {
              this.__log('No live audio input available');
          });

          this.timerFunction();

          // let recorded = this.wait(8000).then(
          //     () =>{that.stopRecording()}
          // );

          // console.log("recorded: ", recorded);
      } else if (navigator.webkitGetUserMedia) {
          this.__log('Recording...');    
          navigator.webkitGetUserMedia({audio: true}, this.startUserMedia, function(e) {
              this.__log('No live audio input available');
          });

          this.timerFunction();

          // let recorded = this.wait(8000).then(
          //     () =>{that.stopRecording()}
          // );
      } else if (navigator.mediaDevices.getUserMedia) {
          this.__log('Recording...');    
          navigator.mediaDevices.getUserMedia({audio: true}).then(this.startUserMedia).catch(function(e) {
              this.__log('No live audio input available');
          });

          this.timerFunction();

          // let recorded = this.wait(8000).then(
          //     () =>{that.stopRecording()}
          // );

          // console.log("recorded: ", recorded);
      } else {
          this.__log('No user media support');
      }
  }
  createDownloadLink() {
      var recordingslist = this.shadowRoot.querySelector('#recordingslist');
      var hideRemoveRecording = this.$.hideRemoveRecording;
      var rec = this.recording;
      
      recorder && recorder.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      // var li = document.createElement('li');
      var au = document.createElement('audio');
      // var hf = document.createElement('a');

      audioBuffer.push(blob);

      au.controls = true;
      au.src = url;
      recordingslist.appendChild(au);
      hideRemoveRecording.style = 'display: block;';
      });
  }

  removeRecordings(){
      var recordingslist = this.$.recordingslist;

      this.clearArray(this.recordings);
      this.clearArray(audioBuffer);

      this.$.log.innerHTML = "";

      while (recordingslist.firstChild) {
          recordingslist.removeChild(recordingslist.firstChild);
      }

      this.$.hideRemoveRecording.style = 'display: none;';
  }

  __log(e, data) {
      var log = this.$.log;

      log.innerHTML = "" + e;
      // log.innerHTML += "\n" + e + " " + (data || '');
  }

  startUserMedia(stream) {   
      var that = this;     
      window.localStream = stream;

      var input = audio_context.createMediaStreamSource(stream);
      console.log('Media stream created.');
      
      recorder = new Recorder(input,processor);
      // recorder = new Recorder(input);
      console.log('Recorder initialised.');
      
      // this.startRecordingAftrInit();
      audio_context.resume();
      recorder && recorder.record();
      console.log('Recording...');

  }

  startRecording() {
      var button = this.$.startrecord;
      var btnsubmit = this.$.btnsubmit;
      var log = this.$.log;
      var recordingslist = this.$.recordingslist;
      this.$.hideRemoveRecording.style = 'display: none;';
      var that = this;

      log.innerHTML = "";
      this.clearArray(audioBuffer);
      while (recordingslist.firstChild) {
          recordingslist.removeChild(recordingslist.firstChild);
      }

      this.init();
      button.disabled = true;
      btnsubmit.disabled = true;
      button.nextElementSibling.disabled = false;

  }

  wait(delayInMS) {
      return new Promise(resolve => setTimeout(resolve, delayInMS));
  }

  timerFunction(){
      var timeobj = dom(this.root).querySelector('#timeobj');
      // Get starting date and time
      var timeMillisec = new Date();
      var countDownDate = new Date(timeMillisec).getTime();
      var that = this;

      // Update the count down every 1 second
      this.timer = setInterval(function() {
          // Get todays date and time
          var now = new Date().getTime();
          
          // Find the distance between now and the count down date
          var distance = now - countDownDate;
          
          // Time calculations for minutes and seconds
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var minutesText = "";
          if(minutes == 0) minutesText = "00<sup>m</sup>";
          else minutesText = "0"+minutes+"<sup>m</sup>"

          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          var secondsText = "";
          if(seconds < 10) secondsText = "0"+seconds;
          else secondsText = seconds;
          
          // Output the result in an element with id="demo"
          timeobj.innerHTML = minutesText +" " + secondsText + "<sup>s</sup>";
          
          // If the count down is finished, write some text 
          if (minutes == 2) {
              clearInterval(that.timer);
              that.stopRecording()
          }
          
      }, 1000);
  }

  startRecordingAftrInit() {
      audio_context.resume();
      recorder && recorder.record();
      this.__log('Recording...');
  }

  stopRecording() {
      var button = this.$.stoprecord;
      var btnsubmit = this.$.btnsubmit;

      recorder && recorder.stop();
      // stop timer
      clearInterval(this.timer);

      button.disabled = true;
      btnsubmit.disabled = false;

      button.previousElementSibling.disabled = false;
      this.__log('Done');
      
      localStream.getAudioTracks()[0].stop();
      
      // create WAV download link using audio data blob
      this.createDownloadLink();
      
      recorder.clear();
      audio_context.close();
      audio_context = null;
      processor = null;
  }

  uploadFile(){
      // File or Blob
      var filename = new Date().toISOString()+'.wav';
      var downloadURL='';
      var database = firebase.database();
      var updates = {};

      this.__log('Uploading file...please wait.');

      var file = audioBuffer[0];
      let journalUserID = this.user.userID;
      let journalUserName = this.user.firstName+" "+this.user.lastName;

      // Create the file metadata
      var metadata = {
      contentType: 'audio/wav'
      };
      var storageRef = firebase.storage().ref();

      var uploadTask = storageRef.child('podcasts/' + filename).put(audioBuffer[0], metadata);

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
          downloadURL = uploadTask.snapshot.downloadURL;
          var active = true;

          if(checkStatus == "unpublished") active = false;

          updates['/podcasts/'+podcast_ID+'/active'] = active;
          updates['/podcasts/'+podcast_ID+'/company_status'] = "general_"+active;
          updates['/podcasts/'+podcast_ID+'/userID'] = journalUserID;
          updates['/podcasts/'+podcast_ID+'/userName'] = journalUserName;
          updates['/podcasts/'+podcast_ID+'/podcastSize'] = 0;
          updates['/podcasts/'+podcast_ID+'/url'] = downloadURL;

          database.ref().update(updates);
          podcast_ID = '';

          // sessionStorage.removeItem("newPodcastKey");
          // this.removeFromParent();
      });
  }
  clearArray(array) {
      if(array != undefined){
        while (array.length) {
          array.pop();
        }
      }
  }
}
window.customElements.define(AddVoicemail.is, AddVoicemail);

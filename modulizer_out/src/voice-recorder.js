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
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/iron-image/iron-image.js';
import './my-recorder.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
var AudioContex;
var context;
var audioBuffer = [];
var myArrayBuffer, nowBuffering, source;
var newBlob = new Blob();
var podcast_ID='';

var audio_context;
var recorder;
var processor;

class VoiceRecorder extends Element {
  static get template() {
    return html`
    <style include="w3-styles"></style>
    <style include="shared-styles">
        :host {
            position: relative;
            display: block;
            overflow: hidden;
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
            min-height: 410px;
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
        <div class="recorder-area">
            <iron-image src="../data/mic.png" style="width:auto; height:80px;" preload="" sizing="contain"></iron-image>
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
    </div>
`;
  }

  static get is() { return 'voice-recorder'; }
  ready(){
  super.ready();
  sessionStorage.setItem("closeElement", false);
}
  static get properties() {
    return {
        user: {
        type: Object
        },
        timer: Number,
        _companyid: String,
        previouspage: String,
    };
  }

  removeItems(){
      var recordingslist = this.$.recordingslist;

      audioBuffer = [];

      this.$.log.innerHTML = "";

      while (recordingslist.firstChild) {
          recordingslist.removeChild(recordingslist.firstChild);
      }
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
      }
      else if (typeof webkitAudioContext !== "undefined")
      {
          audio_context = new webkitAudioContext();
      }
      else
      {
          // this.__log("No web audio support in this browser!");
          alert('No web audio support in this browser!');
          return;
      }
          
      processor = audio_context.createScriptProcessor(4096, 2, 2);
      processor.connect(audio_context.destination);
      } catch (e) {
          // this.__log('No web audio support in this browser! ');
          alert('No web audio support in this browser!');
      }
  
      if (navigator.getUserMedia) {
          this.__log('Recording...'); 
          navigator.getUserMedia({audio: true}, this.startUserMedia, function(e) {
              this.__log('No live audio input');
          });

          this.timerFunction();

          // let recorded = this.wait(8000).then(
          //     () =>{that.stopRecording()}
          // );

      } else if (navigator.webkitGetUserMedia) {
          this.__log('Recording...');    
          navigator.webkitGetUserMedia({audio: true}, this.startUserMedia, function(e) {
              this.__log('No live audio input');
          });

          this.timerFunction();

          // let recorded = this.wait(8000).then(
          //     () =>{that.stopRecording()}
          // );
      } else if (navigator.mediaDevices.getUserMedia) {
          this.__log('Recording...');    
          navigator.mediaDevices.getUserMedia({audio: true}).then(this.startUserMedia).catch(function(e) {
              this.__log('No live audio input');
          });

          this.timerFunction();

          // let recorded = this.wait(8000).then(
          //     () =>{that.stopRecording()}
          // );
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
      var au = document.createElement('audio');

      audioBuffer.push(blob);

      au.controls = true;
      au.src = url;
      recordingslist.appendChild(au);
      hideRemoveRecording.style = 'display: block;';
      });
  }
  voicemail(){
      return audioBuffer;
  }

  removeRecordings(){
      var recordingslist = this.$.recordingslist;
      audioBuffer = [];

      this.$.log.innerHTML = "";

      while (recordingslist.firstChild) {
          recordingslist.removeChild(recordingslist.firstChild);
      }

      this.$.hideRemoveRecording.style = 'display: none;';
  }

  __log(e, data) {
      var log = this.$.log;
      log.innerHTML += "\n" + e + " " + (data || '');
  }

  startUserMedia(stream) {
      window.localStream = stream;

      var input = audio_context.createMediaStreamSource(stream);
      
      recorder = new Recorder(input,processor);
      // recorder = new Recorder(input);
      
      // this.startRecordingAftrInit();
      audio_context.resume();
      recorder && recorder.record();
  }

  startRecording() {
      var button = this.$.startrecord;
      var log = this.$.log;
      var recordingslist = this.$.recordingslist;
      this.$.hideRemoveRecording.style = 'display: none;';
      var that = this;

      log.innerHTML = "";
      audioBuffer = [];
      while (recordingslist.firstChild) {
          recordingslist.removeChild(recordingslist.firstChild);
      }

      this.init();
      button.disabled = true;
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
              that.stopRecording();
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

      recorder && recorder.stop();
      // stop timer
      clearInterval(this.timer);

      button.disabled = true;

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

      console.log("storage ref: ", storageRef);

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
          console.log("error uploading: ", error)

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

          updates['/podcasts/'+podcast_ID+'/active'] = true;
          updates['/podcasts/'+podcast_ID+'/company_status'] = "general_true";
          updates['/podcasts/'+podcast_ID+'/userID'] = journalUserID;
          updates['/podcasts/'+podcast_ID+'/userName'] = journalUserName;
          updates['/podcasts/'+podcast_ID+'/podcastSize'] = 0;
          updates['/podcasts/'+podcast_ID+'/url'] = downloadURL;

          database.ref().update(updates);
          podcast_ID = '';
      });
  }
}
window.customElements.define(VoiceRecorder.is, VoiceRecorder);

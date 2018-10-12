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
import '../../../polymerfire/firebase-app.js';
import '../../../polymerfire/firebase-auth.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-database-behavior.js';
import './thought-card-attachments.js';
import './comments-box.js';
import './delete-pldp.js';
import './app-icons.js';
import './my-pldp.js';
import './shared-styles.js';
import './w3-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
class PLDPThoughts extends Element {
  static get template() {
    return html`
    <firebase-query id="dailythought" path="/myPLDP/dailyThoughts" order-by-child="PLDPUserID" equal-to="[[user.userID]]" limit-to-last="15" data="{{thoughtsData}}">
    </firebase-query>

    <style include="w3-styles"></style>
    <style include="shared-styles">
				.previewFooter{
					display: flex;
					position: absolute;
					width: 100%;
					max-width: 600px;
					margin-bottom: 6px;
					bottom: 10px;
					left:10px;
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
  <div class="container">
    <paper-dialog id="pldpDialog">
      <h2><paper-icon-button icon="myicons:event-note" class="blue"></paper-icon-button>My PLDP</h2>
      <hr>
      <paper-dialog-scrollable>
          <p>Based on what you just read, would you like to add an Action to your PLDP (Personal Leadership Development Plan)?</p>
      </paper-dialog-scrollable>
      <hr>
      <div class="buttons">
      <paper-button dialog-dismiss="">Close</paper-button>
        <a href="my-pldp" name="name" class="pldp-link">
          <paper-button on-tap="closePLDPDialog">Proceed</paper-button>
        </a>
    </div>
    </paper-dialog>
  </div>
  <div class="container">
    <paper-dialog id="videoDialog" class="add-dailog">
        <div class="container video-side">
            <iframe id="videoPlayer" width="100%" height="315" src="" autoplay="false" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="">
            </iframe>
        </div>
        <!-- </paper-dialog-scrollable> -->
      <div class="buttons">
        <paper-button dialog-dismiss="">Close</paper-button>
      </div>
    </paper-dialog>
  </div>
  <div class="main-card">
    <template is="dom-repeat" items="[[thoughtsData]]" as="item">
      <div class="modal-div">
        <div class="card-container fadeInUp" style="max-width:600px">
          <span class="w3-button w3-display-topright w3-red w3-medium w3-hide closer-for-modal">×</span>
          <delete-pldp user="[[user]]" item="[[item]]" itemtype="dailyThoughts" entityid="[[item.dailyThoughtID]]"></delete-pldp>
          <div class="container card-header">
            <div class="header-det w3-row">
              <div class="card-avatar" style\$="[[_profilePhoto(item.photoURL)]]"></div>
              <div class="container card-company-container">
                <div class="row card-postedby w3-medium">[[item.journalUserName]]</div>
                <div class="row card-company">[[item.companyName]]</div>
              </div>
              <div class="thought-date">
                [[_formate_date(item.dateRegistered)]]
              </div>
            </div>
            <div class="header-actions">
              <template is="dom-if" if="[[isEqual(thoughtype, 'mythoughts')]]">
                <!-- <a id="addThoughts" href="add-thoughts" class="add-thought-link"> -->
                  <paper-icon-button indexed="add-thoughts" caption="Edit Thoughts" icon="create" on-tap="_loadElement1" id="edit[[item.dateRegistered]]" data="[[item.dailyThoughtID]]" class="tomato"></paper-icon-button>
                <!-- </a> -->
                <paper-icon-button icon="delete" on-tap="_deleteThought" id="del[[item.dateRegistered]]" data="[[item.dailyThoughtID]]" style="color: rgb(150, 150, 150)"></paper-icon-button>
              </template>
            </div>
          </div>
        
          <div class="container">
            <div class="row">
              <div class="thought-img" style\$="[[_photo(item.photos, item.textColor)]]">
                <div class="thought-mask"></div>
                <div class=" w3-row">
                  <div class="thought-title">
                    [[item.title]]
                  </div>
                  <div class="thought-author">
                    [[item.subtitle]]
                  </div>
                </div>
                <div class="previewFooter">
                  <iron-image src="[[item.logo]]" style="width:46px; height:46px; padding:2px" preload="" sizing="cover"></iron-image>
                  <div class="previewText">
                    <div id="thoughtSlogan">[[item.slogan]]</div>
                    <div id="thoughtWebsite">[[item.website]]</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <thought-card-attachments itemid="[[item.dailyThoughtID]]" item="[[item]]" thoughtype="[[thoughtype]]" ispldp="[[ispldp]]"></thought-card-attachments>
          <comments-box user="[[user]]" firebaseref="dailyThoughts" opened="[[_openedcomments]]" item="[[item]]" thetype="Thought" entityid="[[item.dailyThoughtID]]"></comments-box>
        </div>
      </div>
    </template>
  </div>
`;
  }

  static get is() { return 'pldp-thoughts'; }
  static get properties() {
    return {
      user: {
        type: Object
      },
      _companyid: String,
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
      ispldp: {
        type: Boolean,
        value: true
      },
      lastSelected: {
        type: String,
        value: ''
      }
    };
  }
  closePLDPDialog(){
    this._addToPLDP();
    sessionStorage.removeItem("PLDP_ThoughtAdd");
    this.$.pldpDialog.close();
  }
  _addToPLDP(){
    let PLDP_ThoughtAdd = sessionStorage.getItem("PLDP_ThoughtAdd");

    let filteredArray = this.findObjectByKey(this.thoughtsData, "dailyThoughtID", PLDP_ThoughtAdd);

    // remove the key
    delete filteredArray['$key'];

    // add PLDP user to the thought object
    filteredArray.PLDPUserID = this.user.userID;
    filteredArray.PLDPUserName = this.user.firstName+" "+this.user.lastName;

    // instantiate db
    let database = firebase.database();

    // create new record
    let newThought = database.ref().child('/myPLDP/dailyThoughts').push().key;

    // delete the thought if already exists
    let ref = database.ref('myPLDP/dailyThoughts');
    ref.orderByChild('dailyThoughtID').equalTo(PLDP_ThoughtAdd)
        .once('value').then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
            if(newThought === childSnapshot.key){
              console.log("Got the new ID");
            }else{
              // remove each old child
              ref.child(childSnapshot.key).remove();
            }
        });
    });
    
    let updates = {};
    updates['/myPLDP/dailyThoughts/' + newThought] = filteredArray;
    database.ref().update(updates);
  }
  _setData(title, subtitle, id){
    // set thought data to be rated
    let a = {
          Title: title,
          Subtitle: subtitle,
          ID: id
      }
    return a;
  }

  _formate_date(dt){
    var date = new Date(dt);
    var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
    var locale = 'en-us';
    var month = date.toLocaleString(locale, { month: "long" });
    var year = date.getFullYear();

    return day+' '+month+' '+year;
  }

  _openRate(e){
    let rateInfo = dom(this.root).querySelector('#'+e.target.id).data;

    sessionStorage.setItem("ID",'thought'+rateInfo.ID);
    sessionStorage.setItem("Title",rateInfo.Title);
    sessionStorage.setItem("Subtitle",rateInfo.Subtitle);
    sessionStorage.setItem("aID",rateInfo.ID);
    sessionStorage.setItem("rateType",'dailyThoughts');
    sessionStorage.setItem("orderRateBy",'dailyThoughtID');
  }
  _getVideoName(storageName){
    let strName = '';
    strName = storageName.slice(storageName.lastIndexOf('/')+1);
    strName = strName.replace(new RegExp('_', 'g'), ' ');
    return strName;
  }
  _videoClick(e){      
    var videoClicked = dom(this.root).querySelector('#'+e.target.id).data;
    
    var youtubeID = this.getYoutubeID(videoClicked);

    var src = "https://www.youtube.com/embed/"+youtubeID;

    var videoPlayer = dom(this.root).querySelector('#videoPlayer');
    videoPlayer.src = src;
    // var videoPlayer1 = Polymer.dom(this.root).querySelector('#videoPlayer1');
    // var videoPlayer2 = Polymer.dom(this.root).querySelector('#videoPlayer2');
    // videoPlayer1.src = videoClicked;
    // videoPlayer2.src = videoClicked;
    // videoPlayer.load();
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
    this.thoughtsData.sort(function(a, b) {
    var nameA = a.dateRegistered; // ignore upper and lowercase
    var nameB = b.dateRegistered; // ignore upper and lowercase
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }

    // names must be equal
    return 0;
    });
    // console.log('Quotes: '+this.quotes);

      // for (item in newData) { 
      //     this._dailythoughts = newData[item];
      // }
      
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
  _openPLDP(e){
    var thoughtID = dom(this.root).querySelector('#'+e.target.id).data;
    sessionStorage.setItem("PLDP_ThoughtAdd", thoughtID);
    this.$.pldpDialog.open();
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
  findObjectByKey(array, key, value) {
      for (var i = 0; i < array.length; i++) {
          if (array[i][key] === value) {
              return array[i];
          }
      }
      return null;
  }
}

window.customElements.define(PLDPThoughts.is, PLDPThoughts);

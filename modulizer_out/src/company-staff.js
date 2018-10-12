/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* Ensure Web Animations polyfill is loaded since neon-animation 2.0 doesn't import it */
/* Firebase Query */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { Element } from '../../../@polymer/polymer/polymer-element.js';

import '../../../@polymer/iron-icons/iron-icons.js';
import '../../../@polymer/iron-image/iron-image.js';
import '../../../@polymer/iron-list/iron-list.js';
import '../../../paper-search/paper-search-bar.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../../@polymer/neon-animation/web-animations.js';
import '../../../@polymer/paper-item/paper-item.js';
import '../../../@polymer/paper-listbox/paper-listbox.js';
import '../../../polymerfire/firebase-query.js';
import './app-icons.js';
import './js-xlsx.js';
import './shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
var _ua = window.navigator.userAgent;
var scrollTopPosition
iOS = /iPad|iPhone|iPod/.test(_ua),
iOS11 = /OS 11_0|OS 11_1|OS 11_2|OS 11_3/.test(_ua);

class CompanyStaff extends Element {
  static get template() {
    return html`
      <template is="dom-if" if="[[_companyid]]">
        <firebase-query id="users" path="/users" order-by-child="companyID" equal-to="[[_companyid]]" data="{{usersData}}">
        </firebase-query>
        <!-- order-by-child="companyID"
          equal-to="[[_companyid]]" -->
      </template>

  <style include="w3-styles">
    .w3-modal{
      padding-top: 200px!important;
    }
    .w3-modal-content{
      right: 10px;
      position: fixed;
      min-width: 320px;
      max-width: 600px!important;
    }
  </style>

  <style include="shared-styles">
    :host{
      --paper-icon-button-hover: {
        color: red;
      }
    }
    .content {
      display: block;
      position: relative;
      max-width: 1000px;
      border: 1px solid #eaeaea;
    }
    
    
    @media (max-width: 960px) {
      .content {
        max-width: 800px;
      }
    }
    @media (max-width: 719px) {
      .content {
        max-width: 400px;
      }
    }
    iron-list {
      margin-left: 16px;
      margin-right: 16px;
      z-index: 1;
      --iron-list-items-container: {
        max-width: 100%;
        margin: auto;
        margin-top: 14px;
        margin-bottom: 60px;
        border-bottom: 1px solid #ddd;
      };
    }
    .item {
      @apply --layout-horizontal;
      padding: 20px;
      background-color: white;
      border: 1px solid #ddd;
      cursor: pointer;
      margin-bottom: 10px;
    }
    .avatar {
      height: 40px;
      width: 40px;
      border-radius: 20px;
      box-sizing: border-box;
      background-color: #DDD;
    }
    .pad {
      padding: 0 16px;
      @apply --layout-flex;
      @apply --layout-vertical;
    }
    .primary {
      font-size: 16px;
      font-weight: bold;
    }
    .shortText, .longText {
      font-size: 14px;
    }
    .longText {
      color: gray;
      display: none;
    }
   
    .modal-header {
        padding: 2px 16px;
    }
    .modal-body {padding: 2px 16px;}
    .modal-footer {
        padding: 2px 16px;
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
      height: 260px;
      /* width: 100%; */
      border-radius: 1px;
      text-align: center;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 1px;
      padding: 16px;
    }
    /* end dialog css */

    @-webkit-keyframes fadeInUp{
        0%{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}
        100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}
    }
    @keyframes fadeInUp{
        0%{opacity:0;-webkit-transform:translateY(20px);-ms-transform:translateY(20px);transform:translateY(20px)}
        100%{opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}
    }
    .fadeInUp{
        -webkit-animation-name:fadeInUp;
        animation-name:fadeInUp;
        opacity: 0;
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in;
    }
    .add-users-bar{
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
      padding: 16px;
      border: 1px solid #eaeaea;
      margin-top: 16px;
      align-items: center;
      justify-content: flex-end;
    }
    .upload-buttons{
      margin-top: 16px; 
      width:100%;
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
    }
    #selectFileForm{
      width: 100%;
      max-width: 340px;
      padding: 16px;
      text-align: left;
      border: 1px solid #eaeaea;
      border-radius: 2px;
      padding: 16px;
    }
  </style>

  

   <!-- The Modal -->
  <div id="myModal" class="w3-modal">
    <!-- Modal content -->
    <div class="w3-modal-content w3-animate-right w3-card-2">
      <div class="modal-header w3-theme-l1">
        <span id="closeModal" class="w3-button w3-display-topright w3-red w3-text-white">×</span>
        <h2 class="w3-text-blue"><iron-icon icon="app:group-add"></iron-icon>&nbsp;Upload Users</h2>
      </div>
      <div class="modal-body">
      </div>
      <div class="thought-prevImg" id="thoughtImg">
        <form id="selectFileForm">
          <label id="pickFileLabel" class="paper-font-body2" style="cursor: pointer; margin-top: 10px;" for="file-uploader">
            <paper-button class="custom indigo" id="pickFile"><iron-icon icon="app:attach-file"></iron-icon>&nbsp;Select File (.xlsx, .xls)</paper-button>
          </label>
          <br>
          <p id="filename"></p>
          <input id="file-uploader" type="file" on-change="checkfile"> 
          <div class="upload-buttons">
            <div id="hideRemoveFile" hidden="">
              <paper-button class="custom" style="color:#eaeaea; background:#810029; margin-right: 6px;" raised="" on-tap="uploadNewUsers">Upload File</paper-button>
              <paper-button class="custom" style="color:#810029; background:#eaeaea;" raised="" on-tap="removeFile">Remove File</paper-button>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer w3-theme-l1">
      </div>
    </div>
  </div>

  <!-- The Modal -->
<div id="singleUser" class="w3-modal">
  <div class="w3-modal-content w3-animate-right w3-card-4">
    <header class="w3-container w3-theme-l1"> 
      <span id="closeSingleUser" class="w3-button w3-display-topright w3-red w3-text-white">×</span>
      <h2 class="w3-text-blue"><iron-icon icon="app:person-add"></iron-icon>&nbsp;New User</h2>
    </header>
    <div class="w3-container">
      <paper-dropdown-menu autofocus="" id="dropdown_menu" label="User Category" value="{{selectedCategory}}" style="width: -webkit-fill-available;" tabindex="0">
        <paper-listbox id="categoryList" slot="dropdown-content" attr-for-selected="value" selected="{{selectedCategory}}" no-animations="true" style="min-width: 340px;">
          <paper-item value="Standard User">Standard User</paper-item>
          <paper-item value="Master Contributor (Gold)">Master Contributor (Gold)</paper-item>
          <paper-item value="Global Contributor (Top Leader)">Global Contributor (Top Leader)</paper-item>
          <paper-item value="Platinum Admin">Platinum Admin</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
      <paper-input id="firstName" name="firstName" always-float-label="" label="Firstname" type="text" required="" tabindex="1"></paper-input>
      <paper-input id="lastName" name="lastName" always-float-label="" label="Lastname" type="text" required="" tabindex="2"></paper-input>
      <paper-input id="email" name="email" always-float-label="" label="Email" type="email" required="" tabindex="3"></paper-input>
    </div>
    <footer class="w3-container w3-light-grey w3-padding">
        <paper-button raised="" class="w3-blue" on-tap="createNewUser">
          <iron-icon icon="app:send"></iron-icon>&nbsp;SUBMIT
        </paper-button>
    </footer>
  </div>
</div>
        
    <!-- <div class="container search-bar">
      <paper-search-bar hide-filter-button="true" placeholder="Search for Staff Members"></paper-search-bar>
    </div>  -->
    <div class="add-users-bar w3-card-1">
      <paper-button raised="" class="custom indigo w3-small" on-tap="newUserDialog"><iron-icon icon="app:person-add"></iron-icon>&nbsp; Add User</paper-button>
      <paper-button raised="" class="custom indigo w3-small" on-tap="uploadUsersDialog"><iron-icon icon="app:group-add"></iron-icon>&nbsp; Upload Users (xls)</paper-button>
    </div> 
    <div class="content fadeInUp">
      <ul class="w3-ul w3-card-2 w3-hoverable">
        <template is="dom-repeat" items="[[usersData]]" as="item">
          <li class="w3-bar" style="padding: 8px 0;">
            <img class="w3-third w3-padding-small w3-circle" style="width:36px; height: 36px;" src="[[_profilePhoto(item.photoURL)]]">
            <div class="w3-rest w3-bar-item">
              <span class="w3-medium w3-text-blue">[[item.firstName]] [[item.lastName]]</span><span class\$="[[_isDisabled(item.disabled)]] w3-tag w3-tiny w3-round">[[_isDisabledText(item.disabled)]]</span><br>
              <span>[[item.email]]</span>
            </div>
            
            <paper-icon-button isdisabled="[[item.disabled]]" username="[[item.firstName]] [[item.lastName]]" data="[[item.userID]]" icon\$="[[_statusIcon(item.disabled)]]" class="custom indigo w3-right" on-tap="disableAccount"></paper-icon-button>
          </li>
        </template>
      </ul>
    </div>
    <div id="snackbar"></div>
`;
  }

  static get is() { return 'company-staff'; }
  ready(){
    super.ready();

    var modal = dom(this.root).querySelector('#myModal');
    var modalsingleUser = dom(this.root).querySelector('#singleUser');
    var span = dom(this.root).querySelector('#closeModal');
    var spanSingleUSer = dom(this.root).querySelector('#closeSingleUser');
    var pickFileLabel = dom(this.root).querySelector('#pickFileLabel'); 
    var hideRemoveFile = dom(this.root).querySelector('#hideRemoveFile');
    var filename = dom(this.root).querySelector('#filename');
    var selectFileForm = dom(this.root).querySelector('#selectFileForm');
    var that = this;

    span.addEventListener('click', function(e){
        pickFileLabel.style = "display: block;";
        filename.innerHTML = "";
        hideRemoveFile.style = "display: none";
        selectFileForm.reset();
        modal.style.display = "none";
    });
    
    spanSingleUSer.addEventListener('click', function(e){
      // ios 11 bug caret position
            if ( iOS && iOS11 ) {
                that.removeIOSBugfix();
            }
      this.selectedCategory = "";
      modalsingleUser.style.display = "none";
    });
  }
  static get properties() {
    return {
      user: {
        type: Object
      },
      _companyid: String,
      usersData: {
        type: Object,
        observer: '_onusersDataDataReceived'
      },
    };
  }
  _onusersDataDataReceived(newData, oldData){
    // console.log('Quotes: '+this.quotes);
    // for (item in newData) { 
    //     this._dailythoughts = newData[item];
    // }
  }
  attached() {
    // Use the document element
    this.$.list.scrollTarget = this.ownerDocument.documentElement;
  }
  getClassForItem(item, selected) {
    return selected ? 'item expanded' : 'item';
  }
  disableAccount(e){
    let userID = e.target.data;
    let userName = e.target.username;
    let active = e.target.isdisabled
    let disabled = true;
    let disabledText = 'Deactivate';

    active ? disabled = false : true;
    disabled ? disabledText = 'Deactivate' : disabledText = 'Activate';

    if (confirm(disabledText+' selected account: '+userName+'?')){
      // Get a reference to the database service
      let database = firebase.database();

      // Update user data 
      let updates = {};
      updates['/users/' + userID+'/disabled'] = disabled;
      database.ref().update(updates);
    }
  }
  _isDisabled(disabled){
    return disabled ? "w3-red" : "w3-green";
  }
  _isDisabledText(disabled){
    return disabled ? "Disabled" : "Active";
  }
  _statusIcon(disabled){
    return disabled ? "app:check" : "myicons:cancel"; 
  }

  uploadUsersDialog(){
    var modal = dom(this.root).querySelector('#myModal');
    modal.style.display = "block";
  }
  checkfile(e) {
    var validExts = new Array(".xlsx", ".xls");
    var fileName = e.target.files[0].name;        

    var fileExt = fileName.substring(fileName.lastIndexOf('.'));

    if (validExts.indexOf(fileExt) < 0) {
      this.$.hideRemoveFile.style = "display: none";
      this.$.filename.innerHTML = fileName;

      this.showSnackBar("Invalid file selected, valid files are of " +
              validExts.toString() + " types.");
      return false;
    }
    else {
      this.$.hideRemoveFile.style = "display: block";
      this.$.filename.innerHTML = fileName;
      
      return true;
    }
  }
  removeFile(){
    var pickFileLabel = this.$.pickFileLabel; 
    this.$.hideRemoveFile.style = "display: none";
    this.$.filename.innerHTML = "";
    pickFileLabel.style = "display: block;";
    var selectFileForm = dom(this.root).querySelector('#selectFileForm');
    selectFileForm.reset();
  }
  showSnackBar(msg){
    var x = this.$.snackbar;
    x.innerHTML = msg;
    x.className = "show";
    setTimeout(function(){
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  isEqual(a, b) {
    return a === b;
  }
  newUserDialog(){
    // ios 11 bug caret position
            if ( iOS && iOS11 ) {
                this.addIOSBugfix();
            }
    var modal = dom(this.root).querySelector('#singleUser');
    modal.style.display = "block";
  }
  createNewUser(){
    var span = dom(this.root).querySelector('#closeSingleUser');
    var email = this.$.email.value;
    var firstName = this.$.firstName.value;
    var lastName = this.$.lastName.value;

    var emailVal = this.$.email.validate();
    var firstNameVal = this.$.firstName.validate();
    var lastNameVal = this.$.lastName.validate();

    // let companyID = "-LDVbbRyIMhukVtTVQ0n";
    // let companyName = "OneConnect Technologies";
    // let companyID = "-KgsUcgfo7z1U9MXgd9i";
    // let companyName = "Global Leadership Platform";
    // let companyID = "-LFWwJDGboULCmA0aC_9";
    // let companyName = "McDonald's";
    let companyID = this.user.companyID;
    let companyName = this.user.companyName;

    // Validate thought category
    if ((this.selectedCategory == undefined) || (this.selectedCategory == -1)){
      this.showSnackBar("Please select user category!");
      return;
    }

    let userDescription = "Standard User";
    let userType = 8;

    if(this.selectedCategory == "Global Contributor (Top Leader)"){
      userDescription = this.selectedCategory;
      userType = 4;
    }else if(this.selectedCategory == "Master Contributor (Gold)"){
      userDescription = this.selectedCategory;
      userType = 5;
    }else if(this.selectedCategory == "Platinum Admin"){
      userDescription = this.selectedCategory;
      userType = 7;
    }else if(this.selectedCategory == "Standard User"){
      userDescription = this.selectedCategory;
      userType = 8;
    }

    // get date and time
    var timeInMs = Date.now();
    var datetime = new Date(timeInMs);
    // format date
    datetime = this.formatDate(datetime);

    // Get a reference to the database service
    var database = firebase.database();

    if(!email || !emailVal){
      this.showSnackBar("Email is required!");
      return;
    }else if(!firstName || !firstNameVal){
      this.showSnackBar("Firstname is required!");
      return;
    }else if(!lastName || !lastNameVal){
      this.showSnackBar("Lastname is required!");
      return;
    }else{
      var userID = database.ref().child('newUploadUsers').push().key;
      var defPassword = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);
      defPassword = defPassword.toUpperCase();

      var data = {
        "companyID" : companyID,
        "companyName" : companyName,
        "dateRegistered" : timeInMs,
        "email" : email,
        "firstName" : firstName,
        "lastName" : lastName,
        "password" : defPassword,
        "stringDateRegistered" : datetime,
        "userDescription" : userDescription,
        "newUploadUserID" : userID,
        "userType" : userType,
        "companyID_userType" : companyID+"_"+userType
      }

      // Write the new rating data
      var updates = {};
      updates['/newUploadUsers/' + userID] = data;
      database.ref().update(updates);

      this.$.email.value = "";
      this.$.firstName.value = "";
      this.$.lastName.value = "";
      this.selectedCategory = "";

      span.click();
      this.showSnackBar("User created successfully!");
    }
  }
  uploadNewUsers(){
    var span = dom(this.root).querySelector('#closeModal');
    var files = dom(this.root).querySelector('#file-uploader').files;
    var i, f;

    let companyID = this.user.companyID;
    let companyName = this.user.companyName;
    // get date and time
    var timeInMs = Date.now();
    var datetime = new Date(timeInMs);
    // format date
    datetime = this.formatDate(datetime);

    // Get a reference to the database service
    var database = firebase.database();
    
    for (i = 0, f = files[i]; i != files.length; ++i) {
      var reader = new FileReader();
      var name = f.name;
      reader.onload = function(e) {
        
        var data = e.target.result;
        var workbook = XLSX.read(data, {type: 'binary'});

        function to_json(workbook) {
          var result = {};
          workbook.SheetNames.forEach(function(sheetName) {
            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if(roa.length > 0){
                result[sheetName] = roa;
            }
          });
          return result;
        }

        var xls_json = to_json(workbook);
        var users;
        // console.log('xls json: '+JSON.stringify(xls_json));
        Object.keys(xls_json).forEach(key => {
          users = xls_json[key];
          users.forEach((userobj, index) =>{
            console.log('Index:'+index + ' Name: '+userobj.Firstname);

            var email = userobj.Email;
            if(email !== undefined && email.length > 5){
              var userID = database.ref().child('newUploadUsers').push().key;
              var defPassword = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);
              defPassword = defPassword.toUpperCase();

              var data = {
                "companyID" : companyID,
                "companyName" : companyName,
                "dateRegistered" : timeInMs,
                "email" : userobj.Email,
                "firstName" : userobj.Firstname,
                "lastName" : userobj.Lastname,
                "password" : defPassword,
                "stringDateRegistered" : datetime,
                "userDescription" : "Standard",
                "newUploadUserID" : userID,
                "userType" : 8
              }

              // Write the new rating data
              var updates = {};
              updates['/newUploadUsers/' + userID] = data;
              database.ref().update(updates);
            }

          });
        });
        
        /* DO SOMETHING WITH workbook HERE */
      };
      reader.readAsBinaryString(f);
    }

    span.click();
    this.showSnackBar("Users uploaded successfully!");
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
  _profilePhoto(photo){
    let photo_url = "../images/default-user.png";

    if(photo == undefined){
      photo_url = "../images/default-user.png";
    }else if(photo == ""){
      photo_url = "../images/default-user.png";
    }else{
      photo_url = ""+photo;
    }

    return photo_url;
  }
  addIOSBugfix(){
            // Get scroll position before moving top
            scrollTopPosition = $(document).scrollTop();
            console.log('iOS device')
            // Add CSS to body "position: fixed"
            $("body").addClass("iosBugFixCaret");
            // $("body").css('position: fixed!important; width: 100%!important;');
        }

  removeIOSBugfix(){
      // Remove CSS to body "position: fixed"
      $("body").removeClass("iosBugFixCaret");

      //Go back to initial position in document
      $(document).scrollTop(scrollTopPosition);
  }
}

window.customElements.define(CompanyStaff.is, CompanyStaff);

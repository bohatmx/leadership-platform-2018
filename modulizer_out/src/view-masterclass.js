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
/* paper rating */
/* Firebase Auth */
/* Firebase Query */
/* <link rel="import" href="../bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror.html"> */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { Element } from '../../../@polymer/polymer/polymer-element.js';

import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/paper-spinner/paper-spinner.js';
import '../../../paper-search/paper-search-bar.js';
import '../../../@polymer/paper-dialog/paper-dialog.js';
import '../../../@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '../../../@polymer/iron-collapse/iron-collapse.js';
import '../../../@polymer/paper-styles/shadow.js';
import '../../../@polymer/iron-image/iron-image.js';
import '../../../@polymer/iron-pages/iron-pages.js';
import '../../../@polymer/paper-input/paper-textarea.js';
import '../../../l2t-paper-rating/l2t-paper-rating.js';
import '../../../polymerfire/firebase-auth.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-database-behavior.js';
import './thought-card-attachments.js';
import './comments-box.js';
import './app-icons.js';
import './shared-styles.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
class ViewMasterClass extends Element {
    static get is() { return 'view-masterclass'; }
    static get properties() {
				return {
            user: {
                type: Object
            },
            masterClassData: {
                type: Object,
                observer: '_onmasterClassDataReceived'
            },
            commentsData: {
                type: Object,
                observer: '_oncommentsData'
            },
            _companyid: String,
            thoughtype: String,
            placeholder: String,
            _selected: String,
            _selectedComRate: String,
            _selectedComRates: {
                type: Number,
                value: 0
            },
            opened: {
                type: Boolean,
                reflectToAttribute: true,
                value: true
            },
            isloading: {
                type: Boolean,
                value: true,
                notify: true
            },
            lastSelected: {
                type: String,
                value: ''
            },
            openedComRate: {
                type: Boolean,
                reflectToAttribute: true,
                value: true
            },
            lastSelectedComRate: {
                type: String,
                value: ''
            }
				};
    }
    connectedCallback() { 
				super.connectedCallback();
				
    }
    _onmasterClassDataReceived(newData, oldData){	
				this.isloading = false;
    }
    _sort(a, b) {  
				if (a.dateScheduled > b.dateScheduled) return -1;
				if (a.dateScheduled < b.dateScheduled) return 1;
				return 0;
    }
    _oncommentsData(){
				this.commentsData.sort(function(a, b) {
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
    _sortComments(obj){
				
				if(obj != undefined){
            // var modObj = obj;
            // modObj.sort();
            return Object.keys(obj).map(function(key) {
                return obj[key];
            });
				}
    }
    toggleComRate(e){
				var selectedElem = e.target.id;
				let weeklyMasterClass_ID = dom(this.root).querySelector('#'+e.target.id).data;

				var pages = dom(this.root).querySelector('#page'+weeklyMasterClass_ID);
				pages.selectNext();
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
            len = Object.keys(obj).length;
				}
				return len;
    }
    _photo(photos){
				let photo_url = "background-image: url('../data/land.jpg');";

				for (var item in photos) { 
            photo_url = "background-image: url('"+photos[item].url+"');";
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
    formatRateTime(date) {
				var d = new Date(date),
				month = '' + (d.getMonth() + 1),
				day = '' + d.getDate(),
				year = d.getFullYear(),
				hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours(),
				am_pm = d.getHours() >= 12 ? "PM" : "AM",
				minutes = '' + d.getMinutes(),
				seconds = '' + d.getSeconds(),
				milliseconds = '' + d.getMilliseconds();

				var today = new Date(),
				thisYear = today.getFullYear();

				// get week day name Sunday - Saturday
				var dayName = this.getDayMonthStr(d.getDay(), "day", true);

				// get month name
				var monthName = this.getDayMonthStr(d.getMonth(), "month", false);

				// add preceding zeros where needed
				if (month.length < 2) month = '0' + month;
				if (day.length < 2) day = '0' + day;
				// if (hours.length < 2) hours = '0' + hours;
				hours = hours < 10 ? "0" + hours : hours;
				if (minutes.length < 2) minutes = '0' + minutes;
				if (seconds.length < 2) seconds = '0' + seconds;
				if (milliseconds.length < 2) milliseconds = '0' + milliseconds;

				// format thoughts date
				// 04 Dec 02:21:PM
				var thoughtDate = day+" "+monthName+" "+hours+":"+minutes+":"+am_pm;

				return thoughtDate;
				// return [year, month, day].join('-');
    }
    timeSince(date) {
				if (typeof date !== 'object') {
            date = new Date(date);
				}

				var seconds = Math.floor((new Date() - date) / 1000);
				var intervalType;

				var interval = Math.floor(seconds / 31536000);
				if (interval >= 1) {
            intervalType = 'year';
				} else {
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
                intervalType = 'month';
            } else {
                interval = Math.floor(seconds / 86400);
                if (interval >= 1) {
                    intervalType = 'day';
                } else {
                    interval = Math.floor(seconds / 3600);
                    if (interval >= 1) {
                        intervalType = "hour";
                    } else {
                        interval = Math.floor(seconds / 60);
                        if (interval >= 1) {
                            intervalType = "minute";
                        } else {
                            interval = seconds;
                            intervalType = "second";
                        }
                    }
                }
            }
				}

				if (interval > 1 || interval === 0) {
            intervalType += 's';
				}

				return interval + ' ' + intervalType+' ago';
    };
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
    _openPLDP(e){
				var thoughtID = dom(this.root).querySelector('#'+e.target.id).data;
				sessionStorage.setItem("PLDP_MasterClassAdd", thoughtID);
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
    closePLDPDialog(){
				this._addToPLDP();
				sessionStorage.removeItem("PLDP_MasterClassAdd");
				this.$.pldpDialog.close();
    }
    _addToPLDP(){
				let PLDP_ThoughtAdd = sessionStorage.getItem("PLDP_MasterClassAdd");

				let filteredArray = this.findObjectByKey(this.masterClassData, "weeklyMasterClassID", PLDP_ThoughtAdd);

				// remove the key
				delete filteredArray['$key'];

				// add PLDP user to the thought object
				filteredArray.PLDPUserID = this.user.userID;
				filteredArray.PLDPUserName = this.user.firstName+" "+this.user.lastName;

				// instantiate db
				let database = firebase.database();

				// create new record
				let newThought = database.ref().child('/myPLDP/weeklyMasterClasses').push().key;

				// delete the thought if already exists
				let ref = database.ref('myPLDP/weeklyMasterClasses');
				ref.orderByChild('weeklyMasterClassID').equalTo(PLDP_ThoughtAdd)
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
				updates['/myPLDP/weeklyMasterClasses/' + newThought] = filteredArray;
				database.ref().update(updates);
    }
    isEqual(a, b) {
				return a === b;
    }
}

window.customElements.define(ViewMasterClass.is, ViewMasterClass);

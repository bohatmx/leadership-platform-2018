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
import './app-icons.js';
import './shared-styles.js';
import './thought-card-attachments.js';
import './comments-box.js';
import './follow-button.js';
import './preview-profile.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
import { importHref } from '../../../@polymer/polymer/lib/utils/import-href.js';
var _ua = window.navigator.userAgent;
var scrollTopPosition
iOS = /iPad|iPhone|iPod/.test(_ua),
iOS11 = /OS 11_0|OS 11_1|OS 11_2|OS 11_3/.test(_ua);

class ViewThoughts extends Element {
    static get is() { return 'view-thoughts'; }
    ready(){
				super.ready();
				
				var that = this;

				// setTimeout(function(){
				// 	that.minData += 6;
				// }, 2000);

				// $(window).scroll(function(){
				// 	var thoughtCard = Polymer.dom(that.root).querySelector("#thoughts-Holder");
				// 	$(thoughtCard).find('.modal-div').each(function(i, e){
				// 		var imgHolder = $(e).find('.thought-img')[0];

				// 		if(that.isElementInViewport(imgHolder)){
				// 			var itemID = $(e).find('thought-card-attachments').prop('itemid');
				// 			// console.log(itemID)
				// 		}
				// 	});
    }
    static get properties() {
				return {
            user: {
                type: Object
            },
            minData: {
                type: Number,
                value: 6
            },
            scrollPos:{
                type: Number,
                value: 0
            },
            _userid: {
                type: String,
                notify: true
            },
            filterid: {
                type: String,
                notify: true
            },
            thoughtsData: {
                type: Object,
                observer: '_onthoughtsDataReceived'
            },
            thoughtsData1: {
                type: Object,
                observer: '_onthoughtsData1Received'
            },
            company: {
                type: Object
            },
            isloading: {
                type: Boolean,
                value: true,
                notify: true
            },
            loadingmessage:{
                type: String,
                value: 'Loading...'
            },
            _openedcomments: {type: Boolean, value: false, notify:true},
            _nextComRatePage: String,
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
            },
            loadsrc: {
                type: String,
                value: ""
            },
            userobj: {
                type: Object,
                notify: true
            },
            loadmore: {
                type: Boolean,
                value: true
            },
            isloadingmore: {
                type: Boolean,
                value: false
            }
				};
    }
    connectedCallback() { 
				super.connectedCallback();
    }

    _loadMorePosts(){
				this.scrollPos = window.scrollY;
				this.isloadingmore = true;
				this.minData += 6;
    }

    updateFollowBTN(journalUserID, following){
				var that = this;
				var thoughtCard = dom(that.root).querySelector("#thoughts-Holder");

				$(thoughtCard).find('.modal-div').each(function(i, e){
            var followBTN = $(e).find('.followBTN')[0];
            var itemID = $(followBTN).prop('data');
            let filteredArray = that.findObjectByKey(that.thoughtsData, "dailyThoughtID", itemID);
            let thoughtUserID = filteredArray.journalUserID;

            if(thoughtUserID === journalUserID){
                if(following == "Follow"){
                    $(followBTN).addClass('following');
                    followBTN.innerHTML = "Following";
                }else{
                    that.isFollowingStyle(journalUserID);
                    $(followBTN).removeClass('following');
                    followBTN.innerHTML = "Follow";
                }
            }
				});
    }

    _setNextComRatePage(id, typ){
				return typ === 'default' ? 'page-comment'+id : id;
    }

    _countItems(itms){
				var keys = itms == undefined ? [] : Object.keys(itms);
				var val = keys.length == 0 ? true : false;
				return val;
    }

    isFollowing(journalUserID){
				if(this.user.following != undefined){
            if(this.user.following){
            let following =  this.user.following;
            let isfollowing = following[journalUserID];

            return isfollowing ? 'Following' : 'Follow';
            }else return "Follow";
				}else return "Follow";
				
    }

    isFollowingStyle(journalUserID){
				let userID = this.user.userID;

				if(userID === journalUserID){
            return "w3-hide";
				}
				else{
            if(this.user.following){
                let following =  this.user.following;
                let isfollowing = following[journalUserID];

                return isfollowing ? 'following' : '';
            }
            else {return "";}

				}
				
    }
    _openWebsite(e){
				var obj = {
            itemID: e.currentTarget.data,
            title: e.currentTarget.id,
            ref: e.currentTarget.href
				}

				this._captureClicks(e.currentTarget.data, "clickedWebsiteLink", obj);
    }
    _captureClicks(journalID, res, obj){
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

				var filteredArray = this.findObjectByKey(this.thoughtsData, "dailyThoughtID", journalID);

				var journalID = journalID;
				var journalUserID = filteredArray.journalUserID;
				var journalUserName = filteredArray.journalUserName;
				var journalCompanyID = filteredArray.companyID;
				var journalCompanyName = filteredArray.companyName;
				var journalDateRegistered = filteredArray.dateRegistered;
				var journalPhotoURL;
				
				if(filteredArray.photoURL != undefined || filteredArray.photoURL != ""){
            journalPhotoURL = filteredArray.photoURL;
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
    followUser(e){
				let database = firebase.database();
				let itemID = e.target.data;

				let filteredArray = this.findObjectByKey(this.thoughtsData, "dailyThoughtID", itemID);

				let following = e.target.innerHTML;
				let userID = this.user.userID;
				var that = this;
				var myPhoto = "";

				let journalUserID = filteredArray.journalUserID;
				let journalUserName = filteredArray.journalUserName;
				var followDate = Date.now();
				// let journalUserName = e.target.parentNode.firstChild.nextSibling.innerText;

				if(this.user.photoURL != undefined || this.user.photoURL != ""){
            myPhoto = this.user.photoURL;
				}else{
            myPhoto = "";
				}

				if(myPhoto == undefined){
            myPhoto = "";
				}

				if(following == "Follow"){
            $(e.target).addClass('following');

            e.target.innerHTML = "Following";
            that.updateFollowBTN(journalUserID, following);

            var photoURL = "";
            if(filteredArray.photoURL != undefined || filteredArray.photoURL != ""){
                photoURL = filteredArray.photoURL;
            }else{
                photoURL = "";
            }

            if(photoURL == undefined){
                photoURL = "";
            }

            var theirdata = {
                "firstName":filteredArray.journalUserName,
                "lastName":"",
                "companyName":filteredArray.companyName,
                "dateRegistered":followDate,
                "photoURL":photoURL,
                "userID":journalUserID
            }

            var mydata = {
                "firstName":that.user.firstName,
                "lastName":that.user.lastName,
                "companyName":that.user.companyName,
                "dateRegistered": followDate,
                "photoURL":myPhoto,
                "userID": userID
            }

            var updates = {}
            updates["users/"+userID+"/following/"+journalUserID]=theirdata;
            updates["users/"+journalUserID+"/follower/"+userID]=mydata;
            updates["followers/"+journalUserID+"/"+userID]=mydata;

            return database.ref().update(updates).then(() =>{
                return console.log("Following");
            });

				}else{
            that.isFollowingStyle(journalUserID);

            $(e.target).removeClass('following');
            e.target.innerHTML = "Follow";
            that.updateFollowBTN(journalUserID, following);

            var updates = {}
            updates["users/"+userID+"/following/"+journalUserID]=null;
            updates["users/"+journalUserID+"/follower/"+userID]=null;
            updates["followers/"+journalUserID+"/"+userID]=null;

            return database.ref().update(updates).then(() =>{
                return console.log("Unfollowed");
            });
            
				}

    }

    _openButtonModal(e){
				var modal_name = e.currentTarget.data;
				var x = dom(this.root).querySelector('#'+modal_name);
				if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
				} else { 
            x.className = x.className.replace(" w3-show", "");
				}
    }

    _closeButtonModal(e){
				var modal_name = e.currentTarget.data;
				var modal = dom(this.root).querySelector('#'+modal_name);
				if(modal_name === 'add-items')this._removeLoadElement();
				$(modal).removeClass('w3-show');
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
    _setProfileInfo(journalUserName, journalUserID, companyName, companyID, photoURL){
				if(photoURL == "" || photoURL == undefined) photoURL = "../images/default-user.png";
				var a = {
            journalUserName: journalUserName,
            journalUserID: journalUserID,
            companyName: companyName,
            companyID: companyID,
            photoURL: photoURL
				}
				return a;
    }
    _previewProfile(e){
				var data = e.currentTarget.getAttribute('data');
				this.userobj = JSON.parse(data);
				this._userid = this.userobj.journalUserID;
				this._openProfileModal();

				this._captureClicks(e.currentTarget.postitem, "viewedUserProfile", this.userobj);
    }
    _openProfileModal(){
				var modal = dom(this.root).querySelector('#preview-profile');
				modal.style.display = 'block';
    }
    _closeProfileModal(){
				var modal = dom(this.root).querySelector('#preview-profile');
				modal.style.display = 'none';
    }
    
    _sort(a, b) {  
				if (a.dateScheduled > b.dateScheduled) return -1;
				if (a.dateScheduled < b.dateScheduled) return 1;
				return 0;
    }
    _onthoughtsData1Received(newData, oldData){
				var objLen = this._objLen(newData);
				
				if(objLen > 2){
            this.thoughtsData = newData;
            // this.thoughtsData = Object.assign(this.thoughtsData, newData);
            this.$.thoughtsList.render();
				}
				
    }
    _onthoughtsDataReceived(newData, oldData){
				var that = this;
				
				this.thoughtsData.forEach((val, ind)=>{
            that._nextComRatePage = 'page-comment'+val.dailyThoughtID;
				})

				if(newData.length > 0){
            this.isloading = false;
            this.loadingmessage = "";
            this.loadmore = false;
            this.isloadingmore = false;

            setTimeout(function(){
                window.scrollTo({
                    top: that.scrollPos,
                    behavior: "instant"
                });
            }, 1000);
				} 

				setTimeout(function(){
            that.isloading = false;

            if(newData.length == 0) that.loadingmessage = "No posts found";
            else that.loadingmessage = "";

				},30000)
				
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
				var selectedElem = e.currentTarget.id;
				let dailyThought_ID = dom(this.root).querySelector('#'+e.currentTarget.id).data;

				// var pages = Polymer.dom(this.root).querySelector('#page'+dailyThought_ID);

				this._setNextComRatePage(dailyThought_ID, false)
    }
    toggle(e){
				var a = dom(this.root).querySelector('#'+e.currentTarget.id).data;

				var selectedElem = e.currentTarget.id;

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
    _editThought(e){
				// Edit Thought
				this.addedit = 1;
				let editThoughtID = dom(this.root).querySelector('#'+e.currentTarget.id).data;

				let filteredArray = this.findObjectByKey(this.thoughtsData, "dailyThoughtID", editThoughtID);

				let editThoughtStr = JSON.stringify(filteredArray);
				
				sessionStorage.setItem("addedit", this.addedit);
				sessionStorage.setItem("editThoughtID", editThoughtID);
				sessionStorage.setItem("editThoughtStr", editThoughtStr);

    }

    _loadElement1(e){
				var elem = dom(this.root).querySelector('#'+e.currentTarget.id);
				var caption = elem.getAttribute('caption');
				var name = elem.getAttribute('indexed');
				this.itemName = caption;

				this.addedit = 1;
				let editThoughtID =elem.data;

				let filteredArray = this.findObjectByKey(this.thoughtsData, "dailyThoughtID", editThoughtID);

				let editThoughtStr = JSON.stringify(filteredArray);
				
				sessionStorage.setItem("addedit", this.addedit);
				sessionStorage.setItem("editThoughtID", editThoughtID);
				sessionStorage.setItem("editThoughtStr", editThoughtStr);

				this._openItemsModal();
				this._myLoadElement(name, name+".html");
    }
    _myLoadElement(elementName, htmlImport) {
				// Let's remove last loaded element if exists
				this._removeElement();

				var container = dom(this.root).querySelector('#item-holder');
				var __companyid = this._companyid;
				var __user = this.user;
				var previousPage = this.previousPage;
				var company = this.company;

				// Now we load it on-the-fly
				importHref(this.resolveUrl(htmlImport), function (e) {
            // Create a new instance
            var myElement = document.createElement(elementName);
            // And add it to the container
            container.appendChild(myElement);
            // Lets set a dummy property just to show how to do it
            myElement._companyid = __companyid;
            myElement.user = __user;
            myElement.company = company;

            myElement.addedit = 1;

            
				});
    }

    _openItemsModal(){
				// ios 11 bug caret position
				if ( iOS && iOS11 ) {
            this.addIOSBugfix();
				}
				var modal = dom(this.root).querySelector('#add-items');
				modal.style.display = 'block';
    }

    _closeItemsModal(){
				// ios 11 bug caret position
				if ( iOS && iOS11 ) {
            this.removeIOSBugfix();
				}
				var modal = dom(this.root).querySelector('#add-items');
				this._removeElement();
				modal.style.display = 'none';
    }

    _removeElement () {
				var container = dom(this.root).querySelector('#item-holder');
				// element.removeChild(element.firstChild);

				var element = container.querySelector("*");
				if (element) {
            element.parentNode.removeChild(element);
				}
    }

    _getVideoName(storageName){
				let strName = '';
				strName = storageName.slice(storageName.lastIndexOf('/')+1);
				strName = strName.replace(new RegExp('_', 'g'), ' ');
				return strName;
    }
    _videoClick(e){      
				var videoClicked = dom(this.root).querySelector('#'+e.currentTarget.id).data;

				var src = this.getMediaURL(videoClicked);

				this.loadsrc = src;
				this._loadElement();
    }
    _getPodcastName(storageName){
				let strName = '';
				strName = storageName.slice(storageName.lastIndexOf('/')+1);
				strName = strName.replace(new RegExp('_', 'g'), ' ');
				return strName;
    }
    _saveRateValue(e){
				let dailyThought_ID = dom(this.root).querySelector('#'+e.currentTarget.id).data;
				let rating = dom(this.root).querySelector('#rateThought'+dailyThought_ID).rating;
				// let rating = this.$.rateThought.rating;
				// let comment = this.$.rateComment.value;
				let comment = "";

				var journalUserID = this.user.userID;
				var journalUserName = this.user.firstName+" "+this.user.lastName;

				var companyID = this.user.companyID;
				var companyName = this.user.companyName;

				var photoURL = "";

				if(this.user.photoURL != undefined || this.user.photoURL != ""){
            photoURL = this.user.photoURL;
				}else{
            photoURL = "";
				}

				if(photoURL == undefined){
            photoURL = "";
				}

				let date = Date.now();
				let stringDate = this.formatDate(date);
				let stringRateDate = this.formatRateTime(date);
				// let stringDate = new Date(date).toUTCString();

				// Get a reference to the database service
				var database = firebase.database();

				var newRateKey = database.ref().child('ratings').push().key;

				if(comment == undefined){
            comment = "";
				}

				// fix data
				// dailyThoughts
				var data = {
            companyID: companyID,
            companyName: companyName,
            journalUserID: journalUserID,
            journalUserName: journalUserName,
            photoURL: photoURL,
            comment: comment,
            dailyThoughtID: dailyThought_ID,
            date: date,
            rating: rating,
            ratingID: newRateKey,
            stringDate: stringDate,
            stringRateDate: stringRateDate
				}

				// Write the new rating data
				var updates = {};
				updates['/ratings/' + newRateKey] = data;
				database.ref().update(updates);

				// Write the new rating on thoughts data
				var newTypeRateKey = database.ref().child('/dailyThoughts/' + dailyThought_ID +'/ratings').push().key;
				var rateUpdates = {};
				rateUpdates['/dailyThoughts/' + dailyThought_ID +'/ratings/'+newTypeRateKey] = data;
				database.ref().update(rateUpdates);

				dom(this.root).querySelector('#rateThought'+dailyThought_ID).rating = 2;
				// this.$.rateComment.value = "";

				this.showSnackBar("Rating posted successfully!");
    }
    _toArray(obj) {
				if(obj != undefined){
            return Object.keys(obj).map(function(key) {
                var retObj = {};
                retObj = obj[key];
                // assign object id to lpUID
                // retObj['lpUID'] = key;
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

    
    isElementInViewport (el) { 
				if (typeof jQuery === "function" && el instanceof jQuery) { 
            el = el[0]; 
				} 
				var rect = el.getBoundingClientRect(); 
				return ( rect.top >= 0 && 
            rect.left >= 0 && 
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&  
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)  
				); 
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
    _openPLDP(e){
				var thoughtID = dom(this.root).querySelector('#'+e.currentTarget.id).data;
				sessionStorage.setItem("PLDP_ThoughtAdd", thoughtID);
				this.$.pldpDialog.open();
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
    isEqual(a, b) {
				return a === b;
    }
    _deleteThoughtImg(e){
				var thoughtPhotoID = dom(this.root).querySelector('#'+e.currentTarget.id).data;
				var deldailyThoughtID = dom(this.root).querySelector('#'+e.currentTarget.id).dataval;
                
				sessionStorage.setItem("thoughtPhotoID", thoughtPhotoID);
				sessionStorage.setItem("deldailyThoughtID", deldailyThoughtID);
				sessionStorage.setItem("deleteType", "photo");

				this.$.discardTitle.innerHTML = "Discard Photo";
				this.$.thoughtTitle.innerHTML = 'Delete selected photo?';
				this.$.thoughtAuthor.innerHTML = '';

				this.$.deleteDialog.open();
    }
    _deleteThoughtURL(e){
				var thoughtURLID = dom(this.root).querySelector('#'+e.currentTarget.id).data;
				var deldailyThoughtID = dom(this.root).querySelector('#'+e.currentTarget.id).dataval;
                
				sessionStorage.setItem("thoughtURLID", thoughtURLID);
				sessionStorage.setItem("deldailyThoughtID", deldailyThoughtID);
				sessionStorage.setItem("deleteType", "url");

				this.$.discardTitle.innerHTML = "Discard Article Link";
				this.$.thoughtTitle.innerHTML = 'Delete selected article link?';
				this.$.thoughtAuthor.innerHTML = '';

				this.$.deleteDialog.open();
    }
    _deleteThoughtPodcast(e){
				var thoughtPodcastID = dom(this.root).querySelector('#'+e.currentTarget.id).data;
				var deldailyThoughtID = dom(this.root).querySelector('#'+e.currentTarget.id).dataval;
				var podcastID = dom(this.root).querySelector('#'+e.currentTarget.id).datapod;
                
				sessionStorage.setItem("thoughtPodcastID", thoughtPodcastID);
				sessionStorage.setItem("podcastID", podcastID);
				sessionStorage.setItem("deldailyThoughtID", deldailyThoughtID);
				sessionStorage.setItem("deleteType", "podcast");

				this.$.discardTitle.innerHTML = "Discard Podcast Link";
				this.$.thoughtTitle.innerHTML = 'Delete selected podcast link?';
				this.$.thoughtAuthor.innerHTML = '';

				this.$.deleteDialog.open();
    }
    _deleteThoughtVideo(e){
				var thoughtVideoID = dom(this.root).querySelector('#'+e.currentTarget.id).data;
				var deldailyThoughtID = dom(this.root).querySelector('#'+e.currentTarget.id).dataval;
				var videoID = dom(this.root).querySelector('#'+e.currentTarget.id).datavid;
                
				sessionStorage.setItem("thoughtVideoID", thoughtVideoID);
				sessionStorage.setItem("videoID", videoID);
				sessionStorage.setItem("deldailyThoughtID", deldailyThoughtID);
				sessionStorage.setItem("deleteType", "video");

				this.$.discardTitle.innerHTML = "Discard Video Link";
				this.$.thoughtTitle.innerHTML = 'Delete selected video link?';
				this.$.thoughtAuthor.innerHTML = '';

				this.$.deleteDialog.open();
    }
    _deleteThought(e){
				var dailyThoughtID = dom(this.root).querySelector('#'+e.currentTarget.id).data;
                
				sessionStorage.setItem("deldailyThoughtID", dailyThoughtID);
				sessionStorage.setItem("deleteType", "thought");

				var filteredArray = this.findObjectByKey(this.thoughtsData, "dailyThoughtID", dailyThoughtID);

				this.$.thoughtTitle.innerHTML = '"'+filteredArray.title+'"';
				this.$.thoughtAuthor.innerHTML = filteredArray.subtitle;

				this.$.deleteDialog.open();
    }
    deleteThought(){
				var deleteType = sessionStorage.getItem("deleteType");
				var dailyThoughtID = sessionStorage.getItem("deldailyThoughtID");

				// delete Thought
				if(deleteType == "thought"){
            // Get a reference to the database service
            var database = firebase.database();

            // delete thoughts
            database.ref('dailyThoughts/'+ dailyThoughtID).remove();

            this.showSnackBar("Thought deleted successfully!");

            sessionStorage.removeItem("deldailyThoughtID");
				}
				else if(deleteType == "photo"){
            var thoughtPhotoID = sessionStorage.getItem("thoughtPhotoID");
            // Get a reference to the database service
            var database = firebase.database();

            // delete thoughts
            database.ref('dailyThoughts/'+dailyThoughtID+'/photos/'+ thoughtPhotoID).remove();

            this.showSnackBar("Photo deleted successfully!");

            sessionStorage.removeItem("thoughtPhotoID");
            sessionStorage.removeItem("deldailyThoughtID");
				}
				else if(deleteType == "url"){
            var thoughtURLID = sessionStorage.getItem("thoughtURLID");
            // Get a reference to the database service
            var database = firebase.database();

            // delete url
            database.ref('dailyThoughts/'+dailyThoughtID+'/urls/'+ thoughtURLID).remove();

            this.showSnackBar("Article deleted successfully!");

            sessionStorage.removeItem("thoughtURLID");
            sessionStorage.removeItem("deldailyThoughtID");
				}
				else if(deleteType == "podcast"){
            var thoughtPodcastID = sessionStorage.getItem("thoughtPodcastID");
            var podcastID = sessionStorage.getItem("podcastID");
            // Get a reference to the database service
            var database = firebase.database();

            // delete podcast from thought
            database.ref('dailyThoughts/'+dailyThoughtID+'/podcasts/'+ thoughtPodcastID).remove();

            // delete podcast
            database.ref('podcasts/'+ podcastID).remove();

            this.showSnackBar("Podcast deleted successfully!");

            sessionStorage.removeItem("thoughtPodcastID");
            sessionStorage.removeItem("podcastID");
            sessionStorage.removeItem("deldailyThoughtID");
				}
				else if(deleteType == "video"){
            var thoughtVideoID = sessionStorage.getItem("thoughtVideoID");
            var videoID = sessionStorage.getItem("videoID");
            // Get a reference to the database service
            var database = firebase.database();

            // delete podcast from thought
            database.ref('dailyThoughts/'+dailyThoughtID+'/videos/'+ thoughtVideoID).remove();

            // delete podcast
            database.ref('videos/'+ videoID).remove();

            this.showSnackBar("Video deleted successfully!");

            sessionStorage.removeItem("thoughtVideoID");
            sessionStorage.removeItem("videoID");
            sessionStorage.removeItem("deldailyThoughtID");
				}
				
				sessionStorage.removeItem("deleteType");
				this.$.deleteDialog.close();
    }
    showSnackBar(msg){
				var x = this.$.snackbar;

				x.innerHTML = msg;
				x.className = "show";
				setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    addIOSBugfix(){
				// Get scroll position before moving top
				scrollTopPosition = $(document).scrollTop();
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
    _getWebsite(url){
				var res = "";
				if(url != undefined || url != ""){
            if(url == undefined){
            }else{
                if(url.indexOf('http') == -1) {
                    var addHead = "http://";
                    res = addHead + url;
                } else {
                    res = url;
                }

            }
            
				}
				return res;
    }
    jsUcfirst(string) 
    {
				var edt_str = string;

				if(string === "approved") edt_str = "published";
				else if(string === "unpublished") edt_str = "scheduled";

				return edt_str.charAt(0).toUpperCase() + edt_str.slice(1);
    }
    jsFormatStatus(string) 
    {
				if(string === "approved") return "w3-row w3-small w3-right w3-text-green";
				else if(string === "declined") return "w3-row w3-small w3-right w3-text-red";
				else if(string === "unpublished") return "w3-row w3-small w3-right w3-text-blue";
				else if(string === "pending") return "w3-row w3-small w3-right w3-text-orange";	
    }
}

window.customElements.define(ViewThoughts.is, ViewThoughts);

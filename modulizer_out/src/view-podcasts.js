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
import '../../../paper-search/paper-search-bar.js';
import '../../../@polymer/paper-dialog/paper-dialog.js';
import '../../../@polymer/paper-spinner/paper-spinner.js';
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
import './comments-box.js';
import './edit-post.js';
import './app-icons.js';
import './play-media.js';
import './shared-styles.js';
import './w3-styles.js';
import './preview-profile.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
import { importHref } from '../../../@polymer/polymer/lib/utils/import-href.js';
class ViewPodcasts extends Element {
    static get is() { return 'view-podcasts'; }
    ready(){
				super.ready();
    }
    static get properties() {
				return {
            user: {
                type: Object
            },
            _userid: {
                type: String,
                notify: true
            },
            minData: {
                type: Number,
                value: 6
            },
            scrollPos:{
                type: Number,
                value: 0
            },
            hasNoFilter: {
                type:Boolean,
                value: true
            },
            filterid:{
                type:String,
                notify:true,
            },
            podcastsData: {
                type: Object,
                observer: '_onpodcastsDataReceived'
            },
            podcastsData1: {
                type: Object,
                observer: '_onpodcastsData1Received'
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
    followUser(e){
				let database = firebase.database();
				let itemID = e.target.data;

				let filteredArray = this.findObjectByKey(this.podcastsData, "podcastID", itemID);

				let following = e.target.innerHTML;
				let userID = this.user.userID;
				var that = this;
				var myPhoto = "";

				let journalUserID = filteredArray.userID;
				let journalUserName = filteredArray.userName;
				var followDate = Date.now();

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
                "firstName":filteredArray.userName,
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
    updateFollowBTN(journalUserID, following){
				var that = this;
				var thoughtCard = dom(that.root).querySelector("#thoughts-Holder");

				$(thoughtCard).find('.modal-div').each(function(i, e){
            var followBTN = $(e).find('.followBTN')[0];
            var itemID = $(followBTN).prop('data');
            let filteredArray = that.findObjectByKey(that.podcastsData, "podcastID", itemID);
            let thoughtUserID = filteredArray.userID;

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

    _captureClicks(journalID, res, obj){
				var database = firebase.database();
				var userID = this.user.userID;
				var userName = this.user.firstName + " " + this.user.lastName;
				var myPhoto;
				var myCompanyID = this.user.companyID;
				var myCompanyName = this.user.companyName;
				var dateRegistered = Date.now();
				var postType = "podcasts";

				if(this.user.photoURL != undefined || this.user.photoURL != ""){
            myPhoto = this.user.photoURL;
				}else{
            myPhoto = "";
				}

				if(myPhoto == undefined){
            myPhoto = "";
				}

				var filteredArray = this.findObjectByKey(this.podcastsData, "podcastID", journalID);

				var journalID = journalID;
				var journalUserID = filteredArray.userID;
				var journalUserName = filteredArray.userName;
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


    _loadMorePosts(){
				this.scrollPos = window.scrollY;
				this.isloadingmore = true;
				this.minData += 6;
    }

    _onpodcastsData1Received(newData, oldData){
				var objLen = this._objLen(newData);
				if(objLen > 6){
            this.podcastsData = newData;
            // this.podcastsData = Object.assign(this.podcastsData, newData);
            this.$.podcastsList.render();
				}
    }
    _onpodcastsDataReceived(newData, oldData){
				var that = this;

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

				},20000)
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
    _handleClick(e){
				var podcastClicked = dom(this.root).querySelector('#'+e.currentTarget.id).data;
				var podcastTitle = dom(this.root).querySelector('#'+e.currentTarget.id).title;
				var podcastID = dom(this.root).querySelector('#'+e.currentTarget.id).itemid;

				var src = this.getMediaURL(podcastClicked);
				this.media_title = podcastTitle;

				this.loadsrc = src;
				this._openMediaModal();

				var obj = {
            itemID: podcastID,
            title: podcastTitle,
            ref: src
				}

				this._captureClicks(podcastID, "listenedTo", obj);

    }

    _openMediaModal(){
				var modal = dom(this.root).querySelector('#play-media');
				modal.style.display = 'block';
    }

    _closeMediaModal(){
				this.loadsrc = "";
				var modal = dom(this.root).querySelector('#play-media');
				modal.style.display = 'none';
    }

    _myLoadElement(elementName, htmlImport) {
				// Let's remove last loaded element if exists
				this._removeElement();
				var container = dom(this.root).querySelector('#media');
				var __companyid = this._companyid;
				var __user = this.user;
				var __loadsrc = this.loadsrc;
				let pos = window.scrollY;

				sessionStorage.setItem('pos', pos);
				
				window.scrollTo(0, 0);
				document.body.style.overflow = 'hidden';

				// Now we load it on-the-fly
				importHref(this.resolveUrl(htmlImport), function (e) {
            // Create a new instance
            var myElement = document.createElement(elementName);
            // And add it to the container
            container.appendChild(myElement);
            // Lets set a dummy property just to show how to do it
            myElement._companyid = __companyid;
            myElement.user = __user;
            myElement.loadsrc = __loadsrc;
            myElement.isloading = true;
				});
    }
    _loadElement(){
				// var name = e.target.getAttribute('elem');
				this._myLoadElement("load-media", "load-media.html");
    }
    _removeElement () {
				var container = dom(this.root).querySelector('#media');

				var element = container.querySelector("*");
				if (element) {
                element.parentNode.removeChild(element);
				}
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

    _closeModal(e){
				var selectedElem = e.currentTarget.id;
				let podcast_ID = dom(this.root).querySelector('#'+e.currentTarget.id).data;

				var modal = dom(this.root).querySelector('#modal-'+podcast_ID);
				var modalC = dom(this.root).querySelector('#modal-content-'+podcast_ID);

				$(modal).removeClass('w3-modal');
				$(modalC).removeClass('w3-modal-content');
				$(modal).find('.closer-for-modal').addClass('w3-hide');
				modal.style.display = 'block';
    }

    toggleComRate(e){
				var selectedElem = e.currentTarget.id;
				let podcast_ID = dom(this.root).querySelector('#'+e.currentTarget.id).data;
				
				var pages = dom(this.root).querySelector('#page'+podcast_ID);
				pages.selectNext();

				var modal = dom(this.root).querySelector('#modal-'+podcast_ID);
				var modalC = dom(this.root).querySelector('#modal-content-'+podcast_ID);

				$(modal).find('.closer-for-modal').removeClass('w3-hide');

				$(modal).addClass('w3-modal w3-animate-top');
				$(modalC).addClass('w3-modal-content');
				modal.style.display = 'block';
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
    _getVideoName(storageName){
				let strName = '';
				strName = storageName.slice(storageName.lastIndexOf('/')+1);
				strName = strName.replace(new RegExp('_', 'g'), ' ');
				return strName;
    }
    _dialogImgOpen(e){
				var a = dom(this.root).querySelector('#'+e.currentTarget.id).src;
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

    _togglerCR(e){
				var elem = e.currentTarget;
				//this._popModal({target:e.currentTarget});
				$(elem).siblings().removeClass('w3-text-blue').addClass('w3-text-grey');
				$(elem).toggleClass('w3-text-blue w3-text-grey')
    }

    _saveComment(e){
				let podcast_ID = dom(this.root).querySelector('#'+e.currentTarget.id).data;
				let comment = dom(this.root).querySelector('#input'+podcast_ID).value;

				// Validate thought
				if ((comment == undefined) || (comment.trim() == "")){
            this.showSnackBar("Please enter a comment!");
            return;
				}

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
				let stringCommentDate = this.formatRateTime(date);

				// Get a reference to the database service
				var database = firebase.database();

				var newCommentKey = database.ref().child('comments').push().key;

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
            podcastID: podcast_ID,
            date: date,
            commentID: newCommentKey,
            stringDate: stringDate,
            stringCommentDate: stringCommentDate
				}

				// Write the new comments data
				var updates = {};
				updates['/comments/' + newCommentKey] = data;
				database.ref().update(updates);

				// Write the new comments on thoughts data
				var newTypeCommentKey = database.ref().child('/podcasts/' + podcast_ID +'/comments').push().key;
				var commentUpdates = {};
				commentUpdates['/podcasts/'+podcast_ID+'/comments/'+newTypeCommentKey] = data;
				database.ref().update(commentUpdates);

				dom(this.root).querySelector('#input'+podcast_ID).value = "";
    }
    _saveRateValue(e){
				let podcast_ID = dom(this.root).querySelector('#'+e.currentTarget.id).data;
				let rating = dom(this.root).querySelector('#rateThought'+podcast_ID).rating;
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
            podcastID: podcast_ID,
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
				var newTypeRateKey = database.ref().child('/podcasts/' + podcast_ID +'/ratings').push().key;
				var rateUpdates = {};
				rateUpdates['/podcasts/' + podcast_ID +'/ratings/'+newTypeRateKey] = data;
				database.ref().update(rateUpdates);

				dom(this.root).querySelector('#rateThought'+podcast_ID).rating = 2;
				// this.$.rateComment.value = "";

				this.showSnackBar("Rating posted successfully!");
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
    findObjectByKey(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                    if (array[i][key] === value) {
                            return array[i];
                    }
            }
            return null;
    }
    _openPLDP(e){
				var thoughtID = dom(this.root).querySelector('#'+e.currentTarget.id).data;
				sessionStorage.setItem("PLDP_PodcastAdd", thoughtID);
				this.$.pldpDialog.open();
				this._captureClicks(thoughtID, "Open PLDP", "button");
    }
    closePLDPDialog(){
				this._addToPLDP();
				sessionStorage.removeItem("PLDP_PodcastAdd");
				this.$.pldpDialog.close();
    }
    _addToPLDP(){
				let PLDP_PodcastAdd = sessionStorage.getItem("PLDP_PodcastAdd");

				let filteredArray = this.findObjectByKey(this.podcastsData, "podcastID", PLDP_PodcastAdd);

				// remove the key
				delete filteredArray['$key'];

				// add PLDP user to the thought object
				filteredArray.PLDPUserID = this.user.userID;
				filteredArray.PLDPUserName = this.user.firstName+" "+this.user.lastName;

				// instantiate db
				let database = firebase.database();

				// create new record
				let newPodcast = database.ref().child('/myPLDP/podcasts').push().key;

				// delete the thought if already exists
				let ref = database.ref('myPLDP/podcasts');
				ref.orderByChild('podcastID').equalTo(PLDP_PodcastAdd)
                .once('value').then(function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                        if(newPodcast === childSnapshot.key){
                            console.log("Got the new ID");
                        }else{
                            // remove each old child
                            ref.child(childSnapshot.key).remove();
                        }
                });
				});
				
				let updates = {};
				updates['/myPLDP/podcasts/' + newPodcast] = filteredArray;
				database.ref().update(updates);

				this._captureClicks(PLDP_PodcastAdd, "Save to PLDP", "dialog");
    }
    isEqual(a, b) {
				return a === b;
    }
    showSnackBar(msg){
				var x = this.$.snackbar;

				x.innerHTML = msg;
				x.className = "show";
				setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
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
}

window.customElements.define(ViewPodcasts.is, ViewPodcasts);

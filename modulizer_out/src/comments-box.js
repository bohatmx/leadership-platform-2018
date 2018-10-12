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

import '../../../@polymer/paper-fab/paper-fab.js';
import '../../../@polymer/paper-dialog/paper-dialog.js';
import '../../../polymerfire/firebase-app.js';
import '../../../polymerfire/firebase-auth.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-database-behavior.js';
import '../../../@polymer/paper-input/paper-textarea.js';
import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../l2t-paper-rating/l2t-paper-rating.js';
import './app-icons.js';
import './who-liked.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
import { importHref } from '../../../@polymer/polymer/lib/utils/import-href.js';
class CommentsBox extends Element {
    static get is() { return 'comments-box'; }
    ready(){
				super.ready();
				var modalContent = dom(this).parentNode;
				var modal = $(modalContent).parents('.modal-div');
				var that = this;
				modal.on('click', '.closer-for-modal', function(){
            that._closeModal();
				});
    }
    static get properties() {
				return {
            user: {
                type: Object
            },
            firebaseref: {type: String},
            itemDate:{
                type: String
            },
            itemrating: {
                type: Number
            },
            videoChanged: {type:Boolean, value:true},
            firstTime: {type:Boolean, value:true},
            opened: {type: Boolean, value: false, notify: true, observer: '_showAllComments'},
            entityid: {type: String}, // This is the ID an entity like a thought, video, podcast etc.
            item: { //This is the entire entity comments and rating and all
                type: Object,
                observer: 'onCRHDataChanged'
            },
            thetype: { type: String }, //Can be thought, video, podcast etc.
            __favorite: {
                type: Boolean,
                value: false
            },
            likesdata: {
                type: Object,
                notify: true
            }
				};
    }
    
    isNotCurrentUser(user){
				return user != this.user.userID;
    }

    _getCount(itms) {
				return itms == undefined ? 0 : Object.keys(itms).length;
    }

    hideSpan(itms) {
				if(itms == 0) return "display: none";

				return itms == undefined ? "display: none" : "display: block;";
    }

    _getLikesCount(itms) {
				if(itms == 1) return "1 Like";

				return itms == undefined ? "" : itms + " Likes";
    }

    _showAllComments(nData, oData){
				var crh = dom(this.root).querySelectorAll('.comments-ratings-holder');
				if (nData == true){
            $(crh).addClass('opened');
				}
				else{
            $(crh).removeClass('opened');
				}
    }

    _openWhoLiked(e){
				this.likesdata = e.currentTarget.data;

				if(this.likesdata != undefined){
            var modal = dom(this.root).querySelector('#who-liked');
            this.loadPage('who-liked');
            modal.style.display = 'block';
				}
    }

    _deleteComment(e){
				var commentID = e.currentTarget.data;
				var key = e.currentTarget.key;

				sessionStorage.setItem("commentID",commentID);
        sessionStorage.setItem("key",key);
				
				this.$.pldpDialog.open();
    }

    _closeDeleteDialog(){
				sessionStorage.removeItem("commentID");
        sessionStorage.removeItem("key");

				this.$.pldpDialog.close();
    }

    deleteComment(){
				var database = firebase.database();
				var commentID = sessionStorage.getItem("commentID");
				var key = sessionStorage.getItem("key");

				var commentObjRef = database.ref(this.firebaseref+'/'+key+'/comments/'+commentID);
				var commentRef = database.ref('comments/'+commentID);

				commentObjRef.remove();
				commentRef.remove();

				sessionStorage.removeItem("commentID");
        sessionStorage.removeItem("key");

				this.$.pldpDialog.close();
    }

    _closeItemsModal(e){
				var modal = dom(this.root).querySelector('#who-liked');
				modal.style.display = 'none';
    }

    _openModal(e){
				var modalContent = dom(this).parentNode;
				var modal = $(modalContent).parents('.modal-div');
				if($(modal).find('.closer-for-modal').hasClass('w3-hide')){
            $(modal).find('.closer-for-modal').removeClass('w3-hide');
            modal.addClass('ldp-modal');
            $(modalContent).addClass('ldp-modal-content');
            $(modalContent).css('max-width', '600px');
            modal.css('display', 'block');
				}
    }

    _closeModal(e){
				var modalContent = dom(this).parentNode;
				var modal = $(modalContent).parents('.modal-div');
				this.opened = false;
				modal.removeClass('ldp-modal');
				$(modalContent).removeClass('ldp-modal-content');
				$(modalContent).css('max-width', 'unset !important');
				// modal.css('display', 'flex');
				$(modal).find('.closer-for-modal').addClass('w3-hide');
    }

    _openAllComments(e){
				this.opened = true;
    }

    _showCommentBoxMessage(txt, temp=false){
				var msgBox = dom(this.root).querySelectorAll('.comment-message');
				$(msgBox).animate({'opacity': 1});
    
				$(msgBox).html(txt);
				$(msgBox).removeClass('w3-hide');
				
				if(temp){
            window.setTimeout(function(){
                $(msgBox).animate({'opacity': 0}).addClass('w3-hide');
            },temp);
				}
    }

    _closeCommentBoxMessage(){
				var msgBox = dom(this.root).querySelectorAll('.comment-message');
				$(msgBox).animate({'opacity': 0}).addClass('w3-hide');
    }

    _sortComments(obj) {
				if (obj != undefined) {
            // var modObj = obj;
            // modObj.sort();
            return Object.keys(obj).map(function (key) {
                return obj[key];
            });
				}
    }

    _sort(a, b) {  
				if (a.date > b.date) return -1;
				if (a.date < b.date) return 1;
				return 0;
    }

    _hasComments(comms, ratns){ //Check whether comments exist
				var hasComments = comms == undefined ? false : (comms.length == 0 ? false : true);
				return hasComments ? true : (ratns == undefined ? false : (ratns.length == 0 ? false : true));
    }

    _noComments(arr){ //Check whether no comments exist
				return arr == undefined ? true : (arr.length == 0 ? true : false);
    }

    timeSince(date) {

				if(date == 0){ //If the itemDate is 0 then no comment/rating has been done on the item
            return 'Not Rated';
				}

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

    _toggleCRHItem(e) { //Handle switching between comments and ratings.
				var elem = e.currentTarget;
				var crhType = $(elem).attr('crhType');
				$(elem).addClass('selected').siblings().removeClass('selected');
				var crhItem = $(elem).parents('.comments-bar').siblings('.comments-ratings-holder').children('.crh-item.' + crhType);
				crhItem.removeClass('w3-hide').siblings('.crh-item').addClass('w3-hide');
				this.opened = !this.opened;
    }

    onCRHDataChanged(newData, oldData) {
				if(this.thetype == 'Video'){
            this.videoChanged = true;
            this.entityid = newData.videoID;
				}
				if(this.thetype != 'Video'){
            if(newData.ratings){
            }	
				}
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

    _saveLike(state){
				let dailyThought_ID = this.entityid;
				var journalUserID = this.user.userID;
				
				// Get a reference to the database service
				var database = firebase.database();

				if(state == false){

            var journalUserName = this.user.firstName+" "+this.user.lastName;
            var companyID = this.user.companyID;
            var companyName = this.user.companyName;
            // get date and time
            var timeInMs = Date.now();
            var likesStringDate = this._formate_date(timeInMs);
            var photoURL = "";
            var that = this;

            photoURL = this.user.photoURL;

            if(photoURL == undefined || photoURL == null){
                photoURL = "";
            }

            var user_post = journalUserID+"_"+dailyThought_ID;

            var data = {
                companyID: companyID,
                companyName: companyName,
                journalUserID: journalUserID,
                journalUserName: journalUserName,
                likesDate: timeInMs,
                likesStringDate: likesStringDate,
                photoURL: photoURL,
                postType: this.firebaseref,
                itemID:dailyThought_ID,
                userPost:user_post						
            }

            var clickdata = {
                userID: journalUserID,
                userName: journalUserName,
                myPhoto: photoURL,
                myCompanyID: companyID,
                myCompanyName: companyName,
                dateRegistered: timeInMs,
                postType: this.thetype,
                journalID: dailyThought_ID,
                clickType:"posts",
                clickArea:"like",
                clickItem:"button"
            }

            var updatedUserData = {};
            updatedUserData[this.firebaseref+'/'+dailyThought_ID+'/likes/'+journalUserID] = true;
            updatedUserData[this.firebaseref+'/'+dailyThought_ID+'/likesData/'+journalUserID] = data;
            updatedUserData['user-liked/'+user_post] = data;
            updatedUserData['user-clicks/'+user_post] = clickdata;
            
            // Do a deep-path update
            database.ref().update(updatedUserData, function(error) {
                if (error) {
                    console.log("Error updating data:", error);
                }else{
                    let countLikes = database.ref(that.firebaseref).child(dailyThought_ID).child('countLikes');
                    let currentCount = countLikes.transaction(function(current) {
                        return (current || 0) + 1;
                    });
                }
            });

            this._showCommentBoxMessage("<span class='w3-text-red'>You liked the post!</span>", 2000);

				}else{
            let dailyThought_ID = this.entityid;
            var journalUserID = this.user.userID;
            var that = this;

            var user_post = journalUserID+"_"+dailyThought_ID;
            var updatedUserData = {};
            updatedUserData[this.firebaseref+'/'+dailyThought_ID+'/likes/'+journalUserID] = null;
            updatedUserData[this.firebaseref+'/'+dailyThought_ID+'/likesData/'+journalUserID] = null;
            updatedUserData['user-liked/'+user_post] = null;
            
            // Do a deep-path update
            database.ref().update(updatedUserData, function(error) {
                if (error) {
                    console.log("Error updating data:", error);
                }else{
                    let countLikes = database.ref(that.firebaseref).child(dailyThought_ID).child('countLikes');

                    let currentCount = countLikes.transaction(function(current) {
                        return (current || 0) - 1;
                    });
                }
            });
            
				}
				
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

    _saveComment(e){
				var dailyThought_ID = this.entityid;
				var commentField = dom(this.root).querySelectorAll('._myComment')[0];
				var comment = commentField.value;
				
				// Validate thought
				if ((comment == undefined) || (comment.trim() == "")){
            this._showCommentBoxMessage("<span class='w3-text-red'>Please enter a comment!</span>", 2000);
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

				if(comment == undefined){
            comment = "";
				}

				// Write the new comments on thoughts data
				this._showCommentBoxMessage('<span class="loader"></span> Saving the Comment');
				var newTypeCommentKey = database.ref().child('/'+this.firebaseref+'/' + dailyThought_ID +'/comments').push().key;

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
            commentID: newTypeCommentKey,
            stringDate: stringDate,
            stringCommentDate: stringCommentDate,
            postType: this.firebaseref
				}

				var clickdata = {
            userID: journalUserID,
            userName: journalUserName,
            myPhoto: photoURL,
            myCompanyID: companyID,
            myCompanyName: companyName,
            dateRegistered: date,
            postType: this.thetype,
            journalID: dailyThought_ID,
            clickType:"posts",
            clickArea:"comment",
            clickItem:"button",
            commentID: newTypeCommentKey
				}
				
				var commentUpdates = {};
				commentUpdates['/'+this.firebaseref+'/'+dailyThought_ID+'/comments/'+newTypeCommentKey] = data;
				commentUpdates['/comments/'+newTypeCommentKey] = data;
				commentUpdates['user-clicks/'+newTypeCommentKey] = clickdata;
				database.ref().update(commentUpdates);
				
				this._showCommentBoxMessage('<span class="w3-text-green">Comment Saved!</span>', 1000);
				commentField.value = "";
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
    __toggleFavorite(event, detail) {
				this.__favorite = !this.__favorite;
				var likes = event.currentTarget.data;
				var journalUserID = this.user.userID;

				var youLiked;

				if(likes != undefined){
            youLiked = likes[journalUserID];
            if(youLiked == undefined) youLiked = false;
				}else { youLiked = false};
				// return;
				
				this._saveLike(youLiked);
    }
    __computeFavIcon(favorite) {
				if(favorite == undefined){
            return 'app:favorite-border';
				}else{
            var journalUserID = this.user.userID;
            let youLiked = favorite[journalUserID];
            return youLiked ? 'app:favorite' : 'app:favorite-border';
				}
				// return favorite ? 'app:favorite' : 'app:favorite-border';
    }
    isEqual(a, b) {
				return a === b;
    }
    loadPage(page){
    var resolvedPageUrl = this.resolveUrl(page + '.html');
    importHref(
        resolvedPageUrl,
        null,
        page + '.html',
        true);
    }
}

window.customElements.define(CommentsBox.is, CommentsBox);

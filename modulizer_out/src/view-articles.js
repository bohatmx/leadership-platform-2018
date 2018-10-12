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
import './preview-profile.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
import { importHref } from '../../../@polymer/polymer/lib/utils/import-href.js';
class ViewArticles extends Element {
    static get is() { return 'view-articles'; }
    ready(){
				super.ready();
				var that = this;

				// window.onscroll = function() {
				// 	var pageHeight=document.documentElement.offsetHeight,
				// 	windowHeight=window.innerHeight,
				// 	scrollPosition=window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

				// 	if (pageHeight <= windowHeight+scrollPosition) {
				// 		that.minData += 6;
				// 	}
				// };
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
            filterid:{
                type:String,
                notify:true
            },
            company:{
                type: Object
            },
            articlesData: {
                type: Object,
                observer: '_onarticlesDataReceived'
            },
            articlesData1: {
                type: Object,
                observer: '_onarticlesData1Received'
            },
            articlesData2: {
                type: Object,
                observer: '_onarticlesData2Received'
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
            isloading: {
                type: Boolean,
                value: true,
                notify: true
            },
            loadingmessage:{
                type: String,
                value: 'Loading...'
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

				let filteredArray = this.findObjectByKey(this.articlesData, "newsID", itemID);

				let following = e.target.innerHTML;
				let userID = this.user.userID;
				var that = this;
				var myPhoto = "";

				let journalUserID = filteredArray.journalUserID;
				let journalUserName = filteredArray.journalUserName;
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
    updateFollowBTN(journalUserID, following){
				var that = this;
				var thoughtCard = dom(that.root).querySelector("#thoughts-Holder");

				$(thoughtCard).find('.modal-div').each(function(i, e){
            var followBTN = $(e).find('.followBTN')[0];
            var itemID = $(followBTN).prop('data');
            let filteredArray = that.findObjectByKey(that.articlesData, "newsID", itemID);
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

    _loadMorePosts(){
				this.scrollPos = window.scrollY;
				this.isloadingmore = true;
				this.minData += 6;
    }

    _onarticlesData1Received(newData, oldData){
				var objLen = this._objLen(newData);
				if(objLen > 6){
            this.articlesData = newData;
            // this.articlesData = Object.assign(this.articlesData, newData);
            this.$.articlesList.render();
				}
    }
    _onarticlesData2Received(newData, oldData){
				var objLen = this._objLen(newData);
				if(objLen > 6){
            this.articlesData = newData;
            // this.articlesData = Object.assign(this.articlesData, newData);
            this.$.articlesList.render();
				}
    }

    _onarticlesDataReceived(newData, oldData){
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

            if(newData.length == 0) that.loadingmessage = "";
            else that.loadingmessage = "";

				},20000)
            
    }
    _sort(a, b) {  
				if (a.dateScheduled > b.dateScheduled) return -1;
				if (a.dateScheduled < b.dateScheduled) return 1;
				return 0;
    }
    articleLink(manualOrExternal, articleLink){
				if((manualOrExternal !== undefined) || (manualOrExternal !== "undefined")){
				if (manualOrExternal == "externalLink") return articleLink;
            return "read-articles";
				}
				
				return "read-articles";
    }
    targetLink(manualOrExternal){
				if (manualOrExternal == "externalLink") return "_blank";
				return "_self";
    }
    _captureClicks(journalID, res, obj){
				var database = firebase.database();
				var userID = this.user.userID;
				var userName = this.user.firstName + " " + this.user.lastName;
				var myPhoto;
				var myCompanyID = this.user.companyID;
				var myCompanyName = this.user.companyName;
				var dateRegistered = Date.now();
				var postType = "articles";

				if(this.user.photoURL != undefined || this.user.photoURL != ""){
            myPhoto = this.user.photoURL;
				}else{
            myPhoto = "";
				}

				if(myPhoto == undefined){
            myPhoto = "";
				}

				var filteredArray = this.findObjectByKey(this.articlesData, "newsID", journalID);

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
    _setArticleData(a, t, b, p){
				var photo = this._photoURL(p);
				var a = {
                    body: b,
                    photo: photo,
                    author: a,
                    title: t
            }
				return a;
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
    _photoURL(photos){
				let photo_url = "../../data/land.jpg";

				for (var item in photos) { 
            photo_url = ""+photos[item].url+"";
				}

				return photo_url;
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

    _openArticle(e){
				var a = dom(this.root).querySelector('#'+e.target.id).data;
				var itemid = dom(this.root).querySelector('#'+e.target.id).itemid;

				sessionStorage.setItem("bookAuthor",a.author);
				sessionStorage.setItem("bookTitle",a.title);
				sessionStorage.setItem("bookBody",a.body);
				sessionStorage.setItem("bookPhoto",a.photo);

				var obj = {
            itemID: itemid,
            title: a.title,
            ref: a.author
				}

				this._captureClicks(itemid, "readArticle", obj);
    }
    _sortComments(obj){
				if(obj != undefined){
            return Object.keys(obj).map(function(key) {
                return obj[key];
            });
				}
    }
    isArray (value) {
    return value && typeof value === 'object' && value.constructor === Array;
    };
    isObject (value) {
    return value && typeof value === 'object' && value.constructor === Object;
    };
    toggleComRate(e){
				var selectedElem = e.target.id;
				let news_ID = dom(this.root).querySelector('#'+e.target.id).data;

				var pages = dom(this.root).querySelector('#page'+news_ID);
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
    _loadElement1(e){
				var elem = dom(this.root).querySelector('#'+e.target.id);
				var caption = elem.getAttribute('caption');
				var name = elem.getAttribute('indexed');
				this.itemName = caption;

				this.addedit = 1;
				let editnewsID =elem.data;

				let filteredArray = this.findObjectByKey(this.articlesData, "newsID", editnewsID);

				let editArticleStr = JSON.stringify(filteredArray);
				
				sessionStorage.setItem("addedit", this.addedit);
				sessionStorage.setItem("editnewsID", editnewsID);
				sessionStorage.setItem("editArticleStr", editArticleStr);

				this._openItemsModal();
				
				this._myLoadElement(name, name+".html");
    }
    _openItemsModal(){
				var modal = dom(this.root).querySelector('#add-items');
				modal.style.display = 'block';
    }

    _closeItemsModal(){
				var modal = dom(this.root).querySelector('#add-items');
				this._removeElement();
				modal.style.display = 'none';
    }
    _myLoadElement(elementName, htmlImport) {
				// Let's remove last loaded element if exists
				this._removeElement();

				var container = dom(this.root).querySelector('#item-holder');
				var __companyid = this._companyid;
				var __user = this.user;
				var previousPage = this.previousPage;
				var company = this.company;

				let pos = window.scrollY;

				sessionStorage.setItem('pos', pos);

				window.scrollTo(0, 0);

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
    
    _loadElement(){
				// var name = e.target.getAttribute('elem');
				this._myLoadElement("load-media", "load-media.html");
    }
    _removeElement () {
				var container = dom(this.root).querySelector('#item-holder');
				// element.removeChild(element.firstChild);

				var element = container.querySelector("*");
				if (element) {
            element.parentNode.removeChild(element);
				}
    }
    _videoClick(e){      
				var videoClicked = dom(this.root).querySelector('#'+e.target.id).data;

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

    _togglerCR(e){
				var elem = e.currentTarget;
				//this._popModal({target:e.currentTarget});
				$(elem).siblings().removeClass('w3-text-blue').addClass('w3-text-grey');
				$(elem).toggleClass('w3-text-blue w3-text-grey')
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
				var newsID = dom(this.root).querySelector('#'+e.target.id).data;
				sessionStorage.setItem("PLDP_ArticleAdd", newsID);
				this.$.pldpDialog.open();
    }
    getMediaURL(url){
				var res = "";
				if(url.includes("youtu")){
            var youtubeID = this.getYoutubeID(url);
            res = "https://www.youtube.com/embed/"+youtubeID;
				}else{
            res = url;
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
				sessionStorage.removeItem("PLDP_ArticleAdd");
				this.$.pldpDialog.close();
    }
    _addToPLDP(){
				let PLDP_ThoughtAdd = sessionStorage.getItem("PLDP_ArticleAdd");

				let filteredArray = this.findObjectByKey(this.articlesData, "newsID", PLDP_ThoughtAdd);

				// remove the key
				delete filteredArray['$key'];

				// add PLDP user to the thought object
				filteredArray.PLDPUserID = this.user.userID;
				filteredArray.PLDPUserName = this.user.firstName+" "+this.user.lastName;

				// instantiate db
				let database = firebase.database();

				// create new record
				let newThought = database.ref().child('/myPLDP/news').push().key;

				// delete the thought if already exists
				let ref = database.ref('myPLDP/news');
				ref.orderByChild('newsID').equalTo(PLDP_ThoughtAdd)
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
				updates['/myPLDP/news/' + newThought] = filteredArray;
				database.ref().update(updates);
    }
    _deleteThoughtImg(e){
				var thoughtPhotoID = dom(this.root).querySelector('#'+e.target.id).data;
				var deldailyThoughtID = dom(this.root).querySelector('#'+e.target.id).dataval;
                
				sessionStorage.setItem("thoughtPhotoID", thoughtPhotoID);
				sessionStorage.setItem("deldailyThoughtID", deldailyThoughtID);
				sessionStorage.setItem("deleteType", "photo");

				this.$.discardTitle.innerHTML = "Discard Photo";
				this.$.thoughtTitle.innerHTML = 'Delete selected photo?';
				this.$.thoughtAuthor.innerHTML = '';

				this.$.deleteDialog.open();
    }
    _deleteThoughtURL(e){
				var thoughtURLID = dom(this.root).querySelector('#'+e.target.id).data;
				var deldailyThoughtID = dom(this.root).querySelector('#'+e.target.id).dataval;
                
				sessionStorage.setItem("thoughtURLID", thoughtURLID);
				sessionStorage.setItem("deldailyThoughtID", deldailyThoughtID);
				sessionStorage.setItem("deleteType", "url");

				this.$.discardTitle.innerHTML = "Discard Article Link";
				this.$.thoughtTitle.innerHTML = 'Delete selected article link?';
				this.$.thoughtAuthor.innerHTML = '';

				this.$.deleteDialog.open();
    }
    _deleteThoughtPodcast(e){
				var thoughtPodcastID = dom(this.root).querySelector('#'+e.target.id).data;
				var deldailyThoughtID = dom(this.root).querySelector('#'+e.target.id).dataval;
				var podcastID = dom(this.root).querySelector('#'+e.target.id).datapod;
                
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
				var thoughtVideoID = dom(this.root).querySelector('#'+e.target.id).data;
				var deldailyThoughtID = dom(this.root).querySelector('#'+e.target.id).dataval;
				var videoID = dom(this.root).querySelector('#'+e.target.id).datavid;
                
				sessionStorage.setItem("thoughtVideoID", thoughtVideoID);
				sessionStorage.setItem("videoID", videoID);
				sessionStorage.setItem("deldailyThoughtID", deldailyThoughtID);
				sessionStorage.setItem("deleteType", "video");

				this.$.discardTitle.innerHTML = "Discard Video Link";
				this.$.thoughtTitle.innerHTML = 'Delete selected video link?';
				this.$.thoughtAuthor.innerHTML = '';

				this.$.deleteDialog.open();
    }
    _deleteArticle(e){
				var newsID = dom(this.root).querySelector('#'+e.target.id).data;
                
				sessionStorage.setItem("delnewsID", newsID);
				sessionStorage.setItem("deleteType", "article");

				var filteredArray = this.findObjectByKey(this.articlesData, "newsID", newsID);

				this.$.thoughtTitle.innerHTML = '"'+filteredArray.title+'"';
				this.$.thoughtAuthor.innerHTML = filteredArray.subtitle;

				this.$.deleteDialog.open();
    }
    deleteArticle(){
				var deleteType = sessionStorage.getItem("deleteType");
				var newsID = sessionStorage.getItem("delnewsID");

				// delete Thought
				if(deleteType == "article"){
            // Get a reference to the database service
            var database = firebase.database();

            // delete thoughts
            database.ref('news/'+ newsID).remove();

            this.showSnackBar("Article deleted successfully!");

            sessionStorage.removeItem("delnewsID");
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
    isEqual(a, b) {
				return a === b;
    }
}

window.customElements.define(ViewArticles.is, ViewArticles);

/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
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
import '../../../paper-search/paper-search-bar.js';
import '../../../@polymer/paper-dialog/paper-dialog.js';
import '../../../@polymer/paper-spinner/paper-spinner.js';
import '../../../@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../polymerfire/firebase-app.js';
import '../../../polymerfire/firebase-auth.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-database-behavior.js';
import './edit-post.js';
import './comments-box.js';
import './app-icons.js';
import './shared-styles.js';
import './w3-styles.js';
import './preview-profile.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
class LeadershipVideos extends Element {
    static get is() { return 'leadership-videos'; }
    ready(){
				super.ready();

				var that = this;
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
            cbitem: {type: Object},
            cbitemID: Number,
            _companyid: String,
            isloading: {
                type: Boolean,
                value: true,
                notify: true
            },
            loadingmessage:{
                type: String,
                value: 'Loading...'
            },
            videosData: {
                type: Object,
                observer: '_onvideosDataDataReceived'
            },
            videosData1: {
                type: Object,
                observer: '_onvideosData1DataReceived'
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

				let filteredArray = this.findObjectByKey(this.videosData, "videoID", itemID);

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

				$(thoughtCard).find('.vid-item').each(function(i, e){
            var followBTN = $(e).find('.followBTN')[0];
            var itemID = $(followBTN).prop('data');
            let filteredArray = that.findObjectByKey(that.videosData, "videoID", itemID);
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

    _loadMorePosts(){
				this.scrollPos = window.scrollY;
				this.isloadingmore = true;
				this.minData += 6;
    }

    _onvideosData1DataReceived(newData, oldData){
				var objLen = this._objLen(newData);
				if(objLen > 6){
            this.videosData = newData;
            // this.videosData = Object.assign(this.videosData, newData);
            this.$.videosList.render();
				}
    }

    _onvideosDataDataReceived(newData, oldData){
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
    _objLen(obj) {
				let len = 0;
				if(obj != undefined){
            len = Object.keys(obj).length;
				}
				return len;
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

    _getVideoName(storageName){
				let strName = 'Leadership Video';

				if(storageName != undefined){
            strName = storageName.slice(storageName.lastIndexOf('/')+1);
            strName = strName.replace(new RegExp('_', 'g'), ' ');
				}
				
				return strName;
    }
    getClassForItem(item, selected) {
				return selected ? 'item expanded' : 'item';
    }

    _closeModal(e){
				var videoPlayer = dom(this.root).querySelector('#videoPlayer');
				videoPlayer.src = "";

				var videoPlayerUpload = dom(this.root).querySelector('#videoPlayerUpload');
				var videoPlayerUpload1 = dom(this.root).querySelector('#videoPlayerUpload1');
				var videoPlayerUpload2 = dom(this.root).querySelector('#videoPlayerUpload2');
				
				videoPlayerUpload.src = "";
				videoPlayerUpload1.src = "";
				videoPlayerUpload2.src = "";

				this.modalVideoName = "";
				var modal = dom(this.root).querySelector('#video-modal');
				modal.style.display = 'none';
    }

    _handleClick(e){

				var clickedParent = $(e.target).parents('.vid-item');

				this.cbitem = clickedParent[0].data;
				this.cbitemID = this.cbitem.videoID; 
				this.modalVideoName = this._getVideoName(this.cbitem.storageName);

				var videoClicked = dom(this.root).querySelector('#'+e.target.id).data;
				var uploadtype = dom(this.root).querySelector('#'+e.target.id).uploadtype;

				var src = "";

				if(uploadtype == "external"){
            src = this.getMediaURL(videoClicked);
            var videoPlayer = dom(this.root).querySelector('#videoPlayer');
            videoPlayer.style = "display: block;";

            var videoPlayerUpload = dom(this.root).querySelector('#videoPlayerUpload');
            var videoPlayerUpload1 = dom(this.root).querySelector('#videoPlayerUpload1');
            var videoPlayerUpload2 = dom(this.root).querySelector('#videoPlayerUpload2');

            videoPlayerUpload.src = "";
            videoPlayerUpload1.src = "";
            videoPlayerUpload2.src = "";

            videoPlayerUpload.style = "display: none;";

            videoPlayer.src = src;
				}else{
            var videoPlayer = dom(this.root).querySelector('#videoPlayer');
            videoPlayer.style = "display: none;";
            videoPlayer.src = "";

            var videoPlayerUpload = dom(this.root).querySelector('#videoPlayerUpload');
            videoPlayerUpload.style = "display: block; width:100%; max-height: 315px;";

            var videoPlayerUpload1 = dom(this.root).querySelector('#videoPlayerUpload1');
            var videoPlayerUpload2 = dom(this.root).querySelector('#videoPlayerUpload2');
            
            src = this.getMediaURL(videoClicked);
            videoPlayerUpload.src = src;
            videoPlayerUpload1.src = src;
            videoPlayerUpload2.src = src;
				}

				var modal = dom(this.root).querySelector('#video-modal');
				modal.style.display = 'block';

				var obj = {
            itemID: this.cbitemID,
            title: this.modalVideoName,
            ref: src
				}

				this._captureClicks(this.cbitemID, "viewed", obj);
				
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
    _captureClicks(journalID, res, obj){
				var database = firebase.database();
				var userID = this.user.userID;
				var userName = this.user.firstName + " " + this.user.lastName;
				var myPhoto;
				var myCompanyID = this.user.companyID;
				var myCompanyName = this.user.companyName;
				var dateRegistered = Date.now();
				var postType = "videos";

				if(this.user.photoURL != undefined || this.user.photoURL != ""){
            myPhoto = this.user.photoURL;
				}else{
            myPhoto = "";
				}

				if(myPhoto == undefined){
            myPhoto = "";
				}

				var filteredArray = this.findObjectByKey(this.videosData, "videoID", journalID);

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
    _openPLDP(e){
				var vidID = dom(this.root).querySelector('#'+e.target.id).data;
				sessionStorage.setItem("PLDP_VideoAdd", vidID);
				this.$.pldpDialog.open();
				this._captureClicks(vidID, "Open PLDP", "button");
    }
    closePLDPDialog(){
				this._addToPLDP();
				sessionStorage.removeItem("PLDP_VideoAdd");
				this.$.pldpDialog.close();
    }

    _addToPLDP(){
				let PLDP_VideoAdd = sessionStorage.getItem("PLDP_VideoAdd");

				let filteredArray = this.findObjectByKey(this.videosData, "videoID", PLDP_VideoAdd);

				// remove the key
				delete filteredArray['$key'];

				// add PLDP user to the thought object
				filteredArray.PLDPUserID = this.user.userID;
				filteredArray.PLDPUserName = this.user.firstName+" "+this.user.lastName;

				// instantiate db
				let database = firebase.database();

				// create new record
				let newThought = database.ref().child('/myPLDP/videos').push().key;

				// delete the thought if already exists
				let ref = database.ref('myPLDP/videos');
				ref.orderByChild('videoID').equalTo(PLDP_VideoAdd)
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
				updates['/myPLDP/videos/' + newThought] = filteredArray;
				database.ref().update(updates);

				this._captureClicks(PLDP_VideoAdd, "Save to PLDP", "dialog");
    }
    isEqual(a, b) {
				return a === b;
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
}

window.customElements.define(LeadershipVideos.is, LeadershipVideos);

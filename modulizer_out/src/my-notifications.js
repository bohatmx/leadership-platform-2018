/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '../../../@polymer/paper-button/paper-button.js';

import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/iron-image/iron-image.js';
import '../../../@polymer/paper-spinner/paper-spinner.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
import { Element } from '../../../@polymer/polymer/polymer-element.js';

class MyNotifications extends Element {
		static get is() { return 'my-notifications'; }
		ready(){
        super.ready();
        var selectedTab = this.$.selectedTab;
        var postsTab = this.$.postsTab;
        var pldpTab = this.$.pldpTab;

        selectedTab.style = "background-color: #ff5722!important;";
        postsTab.style = "background-color: #ff5722!important;";
        pldpTab.style = "background-color: #616161!important;";
		}
		static get properties() {
        return {
            unread_notifications: {
                type: Number,
                value: 0
            },
            minData: {
                type: Number,
                value: 10
            },
            listclicked:{
                type: Boolean,
                value: false,
                notify: true
            },
            unreadstring: {
                type: String,
                value: "0",
                notify: true
            },
            isloading:{
                type: Boolean,
                value: true
            },
            hidenotifications:{
                type: Boolean,
                value: false
            },
            rootpath: {type:String},
            userid: {
                type: String,
                notify: true
            },
            userNotificationData: {
                type: Object,
                observer: "userNotificationDataChanged"
            },
            pldpNotificationData: {
                type: Object,
                observer: "pldpNotificationDataChanged"
            }
        };
		}

		toggleNotifications(e){
        var selected = e.currentTarget.id;
        var selectedTab = this.$.selectedTab;
        var postsTab = this.$.postsTab;
        var pldpTab = this.$.pldpTab;

        if(selected == "pldp"){
            postsTab.style = "background-color: #616161!important;";
            pldpTab.style = "background-color: #ff5722!important;";
            this.hidenotifications = true;
        }else{
            postsTab.style = "background-color: #ff5722!important;";
            pldpTab.style = "background-color: #616161!important;";
            this.hidenotifications = false;
        }
    }

		_loadThisElement(nT,t){
        return nT == t;
		}

		_loadMoreNotifications(){
        this.isloading = true;
        this.minData += 6;
		}

		userNotificationDataChanged(a, b){
        var notifications;
        var unread = 0;

        //Updates the following tab automatically
        var database = firebase.database();
        var that = this;
        var seen = false;

        if(a != undefined){
            var newCount = a.length;
            if(newCount > 0){
                var notificationsRef = database.ref('/users/'+this.userid+'/notifications').orderByChild("seen").equalTo(seen);

                var pldpnotificationsRef = database.ref('/users/'+this.userid+'/pldpnotifications').orderByChild("seen").equalTo(seen);

                notificationsRef.on('child_added', function(data) {
                    var unread = 0;
                    unread++;

                    if(unread > 0) that.unread_notifications += unread;

                    if(that.unread_notifications > 20) that.unreadstring = "20+";
                    else that.unreadstring = ""+that.unread_notifications;
                });

                notificationsRef.on('child_removed', function(data) {
                    var unread = 0;
                    unread++;
                    if(unread > 0) that.unread_notifications = that.unread_notifications - unread;

                    if(that.unread_notifications > 20) that.unreadstring = "20+";
                    else that.unreadstring = ""+that.unread_notifications;
                });

                this.isloading = false;
            }
        }else{
            this.isloading = false;
        }

        setTimeout(function(){
            that.isloading = false;
        },8000)
		}

		pldpNotificationDataChanged(a, b){
        var notifications;
        var unread = 0;

        //Updates the following tab automatically
        var database = firebase.database();
        var that = this;
        var seen = false;

        if(a != undefined){
            var newCount = a.length;
            if(newCount > 0){
                var notificationsRef = database.ref('/users/'+this.userid+'/pldpnotifications').orderByChild("seen").equalTo(seen);

                notificationsRef.on('child_added', function(data) {
                    var unread = 0;
                    unread++;

                    if(unread > 0) that.unread_notifications += unread;

                    if(that.unread_notifications > 20) that.unreadstring = "20+";
                    else that.unreadstring = ""+that.unread_notifications;
                });

                notificationsRef.on('child_removed', function(data) {
                    var unread = 0;
                    unread++;
                    if(unread > 0) that.unread_notifications = that.unread_notifications - unread;

                    if(that.unread_notifications > 20) that.unreadstring = "20+";
                    else that.unreadstring = ""+that.unread_notifications;
                });

                this.isloading = false;
            }
        }else{
            this.isloading = false;
        }

        setTimeout(function(){
            that.isloading = false;
        },8000)
		}

		_notificationOpened(opened){
        if(opened === true){
            return 'padding: 8px 0; background-color: #fff;'
        }else{
            return 'padding: 8px 0; background-color: #eee;'
        }
		}

		_notificationSeen(nots){
        var myNotifications = {};

        $.each(nots, function(n, nt){
            myNotifications['/users/'+this.userid+'/notifications/'+n+'/seen'] = true
            myNotifications['/users/'+this.userid+'/notifications/'+n+'/opened'] = true
        });

        let database = firebase.database();
        database.ref().update(myNotifications);
		}

		_pldpnotificationSeen(nots){
        var myNotifications = {};

        $.each(nots, function(n, nt){
            myNotifications['/users/'+this.userid+'/pldpnotifications/'+n+'/seen'] = true
            myNotifications['/users/'+this.userid+'/pldpnotifications/'+n+'/opened'] = true
        });

        let database = firebase.database();
        database.ref().update(myNotifications);
		}

		_getNotifyLink(typ,notificationItemID){
        var pageMatcher = {
            'thought':'./filtered-thoughts/#/'+notificationItemID,
            'pending-thought':'./thoughts-management',
            'article':'./filtered-articles/#/'+notificationItemID,
            'podcast':'./filtered-podcasts/#/'+notificationItemID,
            'pldpreminder': './my-pldp',
            'video': './filtered-videos/#/'+notificationItemID,
        }

        return pageMatcher[typ]
		}

		_notificationClicked(e){
        var notification = e.currentTarget.data;
        let database = firebase.database();
        var myNotifications = {};
        var _userID = this.userid
        var that = this;

        this.listclicked = true;

        if(notification.notificationType === "pending-thought"){
        }else{
            myNotifications['/users/'+_userID+'/notifications/'+notification.newNotificationID+'/opened'] = true
            database.ref().update(myNotifications);
            // this.removeFromParent();
        }

        // let seen = false;
        
        // database.ref('/users/'+this.userid+'/notifications').orderByChild("seen").equalTo(seen).once('value').then((data)=>{
        // 	var myNotifications = data.val();
        // 	if(myNotifications === null){
        // 	}else{
        // 		this._notificationSeen(myNotifications)
        // 	}
            
        // }).catch(function(error) {
        // 	// console.log("Error updating user notifications:", error);
        // });
        
		}

		_pldpnotificationClicked(e){
        var notification = e.currentTarget.data;
        let database = firebase.database();
        var myNotifications = {};
        var _userID = this.userid

        this.listclicked = true;

        if(notification.notificationType === "pending-thought"){
            
        }else{
            myNotifications['/users/'+_userID+'/pldpnotifications/'+notification.newNotificationID+'/opened'] = true
            database.ref().update(myNotifications);
            // this.removeFromParent();
        }

        // let seen = false;
        
        // database.ref('/users/'+this.userid+'/pldpnotifications').orderByChild("seen").equalTo(seen).once('value').then((data)=>{
        // 	var myNotifications = data.val();
        // 	if(myNotifications === null){
        // 	}else{
        // 		this._pldpnotificationSeen(myNotifications)
        // 	}
            
        // }).catch(function(error) {
        // 	// console.log("Error updating user notifications:", error);
        // });
        
		}

		removeFromParent(){
        var a = dom(this).parentNode;
        console.log("a: ", a);
        $(a).siblings('#closeNotifications').trigger('click');
		}

		_profilePhoto(photo){
        let photo_url = "../images/default-user.png";

        if(photo == undefined){
            photo_url = "../images/default-user.png";
        }else if(photo == ""){
            photo_url = "../images/default-user.png";
        }else{
            photo_url = ''+photo+'';
        }

        return photo_url;
		}

		_myprofilePhoto(photo){
        let photo_url = localStorage.getItem("userLogo");

        if(photo_url == undefined){
            photo_url = "../images/default-user.png";
        }

        return photo_url;
		}

		_sort(a, b) {  
        if (a.notificationDate > b.notificationDate) return -1;
        if (a.notificationDate < b.notificationDate) return 1;
        return 0;
		}

		_notificationData(dt){
        var date = new Date(dt);
        var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
        var locale = 'en-us';
        var month = date.toLocaleString(locale, { month: "long" });
        var year = date.getFullYear();
        var hours = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
        var am_pm = date.getHours() >= 12 ? "PM" : "AM";

        return month+' '+day+' '+hours+':'+minutes+" "+am_pm;
		}

}
window.customElements.define(MyNotifications.is, MyNotifications);

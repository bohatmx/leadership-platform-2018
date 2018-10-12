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
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { Element } from '../../../@polymer/polymer/polymer-element.js';

import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/iron-image/iron-image.js';
import '../../../polymerfire/firebase-auth.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-database-behavior.js';
class PreviewProfile extends Element {
		static get is() { return 'preview-profile'; }
		ready(){
        super.ready();
  }
  static get properties() {
		return {
        userData: {
            type: Object,
            observer: '_userDataChange',
        },
        userobj: {
            type: Object,
            notify: true,
            observer: '_userObjChanged'
        },
        _userid: {
            type: String,
            notify: true,
            observer: '_userChanged'
        },
        articles: String,
        thoughts: String,
        videos: String,
        podcasts: String,
        followers: {
            type: String,
            value: "0"
        },
        following: {
            type: String,
            value: "0"
        },
		};
  }

		_userDataChange(newData, oldData) {
        this.articles = "-";
        this.thoughts = "-";
        this.videos = "-";
        this.podcasts = "-";
        this.followers = "-";
        this.following = "-";

        for (var item in newData) {
            if(newData[item] != undefined){
                if(newData[item].$key == "articles") {
                    if(newData[item].$val < 0) {
                        this.articles = "-";
                    }else this.articles = ""+newData[item].$val
                };
                if(newData[item].$key == "thoughts") {
                    if(newData[item].$val < 0) {
                        this.thoughts = "-";
                    }else this.thoughts = ""+newData[item].$val};
                if(newData[item].$key == "videos") {
                    if(newData[item].$val < 0) {
                        this.videos = "-";
                    }else this.videos = ""+newData[item].$val
                };
                if(newData[item].$key == "podcasts") {
                    if(newData[item].$val < 0) {
                        this.podcasts = "-";
                    }else this.podcasts = ""+newData[item].$val};
                if(newData[item].$key == "followers") {
                    if(newData[item].$val < 0) {
                        this.followers = "-";
                    }else this.followers = ""+newData[item].$val};
                if(newData[item].$key == "following") {
                    if(newData[item].$val < 0) {
                        this.following = "-";
                    }else this.following = ""+newData[item].$val};
            }
                
        } 
		}
		_userObjChanged(newData, oldData){
        var that = this;
        this.biography = "";
        if(newData != undefined){
            var database = firebase.database();
            database.ref('users').child(this.userobj.journalUserID).child('biography').on('value', (data)=>{
                if(data.val() != null){
                    that.biography = data.val();
                }
            })
        }
        
		}
		_userChanged(newData, oldData) {  
        if(newData != undefined){
            var database = firebase.database();
            database.ref('users').child(this._userid).child('following').on('value', (data)=>{
                var no_following = this._objLen(data.val());
                this.following = ""+no_following;

                database.ref('/users/' + this._userid).child('analytics').child('following').set(no_following);
            })

            database.ref('users').child(this._userid).child('follower').on('value', (data)=>{
                var no_followers = this._objLen(data.val());
                this.followers = ""+no_followers;
                database.ref('/users/' + this._userid).child('analytics').child('followers').set(no_followers);
            })
        }
		}

		_objLen(obj) {
        let len = 0;
        if(obj != undefined){
        len = Object.keys(obj).length;
        }
        return len;
		}

}
window.customElements.define(PreviewProfile.is, PreviewProfile);

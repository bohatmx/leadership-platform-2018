/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { Element } from '../../../@polymer/polymer/polymer-element.js';

import '../../../@polymer/paper-fab/paper-fab.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';

class LikeButton extends Element {
  static get template() {
    return html`
    <style include="w3-styles"></style>
    <style include="shared-styles">
        :host {
            display: block;
        }      
        paper-fab {
            height: 18px;
            width: 18px;
            padding: 12px;
            --paper-fab-background: #1298f1;
            --paper-fab-keyboard-focus-background: #1298f1;
        }  
    </style>

    <paper-fab icon="{{icon}}" on-tap="__toggleFavorite" class="w3-left" style="margin-right: 8px;"></paper-fab>
`;
  }

  static get is() { return 'like-button'; }
  ready(){
      super.ready();
  }
  static get properties() {
      return {
          favorite: {
              type: Boolean,
              notify: true,
              value: false
          },
          icon:{
              type: String,
              value: 'app:favorite-border',
              notify: true
          },
          userid: String,
          companyid: String,
          companyname: String,
          username: String,
          photourl: String,
          thetype: String,
          entityid: String,
          uid: String
      };
  }
  __toggleFavorite(event, detail) {
      this.favorite = !this.favorite;
      var database = firebase.database();

      var timeInMs = Date.now();
      var data = {
          companyID: this.companyid,
          companyName: this.companyname,
          journalUserID: this.userid,
          journalUserName: this.username,
          likesDate: timeInMs,
          likesStringDate: this._formate_date(timeInMs),
          photoURL: this.photourl,
          thetype: this.thetype,
          entityid: this.entityid,
          uid: this.uid
      }

      this.__computeFavIcon(this.favorite);

      console.log("data: ", data);

      if(this.favorite){
          database.ref('data-modelling/userWriteable/userLikedPost/'+this.uid+'/'+this.entityid).set(data);
      }else{
          database.ref('data-modelling/userWriteable/userUnLikedPost/'+this.uid+'/'+this.entityid).set(data);
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

  __computeFavIcon(favorite) {
      return favorite ? this.icon = 'app:favorite' : this.icon = 'app:favorite-border';
  }
}
window.customElements.define(LikeButton.is, LikeButton);

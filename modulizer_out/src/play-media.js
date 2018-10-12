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

import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-spinner/paper-spinner.js';
import '../../../@polymer/iron-image/iron-image.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';

class PlayMedia extends Element {
  static get template() {
    return html`
    <style include="w3-styles"></style>
    <style include="shared-styles">
        :host {
            display: block;
        }

        .iframeViewer{
            width: 100%;
            height: 50vh;
        }
        
    </style>

    <div class="w3-row">
        <iframe class="iframeViewer" id="iframeViewer" src="{{loadsrc}}" autoplay="false" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="">
        </iframe>
    </div>
`;
  }

  static get is() { return 'play-media'; }
  ready(){
      super.ready();
  }
  static get properties() {
      return {
          user: {
              type: Object
          },
          loadsrc: {
              type: String,
              notify: true
          }
      };
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

      return month+' '+day;
  }
}
window.customElements.define(PlayMedia.is, PlayMedia);

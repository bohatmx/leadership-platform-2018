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
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { Element } from '../../../@polymer/polymer/polymer-element.js';

import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/iron-collapse/iron-collapse.js';
import '../../../@polymer/paper-styles/shadow.js';
import '../../../@polymer/iron-image/iron-image.js';
import '../../../@polymer/iron-pages/iron-pages.js';
import './app-icons.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class DeletePLDP extends Element {
  static get template() {
    return html`
    <style include="w3-styles"></style>
    <style include="shared-styles">
      .delete-icon{
        cursor: pointer;
      }
    </style>
    <div class="delete-icon" on-tap="deletePLDP">
      <img src="images/close-icon.png">
    </div>
`;
  }

  static get is() { return 'delete-pldp'; }
  static get properties() {
    return {
      user: {
        type: Object
      },
      item:{
        type:Object
      },
      entityid: String,
      itemtype: {
        type: String
      }
    };
  }
  deletePLDP(){
    // instantiate db
            let database = firebase.database();
    
    var theType = this.itemtype;
    if(confirm("Remove this "+this.itemtype+" from my PLDP?")){
      console.log(theType);
      console.log(this.item['$key']);
      console.log(this.item);
      // let database = firebase.database();

              let ref = database.ref().child('myPLDP').child(this.itemtype);
      // let pldpKey = this.user.userID+'_____'+this.entityid;
      let pldpKey = this.item['$key'];
      // console.log()
      ref.child(pldpKey).remove();
    }
  }
}

window.customElements.define(DeletePLDP.is, DeletePLDP);

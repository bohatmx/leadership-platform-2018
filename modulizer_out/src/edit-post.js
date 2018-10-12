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

import '../../../polymerfire/firebase-app.js';
import '../../../polymerfire/firebase-auth.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-database-behavior.js';
import './app-icons.js';
import './shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class EditPost extends Element {
  static get template() {
    return html`
      <style include="w3-styles">
        .icon-part .drop-down{
          position:absolute; z-index:12;
          width:150px;
          display: none;
          top:24px; right:0px;
          background-color: #fff; border:1px solid #ccc; 
          box-shadow: 0px 0px 10px #c9c9c9; 
        }

        .item{
          padding: 10px 6px;
          font-size: 11pt;
          color:#454545;
          border-bottom:1px solid #545454;
        }

        .icon-part:hover .item{
          cursor:pointer;
          color:#353535;
          background-color: rgba(0,0,0,0.03);
        }

        .item:last-child{
          border-bottom: unset;
        }

        .icon-part:hover .drop-down{
          display: block;
        }
      </style>
    <div class="icon-part">
      <div class="w3-right">
        <iron-icon icon="myicons:settings" class="w3-right"></iron-icon>        
      </div>
      <div class="drop-down">
        <div class="item w3-center" on-tap="_deleteItem"> <iron-icon icon="myicons:delete"></iron-icon> Delete</div>
      </div>
    </div>
`;
  }

  static get is() { return 'edit-post'; }
  static get properties() {
    return {
      user: {
        type: Object
      },
      ref: {type: String},
      itemid: {
        type: Object
      }
    };
  }
  _deleteItem(){
    if (confirm('Delete selected item?')){
      var database = firebase.database();
      var items = database.ref(this.ref);
      items.child(this.itemid).remove();
    }
    
  }
}

window.customElements.define(EditPost.is, EditPost);

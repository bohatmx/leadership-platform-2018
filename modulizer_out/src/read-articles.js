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
class ReadArticles extends Element {
  static get template() {
    return html`
    <style include="w3-styles"></style>
      <style include="shared-styles">
          paper-icon-button {
          color: white;
          --paper-icon-button-ink-color: white;
        }
        </style>
    
        <div class="container">
          <div class="row">
            <div class="article w3-animate-zoom">
              <div class="row" style="background-color: #000;">
                  <a href="leadership-articles" tabindex="-1">
                    <paper-icon-button icon="app:arrow-back"></paper-icon-button>
                  </a>
              </div>
              <div class="read-article-photo" style="background-image: url('[[photo]]');">
              </div>
              <div class="read-article-title">[[title]]</div>
              <div class="read-article-author">[[author]]</div>
              <div class="read-article-body">[[body]]</div> 
            </div>
          </div>
        </div>
`;
  }

  static get is() { return 'read-articles'; }
  static get properties() {
    return {
      user: {
        type: Object
      },
      _companyid: String,
      author: String,
      title: String,
      body: String,
      photo: String
    };
  }
}

window.customElements.define(ReadArticles.is, ReadArticles);

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

import './view-thoughts.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { importHref } from '../../../@polymer/polymer/lib/utils/import-href.js';
class TopleaderThoughts extends Element {
  static get template() {
    return html`
    <style>
      @media screen and (max-width: 1010px){
        #videoPlayer{
          width: 100%;
          height: auto;
          left: 0px;
          top: 0px;
          opacity: 1;
        }
        .video-side{
          display: block;
          margin: 10px auto;
          max-height: 200px;
        }
      }

      @media screen and (max-width: 500px){
        #videoPlayer{
          width: 100%;
          height: auto;
          left: 0px;
          top: 0px;
          opacity: 1;
        }
        .video-side{
          display: block;
          margin: 10px auto;
          height: auto;
        }
      }
    </style>

    <view-thoughts user="[[user]]" _companyid="[[_companyid]]" thoughtype="topleaderthoughts" placeholder="Search for Global Contributors Messages"></view-thoughts>
`;
  }

  static get is() { return 'topleader-thoughts'; }
  static get properties() {
    return {
      user: {
          type: Object
      },
      _companyid: String,
    };
  }
  connectedCallback() { 
    super.connectedCallback();
    var resolvedPageUrl = this.resolveUrl('view-thoughts.html');
    importHref(
    resolvedPageUrl,
    null,
    'view-thoughts.html',
    true);
  }
}

window.customElements.define(TopleaderThoughts.is, TopleaderThoughts);

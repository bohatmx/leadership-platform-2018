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

import './view-podcasts.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { importHref } from '../../../@polymer/polymer/lib/utils/import-href.js';
class LeadershipPodcasts extends Element {
  static get template() {
    return html`
    <style>
      
    </style>
  <view-podcasts user="[[user]]" _companyid="[[_companyid]]" thoughtype="podcasts" placeholder="Search for Podcasts"></view-podcasts>
`;
  }

  static get is() { return 'leadership-podcasts'; }
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
    var resolvedPageUrl = this.resolveUrl('view-podcasts.html');
    importHref(
    resolvedPageUrl,
    null,
    'view-podcasts.html',
    true);
  }
}

window.customElements.define(LeadershipPodcasts.is, LeadershipPodcasts);

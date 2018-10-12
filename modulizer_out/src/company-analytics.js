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

import './view-analytics.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { importHref } from '../../../@polymer/polymer/lib/utils/import-href.js';
class CompanyAnalytics extends Element {
  static get template() {
    return html`
    <style>
    </style>

  <view-analytics user="[[user]]" _companyid="[[_companyid]]"></view-analytics>
`;
  }

  static get is() { return 'company-analytics'; }
  static get properties() {
    return {
      user: {type: Object},
      _companyid: String,
    };
  }
  connectedCallback() { 
    super.connectedCallback();
    var resolvedPageUrl = this.resolveUrl('view-analytics.html');
    importHref(
        resolvedPageUrl,
        null,
        'view-analytics.html',
        true
    );
  }
}

window.customElements.define(CompanyAnalytics.is, CompanyAnalytics);

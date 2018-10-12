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
import './shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { importHref } from '../../../@polymer/polymer/lib/utils/import-href.js';
class FilteredPodcasts extends Element {
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

  <app-location route="{{route}}" use-hash-as-path=""></app-location>
  <app-route route="{{route}}" pattern="/:filter_id" data="{{routeData}}" tail="{{subroute}}">
  </app-route>

  <view-podcasts user="[[user]]" _companyid="[[_companyid]]" thoughtype="filteredpodcasts" placeholder="Search for Podcasts" filterid="[[filterid]]"></view-podcasts>
`;
  }

  static get is() { return 'filtered-podcasts'; }
  static get properties() {
    return {
      user: {type: Object},
      _companyid: String,
      routeData: {
        type: String,
        observer: "_onrouteData"
      },
      filterid: {
        type: String,
        value: ''
      },
    };
  }
  _onrouteData (newData, oldData){
    if(newData != undefined){
      if(newData.filter_id != undefined){
        this.filterid = newData.filter_id;

        var resolvedPageUrl = this.resolveUrl('view-podcasts.html');
        importHref(
          resolvedPageUrl,
          null,
          'view-podcasts.html',
          true
        );
      }
    }
            // console.log(newData.nextpage);
        }
  connectedCallback() { 
    super.connectedCallback();

    
  }
}

window.customElements.define(FilteredPodcasts.is, FilteredPodcasts);

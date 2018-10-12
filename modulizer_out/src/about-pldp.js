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

import './app-icons.js';
import './pldp-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class AboutPldp extends Element {
  static get template() {
    return html`
    <style include="w3-styles">
        :host {
            display: block;
          }
        .read-article-body{
            font-family: sans-serif;
            white-space: pre-wrap;
            text-align: justify;
            text-indent: 0%;
        }
        .card-shadow{
            background-color: #fff;
            box-shadow: 5px 5px 25px 0px rgba(0,0,0,0.1);
            margin: 8px;
            border-radius: 5px;
        }
        
        @-webkit-keyframes fadeInUp{
            0%{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}
            100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}
        }
        @keyframes fadeInUp{
            0%{opacity:0;-webkit-transform:translateY(20px);-ms-transform:translateY(20px);transform:translateY(20px)}
            100%{opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}
        }
        .fadeInUp{
            -webkit-animation-name:fadeInUp;
            animation-name:fadeInUp;
            opacity: 0;
            -webkit-animation-duration: 0.5s;
            animation-duration: 0.5s;
            -webkit-animation-fill-mode: forwards;
            animation-fill-mode: forwards;
            animation-timing-function: ease-in;
        }

    </style>

    <section class="card-shadow">
        <header>
            <h2 class="w3-padding-large w3-light-grey">ABOUT – Personal Leadership Development Plan (PLDP)</h2>
        </header>
        <main>
            <section class="fadeInUp">
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/AjeTqb5Wrq4?rel=0" frameborder="0" allow="encrypted-media" allowfullscreen=""></iframe>
            </section>
        </main>
        

    </section>
`;
  }

  static get is() { return 'about-pldp'; }
  static get properties() {
    return {
      user: {
        type: Object
      },
      _companyid: String,
      previouspage: String,
      pldpData: {
        type: Object,
        observer: '_onpldpDataDataReceived'
      }
    };
  }
  _onpldpDataDataReceived(newData, oldData){
    this.pldpData.sort(function(a, b) {
      
    var nameA = a.dateRegistered; // ignore upper and lowercase
    var nameB = b.dateRegistered; // ignore upper and lowercase
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }

    // names must be equal
    return 0;
    });
      
  }
}


window.customElements.define(AboutPldp.is, AboutPldp);

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
class CompanyProfile extends Element {
  static get template() {
    return html`
        <style include="shared-styles">
        
        
        </style>
    
        
      <div class="cards-wrapper">
        <!-- Thoughts -->
          <div class="main-card-container fadeInUp">
              <div class="container card-header">
                  <div class="company-profile-icon">
                      <iron-icon icon="app:message"></iron-icon>
                  </div>
              </div>
              <div class="container">
                <div class="row">
                  <div class="thought-img" style="background: #fff;">
                    <div class="company-profile-title blue">
                      15
                    </div>
                    <div class="company-profile-text">
                      Thoughts
                    </div>
                  </div>
                </div>
              </div>
          </div>
    
          <!-- Videos -->
          <div class="main-card-container fadeInUp">
              <div class="container card-header">
                  <div class="company-profile-icon">
                      <iron-icon icon="app:videocam"></iron-icon>
                  </div>
              </div>
              <div class="container">
                <div class="row">
                  <div class="thought-img" style="background: #fff;">
                    <div class="company-profile-title red">
                      6
                    </div>
                    <div class="company-profile-text">
                      Videos
                    </div>
                  </div>
                </div>
              </div>
          </div>
    
          <!-- Users -->
          <div class="main-card-container fadeInUp">
              <div class="container card-header">
                  <div class="company-profile-icon">
                      <iron-icon icon="app:group"></iron-icon>
                  </div>
              </div>
              <div class="container">
                <div class="row">
                  <div class="thought-img" style="background: #fff;">
                    <div class="company-profile-title tomato">
                      12
                    </div>
                    <div class="company-profile-text">
                      Users
                    </div>
                  </div>
                </div>
              </div>
          </div>
    
          <!-- Podcasts -->
          <div class="main-card-container fadeInUp">
              <div class="container card-header">
                  <div class="company-profile-icon">
                      <iron-icon icon="app:mic"></iron-icon>
                  </div>
              </div>
              <div class="container">
                <div class="row">
                  <div class="thought-img" style="background: #fff;">
                    <div class="company-profile-title green">
                      15
                    </div>
                    <div class="company-profile-text">
                      Podcasts
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
`;
  }

  static get is() { return 'company-profile'; }
  static get properties() {
    return {
      user: {
        type: Object
      },
      _companyid: String,
    };
  }

  _photo(photos){
    let photo_url = "background-image: url('../../data/land.jpg');";

    for (var item in photos) { 
      photo_url = 'background-image: url('+photos[item].url+');';
    }

    return photo_url;
  }
}

window.customElements.define(CompanyProfile.is, CompanyProfile);

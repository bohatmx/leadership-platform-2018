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

import '../../../@polymer/iron-selector/iron-selector.js';
import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../@polymer/paper-ripple/paper-ripple.js';
import './app-icons.js';
import './w3-styles.js';
import './shared-styles.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';

class SidebarMenus extends Element {
  static get template() {
    return html`
    <style include="shared-styles"></style>
    <style include="w3-styles">
        :host {
            display: block;
        }
        iron-selector a{
            text-decoration: none;
            display: block;
            padding:7px 5px;
            position: relative;
        }
        .a-border-top{
            border-top: 1px solid rgba(255,255,255, 0.05);
        }
        iron-selector a .sb-link-icon, iron-selector a .sb-link-text{
            color:#fff;
        }
        iron-selector a .sb-link-text{
            padding: 10px 10px;
            font-size: 10pt;
        }
        iron-selector a:hover{
            background-color: rgba(255,255,255,0.05);
        }
        iron-selector a iron-icon{
            color:#fff;
        }
			
    </style>
    <!-- Corporate Leadership App Menus -->
    <template is="dom-if" if="[[leadershipapp]]">
        <iron-selector selected="{{page}}" attr-for-selected="name" class="drawer-list" role="navigation">
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Leadership Messages</div>
            <a name="company-thoughts" href="company-thoughts#" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:business"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Organisational</div>
            </a>
            <a name="i-lead" href="i-lead#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:ac-unit"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">I-LEAD</div>
            </a>
            <a name="topleader-thoughts" href="topleader-thoughts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:group"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Global Contributors</div>
            </a>
            <a name="daily-thoughts" href="daily-thoughts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:speaker-notes"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Daily</div>
            </a>
            <a name="leadership-thoughts" href="leadership-thoughts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:person-pin"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">My Messages</div>
            </a>
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Leadership Media</div>
            <a name="leadership-videos" href="leadership-videos#" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:videocam"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Videos</div>
            </a>
            <a name="leadership-podcasts" href="leadership-podcasts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:mic"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Podcasts &amp; Audios</div>
            </a>
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Leadership Read</div>
            <a name="leadership-articles" href="leadership-articles#" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:remove-red-eye"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Articles</div>
            </a>
            <a name="leadership-ebooks" href="leadership-ebooks#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:library-books"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">eBooks</div>
            </a>
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Leadership Development Plan (LDP)</div>
            <a name="my-pldp" href="my-pldp" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:library-books"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Personal (PLDP)</div>
            </a>
            <template is="dom-if" if="[[hidecompany]]">
                <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Company Profile</div>
                    <a name="ldp-companies" href="ldp-companies" class="w3-row">
                        <paper-ripple></paper-ripple>
                        <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                            <paper-icon-button icon="smapp:work"></paper-icon-button>
                        </div>
                        <div class="w3-rest sb-link-text">Companies</div>
                    </a>
                    <a name="company-analytics" href="company-analytics" class="w3-row">
                        <paper-ripple></paper-ripple>
                        <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                            <paper-icon-button icon="smapp:insert-chart"></paper-icon-button>
                        </div>
                        <div class="w3-rest sb-link-text">Analytics</div>
                    </a>
                
                <a name="company-staff" href="company-staff" class="w3-row a-border-top">
                    <paper-ripple></paper-ripple>
                    <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                        <paper-icon-button icon="smapp:person"></paper-icon-button>
                    </div>
                    <div class="w3-rest sb-link-text">Company Staff</div>
                </a>
                <a hidden\$="{{notcompanyadmin}}" name="thoughts-management" href="thoughts-management" class="w3-row a-border-top w3-padding-bottom">
                    <paper-ripple></paper-ripple>
                    <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                        <paper-icon-button icon="smapp:book"></paper-icon-button>
                    </div>
                    <div class="w3-rest sb-link-text">Messages Management
                        <div class="w3-new-badge nt w3-deep-orange" style="left:26px!important; top:6px!important; z-index:222; position:absolute;">
                            {{pendingstring}}
                        </div>
                    </div>
                </a>
            </template>
        </iron-selector>
    </template>
    <!-- End Leadership  App Menus -->

    <!-- Public App Menus -->
    <template is="dom-if" if="[[publicapp]]">
        <iron-selector selected="{{page}}" attr-for-selected="name" class="drawer-list" role="navigation">
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Leadership Messages</div>
            <a name="i-lead" href="i-lead#" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:ac-unit"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">I-LEAD</div>
            </a>
            <a name="topleader-thoughts" href="topleader-thoughts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:group"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Global Contributors</div>
            </a>
            <a name="daily-thoughts" href="daily-thoughts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:speaker-notes"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Daily</div>
            </a>
            <a name="leadership-thoughts" href="leadership-thoughts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:person-pin"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">My Messages</div>
            </a>
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Leadership Media</div>
            <a name="leadership-videos" href="leadership-videos#" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:videocam"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Videos</div>
            </a>
            <a name="leadership-podcasts" href="leadership-podcasts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:mic"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Podcasts &amp; Audios</div>
            </a>
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Leadership Read</div>
            <a name="leadership-articles" href="leadership-articles#" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:remove-red-eye"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Articles</div>
            </a>
            <a name="leadership-ebooks" href="leadership-ebooks#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:library-books"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">eBooks</div>
            </a>
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Leadership Development Plan (LDP)</div>
            <a name="my-pldp" href="my-pldp" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:library-books"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Personal (PLDP)</div>
            </a>
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Tutorials</div>
            <a href="" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:help-outline"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">More on GLP</div>
            </a>
        </iron-selector>
    </template>
    <!-- End Public App Menus -->

    <!-- Sales App Menus -->
    <template is="dom-if" if="[[salesapp]]">
        <iron-selector selected="{{page}}" attr-for-selected="name" class="drawer-list" role="navigation">
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Sales Messages</div>
            <a name="i-lead" href="i-lead#" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:business"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">I-LEAD</div>
            </a>
            <a name="topleader-thoughts" href="topleader-thoughts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:group"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Global Contributors</div>
            </a>
            <a name="daily-thoughts" href="daily-thoughts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:speaker-notes"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Daily</div>
            </a>
            <a name="leadership-thoughts" href="leadership-thoughts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:person-pin"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">My Messages</div>
            </a>
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Sales Media</div>
            <a name="leadership-videos" href="leadership-videos#" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:videocam"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Videos</div>
            </a>
            <a name="leadership-podcasts" href="leadership-podcasts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:mic"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Podcasts &amp; Audios</div>
            </a>
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Sales Read</div>
            <a name="leadership-articles" href="leadership-articles#" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:remove-red-eye"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Articles</div>
            </a>
            <a name="leadership-ebooks" href="leadership-ebooks#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:library-books"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">eBooks</div>
            </a>
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Sales Development Plan (SDP)</div>
            <a name="my-pldp" href="my-pldp" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:library-books"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Personal (PSDP)</div>
            </a>
            <template is="dom-if" if="[[hidecompany]]">
                <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Company Profile</div>
                
                    <!-- <a name="ldp-companies" href="ldp-companies" class="w3-row">
                        <paper-ripple></paper-ripple>
                        <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                            <paper-icon-button icon="smapp:work"></paper-icon-button>
                        </div>
                        <div class="w3-rest sb-link-text">Companies</div>
                    </a> -->
                
                <a name="company-staff" href="company-staff" class="w3-row a-border-top">
                    <paper-ripple></paper-ripple>
                    <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                        <paper-icon-button icon="smapp:person"></paper-icon-button>
                    </div>
                    <div class="w3-rest sb-link-text">Company Staff</div>
                </a>
                <a hidden\$="{{notcompanyadmin}}" name="thoughts-management" href="thoughts-management" class="w3-row a-border-top w3-padding-bottom">
                    <paper-ripple></paper-ripple>
                    <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                        <paper-icon-button icon="smapp:book"></paper-icon-button>
                    </div>
                    <div class="w3-rest sb-link-text">Messages Management
                        <div class="w3-new-badge nt w3-deep-orange" style="left:26px!important; top:6px!important; z-index:222; position:absolute;">
                            {{pendingstring}}
                        </div>
                    </div>
                </a>
            </template>
        </iron-selector>
    </template>
    <!-- End Sales App Menus -->

    <!-- HR App Menus -->
    <template is="dom-if" if="[[hrapp]]">
        <iron-selector selected="{{page}}" attr-for-selected="name" class="drawer-list" role="navigation">
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">HR Messages</div>
            <a name="i-lead" href="i-lead#" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:business"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">I-LEAD</div>
            </a>
            <a name="topleader-thoughts" href="topleader-thoughts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:group"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Global Contributors</div>
            </a>
            <a name="daily-thoughts" href="daily-thoughts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:speaker-notes"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Daily</div>
            </a>
            <a name="leadership-thoughts" href="leadership-thoughts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:person-pin"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">My Messages</div>
            </a>
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">HR Media</div>
            <a name="leadership-videos" href="leadership-videos#" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:videocam"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Videos</div>
            </a>
            <a name="leadership-podcasts" href="leadership-podcasts#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:mic"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Podcasts &amp; Audios</div>
            </a>
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">HR Read</div>
            <a name="leadership-articles" href="leadership-articles#" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:remove-red-eye"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Articles</div>
            </a>
            <a name="leadership-ebooks" href="leadership-ebooks#" class="w3-row a-border-top">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:library-books"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">eBooks</div>
            </a>
            <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">HR Development Plan (HRDP)</div>
            <a name="my-pldp" href="my-pldp" class="w3-row">
                <paper-ripple></paper-ripple>
                <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                    <paper-icon-button icon="smapp:library-books"></paper-icon-button>
                </div>
                <div class="w3-rest sb-link-text">Personal (PHRDP)</div>
            </a>
            <template is="dom-if" if="[[hidecompany]]">
                <div class="w3-row w3-padding w3-small w3-sb-title w3-sb-title-text">Company Profile</div>
                
                    <!-- <a name="ldp-companies" href="ldp-companies" class="w3-row">
                        <paper-ripple></paper-ripple>
                        <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                            <paper-icon-button icon="smapp:work"></paper-icon-button>
                        </div>
                        <div class="w3-rest sb-link-text">Companies</div>
                    </a> -->
                
                <a name="company-staff" href="company-staff" class="w3-row a-border-top">
                    <paper-ripple></paper-ripple>
                    <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                        <paper-icon-button icon="smapp:person"></paper-icon-button>
                    </div>
                    <div class="w3-rest sb-link-text">Company Staff</div>
                </a>
                <a hidden\$="{{notcompanyadmin}}" name="thoughts-management" href="thoughts-management" class="w3-row a-border-top w3-padding-bottom">
                    <paper-ripple></paper-ripple>
                    <div class="w3-left sb-link-icon circle c48 w3-ldp-color shd">
                        <paper-icon-button icon="smapp:book"></paper-icon-button>
                    </div>
                    <div class="w3-rest sb-link-text">Messages Management
                        <div class="w3-new-badge nt w3-deep-orange" style="left:26px!important; top:6px!important; z-index:222; position:absolute;">
                            {{pendingstring}}
                        </div>
                    </div>
                </a>
            </template>
        </iron-selector>
    </template>
    <!-- End HR App Menus -->
`;
  }

  static get is() { return 'sidebar-menus'; }
  ready(){
      super.ready();
  }
  static get properties() {
  return {
      page:{
          type: String,
          notify: true
      },
      leadershipapp: Boolean,
      publicapp: Boolean,
      salesapp: Boolean,
      hrapp: Boolean,
      hidecompany: Boolean,
      notcompanyadmin: Boolean,
      pendingstring: String
  };
}
}
window.customElements.define(SidebarMenus.is, SidebarMenus);

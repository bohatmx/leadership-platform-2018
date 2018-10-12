/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* <link rel="import" href="../bower_components/google-chart/google-chart.html"> */
/* Ensure Web Animations polyfill is loaded since neon-animation 2.0 doesn't import it */
/* Firebase Query */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { Element } from '../../../@polymer/polymer/polymer-element.js';

import '../../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../../@polymer/paper-spinner/paper-spinner.js';
import '../../../@polymer/neon-animation/web-animations.js';
import '../../../@polymer/paper-item/paper-item.js';
import '../../../@polymer/paper-listbox/paper-listbox.js';
import '../../../polymerfire/firebase-query.js';
import './w3-styles.js';
import './my-icons.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
class ViewAnalytics extends Element {
  static get template() {
    return html`
    <template is="dom-if" if="[[_companyid]]">
        <firebase-query id="qry_overallanalytics" path="/company-analytics/{{_companyid}}/{{currPeriod}}" data="{{overallData}}">
        </firebase-query>

        <firebase-query id="qry_activeusers" path="/company-analytics/{{_companyid}}/{{useractive}}/{{activeUsersPeriod}}" order-by-child="total" limit-to-last="{{minData}}" data="{{activeUsersData}}">
        </firebase-query>
    </template>

    <style include="w3-styles">
        /* Phone and tablet */
        #overall-chart {
            height: 300px;
            width: 400px;
        }

        /* Desktop */
        @media screen and (min-width: 1024px) {
            #overall-chart {
                width: 700px;
            }
        }

        /* 100% width */
        .item-width{
            width: 100%;
        }
        .item-height{
            min-height: 160px;
            background-color: white;
            display: -webkit-flex;
            align-content: center;
            flex-direction: column;
            justify-content: center;
        }
        .item-center{
            display: -webkit-flex;
            align-content: center;
            flex-direction: column;
            justify-content: center;
        }
        .posts-avatar {
            display: inline-block;
            height: 100px;
            width: 100px;
            border-radius: 50%;
        }
        .iron-icon{
            width: -webkit-fill-available;
            height: 26px!important;
        }

    </style>

    <div id="dashboard" class="w3-row-padding w3-white"><h2 class="w3-left">Analytics Dashboard</h2> <paper-spinner class="w3-right" active="{{isloading}}" style="height: 50px; width: 50px; margin:auto"></paper-spinner></div>

    <div id="searchbar" class="w3-row-padding w3-margin-bottom">
        <template is="dom-if" if="[[user.reportadmin]]">
            <div class="w3-row w3-left w3-mobile" hidden="{{iscompaniesloaded}}">
                <paper-dropdown-menu autofocus="" id="dropdown_companies" label="Select Company" value="{{selectedCompany}}" style="width: -webkit-fit-content;" tabindex="0" class="w3-left w3-mobile" vertical-align="top" horizontal-align="left" vertical-offset="60">
                    <paper-listbox id="companyList" slot="dropdown-content" attr-for-selected="value" selected="{{selectedCompany}}" no-animations="true" style="min-width: 340px;">
                        <template id="companiesList" is="dom-repeat" items="[[appCompanies]]" as="item" sort="_sortcompanies" observe="companyName">
                            <paper-item data="[[item.companyID]]" value="[[item.companyName]]" on-tap="_companySelect">[[item.companyName]]</paper-item>
                        </template>
                    </paper-listbox>
                </paper-dropdown-menu>
            </div>
        </template>
        
        <div class="w3-row w3-right">
            <paper-dropdown-menu autofocus="" id="dropdown_mmonth" label="Month" value="{{selectedMonth}}" style="width: -webkit-fit-content;" tabindex="0" class="w3-mobile" vertical-offset="60">
                <paper-listbox id="monthList" slot="dropdown-content" attr-for-selected="value" selected="{{selectedMonth}}" no-animations="true" style="min-width: 100px;">
                    <paper-item data="All" value="All" on-tap="_monthSelect">All</paper-item>
                    <paper-item data="Jan" value="Jan" on-tap="_monthSelect">Jan</paper-item>
                    <paper-item data="Feb" value="Feb" on-tap="_monthSelect">Feb</paper-item>
                    <paper-item data="Mar" value="Mar" on-tap="_monthSelect">Mar</paper-item>
                    <paper-item data="Apr" value="Apr" on-tap="_monthSelect">Apr</paper-item>
                    <paper-item data="May" value="May" on-tap="_monthSelect">May</paper-item>
                    <paper-item data="Jun" value="Jun" on-tap="_monthSelect">Jun</paper-item>
                    <paper-item data="Jul" value="Jul" on-tap="_monthSelect">Jul</paper-item>
                    <paper-item data="Aug" value="Aug" on-tap="_monthSelect">Aug</paper-item>
                    <paper-item data="Sep" value="Sep" on-tap="_monthSelect">Sep</paper-item>
                    <paper-item data="Oct" value="Oct" on-tap="_monthSelect">Oct</paper-item>
                    <paper-item data="Nov" value="Nov" on-tap="_monthSelect">Nov</paper-item>
                    <paper-item data="Dec" value="Dec" on-tap="_monthSelect">Dec</paper-item>
                </paper-listbox>
            </paper-dropdown-menu>
        </div>
    </div>
    
    <!-- <div id="overallbar" class="w3-row-padding w3-white">
        <div class="w3-row-padding">
            <h3>Overall Traffic</h3>
        </div>
        <div class="w3-row-padding">
            <google-chart
                class="w3-left"
                id="overall-chart"
                type="md-line"
                options='{"title": "Overall Traffic"}'
                cols='[{"label": "Month", "type": "string"},{"label": "Traffic", "type": "number"}]'>
            </google-chart>
        </div>
        
    </div> -->
    <div id="postsbar" class="w3-row-padding w3-animate-zoom">
        <div class="w3-row-padding">
            <h3>Posts</h3>
        </div>
        <div class="w3-row">
            <div class="w3-half w3-mobile w3-hover-opacity">
                <div class="w3-panel w3-border-left w3-leftbar w3-border-purple w3-round w3-card-2 w3-margin item-height">
                    <div class="w3-row">
                        <div class="w3-purple posts-avatar w3-left w3-center item-center">
                            <div class="item-center" style="height: 100px;">
                                <iron-icon class="iron-icon" icon="analytics:speaker-notes"></iron-icon>
                            </div>
                        </div>
                        <div class="w3-rest item-center" style="height: 100px;">
                            <div class="w3-row w3-margin-left w3-large w3-text-grey">Messages</div>
                            <div class="w3-row w3-margin-left w3-xxlarge w3-text-dark-grey">{{_currentThoughts}}</div>
                        </div> 
                    </div> 
                    <div class="w3-row w3-border-top w3-border-light-gray w3-margin-top">
                        <div class="w3-row w3-right w3-padding-small w3-text-purple">
                            <!-- (VIEW ALL) -->
                        </div>
                    </div>                   
                </div>
            </div>
            <div class="w3-half w3-mobile w3-hover-opacity">
                <div class="w3-panel w3-border-left w3-leftbar w3-border-blue w3-round w3-card-2 w3-margin item-height">
                    <div class="w3-row">
                        <div class="w3-blue posts-avatar w3-left w3-center item-center">
                            <div class="item-center" style="height: 100px;">
                                <iron-icon class="iron-icon" icon="analytics:videocam"></iron-icon>
                            </div>
                        </div>
                        <div class="w3-rest item-center" style="height: 100px;">
                            <div class="w3-row w3-margin-left w3-large w3-text-grey">Videos</div>
                            <div class="w3-row w3-margin-left w3-xxlarge w3-text-dark-grey">{{_currentVideos}}</div>
                        </div> 
                    </div>
                    <div class="w3-row w3-border-top w3-border-light-gray w3-margin-top">
                        <div class="w3-row w3-right w3-padding-small w3-text-blue">
                            <!-- (VIEW ALL) -->
                        </div>
                    </div>   
                </div>
            </div>
        </div>
        <div class="w3-row">
            <div class="w3-half w3-mobile w3-hover-opacity">
                <div class="w3-panel w3-border-left w3-leftbar w3-border-green w3-round w3-card-2 w3-margin item-height">
                    <div class="w3-row">
                        <div class="w3-green posts-avatar w3-left w3-center item-center">
                            <div class="item-center" style="height: 100px;">
                                <iron-icon class="iron-icon" icon="analytics:library-books"></iron-icon>
                            </div>
                        </div>
                        <div class="w3-rest item-center" style="height: 100px;">
                            <div class="w3-row w3-margin-left w3-large w3-text-grey">Articles</div>
                            <div class="w3-row w3-margin-left w3-xxlarge w3-text-dark-grey">{{_currentArticles}}</div>
                        </div> 
                    </div> 
                    <div class="w3-row w3-border-top w3-border-light-gray w3-margin-top">
                        <div class="w3-row w3-right w3-padding-small w3-text-green">
                            <!-- (VIEW ALL) -->
                        </div>
                    </div>  
                </div>
            </div>
            <div class="w3-half w3-mobile w3-hover-opacity">
                <div class="w3-panel w3-border-left w3-leftbar w3-border-deep-orange w3-round w3-card-2 w3-margin item-height">
                    <div class="w3-row">
                        <div class="w3-deep-orange posts-avatar w3-left">
                            <div class="item-center w3-text-white" style="height: 100px;">
                                <iron-icon class="iron-icon" icon="analytics:mic"></iron-icon>
                            </div>                         
                        </div>
                        <div class="w3-rest item-center" style="height: 100px;">
                            <div class="w3-row w3-margin-left w3-large w3-text-grey">Podcasts</div>
                            <div class="w3-row w3-margin-left w3-xxlarge w3-text-dark-grey">{{_currentPodcasts}}</div>
                        </div> 
                    </div>
                    <div class="w3-row w3-border-top w3-border-light-gray w3-margin-top">
                        <div class="w3-row w3-right w3-padding-small w3-text-deep-orange">
                            <!-- (VIEW ALL) -->
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </div>
    <div id="engagementbar" class="w3-row-padding w3-white w3-animate-zoom">
        <div class="w3-row-padding">
            <h3>User Engagement</h3>
        </div>
        <div class="w3-row">
            <div class="w3-half w3-mobile">
                <h4>Impressions</h4>
                <div class="w3-row w3-padding">
                    <table class="w3-table-all w3-hoverable w3-card">
                        <tbody><tr class="w3-padding">
                            <td style="width:20px;"><iron-icon class="w3-left w3-text-green" icon="my-icons:group"></iron-icon></td>
                            <td>Total Active Users</td>
                            <td>{{_currentActiveUsers}}</td>
                        </tr>
                        <tr class="w3-padding">
                            <td style="width:20px;"><iron-icon class="w3-left w3-text-red" icon="my-icons:view-quilt"></iron-icon></td>
                            <td>Posts</td>
                            <td>{{_currentPosts}}</td>
                        </tr>
                        <tr class="w3-padding">
                            <td style="width:20px;"><iron-icon class="w3-left w3-text-purple" icon="my-icons:comment"></iron-icon></td>
                            <td>Comments</td>
                            <td>{{_currentComments}}</td>
                        </tr>
                        <tr class="w3-padding">
                            <td style="width:20px;"><iron-icon class="w3-left w3-text-blue" icon="app:favorite"></iron-icon></td>
                            <td>Likes</td>
                            <td>{{_currentLikes}}</td>
                        </tr>
                        <tr class="w3-padding">
                            <td style="width:20px;"><iron-icon class="w3-left w3-text-yellow" icon="my-icons:device-hub"></iron-icon></td>
                            <td>PLDP Tasks Created</td>
                            <td>{{_currentTasks}}</td>
                        </tr>
                    </tbody></table>
                </div>
            </div>
            <div class="w3-half w3-mobile">
                <div class="w3-row"><h4>Top 6 Active Users</h4></div>
                <div class="w3-row">
                    <ul class="w3-ul w3-card-2 w3-hoverable w3-margin-bottom">
                        <template id="resultList" is="dom-repeat" items="[[activeUsersData]]" as="item" sort="_sort" observe="total">
                            <li class="w3-bar" style="padding: 8px 0;">
                                <img class="w3-bar-item w3-circle" style="width:42px; height: 42px;" src="[[_profilePhoto(item.data.photoURL)]]">
                                <div class="w3-bar-item">
                                    <span class="w3-medium w3-text-blue" style="font-weight: 600;">[[item.data.journalUserName]]</span><br>
                                    <table class="w3-table w3-centered">
                                        <tbody><tr class="w3-medium" style="font-weight: 600;">
                                            <td>[[_getNos(item.thoughts)]]</td>
                                            <td>[[_getNos(item.articles)]]</td>
                                            <td>[[_getNos(item.videos)]]</td>
                                            <td>[[_getNos(item.podcasts)]]</td>
                                            <td>[[_getNos(item.comments)]]</td>
                                        </tr>
                                        <tr class="w3-small">
                                            <td>Messages</td>
                                            <td>Articles</td>
                                            <td>Videos</td>
                                            <td>Podcasts</td>
                                            <td>Comments</td>
                                        </tr>
                                    </tbody></table>
                                </div>
                            </li>
                        </template>
                        
                    </ul>
                    <!-- <div class="w3-row w3-center w3-text-green">VIEW MORE</div> -->
                </div>
            </div>
        </div>
    </div>

    <firebase-query id="qry_companies" data="{{appCompanies}}">
    </firebase-query>
`;
  }

  static get is() { return 'view-analytics'; }

  static get properties() {
    return {
      user: {
          type: Object
      },
      _companyid: String,
      useractive:{
          type: String,
          value: "year-active-users"
      },
      isloading: {
        type: Boolean,
        value: true
      },
      _currentYear: {
        type: Number,
         value: 2018
      },
      iscompaniesloaded: {
          type: Boolean,
          value: true
      },
      currPeriod:{
        type: String,
        value: "2018"
      },
      activeUsersPeriod:{
        type: String,
        value: "2018"
      },
      _currentActiveUsers:{
          type: Number,
          value:0
      },
      _currentThoughts:{
        type: Number,
        value:0
      },
      _currentArticles:{
        type: Number,
        value:0
      },
      _currentPodcasts:{
        type: Number,
        value:0
      },
      _currentVideos:{
        type: Number,
        value:0
      },
      _currentComments:{
        type: Number,
        value:0
      },
      _currentLikes:{
        type: Number,
        value:0
      },
      _currentTasks:{
        type: Number,
        value:0
      },
      _currentViews:{
        type: Number,
        value:0
      },
      _currentPosts:{
        type: Number,
        value:0
      },
      overallData: {
          type: Object,
          observer: "_overallDataReceived"
      },
      activeUsersData: {
          type: Object,
          observer: "_activeUsersDataReceived"
      },
      appCompanies: {
          type: Object,
          observer: "_appCompaniesReceived"
      },
      minData:{
          type: Number,
          value: 6
      }
    };
  }
  _getNos(nos){
      var res = "_"
      if(nos == undefined){
        return res
      }else {
          return ""+nos;
      }
      return res;
  }
  _companySelect(e){
    this.isloading = true;
    this._currentComments = 0;
    this._currentActiveUsers = 0;
    this._currentLikes = 0;
    this._currentTasks = 0;
    this._currentPosts = 0;
    this._currentArticles = 0;
    this._currentVideos = 0;
    this._currentThoughts = 0;
    this._currentPodcasts = 0;
    this._currentViews = 0;

      if(e.currentTarget.data){
        this.selectedMonth = "All";
        this.activeUsersPeriod = ""+this._currentYear;
        this.currPeriod = ""+this._currentYear;
        this.useractive = "year-active-users";

        this._companyid = e.currentTarget.data;
        
      }
  }
  _monthSelect(e){
    this.isloading = true;
    this._currentComments = 0;
    this._currentActiveUsers = 0;
    this._currentLikes = 0;
    this._currentTasks = 0;
    this._currentPosts = 0;
    this._currentArticles = 0;
    this._currentVideos = 0;
    this._currentThoughts = 0;
    this._currentPodcasts = 0;
    this._currentViews = 0;

    if(e.currentTarget){
        if(e.currentTarget.getAttribute('data') == "All"){
            this.activeUsersPeriod = ""+this._currentYear;
            this.currPeriod = ""+this._currentYear;
            this.useractive = "year-active-users";
        }else{
            this.activeUsersPeriod = ""+this._currentYear+"-"+e.currentTarget.getAttribute('data');
            this.currPeriod = ""+this._currentYear+"-"+e.currentTarget.getAttribute('data');
            this.useractive = "month-active-users";
        }
        // console.log("month value: ",e.currentTarget.getAttribute('data'))
    }
  }

  _activeUsersDataReceived(newData, oldData){
    
  }

  _appCompaniesReceived(newData, oldData){
    if(newData.length > 0){
        this.iscompaniesloaded = false;
    }
  }

  _sort(a, b) {  
    if (a.total > b.total) return -1;
    if (a.total < b.total) return 1;
    return 0;
  }

  _sortcompanies(a, b) {  
    if (a.companyName < b.companyName) return -1;
    if (a.companyName > b.companyName) return 1;
    return 0;
  }

  _overallDataReceived(newData, oldData){
      var that = this;
      var finalData = [];
    //   var chart = Polymer.dom(that.root).querySelector("#overall-chart");

    if(newData.length > 0){
        this._currentComments = 0;
        this._currentActiveUsers = 0;
        this._currentLikes = 0;
        this._currentTasks = 0;
        this._currentPosts = 0;
        this._currentArticles = 0;
        this._currentVideos = 0;
        this._currentThoughts = 0;
        this._currentPodcasts = 0;
        this._currentViews = 0;

        for(var x in newData){
            if(newData[x]['$key'] == 'thoughts'){
                this._currentThoughts = newData[x]['$val']
                this._currentPosts += newData[x]['$val'];
            }else if(newData[x]['$key'] == 'articles'){
                this._currentArticles = newData[x]['$val'];
                this._currentPosts += newData[x]['$val'];
            }else if(newData[x]['$key'] == 'podcasts'){
                this._currentPodcasts = newData[x]['$val'];
                this._currentPosts += newData[x]['$val'];
            }else if(newData[x]['$key'] == 'videos'){
                this._currentVideos = newData[x]['$val'];
                this._currentPosts += newData[x]['$val'];
            }else if(newData[x]['$key'] == 'comments'){
                this._currentComments = newData[x]['$val'];
            }else if(newData[x]['$key'] == 'activeusers'){
                this._currentActiveUsers = newData[x]['$val'];
            }
            else if(newData[x]['$key'] == 'likes'){
                this._currentLikes = newData[x]['$val'];
            }else if(newData[x]['$key'] == 'tasks'){
                this._currentTasks = newData[x]['$val'];
            }else if(newData[x]['$key'] == 'views'){
                this._currentViews = newData[x]['$val'];
            }
            // else if(newData[x]['$key'] == 'transactions'){
            //     var trans = newData[x];

            //     for(var y in trans){                        
            //         if(y != "$key"){
            //             var pushData = [];
            //             pushData.push(""+y);
            //             pushData.push(trans[y]);
            //             finalData.push(pushData);                         
            //         }
            //     }

            //     // object which holds the order value of the month
            //     var monthNames = {
            //         "Jan": 1,
            //         "Feb": 2,
            //         "Mar": 3,
            //         "Apr": 4,
            //         "May": 5,
            //         "Jun": 6,
            //         "Jul": 7,
            //         "Aug": 8,
            //         "Sep": 9,
            //         "Oct": 10,
            //         "Nov": 11,
            //         "Dec": 12
            //     };

            //     // sort the data array
            //     finalData.sort(function(a, b) {
            //     // sort based on the value in the monthNames object
            //     return monthNames[a[0]] - monthNames[b[0]];
            //     });

            //     if(chart != null){
            //         chart.rows = finalData;
            //     }
                
            // }
        }

        if(this.user.reportadmin){
            var qry_companies = dom(that.root).querySelector("#qry_companies")
            qry_companies.path="companies";
        }

        this.isloading = false;
    }

    setTimeout(function(){
        that.isloading = false;
    },10000)
      
  }
  _profilePhoto(photo){
        let photo_url = "../images/default-user.png";

        if(photo == undefined){
            photo_url = "../images/default-user.png";
        }else if(photo == ""){
            photo_url = "../images/default-user.png";
        }else{
            photo_url = photo;
        }

        return photo_url;
  }
}

window.customElements.define(ViewAnalytics.is, ViewAnalytics);

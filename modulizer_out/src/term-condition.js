/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '../../../@polymer/polymer/polymer-element.js';

import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import './w3-styles.js';
import { Polymer } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
Polymer({
		is: 'term-condition',
		properties: {
        nextpage: {
            type: String,
            notify: true
        }

		},
		w3_open: function() {
        var modal = dom(this.root).querySelector('#mySidebar');
        modal.style.display = 'block';
		},
		w3_close: function(){
        var modal = dom(this.root).querySelector('#mySidebar');
        modal.style.display = 'none';
		},
		loadApp: function(){
        this.nextpage = "options";
		}
});

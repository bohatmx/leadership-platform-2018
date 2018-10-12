/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* Firebase Auth */
/* Firebase Query */
/* <link rel="import" href="../bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror.html"> */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { Element } from '../../../@polymer/polymer/polymer-element.js';

import '../../../@polymer/paper-card/paper-card.js';
import '../../../@polymer/paper-spinner/paper-spinner.js';
import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-input/paper-textarea.js';
import '../../../paper-search/paper-search-bar.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/iron-autogrow-textarea/iron-autogrow-textarea.js';
import '../../../polymerfire/firebase-app.js';
import '../../../@polymer/paper-dialog/paper-dialog.js';
import '../../../@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '../../../polymerfire/firebase-auth.js';
import '../../../polymerfire/firebase-query.js';
import '../../../polymerfire/firebase-database-behavior.js';
import './app-icons.js';
import './shared-styles.js';
import './w3-styles.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
var _ua = window.navigator.userAgent;
var scrollTopPosition
iOS = /iPad|iPhone|iPod/.test(_ua),
iOS11 = /OS 11_0|OS 11_1|OS 11_2|OS 11_3/.test(_ua);

class LeadershipEbooks extends Element {
    static get is() { return 'leadership-ebooks'; }
    static get properties() {
				return {
            user: {
                type: Object
            },
            newEbookTitle: String,
            newEbookLink: String,
            newEbookDescription: String,
            newEbookImageDataURL: String,
            photo: String,
            _companyid: String,
            ebooksData: {
                type: Object,
                observer: '_onebooksDataDataReceived'
            },
            isloading: {
                type: Boolean,
                value: true,
                notify: true
            },
            loadingmessage:{
                type: String,
                value: 'Loading...'
            },
				};
    }

    isOwner(user){
				return user == this.user.userID;
    }

    deleteEbook(e){
				var data = e.currentTarget.data;
				if(confirm("Are you sure that you want to delete this ebook?")){
            var database = firebase.database();
            database.ref().child('eBooks').child(data).remove();
				}
    }

    showSnackBar(msg){
				var x = this.$.snackbar;

				x.innerHTML = msg;

				x.className = "show";
				setTimeout(function(){
				x.className = x.className.replace("show", "");
				}, 3000);
    }

    _saveNewEbook(e){
				if((this.newEbookTitle == "") || (this.newEbookTitle == undefined)){
            this.showSnackBar("Please enter the Book Title!");
            return;
				}

				if((this.newEbookLink == "") || (this.newEbookLink == undefined)){
            this.showSnackBar("Please enter the Book Link!");
            return;
				}

				if((this.newEbookDescription == "") || (this.newEbookDescription == undefined)){
            this.showSnackBar("Please enter the Book Description!");
            return;
				}
				
				var database = firebase.database();
				var newEbookKey = database.ref().child('eBooks').push().key;
				var newEbook = {
            addedBy: this.user.userID,
            title: this.newEbookTitle,
            description: this.newEbookDescription,
            ebookID: newEbookKey,
            coverUrl: this.newEbookImageDataURL,
            ebookURL: this.newEbookLink,
            dateRegistered: new Date().getTime()
				}
				// console.log(newEbook)
				database.ref().child('eBooks').child(newEbookKey).set(newEbook);

				this.newEbookTitle = "";
				this.newEbookDescription = "";
				this.newEbookKey = "";
				this.newEbookImageDataURL = "";
				this.newEbookLink = "";
				this.photo = "";

				this._closeModal(e);
    }

    concatDes(str){
				return str.split(" ").slice(0, 50).join(" ")+"...";
    }

    _openModal(e){
				// ios 11 bug caret position
				if ( iOS && iOS11 ) {
            this.addIOSBugfix();
				}
				var modal_name = e.currentTarget.getAttribute('data');
				var modal = dom(this.root).querySelector('#'+modal_name);
				modal.style.display = 'block';
    }

    _closeModal(e){
				// ios 11 bug caret position
				if ( iOS && iOS11 ) {
            this.removeIOSBugfix();
				}
				var modal_name = e.currentTarget.getAttribute('data');
				var modal = dom(this.root).querySelector('#'+modal_name);
				if(modal_name === 'add-items')this._removeLoadElement();

				modal.style.display = 'none';
    }

handlePhoto(e){
  var photoSelected = e.target.files[0];

  // compress photo ready to upload
  this.resizeImage(photoSelected, "photo");

  // compress thumbnail for upload
  this.resizeImage(photoSelected, "thumbnail");

  var selectedImage = URL.createObjectURL(photoSelected);
            console.log(selectedImage)
  this.photo = selectedImage;

  this.$.articlePhoto.style.display = "block";
  this.$.hideRemoveImage.style = "display: block";
}

resizeImage(file, imgType) {
var reader = new FileReader();
				var that = this;
reader.onloadend = function() {

  var tempImg = new Image();
  tempImg.src = reader.result;
  tempImg.onload = function() {

    if(imgType == "thumbnail"){
      var MAX_WIDTH = 400;
      var MAX_HEIGHT = 300;
    }else{
      var MAX_WIDTH = 800;
      var MAX_HEIGHT = 600;
    }
    
    var tempW = tempImg.width;
    var tempH = tempImg.height;
    if (tempW > tempH) {
        if (tempW > MAX_WIDTH) {
          tempH *= MAX_WIDTH / tempW;
          tempW = MAX_WIDTH;
        }
    } else {
        if (tempH > MAX_HEIGHT) {
          tempW *= MAX_HEIGHT / tempH;
          tempH = MAX_HEIGHT;
        }
    }

    var canvas = document.createElement('canvas');
    canvas.width = tempW;
    canvas.height = tempH;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0, tempW, tempH);

    // return data url
    var dataURL = canvas.toDataURL("image/jpeg");

                that.newEbookImageDataURL = dataURL;

    if(imgType == "thumbnail"){
      sessionStorage.setItem("thumbnail_upload", dataURL);
    }else{
      sessionStorage.setItem("photo_upload", dataURL);
    }
  }
}
reader.readAsDataURL(file);
}

removeImage(){
this.$.hideRemoveImage.style = "display: none";
this.$.articlePhoto.style.display = "none";
this.photo = "";
var selectImageForm = dom(this.root).querySelector('#selectImageForm');
selectImageForm.reset();
sessionStorage.removeItem("thumbnail_upload");
sessionStorage.removeItem("photo_upload");
}

_onebooksDataDataReceived(newData, oldData){
    var that = this;

    if(newData.length > 0){
				this.isloading = false;
				this.loadingmessage = "";
    } 

    setTimeout(function(){
				that.isloading = false;

				if(newData.length == 0) that.loadingmessage = "No posts found";
				else that.loadingmessage = "";

    },40000)
}

_sort(a, b) {  
    if (a.dateRegistered > b.dateRegistered) return -1;
    if (a.dateRegistered < b.dateRegistered) return 1;
    return 0;
}
    _photo(photos){
				let photo_url = "background-image: url('../../data/land.jpg');";

				for (var item in photos) { 
            photo_url = 'background-image: url('+photos[item].url+');';
				}

				return photo_url;
    }
    _openPLDP(e){
				var thoughtID = dom(this.root).querySelector('#'+e.target.id).data;
				sessionStorage.setItem("PLDP_eBookAdd", thoughtID);
				this.$.pldpDialog.open();
    }
    closePLDPDialog(){
				this._addToPLDP();
				sessionStorage.removeItem("PLDP_eBookAdd");
				this.$.pldpDialog.close();
    }
    _addToPLDP(){
				let PLDP_eBookAdd = sessionStorage.getItem("PLDP_eBookAdd");

				let filteredArray = this.findObjectByKey(this.ebooksData, "eBookID", PLDP_eBookAdd);

				// remove the key
				delete filteredArray['$key'];

				// add PLDP user to the thought object
				filteredArray.PLDPUserID = this.user.userID;
				filteredArray.PLDPUserName = this.user.firstName+" "+this.user.lastName;

				// instantiate db
				let database = firebase.database();

				// create new record
				let neweBook = database.ref().child('/myPLDP/eBooks').push().key;

				// delete the thought if already exists
				let ref = database.ref('myPLDP/eBooks');
				ref.orderByChild('eBookID').equalTo(PLDP_eBookAdd)
                .once('value').then(function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                        if(neweBook === childSnapshot.key){
                            console.log("Got the new ID");
                        }else{
                            // remove each old child
                            ref.child(childSnapshot.key).remove();
                        }
                });
				});
				
				let updates = {};
				updates['/myPLDP/eBooks/' + neweBook] = filteredArray;
				database.ref().update(updates);
    }
    findObjectByKey(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                    if (array[i][key] === value) {
                            return array[i];
                    }
            }
            return null;
    }
    addIOSBugfix(){
				// Get scroll position before moving top
				scrollTopPosition = $(document).scrollTop();
				console.log('iOS device')
				// Add CSS to body "position: fixed"
				$("body").addClass("iosBugFixCaret");
				// $("body").css('position: fixed!important; width: 100%!important;');
    }

    removeIOSBugfix(){
				// Remove CSS to body "position: fixed"
				$("body").removeClass("iosBugFixCaret");

				//Go back to initial position in document
				$(document).scrollTop(scrollTopPosition);
    }
}

window.customElements.define(LeadershipEbooks.is, LeadershipEbooks);

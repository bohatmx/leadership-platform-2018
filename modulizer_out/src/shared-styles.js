import '../../../@polymer/polymer/polymer-element.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="shared-styles">
	<template>
		<style>
			html,body{ -webkit-overflow-scrolling : touch !important; overflow: auto !important; height: 100% !important; }
			.card {
				margin: 24px;
				padding: 16px;
				color: #757575;
				border-radius: 5px;
				background-color: #fff;
				box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
			}

			.circle {
				display: inline-block;
				width: 64px;
				height: 64px;
				text-align: center;
				border-radius: 50%;
				background: red;
				font-size:12px;
				line-height: 64px;
			}

			.circle.c48 {
				width: 35px !important;
				height: 35px !important;
				line-height: 0px;
			}

			iron-selector a:hover .circle.shd{
				box-shadow: 0px 0px 7px rgba(0,0,0,0.5);
			}

			iron-selector a.iron-selected  .w3-ldp-color{
				background-color: var(--app-theme-color);
			}

			.w3-modal{
				position: fixed !important;
				max-height: 100vh;
				overflow: auto !important;
				top:0px !important; bottom: 0px !important; left:0px !important; right: 0px !important;
				z-index: 9999999 !important;
			}

			iron-selector a:hover:not(.iron-selected) .w3-ldp-color{
				background-color: var(--app-theme-color);;
			}

			h1 {
				margin: 16px 0;
				color: #212121;
				font-size: 22px;
			}

			.w3-ldp-color{
				background-color: rgba(255,255,255,0.085);
				color:#fff;
			}

			.w3-sb-title.follow{
				background-color: #14242b;
				font-size: 13px;
				color: #fff;
				box-shadow: unset;
			}

			.w3-sb-title{
				font-family: 'Roboto';
				background-color: #14242b;
				color:#e095ad;
				font-size: 12pt;
				box-shadow: 0px 0px 10px rgba(50,50,50,0.5);
				background-color: #2a2e37;
			}

			.w3-sb-title-text{
				color: silver;
				text-transform: uppercase;
			}

			/* width */
			::-webkit-scrollbar {
			    width: 0.1px;
			}
			.w3-modal::-webkit-scrollbar {
			    width: 6px;
			}
			.ldp-modal::-webkit-scrollbar {
			    width: 6px;
			}

			/* Track */
			::-webkit-scrollbar-track {
			    background: transparent; 
			}
			 
			/* Handle */
			::-webkit-scrollbar-thumb {
			    background: transparent; 
			}

			/* Handle on hover */
			::-webkit-scrollbar-thumb:hover {
			    width: 1px;
			}

			.card-container{
				position: relative;
				box-shadow:0px 0px 10px #ddd !important;
				border-radius: 4px;
				border:1px solid #ddd  !important;
				font-family: 'Roboto', 'Noto', sans-serif;
			}

			.container.card-header{
				padding:15px !important;
				background-image: url('../images/post-bar.jpg');
			}

			.w3-relative{
				cursor: pointer !important;
			}

			.card-postedby{
				font-size:16px;
				font-weight: 600;
				color:#232323;
				padding: 3px 5px;
			}

			.card-company{
				padding: 3px 5px;
				color:#676767;
			}

			.card-avatar {
				background-repeat: no-repeat;
				background-size: cover;
				display: inline-block;
				height: 50px;
				width: 50px;
				border-radius: 50%;
				line-height: 64px;
				font-size: 30px;
				color: #555;
				text-align: center;
				margin-right: 20px;
			}

			.thought-img {
				position: relative;
				background-repeat: no-repeat;
				background-size: cover;
				height: 280px;
  				display: flex;
				width: 100%;
  				align-items: center;
				border-radius: 1px;
				text-align: center;
			}

			.comments-box{
				display: -webkit-flex;
				display: flex;
				padding: 10px 16px;
				cursor: pointer;
			}

			.thought-img .thought-mask{
				position: absolute;
				top:0px; right: 0px; left: 0px; bottom: 0px;
				z-index: 1;
				transition: opacity 0.8s, visibility 0.8s;
				background-color: #000;
				opacity: 0.37;
			}

			.thought-img:hover .thought-mask{
				opacity: 0;
				transition: opacity 0.8s, visibility 0.8s;
			}
			.thought-img .previewFooter{
				z-index: 2;
			}
			.thought-img .w3-row{
				max-width:320px;
				z-index: 2;
				margin: auto;
				/* color:#fff; */
			}
			.thought-img .thought-title{
				font-size:15px;
				font-weight: 600;
			}
			.thought-img .thought-author{
				font-style: italic;
				padding:3px; 
			}
			.main-card{
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				margin-top:15px;
				position: relative;
			}
			.modal-div{
				flex:1;
				position: relative;
				margin: 26px 10px;
				min-width: 320px;
			}

			.ldp-modal.modal-div{
				margin: 0px;
			}

			.card-container{
				border: 1px solid #e6e6e6;
				background-color: #fff;
			}

			.podcast-item{
				flex:1;
				/* min-width:30%; */
				position: relative;
			}
			.video-item{
				flex: 1;
				/* min-width: 30%; */
				position: relative;
			}

			.card-container .thought-date{
				padding:5px 0px;
				color:#000;
				font-size: 8pt;
				text-align: center;
				position: absolute;
				border-radius: 25px;
				box-shadow: 0px 0px 10px #9a9a9a;
				background-color:#f4eeee;
				left:10px; top:0px; margin-top: -14px;
				width:90px; max-width: 150px !important;
			}

			.w3-card .thought-date{
				padding:5px 0px; color:#676767; font-size: 8pt; text-align: center; position: absolute;
				border-radius: 25px; box-shadow: 0px 0px 10px #9a9a9a8a; background-color:#f4eeee;
				left:10px; top:0px; margin-top: -14px; width:150px; max-width: 150px !important;
			}
			.card-header .thought-date{
				padding:5px 0px; color:#676767; font-size: 8pt; text-align: center; position: absolute;
				border-radius: 25px; box-shadow: 0px 0px 10px #9a9a9a8a; background-color:#f4eeee;
				left:10px; top:0px; margin-top: -14px; width:150px; max-width: 150px !important;
			}

			.side-card{
				display: none;
			}

			.previewText{
				display: -webkit-flex;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
				padding: 0 16px;
			}

			paper-button.thought-actions{
				min-width:22px;
				text-transform: none;
				font-size:10px;
			}

			.vid-item{
				flex: 1;
				position: relative;
				margin: 26px 10px;
				min-width: 320px;
			}

			@media(max-width: 1024px){
				.podcast-item{
					min-width: 100% !important;
				}
				.video-item{
					min-width: 100% !important;
				}
			}

			@media(max-width: 600px){
				.modal-div {
					margin: 26px 0px;
					min-width: 300px;
				}
				.vid-item {
					margin: 26px 0px;
					min-width: 300px;
				}
			}

			.ldp-modal{
				position: fixed;
				z-index: 99999999;
				top:0px; right: 0px; left: 0px; bottom: 0px;
				overflow: auto;
				padding:50px 10px;
				background-color: rgba(0,0,0,0.65);
				display: none;
				box-shadow: 0px 0px 15px rgba(0,0,0,0.85);
				max-height: 100%;
			}

			.ldp-modal-content{
				position: relative;
				z-index: 1;
				background-color: #fff;
				margin: auto;
			}

			.ldp-modal-close{
				position: fixed;
				right:0px; top:0px;
				z-index: 99999999999;
			}
			.links-div{
				padding: 8px;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
			.links-span{
				float: right;
				font-size: 28px;
				font-weight: bold;
				flex-grow: 1;
				cursor: pointer;
			}
			.links-a{
				flex-grow: 11;
			}
			.links-span:hover,
			.links-span:focus {
				color: #810029;
				text-decoration: none;
				cursor: pointer;
			}
			paper-button.custom {
				--paper-button-ink-color: var(--paper-pink-a200);
				--paper-button-flat-keyboard-focus: {
					background-color: var(--paper-pink-a200);
					color: white !important;
				};
				--paper-button-raised-keyboard-focus: {
					background-color: var(--paper-pink-a200) !important;
					color: white !important;
				};
			}
			paper-button.custom:hover {
				background-color: var(--paper-indigo-100);
			}
			paper-button.indigo {
				background-color: var(--paper-indigo-500);
				color: white;
				--paper-button-raised-keyboard-focus: {
					background-color: var(--paper-pink-a200) !important;
					color: white !important;
				};
			}

			edit-post{
				position: absolute;
				top:2px; right: 2px;
				z-index: 12;
				background-color: inherit;
				padding:3px;
				opacity: 0.4;
			}

			edit-post:hover{
				opacity: 1;
			}
				
			.followBTN{
				position: absolute;
				right: 40px;
				top: -14px;
				background-color: #fff;
				border: 1px solid #810029;
				color: #810029;
				padding: 4px 6px;
				font-size: 8pt !important;
				border-radius: 17px;
				font-weight: 500;
			}

			.followBTN.following{
				background-color: #1298f1;
				color: #fff;
				padding:4px 10px;
				border-color: #1298f1;
			}
			
			.loader {
				border: 4px solid #f3f3f3;
				border-radius: 50%;
				border-top: 5px solid #3498db;
				width: 14px;
				height: 14px;
				-webkit-animation: spin 1s linear infinite; /* Safari */
				animation: spin 1s linear infinite;
			}
			
			delete-pldp{
				position: absolute;
				top:-15px;
				right:-15px;
				/* z-index: 999; */
			}

			/* Safari */
			@-webkit-keyframes spin {
				0% { -webkit-transform: rotate(0deg); }
				100% { -webkit-transform: rotate(360deg); }
			}

			@keyframes spin {
				0% { transform: rotate(0deg); }
				100% { transform: rotate(360deg); }
			}
			.padding-modal-top{padding-top: 10px!important;}
			.app-btn-background{background-color: var(--app-primary-color); color: #fff;}
			.app-primary-text-color{color: var(--app-primary-color);}
			.upload-options{width: 100%; text-align: center; padding: 0;margin: 0; border: 2px solid #ccc;}
			.new-thought-avatar {width: 100%; height: 260px; min-width: 80px; border-radius: 0px; box-sizing: border-box; background-color: #DDD;}
			/* input[type="file"] {display: none;} */
			input[type="file"] {
				display: block!important;
				width: 100%!important;
				height: 36px!important;
				opacity: 0!important;
				overflow: hidden!important;
				margin-top: -36px;
				cursor: pointer!important;
				z-index: 999999!important;
			}
			.max-modal-width {max-width: 600px!important;}
			.max-modal-height {max-height: 100vh;}
			/* ============ Snack Bar ======================== */
			#snackbar {visibility: hidden;min-width: 250px;margin-left: -120px;background-color: var(--paper-green-400);color: #fff;text-align: center;border-radius: 2px;padding: 10px;position: fixed;
			z-index: 99999999999;left: 40%;bottom: 30px;font-size: 14px;white-space: pre-wrap;}
			#snackbar.show {visibility: visible;-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;animation: fadein 0.5s, fadeout 0.5s 2.5s;}
			@-webkit-keyframes fadein {from {bottom: 0; opacity: 0;} to {bottom: 30px; opacity: 1;}
			}
			@keyframes fadein {from {bottom: 0; opacity: 0;}to {bottom: 30px; opacity: 1;}
			}
			@-webkit-keyframes fadeout {from {bottom: 30px; opacity: 1;} to {bottom: 0; opacity: 0;}
			}
			@keyframes fadeout {from {bottom: 30px; opacity: 1;}to {bottom: 0; opacity: 0;}
			}
			.article-author{font-size: 12px;margin-bottom: 4px;padding: 2px;line-height: 16px;color: rgb(114, 76, 204);padding: 2px 8px;}
			.article-title{margin-bottom: 8px;margin-top: 10px;color: #000;line-height: 23px;font-size: 16px;
			font-weight: 500;padding: 8px;}
			.article{background-color: #fff;padding: 20px;}
			.read-article-title{margin-bottom: 14px;margin-top: 10px;color: #000;line-height: 23px;font-size: 20px;
			font-weight: 600;}
			.read-article-author{font-size: 16px;margin-bottom: 14px;padding: 2px;line-height: 16px;color: #000;
			font-weight: 600;}
			.read-article-photo {background-position: center;background-size: cover;background-repeat: no-repeat;
			background-attachment: scroll;height: 300px;}
			.read-article-body{font-family: sans-serif;white-space: pre-wrap;}
			.header-det{flex-grow: 9; display: flex; }
			.spinner{width: 90%; height: 100vh; display: flex; flex-direction: column; position: absolute; align-items: center; justify-content: center;}
			.card-date{top: 0px;position: absolute;width: 100%; text-align: left; font-size: 10pt;}
			
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* shared styles for all views */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
;

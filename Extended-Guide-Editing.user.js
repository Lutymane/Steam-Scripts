// ==UserScript==
// @name         Extended Guide Editing
// @version      2.1
// @description  It allows you to save guide subsections with empty titles and 'unlimited' body text length.
// @author       Lite_OnE
// @match        *steamcommunity.com/sharedfiles/editguidesubsection/*
// @grant        unsafeWindow
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

var location = $(location).attr('href').replace('#', '');

$('.btn_green_white_innerfade.btn_small_thin').attr('href', "javascript:ValidateEditExtended();");
$('#description').attr('maxlength', '1000000000');

unsafeWindow.ValidateEditExtended = function () {
    g_contentChanged = false;
    $.post('//steamcommunity.com/sharedfiles/setguidesubsection', {
        id : location.split("?")[1].split("&")[0].split("=")[1],
	sectionid : location.split("?")[1].split("&")[1].split("=")[1],
	sessionid : g_sessionID,
	title : title.value,
	description : description.value});
};


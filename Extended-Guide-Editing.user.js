// ==UserScript==
// @name         Advanced guide editing
// @namespace    http://steamcommunity.com/
// @version      2.1
// @description  It allows you to save guide subsections with empty titles and body length up to one million characters.
// @author       Lite_OnE
// @match        *steamcommunity.com/sharedfiles/editguidesubsection/*
// @grant        unsafeWindow
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

var url = $(location).attr('href').replace('#', '');

$('.btn_green_white_innerfade.btn_small_thin').attr('href', "javascript:ValidateEditAdvanced();");
$('#description').attr('maxlength', '1000000000');

unsafeWindow.ValidateEditAdvanced = function () {
    g_contentChanged = false;
    $.post('//steamcommunity.com/sharedfiles/setguidesubsection', {
        id : url.split("?")[1].split("&")[0].split("=")[1],
	sectionid : url.split("?")[1].split("&")[1].split("=")[1],
	sessionid : g_sessionID,
	title : title.value,
	description : description.value});
};


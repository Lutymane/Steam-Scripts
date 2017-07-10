// ==UserScript==
// @name         Extended guide editing
// @namespace    http://steamcommunity.com/
// @version      1.1
// @description  Empty section title + up to 1 million characters in one section
// @author       Lite_OnE
// @match        *://steamcommunity.com/sharedfiles/editguidesubsection/*
// @grant        unsafeWindow
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

var url = $(location).attr('href').replace('#', '');
var protocol;

if (url.split(':')[0]=='https')
{
    protocol = "https";
}
else
{
    protocol = "http";
}

$(".btn_green_white_innerfade.btn_small_thin").attr("href", "javascript:ValidateEditExt();");

unsafeWindow.ValidateEditExt = function () {
    $.post(protocol + "://steamcommunity.com/sharedfiles/setguidesubsection", {
        id : url.split("?")[1].split("&")[0].split("=")[1],
	sectionid : url.split("?")[1].split("&")[1].split("=")[1],
	sessionid : g_sessionID,
	title : title.value,
	description : description.value});
    ShowAlertDialog( '', 'Done! Now you can reload the page!');
};

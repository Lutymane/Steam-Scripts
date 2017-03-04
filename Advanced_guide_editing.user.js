// ==UserScript==
// @name         Advanced guide editing
// @namespace    http://steamcommunity.com/
// @version      1.0
// @description  try to take over the world!
// @author       Lite_OnE
// @match        *://steamcommunity.com/sharedfiles/editguidesubsection/*
// @grant        unsafeWindow
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

var url = $(location).attr('href').replace('#', '');

if ($(location).attr('href').split(':')[0]=='https'){
    $(location).attr('href', 'http:'+$J(location).attr('href').split(':')[1]); //redirect to http protocol
}

$(".btn_green_white_innerfade.btn_small_thin").attr("href", "javascript:ValidateEditAdv();");

unsafeWindow.ValidateEditAdv = function () {
    $.post("http://steamcommunity.com/sharedfiles/setguidesubsection", {
        id : url.split("?")[1].split("&")[0].split("=")[1],
		sectionid : url.split("?")[1].split("&")[1].split("=")[1],
		sessionid : g_sessionID,
		title : title.value,
		description : description.value});
    alert ('Done! Now you can reload the page!');
};

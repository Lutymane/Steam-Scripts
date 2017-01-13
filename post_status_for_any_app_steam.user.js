// ==UserScript==
// @name         Extended Choosing of AppIDs for statuses in Steam activity feed 
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  This script allows you posting statuses about apps using their IDs
// @author       Lite_OnE
// @match        http://steamcommunity.com/*/*/home/
// @grant        unsafeWindow
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==




unsafeWindow.PostStatus = function () {
    $.post($J('.blotter_avatar_holder').find('a:first').attr('href') + "/ajaxpostuserstatus/", { sessionid: g_sessionID, status_text: $('#blotter_statuspost_textarea').val(), appid: $('#Status_AppID').val()});
    alert('Posted!');
    location.reload();
};

jQuery(document).ready(function() {
    var emoticon_container = $(".emoticon_container").html();
    $(".blotter_status_submit_ctn").replaceWith( '<div id="container" style="width:100%;"><div class="profile_options_divider"></div><div style="float: right;" onclick="javascript:PostStatus();" class="btn_darkblue_white_innerfade btn_small"><span>Post status</span></div><span class="emoticon_container">'+ emoticon_container + '</span><input type="text" id="Status_AppID" placeholder="Input AppID" style="width: 75%; font-style: italic; text-align: center;"></div>');
    $(".emoticon_container:first").css({"float": "right", "width":"7%"});
});

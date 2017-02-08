// ==UserScript==
// @name         Animated Avatar
// @namespace    http://steamcommunity.com/
// @version      2.2.0
// @description  Allows you to make your avatar animated using standart game avatars in Steam
// @author       Lite_OnE
// @match        *://steamcommunity.com/id/*
// @grant        unsafeWindow
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

var p=1500,   //!Dont modify this value or you will get banned!
    stop_flag=0,
    data_1 = '<a class="btn_profile_action btn_medium" id="disable_av"><span style="color: #E34234; display:none;">Disable Animated Avatar</span></a><a class="btn_profile_action btn_medium" id="enable_av" onclick="switch_preset_menu()"><span style="color: #01B1AF; display: block">Enable Animated Avatar</span></a>',
    data_2 = '<div class="popup_block_new"><div class="popup_body popup_menu" id="avatar_presets" style="display: none; position: static; z-index: 1000; width: 185px;"><a class="popup_menu_item  btn_profile_action" id="preset1" style="text-align: center">Preset 1</a><a class="popup_menu_item  btn_profile_action" id="preset2" style="text-align: center">Preset 2</a><a class="popup_menu_item  btn_profile_action" id="preset3" style="text-align: center">Preset 3</a><a class="popup_menu_item  btn_profile_action" id="preset4" style="text-align: center">Preset 4</a><a class="popup_menu_item  btn_profile_action" id="preset5" style="text-align: center">Preset 5</a></div></div>';



function preset1(){
    if (stop_flag===0){
        setTimeout(function (){$.post('http://steamcommunity.com/games/471220/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 0});}, p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/471220/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 1});}, 2*p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/471220/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 2});}, 3*p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/471220/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 3});}, 4*p);
        setTimeout(function (){preset1();}, 4*p);
    }
}

function preset2(){
    if (stop_flag===0){
        setTimeout(function (){$.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 0});}, p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 1});}, 2*p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 2});}, 3*p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 3});}, 4*p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 4});}, 5*p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 5});}, 6*p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 6});}, 7*p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/269570/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 7});}, 8*p);
        setTimeout(function (){preset2();}, 4*p);
    }
}

function preset3(){
    if (stop_flag===0){
        setTimeout(function (){$.post('http://steamcommunity.com/games/526800/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 0});}, p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/526800/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 1});}, 2*p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/526800/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 2});}, 3*p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/526800/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 3});}, 4*p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/526800/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 4});}, 5*p);
        setTimeout(function (){preset3();}, 4*p);
    }
}

unsafeWindow.switch_preset_menu = function (){
    if($('#avatar_presets').css("display")=="block"){
        $('#avatar_presets').css({"display":"none"});
    }else{
        $('#avatar_presets').css({"display":"block"});
    }
    if($('#enable_av').find('span').text()=='Enable Animated Avatar'){
        $('#enable_av').find('span').text('Choose Animated Preset');
    }else{
        $('#enable_av').find('span').text('Enable Animated Avatar');
    }
};

$(document).ready(function(){
    $('.profile_header_actions').append(data_1);
    $('#enable_av').append(data_2);
    $('[id*="preset"]').click(function() {$('#enable_av').find('span').css({"display":"none"});$('#disable_av').find('span').css({"display":"block"});stop_flag=0;ShowAlertDialog ('Info','Animated avatar is enabled!');});
    $( "#preset1" ).click(function() {preset1();});
    $( "#preset2" ).click(function() {preset2();});
    $( "#preset3" ).click(function() {preset3();});
    $( "#preset4" ).click(function() {preset4();});
    $( "#preset5" ).click(function() {preset5();});
    $('#disable_av').click(function() {
        stop_flag=1;
        ShowAlertDialog ('Info','Animated avatar is disabled!');
        $('#enable_av').find('span').css({"display":"block"});
        $('#disable_av').find('span').css({"display":"none"});
        $('#enable_av').find('span').text('Enable Animated Avatar');
    });
});

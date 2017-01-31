// ==UserScript==
// @name         Animated Avatar
// @namespace    http://tampermonkey.net/
// @version      1.3.3.7
// @description  Delite is nubas
// @author       Lite_OnE
// @match        *://steamcommunity.com/id/*/
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

var i=0,
    j=100,    //number of iterations
    p=1500,   //pause for a()
    p2=1000;  //pause for b()

function a(i){
    if (i<j){
        setTimeout(function (){$.post('http://steamcommunity.com/games/471220/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 0});}, p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/471220/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 1});}, 2*p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/471220/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 2});}, 3*p);
        setTimeout(function (){$.post('http://steamcommunity.com/games/471220/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 3});}, 4*p);
        setTimeout(function (){a(i++);}, 5*p);
    }
    return;
}

function b(i){
    if (i<j){
        setTimeout(function (){$.post('http://steamcommunity.com/games/257510/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 4});}, p2);
        setTimeout(function (){$.post('http://steamcommunity.com/games/401710/selectAvatar', { sessionid: g_sessionID, selectedAvatar: 8});}, 2*p2);
        setTimeout(function (){b(i++);}, 3*p2);
    }
    return;
}

$(document).ready(function(){b(i);});  //or a() or nubas() whatever

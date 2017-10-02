// ==UserScript==
// @name         Game Inventories Count
// @namespace    #ShortScripts
// @version      1.2
// @description  It shows how many game inventories you have
// @author       Lite_OnE
// @match        *://steamcommunity.com/*/*/inventory/*
// @grant        none
// ==/UserScript==

var Count = $J('[id*=inventory_link_]').length;
$J('.inventory_links').after('<div class="fraud_warning"><div class="fraud_warning_box"><span>Game Inventories Count: ' + Count + '</span></div></div>');

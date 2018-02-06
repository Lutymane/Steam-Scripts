// ==UserScript==
// @name         Game Inventories Count
// @icon         https://store.steampowered.com/favicon.ico
// @namespace    top_xex
// @version      1.6
// @description  It shows how many game inventories user has
// @author       Lite_OnE
// @match        *://steamcommunity.com/*/*/inventory*
// @grant        none
// ==/UserScript==

$J(document).ready(function(){
    var Inventories = $J('[id*=inventory_link_]');
    var Count = Inventories.length;
    $J('.games_list_tabs_ctn.responsive_hidden').before('<div class="fraud_warning"><div class="fraud_warning_box"><span>Game Inventories Count: ' + Count + '</span></div></div>');

    setTimeout(function(){
        Inventories.each(function(){
            $J(this).attr('style', 'display:block;');
        });
    }, 500);
});

// ==UserScript==
// @name         Game Inventories Count
// @icon         https://store.steampowered.com/favicon.ico
// @namespace    top_xex
// @version      1.7
// @description  It shows how many game inventories user has
// @author       Lite_OnE
// @match        *://steamcommunity.com/*/*/inventory*
// @match        *://steamcommunity.com/groups/InventoryService
// @grant        none
// ==/UserScript==

var Inventories = null;
var Count       = 0;

$J(document).ready(function(){
    if(location.href.includes('InventoryService'))
    {
        Count = $J('.group_associated_game_icon').length;
        $J('.rightbox_content_header').contents()[0].textContent += ' COUNT: ' + Count;
    }
    else
    {
        Inventories = $J('[id*=inventory_link_]');
        Count = Inventories.length;
        $J('.games_list_tabs_ctn.responsive_hidden').before('<div class="fraud_warning"><div class="fraud_warning_box"><span>Game Inventories Count: ' + Count + '</span></div></div>');

        setTimeout(function(){
        Inventories.each(function(){
            $J(this).attr('style', 'display:block;');
        });
        }, 500);
    }
});

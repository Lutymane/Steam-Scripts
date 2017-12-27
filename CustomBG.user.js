// ==UserScript==
// @name         Custom bg
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Lite_OnE
// @match        http://steamcommunity.com/id/lite_one/
// @grant        none
// ==/UserScript==

var img = ["x"];
var i = 0;

$J('.no_header.profile_page.has_profile_background').attr("style", "background-image: url( " + img[i] + " );");
$J('.profile_background_image_content').attr("style", "background-image: url( " + img[i] + " );");
//$J('.profile_customization_area').remove();

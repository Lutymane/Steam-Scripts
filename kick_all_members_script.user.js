// ==UserScript==
// @name         Kick all members
// @version      2.0
// @description  Kick all members from your steam group. Script starts kicking instantly after opening a page!
// @author       Lite_OnE
// @match        http://steamcommunity.com/*/*/membersManage
// @grant        none
// ==/UserScript==

$J(window).load(function() {

    var id = $J( ".rank_icon:eq(0)" ).children("img:first").attr("onclick").split("'", 2);
    if (id!==null){var kick = document.forms.kick_form;
    document.forms.kick_form.memberId.value=id[1];
    kick.submit();}
});

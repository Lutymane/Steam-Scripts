// ==UserScript==
// @name         Badge Autocraft 2
// @namespace    *steamcommunity.com/
// @version      2.2.0
// @description  Thanks to Psy0ch and MrSteakPotato for testing! Inspired by 10101000's Steam-AutoCraft. Allows you to craft remaining badges in one click.
// @author       Lite_OnE
// @match        http*://steamcommunity.com/*/*/badges*
// @supportURL   https://github.com/LiteOnE/Steam-Scripts/issues
// @updateURL    https://github.com/LiteOnE/Steam-Scripts/raw/master/BadgeAutocraft2.user.js
// @downloadURL  https://github.com/LiteOnE/Steam-Scripts/raw/master/BadgeAutocraft2.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @require      https://git.degree.by/degree/userscripts/raw/master/src/gm-super-value.user.js
// ==/UserScript==

var NumberOfBadgesToCraftOnPage,
    dataButtons = '<div class="btn_grey_black btn_small_thin" id="ToggleAutocraft"><span>Toggle Autocraft</span></div><div class="btn_grey_black btn_small_thin" id="Settings"><span>&#9881;</span></div>',
    ModalBlockData = '<div id="ModalBlock" style="display:none;"><div class="newmodal_background" style="opacity: 0.8; display: block;"></div><div class="newmodal" style="position: fixed; z-index: 1000; max-width: 600px; left: 701px; top: 261px;"><div class="newmodal_header_border"><div class="newmodal_header"><div class="newmodal_close"></div><div class="ellipsis">Settings</div></div></div><div class="newmodal_content_border"><div class="newmodal_content" style="max-height: 562px;"><div><div><input type="text" id="BlackList" style="font-style: italic; margin: 5px;">AppIDs to skip crafting of these badges (appid1, appid2, ...)</div><div style="text-align:left"><input style="font-style: italic; margin: 5px;" id="TimeOut" type="text">Timeout between crafting in milliseconds</div><div><input type="checkbox" id="IgnoreFoilBadges" style="margin: 5px;">Check this if you want to ignore foil badges while crafting</div></div><div class="newmodal_buttons"><div class="btn_grey_white_innerfade btn_medium" id="ApplySettings"><span>Apply</span></div><div class="btn_grey_white_innerfade btn_medium" id="ResetSettings"><span>Reset</span></div></div></div></div></div></div>',
    BlackListAppIDs = [],
    TimeOutValue = 1500,
    ModalInfo = null,
    BadgeNumber,
    BadgesCrafted = 0,
    BadgesSkipped = 0,
    CurrentAppID,
    border,
    IgnoreFoils;

function ApplySettings(){
    BlackListAppIDs = $('#BlackList').val().replace(/ /g,'').split(',');
    if ($.isNumeric($('#TimeOut').val()) || $('#TimeOut').val() === "")
    {
        if ($('#TimeOut').val() !== "" && parseInt($('#TimeOut').val())>1499)
        {
            TimeOutValue = parseInt($('#TimeOut').val());
        }
        else if (parseInt($('#TimeOut').val())<1500)
        {
            alert ('Timeout can not be less than 1500!'); //Actually it can be .-. But it's a ... it's a secret
            return;
        }
    }
    else
    {
        alert ('Invalid timeout!');
        return;
    }
    
    if($('#IgnoreFoilBadges').is(':checked')){
        GM_SuperValue.set ('IgnoreFoils', "true");
        IgnoreFoils = true;
    }
    else{
        GM_SuperValue.set ('IgnoreFoils', "false");
        IgnoreFoils = false;
    }
    
    GM_SuperValue.set ('BlackListedAppIDs', BlackListAppIDs);
    GM_SuperValue.set ('TimeOut', TimeOutValue);
    $('#ModalBlock').css('display', 'none');
}

function ResetSettings(){
    GM_deleteValue('BlackListedAppIDs');
    GM_deleteValue('TimeOut');
    GM_deleteValue('IgnoreFoils');
    $('#BlackList').val(GM_SuperValue.get('BlackListedAppIDs'));
    $('#TimeOut').val(GM_SuperValue.get('TimeOut'));
    TimeOutValue = 1500; //As I said you can cheat it, tssss... but keep in mind that minimum timeout, that servers can process is 1000 ms
    IgnoreFoils = false;
    $('#IgnoreFoilBadges').prop('checked', false);
}

function SettingsModal(){
    $('#ModalBlock').css('display', 'block');
    $('#BlackList').val(GM_SuperValue.get('BlackListedAppIDs'));
    $('#TimeOut').val(GM_SuperValue.get('TimeOut'));
}

function IsInBlackList(id){
    for (j=0; j<BlackListAppIDs.length; j++)
    {
        if (id == BlackListAppIDs[j]){return true;}
    }
    return false;
}

function ToggleAutocraft(i){
    
    if (NumberOfBadgesToCraftOnPage == 0)
    {
        GM_SuperValue.set ('PageFlag', 2);
        GM_SuperValue.set ('BlackListed', -1);
        ShowAlertDialog("Info","There are no badges to craft!");
        return;
    }
    
    CurrentAppID = $('.badge_craft_button').eq(i).attr('href').split('/')[6].split('?')[0];
    
    if ($('.badge_craft_button').eq(i).attr('href').includes("?border=1")) border = 1; else border = 0;
    
    if (IsInBlackList(CurrentAppID) || (border == 1 && IgnoreFoils == true))
    {
        BadgesSkipped++;
    }
    else{
        $.post( $(location).attr('href').replace("/badges", '')+'/ajaxcraftbadge/', {
        appid: CurrentAppID,
        series: 1,
        border_color: border,
        sessionid: g_sessionID
        });
        
        BadgesCrafted++;
    }
    
    BadgeNumber = i+1;
    ModalInfo = ShowBlockingWaitDialog("Crafting on current page...", "Badge " + BadgeNumber + "/" + NumberOfBadgesToCraftOnPage + " is being processed! Crafted: " + BadgesCrafted + " Skipped: " + BadgesSkipped);
    
    if (BadgeNumber<NumberOfBadgesToCraftOnPage)
    {
        setTimeout(function (){
            ModalInfo.Dismiss();
            i++;
            ToggleAutocraft(i);
        }, TimeOutValue);

    }
    else
    {
        ModalInfo.Dismiss();
        GM_SuperValue.set ('PageFlag', 1);
        
        if(BadgesSkipped == 0)
        {
            GM_SuperValue.set ('BlackListed', -1);
        }
        else
        {
            GM_SuperValue.set ('BlackListed', BadgesSkipped);
        }
        location.reload();
    }
    
}

function Exit()
{
    GM_SuperValue.set ('PageFlag', 2);
    GM_SuperValue.set ('BlackListed', -1);
    ShowAlertDialog ('Info','Crafting is done!');
}

$(document).ready(function(){
    $('.badge_details_set_favorite').append(dataButtons);
    $('.responsive_page_frame.with_header').after(ModalBlockData);
    
    $('#ToggleAutocraft').click(function(){ToggleAutocraft(0);});
    $('#Settings').click(function(){SettingsModal();});
    $('#ApplySettings').click(function(){ApplySettings();});
    $('#ResetSettings').click(function(){ResetSettings();});
    $('.newmodal_close').click(function(){$('#ModalBlock').css('display', 'none');});
    
    if (GM_SuperValue.get('BlackListedAppIDs') != null)
    {
        BlackListAppIDs = GM_SuperValue.get('BlackListedAppIDs');
    }
    if ($.isNumeric(GM_SuperValue.get('TimeOut')))
    {
        TimeOutValue = GM_SuperValue.get('TimeOut');
    }
    
    if(GM_SuperValue.get('IgnoreFoils') != null){
        if(GM_SuperValue.get('IgnoreFoils') == "true"){$('#IgnoreFoilBadges').prop('checked', true); IgnoreFoils = true;}
        else{$('#IgnoreFoilBadges').prop('checked', false); IgnoreFoils = false;}
    }
    else{
        GM_SuperValue.set ('IgnoreFoils', "false");
        IgnoreFoils = false;
    }
    
    NumberOfBadgesToCraftOnPage = $('.badge_craft_button').length;
    
    if (GM_SuperValue.get('PageFlag') == 1)
    {
        if ((NumberOfBadgesToCraftOnPage > 0) && (NumberOfBadgesToCraftOnPage > GM_SuperValue.get('BlackListed')))
        {
            ToggleAutocraft(0);
        }
        else
        {
            Exit();
        }
    }
});

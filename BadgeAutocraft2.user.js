// ==UserScript==
// @name         Badge Autocraft 2
// @namespace    *steamcommunity.com/
// @version      2.4.1
// @description  Thanks to Psy0ch and MrSteakPotato for testing! Inspired by 10101000's Steam-AutoCraft. Allows you to craft remaining badges in one click. Works much more faster, takes much less resources.
// @author       Lite_OnE
// @match        *://steamcommunity.com/*/*/badges/
// @match        *://steamcommunity.com/*/*/badges/?p=*
// @supportURL   https://github.com/LiteOnE/Steam-Scripts/issues
// @updateURL    https://github.com/LiteOnE/Steam-Scripts/raw/master/BadgeAutocraft2.user.js
// @downloadURL  https://github.com/LiteOnE/Steam-Scripts/raw/master/BadgeAutocraft2.user.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

var NumberOfBadgesToCraftOnPage = 0,
    DataButtons                 = '<div class="btn_grey_black btn_small_thin" id="ToggleAutocraft"><span>Toggle Autocraft</span></div><div class="btn_grey_black btn_small_thin" id="Settings"><span>&#9881;</span></div>',
    ModalBlockData              = '<div id="ModalBlock" style="display: none;"><div class="newmodal_background" style="opacity: 0.8; display: block;"></div><div class="newmodal" style="position: fixed; z-index: 1000; max-width: 600px; left: 701px; top: 261px;"><div class="newmodal_header_border"><div class="newmodal_header"><div class="newmodal_close"></div><div class="ellipsis">Settings</div></div></div><div class="newmodal_content_border"><div class="newmodal_content" style="max-height: 562px;"><div><div><input type="text" id="BlackList" style="font-style: italic; margin: 5px;">AppIDs to skip crafting of these badges (appid1, appid2, ...)</div><div><input type="checkbox" id="IgnoreFoilBadges" style="margin: 5px;">Check this if you want to ignore foil badges while crafting</div></div><div class="newmodal_buttons"><div class="btn_grey_white_innerfade btn_medium" id="ApplySettings"><span>Apply</span></div><div class="btn_grey_white_innerfade btn_medium" id="ResetSettings"><span>Reset</span></div></div></div></div></div></div>',
    BlackListAppIDs             = [],
    TimeOutValue                = 1500,
    ModalInfo                   = null,
    BadgeNumber                 = 0,
    LevelsCrafted               = 0,
    BadgesSkipped               = 0,
    CurrentAppID                = 0,
    Border                      = 0,
    IgnoreFoils                 = false,
    TemporaryTimeOut            = 0,
    PageNumber                  = 1,
    PostURL                     = '';

function CleanArray(Source)
{
    var CleanedArray = [];
    for (var i = 0; i < Source.length; i++)
    {
        if (Source[i])
        {
            CleanedArray.push(Source[i]);
        }
    }
    return CleanedArray;
}

function ApplySettings()
{
    BlackListAppIDs = CleanArray($('#BlackList').val().replace(/\s+/g,'').split(','));

    if($('#IgnoreFoilBadges').prop('checked')){
        window.localStorage.setItem('IgnoreFoils', 'true');
        IgnoreFoils = true;
    }
    else
    {
        window.localStorage.setItem('IgnoreFoils', 'false');
        IgnoreFoils = false;
    }

    window.localStorage.setItem('BlackList', BlackListAppIDs);

    $('#ModalBlock').css('display', 'none');
}

function ResetSettings()
{
    window.localStorage.setItem('BlackList', '');
    window.localStorage.setItem('IgnoreFoils', 'false');

    BlackListAppIDs = [];
    $('#BlackList').val('');

    IgnoreFoils = false;
    $('#IgnoreFoilBadges').prop('checked', false);
}

function SettingsModal()
{
    $('#ModalBlock').css('display', 'block');

    $('#BlackList').val(window.localStorage.getItem('BlackList'));

    if(window.localStorage.getItem('IgnoreFoils') == 'true')
    {
        $('#IgnoreFoilBadges').prop('checked', true);
    }
    else
    {
        $('#IgnoreFoilBadges').prop('checked', false);
    }
}

function IsInBlackList(id)
{

    for (var i = 0; i < BlackListAppIDs.length; i++)
    {
        if (id == BlackListAppIDs[i]){return true;}
    }

    return false;
}

function ToggleAutocraft(i)
{

    if (NumberOfBadgesToCraftOnPage == 0)
    {
        window.localStorage.setItem('PageFlag', '0');
        window.localStorage.setItem('Skipped', '0');
        ShowAlertDialog("Info","There are no badges to craft!");
        return;
    }

    BadgeNumber = i + 1;
    ModalInfo = ShowBlockingWaitDialog("Crafting on a current page...", "Badge " + BadgeNumber + "/" + NumberOfBadgesToCraftOnPage + " is being processed! XP earned: " + LevelsCrafted*100 + " Badges skipped: " + BadgesSkipped);

    CurrentAppID = $('.badge_craft_button').eq(i).attr('href').split('/')[6].split('?')[0];

    if ($('.badge_craft_button').eq(i).attr('href').includes("?border=1")) Border = 1; else Border = 0;

    if (IsInBlackList(CurrentAppID) || (Border == 1 && IgnoreFoils == true))
    {
        BadgesSkipped++;

        TemporaryTimeOut = 0;

        if (BadgeNumber < NumberOfBadgesToCraftOnPage)
        {
            setTimeout(function (){
                ModalInfo.Dismiss();
                i++;
                ToggleAutocraft(i);
            }, TemporaryTimeOut);

        }
        else
        {
            ModalInfo.Dismiss();

            window.localStorage.setItem('PageFlag', '1');
            window.localStorage.setItem('Skipped', BadgesSkipped);

            window.location.reload();
        }
    }
    else
    {

        $.post( PostURL, {
            appid: CurrentAppID,
            series: 1,
            border_color: Border,
            sessionid: g_sessionID
        }).done(function(data){

            console.log('AppID: ' + CurrentAppID + ' | XP: ' + data.Badge.xp);

            LevelsCrafted++;

            TemporaryTimeOut = TimeOutValue;

            if((data.success == 1) && (Border != 1) && (data.Badge.xp != "500"))
            {
                setTimeout(function (){
                    ModalInfo.Dismiss();
                    ToggleAutocraft(i);
                }, TemporaryTimeOut);
            }
            else
            {
                setTimeout(function (){
                    ModalInfo.Dismiss();
                    i++;
                    ToggleAutocraft(i);
                }, TemporaryTimeOut);
            }
        }).fail(function(data){
            try
            {
                switch(data.responseJSON.success)
                {
                    case 42:
                        console.log('AppID: ' + CurrentAppID + " | You don't own all cards to craft a badge!");
                        break;
                    case 11:
                        console.log('AppID: ' + CurrentAppID + " | Badge's maximum level has been reached!");
                        break;
                    default:
                        console.log('AppID: ' + CurrentAppID + " | Unknown error code: " + data.responseJSON.success);
                }
            }
            catch(e)
            {
                console.log(data);
                console.log(e);
            }

            TemporaryTimeOut = TimeOutValue;

            if (BadgeNumber < NumberOfBadgesToCraftOnPage)
            {
                setTimeout(function (){
                    ModalInfo.Dismiss();
                    i++;
                    ToggleAutocraft(i);
                }, TemporaryTimeOut);

            }
            else
            {
                ModalInfo.Dismiss();

                window.localStorage.setItem('PageFlag', '1');
                window.localStorage.setItem('Skipped', BadgesSkipped);

                window.location.reload();
            }
        });
    }
}

$(document).ready(function(){

    PostURL = window.location.href.split('?')[0].replace("badges", 'ajaxcraftbadge');

    $('.badge_details_set_favorite').append(DataButtons);
    $('.responsive_page_frame.with_header').after(ModalBlockData);

    $('#ToggleAutocraft').click(function(){ToggleAutocraft(0);});
    $('#Settings').click(function(){SettingsModal();});
    $('#ApplySettings').click(function(){ApplySettings();});
    $('#ResetSettings').click(function(){ResetSettings();});
    $('.newmodal_close').click(function(){$('#ModalBlock').css('display', 'none');});

    NumberOfBadgesToCraftOnPage = $('.badge_craft_button').length;

    if(window.localStorage.getItem('BlackList') == null || window.localStorage.getItem('IgnoreFoils') == null)
    {
        alert("Badge Autocraft script can't read settings values! It may occur because of script got updated. Please set up script's settings again, since they are cleared now");
        return;
    }

    console.log('Settings are being read...');

    if(window.localStorage.getItem('BlackList') != '')
    {
        BlackListAppIDs = window.localStorage.getItem('BlackList').split(',');
    }

    if(window.localStorage.getItem('IgnoreFoils') == 'true')
    {
        IgnoreFoils = true;
    }

    if (window.localStorage.getItem('PageFlag') == '1')
    {
        if (NumberOfBadgesToCraftOnPage > window.localStorage.getItem('Skipped'))
        {
            ToggleAutocraft(0);
        }
        else
        {
            if (window.localStorage.getItem('Skipped') == '150')
            {
                window.localStorage.setItem('Skipped', '0');

                if(window.location.href.split('?')[1] == null)
                {
                    window.location = window.location.href.split('?')[0] + "?p=2";
                }
                else
                {
                    PageNumber+= parseInt(window.location.href.split('?')[1].split('&')[0].split('=')[1]);
                    window.location = window.location.href.split('?')[0] + "?p=" + PageNumber;
                }
            }
            else
            {
                window.localStorage.setItem('PageFlag', '0');
                window.localStorage.setItem('Skipped', '0');

                ShowAlertDialog ('Info','Crafting is done!');
            }
        }
    }
});

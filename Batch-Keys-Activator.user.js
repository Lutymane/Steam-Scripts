// ==UserScript==
// @name         Batch Keys Activator
// @icon         https://store.steampowered.com/favicon.ico
// @namespace    top_xex
// @version      2.1.0
// @description  Activate a bunch of keys at once. Many thanks to Delite for helping with some css stuff, motivation and testing
// @author       Lite_OnE
// @match        https://store.steampowered.com/account/registerkey*
// @match        https://www.indiegala.com/profile?user_id=*
// @match        https://www.gogobundle.com/latest/bundles/order/show/cid-*
// @match        https://www.gogobundle.com/account/order/show/cid-*
// @match        https://otakubundle.com/latest/bundles/order/show/cid-*
// @match        https://otakubundle.com/account/order/show/cid-*
// @match        https://www.fanatical.com/*/orders/*
// @match        https://www.humblebundle.com/downloads?key=*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==
var Keys                  = [];
var AlreadyOwnedGame_Keys = [];
var Unprocessed_Keys      = [];
var OtherFailed_Keys      = [];
var bLimitExceeded        = false;
var KeysAmount            = 0;
var KeysTextarea          = null;
var LogDisplay            = null;
//Collect Keys from bundle sites here
var KeysData              = [];
//Fancy Console
var ConsoleCSS            = 'color:#FFE4E1; font-size: 15px; font-family: raleway; background-color: #F14D39';

function RegisterFailure(ePurchaseResult, receipt, key)
{
    var sErrorMessage = '';

    switch (ePurchaseResult)
    {
        case 14:
            sErrorMessage = 'The product code you\'ve entered is not valid. Please double check to see if you\'ve mistyped your key. I, L, and 1 can look alike, as can V and Y, and 0 and O.';
            break;

        case 15:
            sErrorMessage = 'The product code you\'ve entered has already been activated by a different Steam account. This code cannot be used again. Please contact the retailer or online seller where the code was purchased for assistance.';
            break;

        case 16:
            sErrorMessage = 'Batched request timeout';
            break;

        case 53:
            sErrorMessage = 'There have been too many recent activation attempts from this account or Internet address. Please wait and try your product code again later.';
            break;

        case 13:
            sErrorMessage = 'Sorry, but %1$s is not available for purchase in this country. Your product key has not been redeemed.'.replace(/\%1\$s/, GetGameNameForFailure(receipt));
            break;

        case 9:
            sErrorMessage = 'Product: "%1$s"<br><br>This Steam account already owns the product(s) contained in this offer. To access them, visit your library in the Steam client.'.replace(/\%1\$s/, GetGameNameForFailure(receipt));
            break;

        case 24:
            sErrorMessage = 'The product code you\'ve entered requires ownership of another product before activation.\n\nIf you are trying to activate an expansion pack or downloadable content, please first activate the original game, then activate this additional content.';
            break;

        case 36:
            sErrorMessage = 'The product code you have entered requires that you first play %1$s on the PlayStation®3 system before it can be registered.\n\nPlease:\n\n- Start %1$s on your PlayStation®3 system\n\n- Link your Steam account to your PlayStation®3 Network account\n\n- Connect to Steam while playing %1$s on the PlayStation®3 system\n\n- Register this product code through Steam.'.replace(/\%1\$s/g, GetGameNameForFailure(receipt));
            break;

        case 50:
            sErrorMessage = 'The code you have entered is from a Steam Gift Card or Steam Wallet Code.  Click <a href="https://store.steampowered.com/account/redeemwalletcode">here</a> to redeem it.';
            break;

        case 4: //???
            sErrorMessage = 'An error has occurred.  Code (4). Valve, add a description, please';
            break;

        default:
            sErrorMessage = 'An unexpected error has occurred.  Your product code has not been redeemed.  Please wait 30 minutes and try redeeming the code again.  If the problem persists, please contact <a href="https://help.steampowered.com/en/wizard/HelpWithCDKey">Steam Support</a> for further assistance.';
            break;
    }

    switch (ePurchaseResult)
    {
        case 53:
            bLimitExceeded = true;
            break;
        case 9:
            AlreadyOwnedGame_Keys.push(key);
            break;
        default:
            OtherFailed_Keys.push(key);
            break;
    }

    LogDisplay.append('<br><br><hr><br>' + key + "<br><br>Failed! " + sErrorMessage);
}

function ActivateKey(i)
{
    $.post('https://store.steampowered.com/account/ajaxregisterkey/',
    {
        product_key: Keys[i],
        sessionid: g_sessionID
    }).done(function(Result)
    {
        if (Result !== null)
        {
            if (Result.success == 1)
            {
                LogDisplay.append('<br><br><hr><br>' + Keys[i] + '<br><br>Success! Product: "' + Result.purchase_receipt_info.line_items[0].line_item_description + '" has been added to your account.');
            }
            else if (Result.purchase_result_details !== undefined && Result.purchase_receipt_info !== undefined)
            {
                RegisterFailure(Result.purchase_result_details, Result.purchase_receipt_info, Keys[i]);
            }
            else
            {
                RegisterFailure(0, null, Keys[i]);
            }

            LogDisplay.animate({
                scrollTop: LogDisplay[0].scrollHeight
            }, 1000);

            if(bLimitExceeded)
            {
                for(var j = i; j < KeysAmount; j++)
                {
                    Unprocessed_Keys.push(Keys[j]);
                }

                OnActivationProcessFinished();

                return;
            }

            if (++i < KeysAmount)
            {
                ActivateKey(i);
            }
            else
            {
                OnActivationProcessFinished();
                return;
            }
        }
    }).fail(function()
    {
        LogDisplay.css('background-color', 'rgba(230, 10, 22, 0.3)');//red
        LogDisplay.append('<br><br><hr><br>Unexpected error! Try to activate later...');
        return;
    });
}

function OnActivationProcessFinished()
{
    LogDisplay.append('<br><br><hr><br>');
//yellow (253,215,51)
    if(Unprocessed_Keys.length == 0)
    {
        if((AlreadyOwnedGame_Keys.length != 0) || (OtherFailed_Keys.length != 0))
        {
            LogDisplay.css('background-color', 'rgba(253,215,51,0.3)');//yellow
            LogDisplay.append('Done! All the keys have been processed, but some of the keys have failed to be activated:');

            if(AlreadyOwnedGame_Keys.length != 0)
            {
                LogDisplay.append('<br><br>Already Owned Game Keys:<br>' + AlreadyOwnedGame_Keys.join());
            }

            if(OtherFailed_Keys.length != 0)
            {
                LogDisplay.append('<br><br>Keys failed due to various reasons:<br>' + OtherFailed_Keys.join());
            }
        }
        else
        {
            LogDisplay.css('background-color', 'rgba(22, 230, 22, 0.3)');//green
            LogDisplay.append('Done! All the keys have been processed and activated successfully!');
        }
    }
    else
    {
        if((AlreadyOwnedGame_Keys.length != 0) || (OtherFailed_Keys.length != 0))
        {
            LogDisplay.css('background-color', 'rgba(230, 10, 22, 0.3)');//red
            LogDisplay.append('Activation limit exceeded! Some of the keys have not been activated! Also some of the keys have failed to be activated:');

            if(AlreadyOwnedGame_Keys.length != 0)
            {
                LogDisplay.append('<br><br>Already Owned Game Keys:<br>' + AlreadyOwnedGame_Keys.join());
            }

            if(OtherFailed_Keys.length != 0)
            {
                LogDisplay.append('<br><br>Keys failed due to various reasons:<br>' + OtherFailed_Keys.join());
            }
        }
        else
        {
            LogDisplay.css('background-color', 'rgba(255,174,25, 0.3)');//orange
            LogDisplay.append('Activation limit exceeded! Some of the keys have not been activated:');
        }

        LogDisplay.append('<br><br>Unprocessed keys:<br>' + Unprocessed_Keys.join());
    }
}

function DeserializeKeys(Source)
{
    var Output = [];
    Source.forEach(
        function(elm)
        {
            if (elm)
            {
                elm.replace(/\s+/g, '').split(',').forEach(
                    function(elm2)
                    {
                        if (elm2)
                        {
                            Output.push(elm2);
                        }
                    });
            }
        });
    return Output;
}

function InitializeKeysRegistration()
{
    LogDisplay.css('display', 'inherit');
    if (KeysTextarea.val() != "" && $('#accept_ssa').is(':checked'))
    {
        switch($('#method :selected').val())
        {
            case 'rgx':
                Keys = KeysTextarea.val().match(/[A-z0-9]{5}(?:(?:-[A-z0-9]{5}){4}|(?:-[A-z0-9]{5}){2})/gi);
                break;
            case 'def':
                Keys = DeserializeKeys(KeysTextarea.val().split('\n'));
                break;
            default:
                return;
        }

        KeysAmount = Keys.length;
        LogDisplay.text('Processing given keys...');

        AlreadyOwnedGame_Keys = [];
        Unprocessed_Keys      = [];
        OtherFailed_Keys      = [];
        bLimitExceeded        = false;

        ActivateKey(0);
    }
    else if (!($('#accept_ssa').is(':checked')))
    {
        LogDisplay.html('You must agree to the terms of the <a href="javascript:SSAPopup();" class="body_link">Steam Subscriber Agreement</a>!');
    }
    else
    {
        LogDisplay.text('You must input at least one key!');
    }
}

$(document).ready(function()
{
    var href = location.href.toLowerCase();

    if(href.includes("indiegala.com"))
    {
        IndieGalaProcess();
    }
    else if (href.includes("gogobundle.com") || href.includes("otakubundle.com"))
    {
        OtakuGogoProcess();
    }
    else if (href.includes("fanatical.com"))
    {
        FanaticalProcess();
    }
    else if(href.includes("humblebundle.com"))
    {
        HumbleBundleProcess();
    }
    else
    {
        setTimeout(function(){
            if($('#es_activate_multiple').length)
            {
                console.log('%c Batch Keys Activator | Enhanced Steam extension detected. Removing ES stuff... ', ConsoleCSS);
                $('#es_activate_multiple').remove();
            }

            //adding nice scrollbars. strange that it's not used everywhere on steam .-.
            $('head').append('<link href="https://steamcommunity-a.akamaihd.net/public/css/webui/shared_application.css" rel="stylesheet" type="text/css">');

            $('#product_key').replaceWith($('<textarea id="product_keys" type="text" class="registerkey_input_box_text" value="">'));
            KeysTextarea = $('#product_keys');

            if(location.href.match(/key=./))
            {
                KeysTextarea.text(location.href.split('key=')[1].split('&')[0]);
            }
            else if(location.href.match(/keys=./))
            {
                KeysTextarea.text(location.href.split('keys=')[1].split('&')[0]);
            }

            KeysTextarea.keydown(function(){
                setTimeout(function(){
                    KeysTextarea.css('height', 'auto');
                    KeysTextarea.css('height', KeysTextarea[0].scrollHeight + 10 + 'px');
                }, 0);
            });
            KeysTextarea.css('min-width', '470px');
            KeysTextarea.css('resize', 'vertical');
            KeysTextarea.css('padding', 0);

            KeysTextarea.css('max-height', '300px');
            KeysTextarea.css('min-height', '57px');
            KeysTextarea.css('height', 'auto');
            KeysTextarea.css('height', KeysTextarea[0].scrollHeight + 10 + 'px');

            $('#register_btn').removeAttr('href');
            $('#register_btn').click(function(){InitializeKeysRegistration();});

            $('#register_btn').after('<select name="method" id="method" class="gray_bevel dynInput" style="width:95px;height:32px;margin-left: 12px;"><option value="rgx">Regex</option><option value="def">Default</option></select>');

            LogDisplay = $('#error_display');
            LogDisplay.css('max-height', '400px');
            LogDisplay.css('overflow','auto');
            LogDisplay.css('background-color', 'rgba(255, 255, 255, 0.3)');
            LogDisplay.css('display', 'none');
            LogDisplay.css('transition', 'all 3s ease');

            if(location.href.match(/auto=./))
            {
                if(location.href.split('auto=')[1].split('&')[0] == '1')
                {
                    LogDisplay.css('display', 'inherit');
                    Keys = CleanArray(KeysTextarea.val().split('\n'));
                    KeysAmount = Keys.length;
                    LogDisplay.text('Processing given keys...');
                    ActivateKey(0);
                }
            }
        }, 500);
    }
});


//***********************************
//***********Bundle Sites************
//***********************************

function Bundle_ProcessKeys()
{
    var wnd = window.open('https://store.steampowered.com/account/registerkey?keys=' + KeysData.join() /* + '&auto=1'*/); //you may uncomment 'auto' parameter to start redeeming the keys immediately

    try
    {
        wnd.focus();
    }
    catch(e)
    {
        alert("Pop-up Blocker is enabled! The script won't be able to redirect you to Steam until you have the Pop-up blocker enabled for this site!");
    }
}

//************IndieGala**************
var IG_Codes = [];

function IndieGalaProcess()
{
    $('#steam-account').append('<a id="RegisterKeysIndieGala" href="javascript://"><i class="fa fa-steam-square"></i> Register all the bundle keys on Steam</a>');

    $('#RegisterKeysIndieGala').click(function(){

        $('#RegisterKeysIndieGala').contents().last().replaceWith(' Processing...');

        //Make sure that we're getting codes from an opened bundle
        var fetchlinks = $('[id*=current_sale_].panel-collapse.collapse.in').find('div[id*=fetchlink_]');
        for(var i = 0; i < fetchlinks.length; i++)
        {
            IG_Codes.push(fetchlinks.eq(i).attr('id').split('_')[1]);
        }

        var serials = $('[id*=current_sale_].panel-collapse.collapse.in').find('div[id*=serial_]');
        for(i = 0; i < serials.length; i++)
        {
            IG_Codes.push(serials.eq(i).attr('id').split('_')[1]);
        }

        if(IG_Codes.length > 0)
        {
            console.log('%c Batch Keys Activator | ' + IG_Codes.length + ' codes collected. Fetching Steam Keys... ', ConsoleCSS);
            IndieGalaFetchKey(0);
        }
        else
        {
            alert('No keys found! It seems you don\'t have any bundle opened!');
        }
    });
}

function IndieGalaFetchKey(i)
{
    if(i < IG_Codes.length)
    {
        $('#RegisterKeysIndieGala').contents().last().replaceWith(' Processing... Code: ' + i + '\\' + IG_Codes.length);

        $.get('https://www.indiegala.com/myserials/syncget?code=' + IG_Codes[i], function(data){
            KeysData.push($.parseJSON(data).serial_number);
            IndieGalaFetchKey(++i);
        }).fail(function(data){
            alert('Error fetching keys!');
            return;
        });
    }
    else
    {
        $('#RegisterKeysIndieGala').contents().last().replaceWith(' Done! Redirecting to Steam...');
        Bundle_ProcessKeys();
    }
}

//*********Otaku/Gogobundle**********
function OtakuGogoProcess()
{
    var keys_table = $('.hikashop_order_main_table tbody tr td fieldset table tbody').eq(1).find('tr td');

    $('.hikashop_order_main_table tbody tr td fieldset legend').eq(2).before('<div href="javascript://" id="ActivateKeys" class="btn">Fetch and Activate All the Keys on Steam</div>');

    $('#ActivateKeys').click(function(){
        for(var i = 1; i < keys_table.length; i+=4)
        {
            KeysData.push(keys_table.eq(i).text());
        }

        Bundle_ProcessKeys();
    });
}

//***********Fanatical*****************
function FanaticalProcess()
{
    setTimeout(function(){
        $('.account-content').find('h3').after('<button type="button" id="activate" class="btn btn-secondary btn-block">Fetch and Activate All the Keys on Steam</button>');
        $('#activate').click(function(){
            var reveal = $('.account-content').find('dl [type=button].btn.btn-secondary.btn-block');

            for (var i = 0; i < reveal.length; i++)
            {
                $('#activate').text('Fetching keys ' + i + '\\' + reveal.length);
                reveal.eq(i).click();
            }

            $('#activate').text('Fetching keys... Done!');

            setTimeout(function(){
                $('#activate').text('Processing keys...');

                var data = $('input[type=text].text-center.font-weight-bold.form-control');

                for (var j = 0; j < data.length; j++)
                {
                    KeysData.push(data.eq(j).attr('value'));
                }

                Bundle_ProcessKeys();

                $('#activate').text('Redirecting to Steam... Done!');
            }, 1500);
        });
    }, 1500);
}

//***********HumbleBundle**************
function HumbleBundleProcess()
{
    setTimeout(function(){
        $('.key-list').before('<div id="ActivateOnSteam" class="round-active-button">Redeem and Activate the Keys on Steam</a>');

        $('#ActivateOnSteam').click(function(){
            $('#ActivateOnSteam').text('Redeeming...');

            $('.keyfield-value').each(function(){
                $(this).click();
            });

            setTimeout(function(){
                $('#ActivateOnSteam').text('Fetching...');

                $('.keyfield.redeemed').each(function(){
                    KeysData.push($(this).attr('title'));
                });

                $('#ActivateOnSteam').text('Done! Redirecting to Steam...');
                Bundle_ProcessKeys();
            }, 3000);
        });
    }, 2000);
}

// ==UserScript==
// @name         Batch Keys Activator
// @namespace    http://tampermonkey.net/
// @version      1.0.0.5
// @description  Activate a bunch of keys at once
// @thanks       Many thanks to Delite for helping with some css stuff, motivation and testing.
// @author       Lite_OnE
// @match        https://store.steampowered.com/account/registerkey*
// @grant        unsafeWindow
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==
var Keys = [],
    KeysAmount = 0,
    KeysTextarea = null;

function RegisterFailure(ePurchaseResult, receipt, key)
{
    var sErrorMessage = 'An unexpected error has occurred.  Your product code has not been redeemed.  Please wait 30 minutes and try redeeming the code again.  If the problem persists, please contact <a href="https://help.steampowered.com/en/wizard/HelpWithCDKey">Steam Support</a> for further assistance.';

    switch (ePurchaseResult)
    {
        case 14:
            sErrorMessage = 'The product code you\'ve entered is not valid. Please double check to see if you\'ve mistyped your key. I, L, and 1 can look alike, as can V and Y, and 0 and O.';
            break;

        case 15:
            sErrorMessage = 'The product code you\'ve entered has already been activated by a different Steam account. This code cannot be used again. Please contact the retailer or online seller where the code was purchased for assistance.';
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
        default:
            sErrorMessage = 'An unexpected error has occurred.  Your product code has not been redeemed.  Please wait 30 minutes and try redeeming the code again.  If the problem persists, please contact <a href="https://help.steampowered.com/en/wizard/HelpWithCDKey">Steam Support</a> for further assistance.';
            break;
    }

    $('#error_display').append('<br><br><hr><br>' + key + "<br><br>Failed! " + sErrorMessage);
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
                $('#error_display').append('<br><br><hr><br>' + Keys[i] + '<br><br>Success! Product: "' + Result.purchase_receipt_info.line_items[0].line_item_description + '" has been added to your account.');
            }
            else if (Result.purchase_result_details !== undefined && Result.purchase_receipt_info !== undefined)
            {
                RegisterFailure(Result.purchase_result_details, Result.purchase_receipt_info, Keys[i]);
            }
            else
            {
                RegisterFailure(0, null, Keys[i]);
            }

            if (i + 1 < KeysAmount)
            {
                ActivateKey(i + 1); //for some reason ActivateKey(i++) doesn't work .-.
            }
            else
            {
                $('#error_display').append('<br><br><hr><br>Done. All the keys have been processed!');
                $('#error_display').css('background-color', 'rgba(53, 142, 255, 0.3)');
                return;
            }
        }
    }).fail(function()
    {
        $('#error_display').append('<br><br><hr><br>Unexpected error! Try to activate later...');
        return;
    });
}

function CleanArray(Source)
{
    var newArray = [];
    for (var i = 0; i < Source.length; i++)
    {
        if (Source[i])
        {
            newArray.push(Source[i]);
        }
    }
    return newArray;
}

unsafeWindow.InitKeysRegistration = function()
{
    $('#error_display').css('display', 'inherit');
    if ($('#product_key').val() != "" && $('#accept_ssa').is(':checked'))
    {
        Keys = CleanArray(KeysTextarea.val().split('\n'));
        KeysAmount = Keys.length;
        $('#error_display').text('Processing given keys...');
        ActivateKey(0);
    }
    else if (!($('#accept_ssa').is(':checked')))
    {
        $('#error_display').html('You must agree to the terms of the <a href="javascript:SSAPopup();" class="body_link">Steam Subscriber Agreement</a>!');
    }
    else
    {
        $('#error_display').text('You must input at least one key!');
    }
};

$(document).ready(function()
{
    $('#product_key').replaceWith($('<textarea id="product_key" type="text" class="registerkey_input_box_text" value="">'));
    KeysTextarea = $('#product_key');
    KeysTextarea.keydown(function()
    {
        setTimeout(function()
        {
            KeysTextarea.css('height', 'auto');
            KeysTextarea.css('height', KeysTextarea[0].scrollHeight + 'px');
        }, 0);
    });
    KeysTextarea.css('min-width', '470px');
    KeysTextarea.css('resize', 'vertical');
    KeysTextarea.css('padding', 0);
    $('#register_btn').attr('href', 'javascript:InitKeysRegistration();');
    $('#error_display').css('background-color', 'rgba(255, 255, 255, 0.3)');
    $('#error_display').css('display', 'none');
    $('#error_display').css('transition', 'all 3s ease');
});

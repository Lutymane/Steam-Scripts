// ==UserScript==
// @name         Batch Keys Activator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Activate a bunch of keys at once
// @author       Lite_OnE, Delite
// @match        https://store.steampowered.com/account/registerkey
// @grant        unsafeWindow
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

var Keys = [],
    KeysAmount = 0,
    Result,
    ResponseResult = [];

function RegisterSuccess(Result){
    //some shit here when register is succeeded
}

function RegisterFailure(ePurchaseResult, receipt){
    //some shit here when register is failed
    //VVVVV Copypasted from valve VVVVV
    var sErrorMessage = 'An unexpected error has occurred.  Your product code has not been redeemed.  Please wait 30 minutes and try redeeming the code again.  If the problem persists, please contact <a href="https://help.steampowered.com/en/wizard/HelpWithCDKey">Steam Support</a> for further assistance.';

	switch ( ePurchaseResult )
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
			sErrorMessage = 'Sorry, but %1$s is not available for purchase in this country. Your product key has not been redeemed.'.replace( /\%1\$s/, GetGameNameForFailure( receipt ) );//we can use this valve's function lel
			break;

		case 9:
			sErrorMessage = 'This Steam account already owns the product(s) contained in this offer. To access them, visit your library in the Steam client.';
			break;

		case 24:
			sErrorMessage = 'The product code you\'ve entered requires ownership of another product before activation.\n\nIf you are trying to activate an expansion pack or downloadable content, please first activate the original game, then activate this additional content.';
			break;

		case 36:
			sErrorMessage = 'The product code you have entered requires that you first play %1$s on the PlayStation®3 system before it can be registered.\n\nPlease:\n\n- Start %1$s on your PlayStation®3 system\n\n- Link your Steam account to your PlayStation®3 Network account\n\n- Connect to Steam while playing %1$s on the PlayStation®3 system\n\n- Register this product code through Steam.'.replace( /\%1\$s/g, GetGameNameForFailure( receipt ) );
			break;

		case 50: // User entered wallet code
			sErrorMessage = 'The code you have entered is from a Steam Gift Card or Steam Wallet Code.  Click <a href="https://store.steampowered.com/account/redeemwalletcode">here</a> to redeem it.';
			break;

		case 4://???
		default:
			sErrorMessage = 'An unexpected error has occurred.  Your product code has not been redeemed.  Please wait 30 minutes and try redeeming the code again.  If the problem persists, please contact <a href="https://help.steampowered.com/en/wizard/HelpWithCDKey">Steam Support</a> for further assistance.';
			break;
	}
}

function ActivateKey(i){
    $.post('https://store.steampowered.com/account/ajaxregisterkey/',
		{
			product_key : Keys[i],
			sessionid : g_sessionID
		}).done(function(data){
				if ( data !== null )
                {
                    try{
                        Result = $.parseJSON(data);
                    }
                    catch(e){
                        console.log(e);
                    }

                    if ( Result.success == 1 )
					{
						RegisterSuccess( Result );
					}
					else if ( Result.purchase_result_details !== undefined && Result.purchase_receipt_info !== undefined)
					{
						RegisterFailure( Result.purchase_result_details, Result.purchase_receipt_info );
					}
                    else
                    {
                        RegisterFailure(0, null);
                    }

                    if(i < KeysAmount){
                        var Next = i++;
                        ActivateKey(Next);//for some reason ActivateKey(i++) doesn't work .-.
                    }
                    else{
                        //some shit when all keys are processed
                        return;
                    }
				}
			}).fail(function(){RegisterFailure(0, null);});
}


function InitKeysRegistration(){
    if($('#product_key').val() != ""){
        Keys = $('#product_key').val().split(/\n/);
        KeysAmount = Keys.length;
        ActivateKey(0);
    }else{
        //some shit here, that user haven't input key(s) yet
    }
}

$(document).ready(function(){
    $('#register_btn').attr('href','javascript:InitKeysRegistration();');
});

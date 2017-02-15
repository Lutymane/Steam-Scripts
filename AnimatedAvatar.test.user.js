// ==UserScript==
// @name         Animated Avatar
// @namespace    *steamcommunity.com/
// @version      4.0.0
// @description  This script makes your avatar animated using standard game avatars in Steam
// @author       Lite_OnE
// @match        *://steamcommunity.com/id/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

var p = 1500,   //!Dont modify this value or you will get banned!
    stop_flag,  //stop flag .-.
    ad = [ [471220, 4], [269570, 8], [526800, 5], ['NinjasPlusPlus', 12], ['SuperDistro', 8], [453830, 7], ['sentris', 29], [538410, 6], [536470, 4], [432330, 20] ], //avatars data
    cp, //choosed preset
    data_1 = '<a class="btn_profile_action btn_medium" id="disable_av"><span style="color: #E34234; display:none;">Disable Animated Avatar</span></a><a class="btn_profile_action btn_medium" id="enable_av"><span style="color: #01B1AF; display: block">Enable Animated Avatar</span></a>',
    data_2 = '<div class="popup_block_new"><div class="popup_body popup_menu" id="avatar_presets" style="display: none; position: static; z-index: 1000; width: 185px;"></div></div>';



function preset(i){
    if (stop_flag===0){
        if (i<ad[cp][1]){
            $.post('http://steamcommunity.com/games/' + ad[cp][0] + '/selectAvatar', { sessionid: g_sessionID, selectedAvatar: i});
            setTimeout(function (){
                i++;
                preset(i);
            }, p);
        }else{
            preset(0);
        }
    }
}

$(document).ready(function(){
    $('.profile_header_actions').append(data_1);
    $('#enable_av').append(data_2);
    for (j=1; j<=ad.length; j++){
        $('#avatar_presets').append('<a class="popup_menu_item  btn_profile_action" style="text-align: center">Preset ' + j + '</a>');
    }
    $('#enable_av').click(function() {
        if($('#avatar_presets').css("display")=="block"){
            $('#avatar_presets').css({"display":"none"});
        }else{
            $('#avatar_presets').css({"display":"block"});
        }
        if($('#enable_av').find('span').text()=='Enable Animated Avatar'){
            $('#enable_av').find('span').text('Choose Animated Preset');
        }else{
            $('#enable_av').find('span').text('Enable Animated Avatar');
        }
    });
    $('.popup_menu_item.btn_profile_action').click(function() {
        $('#enable_av').find('span').css({"display":"none"});
        $('#disable_av').find('span').css({"display":"block"});
        stop_flag=0;
        cp=$(this).index();
        preset(0);
        ShowAlertDialog ('Info','Animated avatar is enabled!');
    });
    $('#disable_av').click(function() {
        stop_flag=1;
        ShowAlertDialog ('Info','Animated avatar is disabled! Thanks for using this script! Any questions? Visit the support page: lite-one.tk/2017/02/05/animated-avatar');
        $('#enable_av').find('span').css({"display":"block"});
        $('#disable_av').find('span').css({"display":"none"});
        $('#enable_av').find('span').text('Enable Animated Avatar');
    });
});

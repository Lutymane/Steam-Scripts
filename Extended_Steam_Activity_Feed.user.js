// ==UserScript==
// @name         Extended Steam Activity Feed
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  This script allows you posting statuses about apps using their IDs. Also you can now rate up all posts in your activity feed in 2 clicks.
// @author       Lite_OnE
// @match        http://steamcommunity.com/*/*/home/
// @grant        unsafeWindow
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

var n = 0,        //number of posts on page
    n2 = 0,       //other posts (VoteUpBtn_)
    i = 0,
    j = 0,
    m_RUD = null; //m_RUD - modal Rate Up Dialog


unsafeWindow.PostStatus = function () {
    $.post($('.blotter_avatar_holder').find('a:first').attr('href') + "/ajaxpostuserstatus/", { sessionid: g_sessionID, status_text: $('#blotter_statuspost_textarea').val(), appid: $('#Status_AppID').val()});
    alert('Posted!');
    location.reload();
};

unsafeWindow.init_RateUpEvrthng = function() {
    if (confirm('Click "Yes" to start rating up everything')) {
        m_RUD = ShowBlockingWaitDialog("Processing", "Please wait. Script is working ...");
        n = $('[id*="vote_up_"]').length;
        n2 = $('[id*="VoteUpBtn_"]').length;
        if (n2>0){RateUpStage1();}
        RateUpStage2(0);
    }
};

function RateUpStage1 (){
    while (j<n2){
        $('[id*="VoteUpBtn_"]:eq(' + j + ')').click();
        j++;
    }
    return;
}

function RateUpStage2 (){
    if (i<n){
        $('[id*="vote_up_"]:eq(' + i + ')').click();
        i++;
        RateUpStage2(i);
    }else{
        $("html, body").scrollTop($(document).height());
        setTimeout(function (){
            if (confirm('All posts on this page are rated up! Do you want to process next page?')){
                n = $('[id*="vote_up_"]').length;
                n2 = $('[id*="VoteUpBtn_"]').length;
                if (n2>0){RateUpStage1();}
                RateUpStage2(i);
            }else{m_RUD.Dismiss();thnx();}
        }, 3000);
    }
    return;
}

function thnx (){
    ShowAlertDialog ('','Thank you very much for using this script! Script is still in development, so any suggestions regarding improvements and new ideas to do is appreciated! Leave a comment on github page or on my Steam profile (/id/lite_one/)');
    return;
}

jQuery(document).ready(function() {
    var emoticon_container = $(".emoticon_container").html();
    $(".blotter_status_submit_ctn:first").replaceWith( '<div id="extended_af_container" style="width:100%;"><div class="profile_options_divider"></div><div style="float: right;" onclick="javascript:PostStatus();" class="btn_darkblue_white_innerfade btn_small"><span>Post status</span></div><span class="emoticon_container">'+ emoticon_container + '</span><input type="text" id="Status_AppID" placeholder="Input AppID" style="width: 75%; font-style: italic; text-align: center;"></div><div class="profile_options_divider"></div><div style="width: 100%; text-align: center;" onclick="javascript:init_RateUpEvrthng();" class="btn_darkblue_white_innerfade btn_small"><span>Rate up everything</span></div>');
    $(".emoticon_container:first").css({"float": "right", "width":"7%"});
});

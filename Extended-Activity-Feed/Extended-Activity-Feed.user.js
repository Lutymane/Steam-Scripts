// ==UserScript==
// @name         Extended Steam Activity Feed
// @namespace    http://tampermonkey.net/
// @version      10.1
// @description  At this moment the script allows you posting statuses about apps using their ID, rating up all posts in your activity feed in 2 clicks.
// @author       Lutymane
// @match        *://steamcommunity.com/*/*/home/
// @grant        unsafeWindow
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

var n = 0,        //number of posts on page
    n2 = 0,       //other posts (VoteUpBtn_)
    i = 0,
    j = 0,
    m_RUD = null; //m_RUD - modal Rate Up Dialog


unsafeWindow.PostStatus = function () {
    $.post($('.blotter_avatar_holder').find('a:first').attr('href') + "/ajaxpostuserstatus/", { sessionid: g_sessionID, status_text: $('#blotter_statuspost_textarea').val(), appid: $('#Status_AppID').val() });
    alert('Posted!');
    location.reload();
};

unsafeWindow.init_RateUpEvrthng = function () {
    if (confirm('Click "Yes" to start rating up everything')) {
        m_RUD = ShowBlockingWaitDialog("Processing", "Please wait. Script is working ...");
        n = $('[id*="vote_up_"]').length;
        n2 = $('[id*="VoteUpBtn_"]').length;
        if (n2 > 0) { RateUpStage1(); }
        RateUpStage2(0);
    }
};

function RateUpStage1() {
    while (j < n2) {
        $('[id*="VoteUpBtn_"]:eq(' + j + ')').click();
        j++;
    }
}

function RateUpStage2() {
    if (i < n) {
        $('[id*="vote_up_"]:eq(' + i + ')').click();
        i++;
        RateUpStage2(i);
    } else {
        $("html, body").scrollTop($(document).height());
        setTimeout(function () {
            if (confirm('All posts on this page was rated up! Do you want to process next page?')) {
                n = $('[id*="vote_up_"]').length;
                n2 = $('[id*="VoteUpBtn_"]').length;
                if (n2 > 0) { RateUpStage1(); }
                RateUpStage2(i);
            } else { m_RUD.Dismiss(); thnx(); }
        }, 3000);
    }
}

function thnx() {
    ShowAlertDialog('', 'Thank you very much for using this script! Script is still in development, so any suggestions regarding improvements and new ideas to do is appreciated! Leave a comment on github page or on my Steam profile (/id/Lutymane/)');
}

//dunno why it needs this .-. but anyway it looks much more better with gold .^.
function golden() {
    $('.playerAvatar.medium.in-game').attr('class', 'playerAvatar medium golden');
    $('.playerAvatar.medium.online').attr('class', 'playerAvatar medium golden');
    $('.user_avatar.playerAvatar.in-game').attr('class', 'user_avatar playerAvatar golden');
    $('.user_avatar.playerAvatar.online').attr('class', 'user_avatar playerAvatar golden');
    $('.blotter_poststatus_avatar').find('div:first').find('a:first').find('div:first').attr('class', 'playerAvatar golden');
    $('.commentthread_entry').find('div:first').attr('class', 'commentthread_user_avatar playerAvatar golden');
    $('.friendslist_entry_content.persona.in-game').attr('class', 'friendslist_entry_content persona golden');
    $('.friendslist_entry_content.persona.online').attr('class', 'friendslist_entry_content persona golden');
}

$(document).ready(function () {
    golden();
    $('.blotter_status_submit_ctn:first').find('div').remove();
    $('.blotter_status_submit_ctn:first').prepend('<div style="float: right;" onclick="javascript:PostStatus();" class="btn_darkblue_white_innerfade btn_small"><span>Post status</span></div>');
    $('.blotter_status_submit_ctn:first').append('<div onclick="ShowMenu( \'blotter_appselect_app\', \'blotter_appselect_app_options\', \'left\' ); Blotter_GiveFocus( \'blotter_appselect_app_filter\' ); " id="blotter_appselect_app" class="btn_darkblue_white_innerfade" style="width: 50%; text-align: center; font-style: italic;"><div class="option ellipsis blotter_appselect_activeoption" id="blotter_appselect_app_activeoption">Choose App by Name</div></div><input type="text" id="Status_AppID" placeholder="Input AppID" style="width: 20%; font-style: italic; text-align: center; margin-left: 25px;"></div><div class="profile_options_divider"></div><div style="width: 100%; text-align: center; font-style: italic;" onclick="javascript:init_RateUpEvrthng();" class="btn_darkblue_white_innerfade btn_small"><span>Rate up everything</span>');
    $('.emoticon_container:first').css({ "float": "right", "width": "7%", "margin-right": "5px" });
    $('.blotter_appselect_options.shadow_content').attr('class', 'blotter_appselect_options btn_darkblue_white_innerfade shadow_content');
    $('#blotter_appselect_app_activeoption').on("DOMSubtreeModified", function () { $('#Status_AppID').val($('#blotter_poststatus_appid').val()); });
});

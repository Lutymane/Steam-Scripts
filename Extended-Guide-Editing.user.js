// ==UserScript==
// @name         Extended Guide Editing
// @icon         https://store.steampowered.com/favicon.ico
// @namespace    steam
// @version      2.4
// @description  Save guide subsections with empty titles and 'unlimited' body text length.
// @author       Lutymane
// @match        *steamcommunity.com/sharedfiles/editguidesubsection*
// @grant        unsafeWindow
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

var location_href = location.href.replace(/#/g, ''),
    itemid = location_href.split('?')[1].split('&')[0].split('=')[1],
    sectionid = location_href.split("?")[1].split("&")[1].split("=")[1];

$('.btn_green_white_innerfade.btn_small_thin').attr('href', "javascript:ValidateEditExtended();");
$('#description').removeAttr('maxlength');

unsafeWindow.ValidateEditExtended = function () {
    g_contentChanged = false;
    $.post('//steamcommunity.com/sharedfiles/setguidesubsection', {
        id: itemid,
        sectionid: sectionid,
        sessionid: g_sessionID,
        title: title.value,
        description: description.value
    }).done(function (data) {
        if (data.success == 1) {
            $('.editGuideSubSectionContentsChangedWarningText').html("Subsection has been saved successfully!");
        }
        else {
            $('.editGuideSubSectionContentsChangedWarningText').html("Unexpected error occured!");
        }
    }).fail(function () {
        $('.editGuideSubSectionContentsChangedWarningText').html("Unexpected error occured!");
    });
};


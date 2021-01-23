// ==UserScript==
// @name         Applying Custom Tags to Guides
// @icon         https://store.steampowered.com/favicon.ico
// @namespace    steam
// @version      1.1
// @description  It allows you to apply custom tags to guides, as well as multiple language tags
// @author       Lutymane
// @match        *://steamcommunity.com/sharedfiles/editguide/*
// @grant        none
// ==/UserScript==

var AddTagButton = '<div class="btn_blue_white_innerfade btn_small_thin" id="AddTag" style="margin:10px 0px 0px 0px;"><span>Add Tag</span></div>',
    TagInput = '<div><input type="text" name="tags[]" value="" class="inputTagsFilter"></div>';


$J(document).ready(function () {
    $J('input.inputTagsFilter[type=radio]').each(function () {
        $J(this).attr('type', 'checkbox');
    });

    $J('#checkboxgroup_0 div').click(function () {
        var tag = $J(this);
        tag.find('input').attr('type', 'text');
        tag.contents().filter(function () {
            return this.nodeType === 3;
        }).remove();
    });

    $J('#checkboxgroup_0').append(AddTagButton);

    $J('#AddTag').click(function () {
        $J('#checkboxgroup_0 div').eq($J('#checkboxgroup_0 div').index($J(this)) - 1).after(TagInput);
    });
});

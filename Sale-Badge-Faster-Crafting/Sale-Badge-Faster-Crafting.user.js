// ==UserScript==
// @name         Sale Badge Faster Crafting
// @icon         https://store.steampowered.com/favicon.ico
// @namespace    top_xex
// @version      1.0
// @description  Craft your sale badge faster
// @author       Lite_OnE
// @match        https://steamcommunity.com/*/*/gamecards/991980*
// @homepageURL  https://xeox.xyz
// @supportURL   https://github.com/LiteOnE/Steam-Scripts/issues
// @updateURL    https://github.com/LiteOnE/Steam-Scripts/raw/master/Sale-Badge-Faster-Crafting/Sale-Badge-Faster-Crafting.meta.js
// @downloadURL  https://github.com/LiteOnE/Steam-Scripts/raw/master/Sale-Badge-Faster-Crafting/Sale-Badge-Faster-Crafting.user.js
// @require      https://github.com/LiteOnE/Steam-Scripts/raw/dev/libs/msToTimeStr.js
// ==/UserScript==

//msToTimeStr
//cool class for buttons btn_darkred_white_innerfade

const btn_id_selector = 'btnCraftFaster';

var btn_html = `
<a id="${btn_id_selector}" class="btn_darkred_white_innerfade btn_medium" style="margin-right: 15px;">
    <span>Craft Sets Faster</span>
</a>`;

var appID = 0;
var profileURL = '';

const timeout = 100;//ms

var modal = null;

var limit = 0;

var crafted = 0;
var errored = 0;

var startTime = 0;

function craftSet(i = 0)
{
    let submitURL = profile_url + "/ajaxcraftbadge/";

    $J.post(submitURL, {
        appid: appID,
        series: 1,
        border_color: 0,
        sessionid: g_sessionID
    }).done((data)=>{
        if(data["success"] == 1)
        {
            crafted += 1;
        }
        else
        {
            errored += 1;
        }
    }).fail(
        function(data){
            console.log(data);

            errored += 1;
        }
    ).always(
        function()
        {
            modal.Dismiss();
            modal = ShowBlockingWaitDialog( 'Crafting', '<div style="display: inline-block;margin-left: 20px;">' +
                    `<span style="color: lightseagreen;">Crafting sale badges: ${errored + crafted}/${limit}</span>`
                    + (errored ? `<br><span style="color:#d25d67;">Failed: ${errored}</span>` : '') + '</div>' );

            if(crafted + errored == limit)
            {
                modal.Dismiss();

                let timePassed = msToTimeStr((new Date()).getTime() - startTime);

                modal = ShowConfirmDialog('Completed!', `Successfully crafted: <span style="color: lightseagreen;">${crafted} set${(crafted == 1 ? '' : 's')}</span>
                    <br>Time passed: <span style="color: lightseagreen;">${timePassed}</span>
                    <br>Percentage of successful requests: <span style="color: lightseagreen;">${Math.round((1 - errored/limit)* 100 * 100) / 100}%</span>` 
                    + (errored ? `<br><br><span style="color:#ff7b7b;">Failed ${errored} request${(errored == 1 ? '' : 's')}. Check console log for more info` : ''),
                    'OK', 'Close', 'By /id/lite_one').done(
                        function(btn_type)
                        {
                            if(btn_type == 'SECONDARY')
                            {
                                location.href = 'https://steamcommunity.com/id/lite_one';
                            }
                        }
                    );

                crafted = 0;
                errored = 0;
            }
        }
    );

    i += 1;

    if(i < limit)
    {
        setTimeout(() => {
            craftSet(i);
        }, timeout);
    }
}

function prepare()
{
    profile_url = $J('.profile_small_header_name a').attr('href');
    appID = location.href.split('\/')[6];
    
    let max_sets = 0;
    
    if($J('.badge_card_set_text_qty').length == $J('.badge_card_set_card').length)
    {
        max_sets = $J('.badge_card_set_text_qty').eq(0).text().match(/\d+/)[0];

        $J('.badge_card_set_text_qty').each((i,e)=>{
            max_sets = Math.min(max_sets, $J(e).text().match(/\d+/)[0]);
        });
    }
    
    let modal_input = null;

    modal = ShowConfirmDialog('Warning', `Available <span style="color:#b698cc;">${max_sets} set${(max_sets == 1 ? '' : 's')} to craft!</span>` + 
        '<br><br><span style="color:lightseagreen;">Limit sets</span>' +
        '<input type="number" id="sets_limit" style="margin-left: 20px;"><br><br>',
        "Craft", "Exit"
    ).done(() =>
    {
        if(modal_input.val())
        {
            limit = parseInt(modal_input.val());

            if(limit > max_sets)
            {
                limit = max_sets;
            }

            if(limit > 0)
            {
                startTime = (new Date()).getTime();

                modal.Dismiss();
                modal = ShowBlockingWaitDialog( 'Crafting', '<div style="display: inline-block;margin-left: 20px;">' +
                        `<span style="color: lightseagreen;">Crafting badges: ${errored + crafted}/${limit}</span>`
                        + (errored ? `<br><span style="color:#b698cc;">Failed: ${errored}</span>` : '') + '</div>' );

                craftSet();
            }
        }
    });

    modal_input = $J('#sets_limit');
    modal_input.val(max_sets);
}

$J(()=>{
    $J('.gamecards_inventorylink a.btn_grey_grey.btn_medium').first().before(btn_html);
    
    $J(`#${btn_id_selector}`).click(prepare);
});
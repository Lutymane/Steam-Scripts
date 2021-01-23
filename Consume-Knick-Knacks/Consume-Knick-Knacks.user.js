// ==UserScript==
// @name         Consume Knick Knacks
// @icon         https://store.steampowered.com/favicon.ico
// @namespace    steam
// @version      1.1
// @description  Choose how many Knick-Knacks you want to consume in few clicks
// @author       Lutymane
// @match        https://steamcommunity.com/*/*/inventory*
// @match        https://steamcommunity.com/*/*/inventory/*
// @homepageURL  https://github.com/Lutymane/Steam-Scripts
// @supportURL   https://github.com/Lutymane/Steam-Scripts/issues
// @updateURL    https://github.com/Lutymane/Steam-Scripts/raw/master/Consume-Knick-Knacks/Consume-Knick-Knacks.meta.js
// @downloadURL  https://github.com/Lutymane/Steam-Scripts/raw/master/Consume-Knick-Knacks/Consume-Knick-Knacks.user.js
// ==/UserScript==

const btn_id_selector = 'consume_kk';
var btn_html = `<div class="btn_grey_black btn_medium" id="${btn_id_selector}" style="margin-right: 12px;"><span>Consume Knick-Knacks</span></div>`;

const appID = 991980;

//exclude non knick knacks consumables
const classIDsBlackList = [
    "2838587436" /*mystery box "unpack_2018mystery"*/
];
var classIDsToConsume = [];
var assetIDsToConsume = [];

const timeout = 50;//ms

var modal = null;

var limit = 0;

var activated = 0;
var errored = 0;

var startTime = 0;

function msToTimeStr(_t) {
    let ret = "";

    ret = (_t % 1000) + " ms";

    _t = Math.floor(_t / 1000);

    let sec = _t % 60;

    if (sec > 0) {
        ret = sec + " sec " + ret;
    }

    _t = Math.floor(_t / 60);

    let min = _t % 60;

    if (min > 0) {
        ret = min + " min " + ret;
    }

    _t = Math.floor(_t / 60);

    if (_t > 0) {
        ret = _t + " h " + ret;
    }

    return ret;
}

function ConsumeAssetID(i = 0) {
    var rgAJAXParams = {
        sessionid: g_sessionID,
        appid: appID,
        item_type: 100,
        assetid: assetIDsToConsume[i],
        actionparams: '{"action":"consume_winter2018"}'
    };

    var strActionURL = g_strProfileURL + "/ajaxactivateconsumable/";

    $J.post(strActionURL, rgAJAXParams).done(
        function (data) {
            if (data["bActivated"]) {
                activated += 1;
            }
            else {
                errored += 1
            }
        }
    ).fail(
        function (data) {
            console.log(data);

            errored += 1
            //alert("Unexpected error! Check console log for details");
        }
    ).always(
        function () {
            modal.Dismiss();
            modal = ShowBlockingWaitDialog('Consuming', '<div style="display: inline-block;margin-left: 20px;">' +
                `<span style="color: lightseagreen;">Consuming Knick-Knacks: ${errored + activated}/${limit}</span>`
                + (errored ? `<br><span style="color:#d25d67;">Failed: ${errored}</span>` : '') + '</div>');

            if (activated + errored == limit) {
                modal.Dismiss();

                let timePassed = msToTimeStr((new Date()).getTime() - startTime);

                modal = ShowConfirmDialog('Completed!', `Successfully consumed: <span style="color: lightseagreen;">${activated} Knick-Knack${(activated == 1 ? '' : 's')}</span>
                    <br>Time passed: <span style="color: lightseagreen;">${timePassed}</span>
                    <br>Percentage of successful requests: <span style="color: lightseagreen;">${Math.round((1 - errored / limit) * 100 * 100) / 100}%</span>`
                    + (errored ? `<br><br><span style="color:#ff7b7b;">Failed ${errored} request${(errored == 1 ? '' : 's')}. Check console log for more info` : ''),
                    'OK', 'Close', 'By /id/Lutymane');

                $J('.newmodal_buttons .btn_darkblue_white_innerfade.btn_medium').click(
                    function () {
                        location.href = 'https://steamcommunity.com/id/Lutymane';
                    }
                );

                activated = 0;
                errored = 0;
            }
        }
    );

    i += 1;

    if (i < limit) {
        setTimeout(() => {
            ConsumeAssetID(i);
        }, timeout);
    }
}

var batch = 1;
function FetchAssetIDs(start = 0) {
    modal = ShowBlockingWaitDialog('Info', `Processing inventory items info. <span style="color:#b698cc;">Batch: ${batch}</span>`);

    $J.get("/inventory/" + g_steamID + "/753/6?count=2000&start_assetid=" + start).done(function (inventory) {
        inventory["descriptions"].forEach(d => {
            d["tags"].forEach(t => {
                if (t["internal_name"] == "item_class_6") {
                    if (!classIDsBlackList.includes(d["classid"])) {
                        classIDsToConsume.push(d["classid"]);
                    }
                }
            });
        });

        inventory["assets"].forEach(a => {
            if (classIDsToConsume.includes(a["classid"])) {
                assetIDsToConsume.push(a["assetid"]);
            }
        });

        if (inventory["more_items"]) {
            modal.Dismiss();

            batch += 1;

            FetchAssetIDs(inventory["last_assetid"]);
        }
        else {
            console.log(assetIDsToConsume);

            batch = 0;

            let modal_input = null;

            modal.Dismiss();
            modal = ShowConfirmDialog('Warning', `Found <span style="color:#b698cc;">${assetIDsToConsume.length} Knick-Knacks!</span>` +
                '<br><br><span style="color:lightseagreen;">Limit consuming</span>' +
                '<input type="number" id="knacks_limit" style="margin-left: 20px;"><br><br>',
                "Start", "Exit"
            ).done(function () {
                if (modal_input.val())//$J('#knacks_limit').val() doesn't work -- it just doesn't update the object for some reason -- needs investigation why
                {
                    limit = parseInt(modal_input.val());

                    if (limit > assetIDsToConsume.length) {
                        limit = assetIDsToConsume.length;
                    }

                    if (limit > 0) {
                        startTime = (new Date()).getTime();

                        modal.Dismiss();
                        modal = ShowBlockingWaitDialog('Consuming', '<div style="display: inline-block;margin-left: 20px;">' +
                            `<span style="color: lightseagreen;">Consuming Knick-Knacks: ${errored + activated}/${limit}</span>`
                            + (errored ? `<br><span style="color:#b698cc;">Failed: ${errored}</span>` : '') + '</div>');

                        ConsumeAssetID();
                    }
                }
            });

            modal_input = $J('#knacks_limit');
            modal_input.val(assetIDsToConsume.length);
        }

    }).fail(
        function (data) {
            console.log(data);
            alert("Error loading the inventory!");
        }
    );
}

$J(function () {
    $J('.inventory_rightnav').prepend(btn_html);
    $J(`#${btn_id_selector}`).click(() => FetchAssetIDs());
});
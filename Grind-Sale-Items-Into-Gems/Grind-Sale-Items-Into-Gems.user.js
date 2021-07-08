// ==UserScript==
// @name         Grind Sale Items Into Gems
// @icon         https://store.steampowered.com/favicon.ico
// @namespace    steam
// @version      2.4.2
// @description  Choose how many and what sale items you want to grind into gems in few clicks
// @author       Lutymane
// @match        https://steamcommunity.com/*/*/inventory*
// @match        https://steamcommunity.com/*/*/inventory/*
// @homepageURL  https://github.com/Lutymane/Steam-Scripts
// @supportURL   https://github.com/Lutymane/Steam-Scripts/issues
// @updateURL    https://github.com/Lutymane/Steam-Scripts/raw/master/Grind-Sale-Items-Into-Gems/Grind-Sale-Items-Into-Gems.meta.js
// @downloadURL  https://github.com/Lutymane/Steam-Scripts/raw/master/Grind-Sale-Items-Into-Gems/Grind-Sale-Items-Into-Gems.user.js
// @require      https://github.com/Lutymane/Steam-Scripts/raw/master/libs/msToTimeStr.js
// ==/UserScript==

//classids must be strings!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const classid_db =
{
    2018:
    {
        summer:
        {
            appid: 876740,
            classids:
                [
                    /*bgs*/
                    "2879031771", "2879031996", "2879031971", "2879031820", "2879031722", "2879031839", "2879032887",
                    /*emots*/
                    "2879031821", "2879031723", "2879031772", "2879032888", "2879032149", "2879032046", "2879032116"
                ]
        },

        winter:
        {
            appid: 991980,
            classids:
                [
                    /*bgs*/
                    "3120030528", "3133902176", "3127806389", "3121266707", "3124090948",
                    "3129008186", "3136200190", "3127806386", "3135017350", "3120030283",
                    "3132676680", "3121265504", "3124090945", "3126606931", "3131405626",
                    "3124448567", "3135017367", "3123900140", "3130207098", "3127806387",
                    "3125326197", "3135017352", "3132676681", "3131405621", "3120030287",
                    "3129008187", "3123077562", "3122689535", "3136200187", "3133902174",
                    "3126606935", "3130207100", "3120030283", "3120030287", "3120030453",
                    "3120031194", "3120031089", "3120030341", "3120030634", "3120030674",
                    "3120030516",
                    /*emots*/
                    "3120030517", "3120030505", "3120030638", "3120030636", "3126606943",
                    "3130207112", "3124457005", "3120030293", "3121987744", "3132676682",
                    "3127806378", "3133902175", "3129008182", "3121265002", "3121987745",
                    "3133902168", "3135017390", "3131405609", "3122689553", "3126606945",
                    "3120030294", "3129008185", "3132676685", "3136291082", "3127806372",
                    "3120030284", "3121987742", "3135017382", "3127806380", "3132676687",
                    "3120694518", "3123900154", "3132676686", "3126606942", "3122689547",
                    "3131405620", "3126606939", "3135017386", "3121265004", "3126606934",
                    "3122689531", "3120030299", "3124090956", "3133902170", "3124090957",
                    "3120687422", "3131405610", "3133902169", "3129008173", "3121987743",
                    "3135017384", "3130207120", "3130207111", "3122689558", "3129008179",
                    "3131405619",
                ]
        }
    },

    2019: {
        summer: null,//lol didn't we really have any things?

        winter:
        {
            appid: 1195670,
            classids:
                [
                    /*emots*/
                    "3633286981", "3633286844", "3633286938", "3633287062", "3633287093",
                    "3633287178",

                    /*bgs*/
                    "3633286843", "3633286980", "3633287061", "3633287133",
                ]
        },
    },

    2021: {
        summer: {
            appid: 1658760,
            classids: [

                /*emots*/
                "4481679195","4481679134","4481679512","4481679136","4481679471",
                "4481679321","4481679132","4481679130",

                /*bgs*/
                "4481679133", "4481679510", "4481679129", "4481679131", "4481679470",
                "4481679135", "4481679581",
            ]
        }
    }
}

let appID = 0;

let timeout = 550; //ms

let assetIDsToGrind = [];
let classIDsToGrind = [];

let modal = null;

let grinded = 0;
let errored = 0;
let limit = 0;

let statrTime = 0;

function GrindAssetID(i = 0) {
    let formData =
    {
        sessionid: g_sessionID,
        appid: appID,
        assetid: assetIDsToGrind[i],
        contextid: 6,
        goo_value_expected: 100
    }

    $J.post(
        g_strProfileURL + '/ajaxgrindintogoo/',
        formData
    ).done(
        data => {
            if (data.success) {
                grinded += 1;
            }
            else {
                errored += 1
            }
        }
    ).fail(
        data => {
            console.log(data);
            errored += 1;
        }
    ).always(
        () => {
            modal.Dismiss();
            modal = ShowBlockingWaitDialog('Grinding', '<div style="display: inline-block;margin-left: 20px;">' +
                `Grinding items: <span style="color:#b698cc;">${errored + grinded}</span>/<span style="color: lightseagreen;">${limit}</span>`
                + (errored ? `<br>Failed: <span style="color:#d25d67;">${errored}</span>` : '') + '</div>');

            if (grinded + errored == limit) {
                modal.Dismiss();

                let timePassed = msToTimeStr((new Date()).getTime() - startTime);

                modal = ShowConfirmDialog('Completed!', `Successfully grinded: <span style="color: lightseagreen;">${grinded} item${(grinded == 1 ? '' : 's')}</span>
                    <br>Gems earned: <span style="color: lightseagreen;">${grinded * 100} <span style="color:#d25d67;">(+${errored * 100})</span></span>    
                    <br>Time passed: <span style="color: lightseagreen;">${timePassed}</span>
                    <br>Percentage of successful requests: <span style="color: lightseagreen;">${+(Math.round(grinded / limit + "e+4") + "e-2")}%</span>`
                    + (errored ? `<br><br><span style="color:#d25d67;">Failed ${errored} request${(errored == 1 ? '' : 's')}. Check console log for more info` : ''),
                    'OK', 'Close', 'Made by Luty').done(
                        btn_type => {
                            if (btn_type == 'SECONDARY') {
                                location.href = 'https://github.com/Lutymane';
                            }
                        }
                    );

                grinded = 0;
                errored = 0;
                assetIDsToGrind = [];
            }
        }
    );

    i += 1;

    if (i < limit) {
        setTimeout(() => {
            GrindAssetID(i);
        }, timeout);
    }
}

let batch = 1;
function FetchAssetIDs(start = 0) {
    modal = ShowBlockingWaitDialog('Processing inventory', `Batch: <span style="color:#b698cc;">${batch}</span>`);

    $J.get(
        "/inventory/" + g_steamID + "/753/6?count=2000&start_assetid=" + start
    ).done(
        inventory => {
            inventory.assets.forEach(a => {
                if (classIDsToGrind.includes(a.classid)) {
                    assetIDsToGrind.push(a.assetid);
                }
            });

            if (inventory.more_items) {
                modal.Dismiss();

                batch += 1;

                FetchAssetIDs(inventory.last_assetid);
            }
            else {
                console.log(classIDsToGrind);
                console.log(assetIDsToGrind);

                batch = 0;

                let modal_input = null;

                modal.Dismiss();
                modal = ShowConfirmDialog(
                    'Items fetched',
                    `Found <span style="color:#b698cc;">${assetIDsToGrind.length}</span> sale items!` +
                    '<br><br>Limit grinding' +
                    '<input type="number" id="items_limit" style="margin-left: 20px;"><br><br>',
                    (assetIDsToGrind.length > 0 ? "Start" : "OK"), "Exit"
                ).done(
                    () => {
                        if (modal_input.val()) {
                            limit = parseInt(modal_input.val());

                            if (limit > assetIDsToGrind.length) {
                                limit = assetIDsToGrind.length;
                            }

                            if (limit > 0) {
                                startTime = (new Date()).getTime();

                                modal.Dismiss();
                                modal = ShowBlockingWaitDialog('Grinding', '<div style="display: inline-block;margin-left: 20px;">' +
                                    `Grinding items: <span style="color:#b698cc;">${errored + grinded}</span>/<span style="color: lightseagreen;">${limit}</span>`
                                    + (errored ? `<br>Failed: <span style="color:#d25d67;">${errored}</span>` : '') + '</div>');

                                GrindAssetID();
                            }
                        }
                    });

                modal_input = $J('#items_limit');
                modal_input.val(assetIDsToGrind.length);
            }

        }).fail(
            data => {
                console.log(data);
                alert("Error loading the inventory!");
            }
        );
}

let btn_id_selector = 'grind_sale';
let btn_html = `<div class="btn_darkred_white_innerfade btn_medium" id="${btn_id_selector}" style="margin-right: 12px;"><span>Grind Sale Items</span></div>`;

let year_options = '';
for (let y of Object.keys(classid_db)) {
    year_options += '<option>' + y + '</option>';
}

let menu_modal = `
<div>
    <select id="year" class="checkout_content_box gray_bevel dynInput" style="width:130px;height:32px;margin-right: 12px;">
        ${year_options}
    </select>
    Year
</div>
<div>
    <select id="season" class="checkout_content_box gray_bevel dynInput" style="width:130px;height:32px;margin-right: 12px;">
        <option value="summer">Summer</option>
        <option value="winter">Winter</option>
    </select>
    Season
</div>
`;

$J(() => {
    $J('.inventory_rightnav').prepend(btn_html);

    $J(`#${btn_id_selector}`).click(() => {
        let year = null;
        let season = null;

        modal = ShowConfirmDialog(
            'Select Sale',
            menu_modal,
            'Check Items', 'Exit'
        ).done(
            () => {
                let db = classid_db[year.val()][season.val()];

                if (db === null) {
                    ShowAlertDialog("Hold up!", "This event didn't have any grindable items!");
                    return;
                }

                classIDsToGrind = db.classids;
                appID = db.appid;
                FetchAssetIDs();
            }
        );

        year = $J('#year');
        season = $J('#season');
    });
});

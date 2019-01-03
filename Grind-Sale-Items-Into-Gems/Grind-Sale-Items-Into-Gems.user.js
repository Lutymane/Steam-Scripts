// ==UserScript==
// @name         Grind Sale Items Into Gems
// @icon         https://store.steampowered.com/favicon.ico
// @namespace    top_xex
// @version      2.0
// @description  Choose how many and what sale items you want to grind into gems in few clicks
// @author       Lite_OnE
// @match        https://steamcommunity.com/*/*/inventory*
// @match        https://steamcommunity.com/*/*/inventory/*
// @homepageURL  https://xeox.xyz
// @supportURL   https://github.com/LiteOnE/Steam-Scripts/issues
// @updateURL    https://github.com/LiteOnE/Steam-Scripts/raw/master/Grind-Sale-Items-Into-Gems/Grind-Sale-Items-Into-Gems.meta.js
// @downloadURL  https://github.com/LiteOnE/Steam-Scripts/raw/master/Grind-Sale-Items-Into-Gems/Grind-Sale-Items-Into-Gems.user.js
// ==/UserScript==

//classids must be strings!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//use const
var classid_db =
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
                "3120030283","3120030287","3127806389","3129008187","3130207098","3133902174","3135017352","3126606935","3131405626","3120030516",
                "3120030283","3120030287","3135017352","3136200190","3135017350","3122689535","3124448567","3126606935","3123900140","3120031089",
                "3120030283","3120030287","3122689535","3123900140","3120031089","3130207100","3136200187","3131405621","3132676680","3120030516",
                "3120030283","3120030287","3127806389","3129008187","3130207098","3133902174","3135017352","3131405626","3120030516","3125326197",
                "3120030283","3120030287","3132676680","3120030283","3120030341","3132676681","3125326197","3124090948","3120031089","3120030516",
                /*emots*/
                "3120030517","3133902170","3129008179","3129008173","3131405610","3135017382","3135017390","3131405620","3126606942","3121987743",
                "3135017386","3120030505","3121987743","3135017390","3130207111","3131405609","3132676685","3133902170","3127806380","3120030517",
                "3135017386","3120030505","3121987743","3135017390","3130207111","3131405609","3132676685","3133902170","3127806380","3120030517",
                "3120694518","3124090957","3124090956","3120030505","3122689553","3130207111","3120030299","3120687422","3121265002","3135017386",
                "3121987745","3129008179","3135017390","3129008173","3131405610","3135017382","3133902169","3120030517","3133902170","3131405620",
                "3135017386","3120030505","3121987743","3135017390","3130207111","3131405609","3132676685","3133902170","3127806380","3120030517",
            ]
        }
    }
}

var appID = 0;

var timeout = 550; //ms

var assetIDsToGrind = [];
var classIDsToGrind = [];

var modal = null;

var btn_id_selector = 'grind_sale';
var btn_html = `<div class="btn_grey_black btn_medium" id="${btn_id_selector}" style="margin-right: 12px;"><span>Grind Sale Items</span></div>`;

var grinded = 0;
var errored = 0;
var limit   = 0;

var statrTime = 0;

function msToTimeStr(_t)
{
    let ret = "";
    
    ret = (_t % 1000) + " ms";

    _t = Math.floor(_t / 1000);

    let sec = _t % 60;

    if(sec > 0)
    {
        ret = sec + " sec " + ret;
    }
    
    _t = Math.floor(_t / 60);

    let min = _t % 60;
    
    if(min > 0)
    {
        ret = min + " min " + ret;
    }

    _t = Math.floor(_t / 60);

    if(_t > 0)
    {
        ret = _t + " h " + ret;
    }

    return ret;
}

function GrindAssetID(i = 0)
{
    var formData = 
    {
        sessionid: g_sessionID,
        appid: appID,
        assetid: assetIDsToGrind[i],
        contextid: 6,
        goo_value_expected: 100
    }

    $J.post(g_strProfileURL + '/ajaxgrindintogoo/', formData).done(
        function(data)
        {
            if(data['success'] == 1)
            {
                grinded += 1;
            }
            else
            {
                errored += 1
            }
        }
    ).fail(
        function(data)
        {
            console.log(data);
            errored += 1;
        }
    ).always(
        function()
        {
            modal.Dismiss();
            modal = ShowBlockingWaitDialog( 'Grinding', '<div style="display: inline-block;margin-left: 20px;">' +
                    `<span style="color: lightseagreen;">Grinding items: ${errored + grinded}/${limit}</span>`
                    + (errored ? `<br><span style="color:#d25d67;">Failed: ${errored}</span>` : '') + '</div>' );

            if(grinded + errored == limit)
            {
                modal.Dismiss();
            
                let timePassed = msToTimeStr((new Date()).getTime() - startTime);
            
                modal = ShowConfirmDialog('Completed!', `Successfully grinded: <span style="color: lightseagreen;">${grinded} item${(grinded == 1 ? '' : 's')}</span>
                    <br>Gems earned: <span style="color: lightseagreen;">${grinded * 100} <span style="color:#ff7b7b;">(+${errored * 100})</span></span>    
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
            
                grinded = 0;
                errored = 0;
                assetIDsToGrind = [];
            }
        }
    );
    
    i += 1;

    if(i < limit)
    {
        setTimeout(() => {
            GrindAssetID(i);
        }, timeout);
    }
}

var batch = 1;
function FetchAssetIDs(start = 0)
{
    modal = ShowBlockingWaitDialog( 'Info', `Processing inventory items info. <span style="color:#b698cc;">Batch: ${batch}</span>` );
    
    $J.get("/inventory/" + g_steamID + "/753/6?count=2000&start_assetid=" + start).done(function(inventory)
    {
        inventory["assets"].forEach(a =>
        {
            if(classIDsToGrind.includes(a["classid"]))
            {
                assetIDsToGrind.push(a["assetid"]);
            }
        });

        if(inventory["more_items"])
        {
            modal.Dismiss();
            
            batch += 1;
            
            FetchAssetIDs(inventory["last_assetid"]);
        }
        else
        {
            console.log(classIDsToGrind);
            console.log(assetIDsToGrind);
            
            batch = 0;

            let modal_input = null;
            
            modal.Dismiss();
            modal = ShowConfirmDialog('Items fetched', `Found <span style="color:#b698cc;">${assetIDsToGrind.length} sale items!</span>` + 
                '<br><br><span style="color:lightseagreen;">Limit consuming</span>' +
                '<input type="number" id="items_limit" style="margin-left: 20px;"><br><br>',
                (assetIDsToGrind.length > 0 ? "Start" : "OK"), "Exit"
            ).done(function()
            {
                if(modal_input.val())
                {
                    limit = parseInt(modal_input.val());

                    if(limit > assetIDsToGrind.length)
                    {
                        limit = assetIDsToGrind.length;
                    }

                    if(limit > 0)
                    {
                        startTime = (new Date()).getTime();

                        modal.Dismiss();
                        modal = ShowBlockingWaitDialog( 'Grinding', '<div style="display: inline-block;margin-left: 20px;">' +
                            `<span style="color: lightseagreen;">Grinding items: ${errored + grinded}/${limit}</span>`
                            + (errored ? `<br><span style="color:#d25d67;">Failed: ${errored}</span>` : '') + '</div>' );

                        GrindAssetID();
                    }
                }
            });

            modal_input = $J('#items_limit');
            modal_input.val(assetIDsToGrind.length);
        }
        
    }).fail(
        function(data){
            console.log(data);
            alert("Error loading the inventory!");
        }
    );
}

var menu_modal = `
<div>
    <select id="year" class="checkout_content_box gray_bevel dynInput" style="width:130px;height:32px;margin-right: 12px;">
        <option>2018</option>
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

$J(() =>
{
    $J('.inventory_rightnav').prepend(btn_html);
    
    $J(`#${btn_id_selector}`).click(() => 
    {
        let year = null;
        let season = null;
        
        modal = ShowConfirmDialog('Select Sale', menu_modal).done(
            function()
            {
                console.log(2018 + year.prop('selectedIndex'));
                console.log(season.val());
                
                let db = classid_db[2018 + year.prop('selectedIndex')][season.val()];
                classIDsToGrind = db['classids'];
                appID = db['appid'];
                FetchAssetIDs();
            }
        );

        year = $J('#year');
        season = $J('#season');
    });
});
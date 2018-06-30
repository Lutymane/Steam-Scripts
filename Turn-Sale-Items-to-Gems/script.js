//Author: Lite_OnE
//Copyright: XEOX INC.


var SaleItemClassIDs =
[
    /*bgs*/ 2879031771, 2879031996, 2879031971, 2879031820, 2879031722, 2879031839, 2879032887,
    /*emots*/ 2879031821, 2879031723, 2879031772, 2879032888, 2879032149, 2879032046, 2879032116
];

var ItemsContainer = {};
var AssetIDs       = [];
var Modal          = null;

for(var i = 0; i < SaleItemClassIDs.length; i++)
{
    ItemsContainer[SaleItemClassIDs[i]] = [];
}

Modal = ShowBlockingWaitDialog( 'Info', 'Getting inventory items info...' );
FetchAssetIDs(0);

function FetchAssetIDs(start)
{
    $J.get('https://steamcommunity.com/my/inventory/json/753/6/?start=' + start).done(function(data)
    {
        if(data.success == true)
        {
            var rgInventory = data.rgInventory
            
            for(var item in rgInventory)
            {
                if(SaleItemClassIDs.includes(parseInt(rgInventory[item].classid)))
                {
                    ItemsContainer[rgInventory[item].classid].push(rgInventory[item].id)
                }
            }

            if(data.more == true)
            {
                Modal.Dismiss();
                Modal = ShowBlockingWaitDialog( 'Info', 'Getting inventory items info. Batch ' + ((start + 2000)/2000 + 1) + '...' );
                FetchAssetIDs(start + 2000);
            }
            else
            {
                Modal.Dismiss();
                JoinAssetIDs();
                Modal = ShowConfirmDialog('Warning', 'Found <span style="color:#b698cc;">%c</span> items!<br>'.replace('%c', AssetIDs.length) + (AssetIDs.length ? '<span style="color:#ff7b7b;">Are you sure you want to turn them into gems?</span>' : '')).done(function()
                {
                    GrindItemsIntoGems(0);
                });
            }
        }
        
    });
}

function JoinAssetIDs()
{
    Object.values(ItemsContainer).forEach(function(Arr){AssetIDs = AssetIDs.concat(Arr);});
}

var TotalGemsRecieved = 0;
var TotalGems         = 0;
var CheckRequests     = 0;

function GrindItemsIntoGems(start_index)
{
    for(var i = start_index; i < Math.min(start_index + 150, AssetIDs.length); i++)
    {
        var index = i;

        var FormData = 
        {
            sessionid: g_sessionID,
            appid: 876740,
            assetid: AssetIDs[index],
            contextid: 6,
            goo_value_expected: 100
        }

        Modal.Dismiss();
        Modal = ShowAlertDialog( 'Processing', 'Processing ' + AssetIDs.length + ' items...');
        
        $J.post(g_strProfileURL + '/ajaxgrindintogoo/', FormData).done(function(data)
        {
            if(data.success == 1)
            {
                CheckRequests++;

                Modal.Dismiss();
                Modal = ShowAlertDialog( 'Processing', CheckRequests + '\\' + AssetIDs.length + ' have been turned into gems');
                
                TotalGemsRecieved += parseInt(data["goo_value_received "]);
                
                if(CheckRequests == AssetIDs.length)
                {
                    TotalGems = data.goo_value_total;
                    Modal.Dismiss();
                    Modal = ShowAlertDialog( 'Done!', 'Gems Received for breaking items: <span style="color:green;">' + TotalGemsRecieved + '</span><br>Total Gems Count: <span style="color:#e698cc;">' + TotalGems + '</span>');
                    return;
                }
            }
        }).fail(function(data)
        {
            
        });
    }
    //);

    if(start_index + 150 < AssetIDs.length)
    {
        setTimeout(function(){ GrindItemsIntoGems(start_index + 150); }, 5000);
    }
}

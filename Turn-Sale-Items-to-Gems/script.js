//Author: Lite_OnE
//Version: 1.3
//Copyright: XEOX INC.
//Many thanks to MrSteakPotato and Dacer for testing <3


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
                Modal = ShowBlockingWaitDialog( 'Info', 'Getting inventory items info. Batch ' + ((start)/2000 + 2) + '...' );
                FetchAssetIDs(start + 2000);
            }
            else
            {
                Modal.Dismiss();

                Object.values(ItemsContainer).forEach(function(Arr){AssetIDs = AssetIDs.concat(Arr);});

                Modal = ShowConfirmDialog('Warning', 'Found <span style="color:#b698cc;">%c</span> items!<br>'.replace('%c', AssetIDs.length) + (AssetIDs.length ? '<span style="color:#ff7b7b;">Are you sure you want to turn them into gems?</span>' : '')).done(function()
                {
                    Start_Time = (new Date()).getTime();
                    GrindItemsIntoGems(0);
                });
            }
        }
        
    });
}

var TotalGemsRecieved = 0;
var TotalGems         = 0;
var CheckRequests     = 0;
var FailedRequests    = 0;
var bLimitExceeded    = false;
var LimitExceededMessage = '<br><span style="color:#D42F2F;">Limit exceeded! We will wait 30 seconds before processing the next batch...</span>';

//`dIndex` items per `dTimeout` milliseconds
var dTimeout          = 1500;
var dIndex            = 5;

var Start_Time        = 0;
var Finish_Time       = 0;

function GrindItemsIntoGems(start_index)
{
    setTimeout(function()
    {
        if(FailedRequests > 70)
        {
            alert('>70 requests failed. Script is blocked.');
            return;
        }
        
        bLimitExceeded = false;
        
        for(var i = start_index; i < Math.min(start_index + dIndex, AssetIDs.length); i++)
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

            //Modal.Dismiss();
            //Modal = ShowBlockingWaitDialog( 'Processing', 'Processing ' + AssetIDs.length + ' items...' + (bLimitExceeded ? LimitExceededMessage : ''));

            $J.post(g_strProfileURL + '/ajaxgrindintogoo/', FormData).done(function(data)
            {
                if(data.success == 1)
                {
                    CheckRequests++;

                    Modal.Dismiss();
                    Modal = ShowBlockingWaitDialog( 'Processing', CheckRequests + '\\' + AssetIDs.length + ' have been turned into gems' + (bLimitExceeded ? LimitExceededMessage : ''));

                    TotalGemsRecieved += parseInt(data["goo_value_received "]);

                    if((CheckRequests + FailedRequests) == AssetIDs.length)
                    {
                        Finish_Time = (new Date()).getTime();
                        var dTime = (Finish_Time - Start_Time) / 1000; //get seconds
                        console.log('dTime = ' + dTime);
                        
                        TotalGems = data.goo_value_total;
                        Modal.Dismiss();
                        Modal = ShowAlertDialog( 'Done!', 'Gems Received for breaking items: <span style="color:green;">' + TotalGemsRecieved + '</span><br>Total Gems Count: <span style="color:#e698cc;">' + TotalGems + '</span>');
                        return;
                    }
                }
                else
                {
                    console.log(data);
                }
            }).fail(function(data)
            {
                FailedRequests++;
                bLimitExceeded = true;
                console.log(data);
                //500 | {"success":16,"message":"There was an error communicating with the network. Please try again later."}                
            });
        }

        if(start_index + dIndex < AssetIDs.length)
        {
            setTimeout(function(){ GrindItemsIntoGems(start_index + dIndex); }, (dTimeout + Math.trunc(FailedRequests/10)*100));
        }
    }, (bLimitExceeded ? 30000 : 0));
}

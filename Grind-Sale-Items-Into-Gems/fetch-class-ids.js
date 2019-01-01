var str = '';
var len = $J('.market_listing_row_link').length;
var count = 0;

$J.each($J('.market_listing_row_link'), async function(i, e)
{
    await $J.get($J(e).attr('href')).done(function(data){
        var classid = data.split('"classid":"')[1].split('"')[0];
        str += '"' + classid + '",';//store as strings
        count += 1;
    });

    if(count == len){
        console.log(str);
    }
});
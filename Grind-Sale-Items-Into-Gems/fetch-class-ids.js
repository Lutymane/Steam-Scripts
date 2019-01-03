var str = '';

var page_count = $J('#searchResults_links').children().length;
const class_bg = 3;
const class_emot = 4;

var item_class = class_emot;

var link = `https://steamcommunity.com/market/search?q=&category_753_Game%5B%5D=any&category_753_Event%5B%5D=tag_wintersale2018&category_753_item_class%5B%5D=tag_item_class_${item_class}&appid=753`;

for(let i = 1; i <= page_count; i += 1){

    $J.ajax(
        {
            url: link + `#p${i}_name_asc`,
            async: false
        }
    ).done((data) => {
        $J.each(
            $J(data).find('.market_listing_row_link')
            , (index, e) => 
            {
               $J.ajax(
                   {
                       url: $J(e).attr('href'),
                       async: false
                   }
               ).done(function(data){
                    var classid = data.split('"classid":"')[1].split('"')[0];
                    str += '"' + classid + '",';
                });
            }
        );
    });

    str += '\n';
}

console.log(str);
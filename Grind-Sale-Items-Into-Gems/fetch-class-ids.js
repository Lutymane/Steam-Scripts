var str = '';

var class_bg = 3;
var class_emot = 4;

var item_class = class_emot;

var link = `https://steamcommunity.com/market/search/render/?query=&start=0&count=100&search_descriptions=0&sort_column=name&sort_dir=asc&appid=753&category_753_Game[]=any&category_753_Event[]=tag_wintersale2018&category_753_item_class[]=tag_item_class_${item_class}`;

var count_total = 0;
var count_cur   = 0;

$J.get(link).done(
    data => 
    {
        var rgx = /https:\/\/steamcommunity.com\/market\/listings\/753\/[-%A-Za-z0-9_]+/g;
        items = data['results_html'].match(rgx);
        count_total = items.length;
        
        for(let i = 0; i < count_total; i += 1)
        {
            if(i % 5 == 0)
            {
                str += '\n';
            }
            
            $J.ajax(
                {
                    url: items[i],
                    async: false
                }
            ).done(
                item =>
                {
                    var classid = "";
                    
                    try
                    {
                        classid = item.split('"classid":"')[1].split('"')[0];
                    }
                    catch(e)
                    {
                        console.log(item);
                        return;
                    }
                    
                    str += '"' + classid + '",';
                }
            );
        }

        console.log(str);
    }
);
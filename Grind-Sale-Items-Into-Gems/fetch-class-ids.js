const classes = {
    bg: 3,
    emot: 4
}

const seasons = {
    winter: 'wintersale',
    summer: 'summersale'
}

let query_params = {
    class: classes.bg,
    year: 2019,
    season: seasons.winter
}

let fetch_link = `https://steamcommunity.com/market/search/render/?query=&start=0&count=100&search_descriptions=0&sort_column=name&sort_dir=asc&appid=753&category_753_Game[]=any&category_753_Event[]=tag_${query_params.season}${query_params.year}&category_753_item_class[]=tag_item_class_${query_params.class}`;

let count_total = 0;
let count_cur = 0;

let result_string = '';

$J.get(fetch_link).done(
    data => {
        let item_link_regex = /https:\/\/steamcommunity.com\/market\/listings\/753\/[-%A-Za-z0-9_]+/g;
        let item_links = data.results_html.match(item_link_regex);
        count_total = item_links.length;

        for (let i = 0; i < count_total; i += 1) {
            $J.get(item_links[i]).done(
                item => {
                    let classid = item.split('"classid":"')[1].split('"')[0];
                    result_string += '"' + classid + '",';

                    count_cur += 1;

                    if (count_cur == count_total) {
                        console.log(result_string);
                    }
                    else if (count_cur % 5 == 0) {
                        result_string += '\n';
                    }
                }
            );
        }
    }
);

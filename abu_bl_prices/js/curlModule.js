const curlRequest = (cardName) => {
    const url = "https://data.abugames.com/solr/nodes/select?facet.field=magic_edition&facet.field=rarity&facet.field=buy_price&facet.field=trade_price&facet.field=language&facet.field=card_style&facet.mincount=1&facet.limit=-1&facet=on&indent=on&q=*:*&fq=%2Bcategory%3A%22Magic%20the%20Gathering%20Singles%22%20%20-buy_price%3A0%20-buy_list_quantity%3A0%20-magic_features%3A(%22Actual%20Picture%20Card%22)%20%2B(simple_title%3A%22{{card name}}%22%20OR%20display_title%3A%22{{card name}}%22%20OR%20display_title_search%3A%22{{card name}}*%22%20OR%20display_title_search%3A%22{{card name}}*%22)%20%2B(simple_title%3A%22{{card name}}%22%20OR%20display_title%3A%22{{card name}}%22%20OR%20display_title_search%3A%22{{card name}}*%22%20OR%20display_title_search%3A%22{{card name}}*%22)%20%2Blanguage%3A(%22English%22)&sort=magic_edition_sort%20asc,%20display_title%20asc&fl=id,artist,border,card_number,card_style,card_type,color,converted_mana,language,layout,magic_edition,magic_edition_sort,magic_features,category,complete_description,loyalty,mana_cost,multiverseid,rarity,tournament_formats,title,product_id,display_title,simple_title,price,quantity,buy_list_quantity,buy_price,trade_price,condition,image,media,power,production_status,subtype,toughness,card_number&group=true&group.field=product_id&group.ngroups=true&group.limit=10&start=0&rows=12&wt=json".replace(/{{card name}}/g,cardName);

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => createDataPoints(result.grouped.product_id.groups))
        .catch(error => writeError(error, cardName));
}
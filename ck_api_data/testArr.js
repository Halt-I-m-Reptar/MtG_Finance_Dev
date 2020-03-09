var json = getJson();

//var d = [];
//json.data.forEach(x => d[x.id] = x)
/*
var ckId = [];
json.data.forEach(data => 

    ckId.push([data.edition],[DataTransfer.name],[data])
    
);

var ckId = [];
json.data.forEach(data => {
ckId[data.edition] = data.name.push({data})
//ckId[data.edition][data.name] = data;
});
    */
function getJson() {
    return {
        "meta": {
        "created_at": "2020-03-07 17:01:39",
        "base_url": "https://www.cardkingdom.com/"
        },
        "data": [
        {
            "id": 10000,
            "sku": "4ED-117",
            "url": "mtg/4th-edition/abomination",
            "name": "Abomination",
            "variation": "",
            "edition": "4th Edition",
            "is_foil": "false",
            "price_retail": "0.25",
            "qty_retail": 17,
            "price_buy": "0.05",
            "qty_buying": 0
        },
        {
            "id": 10001,
            "sku": "4ED-059",
            "url": "mtg/4th-edition/air-elemental",
            "name": "Air Elemental",
            "variation": "",
            "edition": "4th Edition",
            "is_foil": "false",
            "price_retail": "0.25",
            "qty_retail": 35,
            "price_buy": "0.05",
            "qty_buying": 0
        },
        {
            "id": 10002,
            "sku": "4ED-001",
            "url": "mtg/4th-edition/alabaster-potion",
            "name": "Alabaster Potion",
            "variation": "",
            "edition": "4th Edition",
            "is_foil": "false",
            "price_retail": "0.25",
            "qty_retail": 21,
            "price_buy": "0.05",
            "qty_buying": 0
        }
        ]
    };
}
function curlRequest() {
    var url = "https://api.cardkingdom.com/api/pricelist";

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => readableOutput(result))
        .catch(error => writeError(error));
}

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
        },
        {
            "id": 10003,
            "sku": "4ED-291",
            "url": "mtg/4th-edition/aladdins-lamp",
            "name": "Aladdin's Lamp",
            "variation": "",
            "edition": "4th Edition",
            "is_foil": "false",
            "price_retail": "0.35",
            "qty_retail": 22,
            "price_buy": "0.05",
            "qty_buying": 0
        },
        {
            "id": 10004,
            "sku": "4ED-292",
            "url": "mtg/4th-edition/aladdins-ring",
            "name": "Aladdin's Ring",
            "variation": "",
            "edition": "4th Edition",
            "is_foil": "false",
            "price_retail": "0.29",
            "qty_retail": 15,
            "price_buy": "0.05",
            "qty_buying": 0
        }
        ]
    };
}
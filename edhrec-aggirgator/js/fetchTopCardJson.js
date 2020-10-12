function getTopCardJson(selection) {
    var jsonUrls = {
        "topCommanders": "https://edhrec-json.s3.amazonaws.com/en/commanders.json",
        "topCards": "https://edhrec-json.s3.amazonaws.com/en/top.json",
        "topCreatures": "https://edhrec-json.s3.amazonaws.com/en/top/creatures.json",
        "topInstants": "https://edhrec-json.s3.amazonaws.com/en/top/instants.json",
        "topSorceries": "https://edhrec-json.s3.amazonaws.com/en/top/sorceries.json",
        "topArtifacts": "https://edhrec-json.s3.amazonaws.com/en/top/artifacts.json",
        "topEnchantments": "https://edhrec-json.s3.amazonaws.com/en/top/enchantments.json",
        "topPlaneswalkers": "https://edhrec-json.s3.amazonaws.com/en/top/planeswalkers.json",
        "topLands": "https://edhrec-json.s3.amazonaws.com/en/top/lands.json"
    };
    return getJson(jsonUrls[selection]);
}

async function getJson(url) {
    var topCardArr = [];
    await new Promise(done => $.getJSON(url, function(topCardObj) {
        topCardArr = createTopCardArr(topCardObj, 'cardlists');
        done();
    }));
    return topCardArr;
}

function createTopCardArr(topCardObj, cardLoc){
    var cardArr = topCardObj.container.json_dict[cardLoc].map(data => data);
    if (window.isDebug) { debugOutput({"name": "cardArr", "data": cardArr}); }
    return cardArr.map(dates => {
        var cardData = dates.cardviews.map((cardData) => {
            return {'name': cardData.name, 'deckInfo': cardData.label.replace(/[\n\r]+/g,' '), 'prices': cardData.prices, 'url': cardData.url}
        });
        var returnObject = {};
        returnObject[dates.tag] = cardData;
        return returnObject;
    });
}

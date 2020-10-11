function getTopCardJson(selection) {
    var jsonUrls = {
        "topCards": "https://edhrec-json.s3.amazonaws.com/en/top.json",
        "topCommanders": "https://edhrec-json.s3.amazonaws.com/en/commanders.json"
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

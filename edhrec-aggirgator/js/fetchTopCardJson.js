async function getTopCardJson() {
    var topCardURL = "https://edhrec-json.s3.amazonaws.com/en/top.json";
    var topCardArr = [];
    await new Promise(done => $.getJSON(topCardURL, function(topCardObj) {
        topCardArr = createTopCardArr(topCardObj, 'cardlists');
        done();
    }));
    return topCardArr;
}

function getTopCommandersJson() {
    var topCardURL = "https://edhrec-json.s3.amazonaws.com/en/commanders.json";
    var topCommanderArr = [];
    $.getJSON(topCardURL, function(topCardObj) {
        topCommanderArr = createTopCardArr(topCardObj, 'cardlists');
    });
}

function createTopCardArr(topCardObj, cardLoc){
    var cardArr = topCardObj.container.json_dict[cardLoc].map(data => data);
    if (window.isDebug) { debugOutput({"name": "cardArr", "data": cardArr}); }
    var cardMapArr = cardArr.map(dates => {
        var cardData = dates.cardviews.map((cardData) => {
            return {'name': cardData.name, 'deckInfo': cardData.label.replace(/[\n\r]+/g,' '), 'prices': cardData.prices}
        });
        var returnObject = {};
        returnObject[dates.tag] = cardData;
        return returnObject;
    });
    return cardMapArr;
}

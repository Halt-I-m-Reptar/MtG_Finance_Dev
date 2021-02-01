const getTopCardJson = (selection) => getJson(topUrlList()[selection]);

async function getJson(url) {
    let topCardArr = [];
    await new Promise(done => $.getJSON(url, function(topCardObj) {
        topCardArr = createTopCardArr(topCardObj, 'cardlists');
        done();
    }));
    return topCardArr;
}

function createTopCardArr(topCardObj, cardLoc){
    const cardArr = topCardObj.container.json_dict[cardLoc].map(data => data);
    let returnObject = {};
    if (window.isDebug) { debugOutput({"name": "cardArr", "data": cardArr}); }
    return cardArr.map(dates => {
        returnObject[dates.tag] = dates.cardviews.map((cardData) => {
            return {
                'name': cardData.name,
                'deckInfo': cardData.label.replace(/[\n\r]+/g, ' '),
                'prices': cardData.prices,
                'url': cardData.url
            }
        });
        return returnObject;
    })[0];
}

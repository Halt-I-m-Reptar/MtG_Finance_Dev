function getTopCardJson() {
    var topCardURL = "https://edhrec-json.s3.amazonaws.com/en/top.json";
    $.getJSON(topCardURL, function(topCardObj) {
        outputTopCards(topCardObj, 'cardlists');
    });
}

function getTopCommandersJson() {
    var topCardURL = "https://edhrec-json.s3.amazonaws.com/en/commanders.json";
    $.getJSON(topCardURL, function(topCardObj) {
        outputTopCards(topCardObj, 'cardlists');
    });
}

function outputTopCards(topCardObj, cardLoc){
    var dataDisplay = document.getElementById("displayTopCards").innerText;
    var cardObj = topCardObj.container.json_dict[cardLoc].map(data => data);
    console.log(cardObj);
    var displayObj = cardObj.map(dates => {
        var cardData = dates.cardviews.map((cardData) => {
            return {'name': cardData.name, 'deckInfo': cardData.label.replace(/[\n\r]+/g,' '), 'prices': cardData.prices}
        });
        var returnObject = {};
        returnObject[dates.tag] = cardData;
        return returnObject;
    });
    console.log(displayObj);
}

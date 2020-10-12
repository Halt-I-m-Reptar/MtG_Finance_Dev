function outputTopCards(cardArr) {
    outputToTable(cardArr);
}

function createSectionHtml(cardArr) {
    return cardArr.reduce((acc, cur) => {
        Object.keys(cur).forEach(dateRange => {
            acc += "<div class='displayTable'><h3 class='" + dateRange +"'>" + dateRange + "</h3><table id='" + dateRange + "-table'><tr><th>Card Name</th><th>Playability Info</th><th>CK</th><th>TCG</th></tr>";
        });
        Object.values(cur).forEach(cardInfo => {
            cardInfo.forEach(cardData => {
                acc += "<tr><td id='cardName'><a href='https://www.edhrec.com" + cardData.url + "' target='_blank'>" + cardData.name + "</a></td>" + "<td id='deckInfo'>" + cardData.deckInfo + "</td>" +
                    "<td><a href='" + cardData.prices.cardkingdom.url.split("?")[0] + "' target='_blank'>" + cardData.prices.cardkingdom.price + "</a></td><td><a href='" + cardData.prices.tcgplayer.url.split("?")[0] + "' target='_blank'>" + cardData.prices.tcgplayer.price + "</a></td></tr>";
            })
        });
        acc += "</table></div>";
        return acc;
    }, '');
}

async function outputToTable(cardArr) {
    document.getElementById("displayTopCards").innerHTML = await createSectionHtml(cardArr);
    updateStatus({"status": true, "statusMsg": "Successfully Retrieved"});
    toggleVisibility();
}
async function outputTopCards(cardArr) {
    document.getElementById("displayTopCards").innerHTML = await createSectionHtml(cardArr);
    updateStatus({"status": true, "statusMsg": "Successfully Retrieved"});
}

function createSectionHtml(cardArr) {
    return cardArr.reduce((acc, cur) => {
        Object.keys(cur).forEach(dateRange => {
            acc += "<div id='displayTable'><h3>" + dateRange + "</h3><table><tr><th>Card Name</th><th>Playability Info</th></tr>";
        });
        Object.values(cur).forEach(cardInfo => {
            cardInfo.forEach(cardData => {
                acc += "<tr><td id='cardName'>" + cardData.name + "</td><td id='deckInfo'>" + cardData.deckInfo + "</td></tr>";
            })
        });
        acc += "</table></div>";
        console.log(acc);
        return acc;
    }, '');
}

function outputToTable() {
    //h3: date range
    //table header: card name, edhrec label


}
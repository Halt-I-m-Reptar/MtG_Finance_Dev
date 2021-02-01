const outputTopCards = (cardArr) => outputToTable(cardArr);

const updateStatus = (displayData) => document.getElementById("displayStatus").innerText = displayData.statusMsg;

function createSectionHtml(cardArr) {
    let displayData = '';
    Object.keys(cardArr).forEach( dateRange => {
        displayData += "<div class='displayTable'><h3 class='" + dateRange +"'>" + dateRange + "</h3><table id='" + dateRange + "-table'><tr><th>Card Name</th><th>Playability Info</th><th>CK</th><th>TCG</th></tr>";
        cardArr[dateRange].forEach( cardArr => {
            displayData += "<tr><td id='cardName'><a href='https://www.edhrec.com" + cardArr.url + "' target='_blank'>" + cardArr.name + "</a></td>" + "<td id='deckInfo'>" + cardArr.deckInfo + "</td>" +
                "<td><a href='" + cardArr.prices.cardkingdom.url.split("?")[0] + "' target='_blank'>" + cardArr.prices.cardkingdom.price + "</a></td><td><a href='" + cardArr.prices.tcgplayer.url.split("?")[0] + "' target='_blank'>" + cardArr.prices.tcgplayer.price + "</a></td></tr>";
        });
        displayData += "</table></div>";
    });
    return displayData;
}

async function outputToTable(cardArr) {
    document.getElementById("displayTopCards").innerHTML = await createSectionHtml(cardArr);
    updateStatus({"status": true, "statusMsg": "Successfully Retrieved"});
    toggleVisibility();
}

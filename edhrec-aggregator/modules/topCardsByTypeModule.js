const getTopCardsWorker = () => {
    resetDisplay();
    writeContentToDisplay(`Gathering the top ${getCartTypeValue()}.`);
    displayLoadIcon();
    curlRequest( shapeCurlURL(), 'top' );
}

const shapeCurlURL = () => `https://json.edhrec.com/pages/top/${ getCartTypeValue() }.json`;

const createTopCardDataSet = (json) => {
    displayLoadIcon();
    createOutputTable();
    displayTopCardList( json.container['json_dict']['cardlists']);
}

const createOutputTable = () => document.getElementById("displayTopCards").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Name</th><th>Sanitized</th><th>Sanitized WO</th><th>URL</th><th>Inclusion</th><th>Label</th><th>Num Decks</th><th>Potential Decks</th><th>Percentage Usage</th><th>Time Period</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';

const displayTopCardList = (topCardList) => {
    const table = document.getElementById("displayData");
    let cell;
    let row;
    topCardList.forEach( (cardsByTime, timeIndex) => {
        row = table.insertRow();
        cardsByTime['cardviews'].forEach( cardsInList => {
            row = table.insertRow();
            Object.keys(cardsInList).forEach( (cardElements, elementIndex) => {
                if(cardElements === 'cards') { return; }
                cell = row.insertCell( );
                cell.innerHTML = cardsInList[cardElements];
            });
            cell = row.insertCell();
            cell.innerHTML = `${percentDecks(cardsInList['num_decks'], cardsInList['potential_decks'])}%`;
            cell = row.insertCell();
            cell.innerHTML = cardsByTime.header;
            cell.id = `caption-${timeIndex}`;
        })
    })
}

const percentDecks = (numerator, demonimator) => ((numerator / demonimator) * 100).toFixed(2)

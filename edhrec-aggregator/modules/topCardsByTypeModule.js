const getTopCardsWorker = () => {
    resetDisplay();
    const cardType = getCardTypeValue()
    writeContentToDisplay(`Gathering the top ${cardType}.`);
    displayLoadIcon();
    curlRequest( shapeCurlURL(cardType, 'top'), 'type' );
}

const createTopCardByTypeDataSet = (json) => {
    displayLoadIcon();
    createOutputTable();
    displayTopCardList( json.container['json_dict']['cardlists']);
}

const displayTopCardList = (topCardsList) => {
    const table = document.getElementById("displayData");
    let cell;
    let row;
    topCardsList.forEach( (cardsByTime, timeIndex) => {
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

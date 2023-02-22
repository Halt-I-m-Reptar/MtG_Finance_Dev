/*
top cards by type
    date breakout is contained in the same object

top cards by color (w, u, b, r, g, colorless, multi)
https://json.edhrec.com/pages/top/w.json
*/

const getTopCardsByColorWorker = () => {
    resetDisplay();
    const cardColor = getCardColorValue();
    writeContentToDisplay(`Gathering the top ${ getCardColorText() } cards.`);
    displayLoadIcon();
    curlRequest( shapeCurlURL(cardColor, 'top'), 'color' );
}

const createTopCardByClorDataSet = (json) => {
    displayLoadIcon();
    writeContentToDisplay( json.header );
    createOutputTable();
    displayTopCardsByColorList( json.container['json_dict']['cardlists']);
}

const displayTopCardsByColorList = (topCardsByColorList) => {
    const table = document.getElementById("displayData");
    let cell;
    let row;
    topCardsByColorList.forEach( (cardsByType, typeIndex) => {
        console.log(cardsByType);
        cardsByType['cardviews'].forEach( cardsInList => {
            row = table.insertRow();
            Object.keys(cardsInList).forEach( (cardElements, elementIndex) => {
                if(cardElements === 'cards') { return; }
                cell = row.insertCell( );
                cell.innerHTML = cardsInList[cardElements];
            });
            cell = row.insertCell();
            cell.innerHTML = `${percentDecks(cardsInList['num_decks'], cardsInList['potential_decks'])}%`;
            cell = row.insertCell();
            cell.innerHTML = cardsByType['header'];
            cell.id = `caption-${typeIndex%3}`;
        })
    })
}

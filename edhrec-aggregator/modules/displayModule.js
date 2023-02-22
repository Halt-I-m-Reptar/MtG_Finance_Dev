const createTopsCardDataSet = (json) => {
    displayLoadIcon();
    writeContentToDisplay( json.header );
    createCardOutputTable();
    displayTopCardList( json.container['json_dict']['cardlists'], 'cards');
}

const createTopCommanderDataSet = (json) => {
    displayLoadIcon();
    writeContentToDisplay( json.header );
    createCommanderOutputTable();
    displayTopCardList( json.container['json_dict']['cardlists'], 'commander');
}

const createCardOutputTable = () => document.getElementById("displayTopCards").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Name</th><th>Sanitized</th><th>Sanitized WO</th><th>URL</th><th>Inclusion</th><th>Label</th><th>Num Decks</th><th>Potential Decks</th><th>Percentage Usage</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';

const createCommanderOutputTable = () => document.getElementById("displayTopCards").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Name</th><th>Sanitized</th><th>Sanitized WO</th><th>URL</th><th>Inclusion</th><th>Label</th><th>Num Decks</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';

const percentOfDecks = (numerator, demonimator) => ((numerator / demonimator) * 100).toFixed(2)

const displayTopCardList = (topCardsList, checkType) => {
    const table = document.getElementById("displayData");
    let cell;
    let row;
    topCardsList.forEach( (cardsByTime, timeIndex) => {
        cardsByTime['cardviews'].forEach( cardsInList => {
            row = table.insertRow();
            Object.keys(cardsInList).forEach( (cardElements, elementIndex) => {
                if(cardElements === 'cards') { return; }
                cell = row.insertCell( );
                cell.innerHTML = cardsInList[cardElements];
            });
            if (checkType !== 'commander') {
                cell = row.insertCell();
                cell.innerHTML = `${percentOfDecks(cardsInList['num_decks'], cardsInList['potential_decks'])}%`;
            }
            cell = row.insertCell();
            cell.innerHTML = cardsByTime.header;
            cell.id = `caption-${timeIndex}`;
        })
    })
}

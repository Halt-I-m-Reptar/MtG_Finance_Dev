const createTopsCardDataSet = (json, topCardType) => {
    displayLoadIcon();
    writeContentToDisplay( json.header );
    if (topCardType === 'cards') { createCardOutputTable(); }
    if (topCardType === 'commander') { createCommanderOutputTable(); }
    displayTopCardList( json.container['json_dict']['cardlists'], topCardType);
}

const createTopCommanderByColorDataSet = (json) => {
    displayLoadIcon();
    writeContentToDisplay( json.header );
    createCommanderByColorOutputTable();
    displayTopCommandersByColorList( json.container['json_dict']['cardlists']);
}

const createCardOutputTable = () => document.getElementById("displayTopCards").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Name</th><th>Sanitized</th><th>Sanitized WO</th><th>URL</th><th>Inclusion</th><th>Label</th><th>Num Decks</th><th>Potential Decks</th><th>Percentage Usage</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';

const createCommanderOutputTable = () => document.getElementById("displayTopCards").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Name</th><th>Sanitized</th><th>Sanitized WO</th><th>URL</th><th>Inclusion</th><th>Label</th><th>Num Decks</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';

const createCommanderByColorOutputTable = () => document.getElementById("displayTopCards").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Name</th><th>Sanitized</th><th>Sanitized WO</th><th>URL</th><th>Label</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';

const percentOfDecks = (numerator, demonimator) => ((numerator / demonimator) * 100).toFixed(2)

const displayTopCardList = (topCardsList, checkType) => {
    const table = document.getElementById("displayData");
    let cell;
    let row;
    topCardsList.forEach( (cardsByTime, timeIndex) => {
        cardsByTime['cardviews'].forEach( cardsInList => {
            row = table.insertRow();
            Object.keys(cardsInList).forEach( (cardElements) => {
                if(['cards','names','is_partner'].includes(cardElements)) { return; }
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

const displayTopCommandersByColorList = (topCardsList) => {
    const table = document.getElementById("displayData");
    let cell;
    let row;
    topCardsList.forEach( (cardsByTime, timeIndex) => {
        cardsByTime['cardviews'].forEach( cardsInList => {
            row = table.insertRow();
            Object.keys(cardsInList).forEach( (cardElements) => {
                if(['cards','names','is_partner','inclusion','num_decks','potential_decks'].includes(cardElements)) { return; }
                cell = row.insertCell( );
                cell.innerHTML = cardsInList[cardElements];
            });
            cell = row.insertCell();
            cell.innerHTML = cardsByTime.header;
            cell.id = `caption-${timeIndex}`;
        })
    })
}

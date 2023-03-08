const createTopCardsDataSet = (json, cardStatus) => {
    startDisplay(json['header'] );
    buildTableTag(cardStatus);
    displayTopCardList( json['container']['json_dict']['cardlists'], cardStatus);
}

const startDisplay = (header) => {
    displayLoadIcon();
    writeContentToDisplay( header );
}

const buildTableTag = (cardStatus) => {
    const tableHead = '<table id="displayCardData" class="displayCardData"><thead><tr><th>Name</th><th>Sanitized</th><th>Sanitized WO</th><th>URL</th>';
    const tableTail = '</tr></thead><tbody id="cardDisplayTable"></tbody></table>';
    if ( cardStatus === 'asCard' ) setDataDisplay( `${tableHead}<th>Inclusion</th><th>Label</th><th>Num Decks</th><th>Potential Decks</th><th>Percentage Usage</th>${tableTail}` );
    if ( cardStatus === 'asCommander' ) setDataDisplay( `${tableHead}<th>Label</th>${tableTail}` );
}

const percentOfDecks = (numerator, denominator) => ((numerator / denominator) * 100).toFixed(2)

const displayTopCardList = (topCardsList, cardStatus) => {
    const table = getElementById("displayCardData");
    let cell;
    let row;
    topCardsList.forEach( (cardsByTime, timeIndex) => {
        cardsByTime['cardviews'].forEach( cardsInList => {
            row = table.insertRow();
            Object.keys(cardsInList).forEach( (cardElements) => {
                if( ['cards','names','is_partner', 'synergy'].includes(cardElements) ) { return; }
                if( cardStatus === 'asCommander' && ['inclusion','num_decks','potential_decks'].includes(cardElements) ) { return; }
                cell = row.insertCell();
                cell.innerHTML = cardsInList[cardElements];
            });
            if ( cardStatus !== 'asCommander' ) {
                cell = row.insertCell();
                cell.innerHTML = `${percentOfDecks(cardsInList['num_decks'], cardsInList['potential_decks'])}%`;
            }
            cell = row.insertCell();
            cell.innerHTML = cardsByTime['header'];
            cell.id = `caption-${timeIndex%3}`;
        })
    })
}

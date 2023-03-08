const startDataFetch = () => {
    prepDisplayDuringLoad();
    fetchPreDHDeckLists();
}

const buildOutput = () => {
    displayLoadIcon();
    writeContentToDisplay('PreDH Deck List Gathered:')
    buildTableTag();
    builtDisplayTable();
}

const buildTableTag = () => {
    const tableHead = '<table id="displayDeckData" class="displayDeckData"><thead><tr><th>Commander</th><th>Submitted Decks</th><th>Main Card Id</th>';
    const tableMid = '<th>Deck Name</th>';
    const tableTail = '</tr></thead><tbody id="cardDisplayTable"></tbody></table>';
    setDataDisplay( `${tableHead}${tableMid}${tableTail}` );
}

const builtDisplayTable = () => {
    const table = getElementById("displayDeckData");
    const localPreDHDataSet = window.preDHDataSet;
    let cell;
    let row;

    Object.keys(localPreDHDataSet).forEach( commander => {
        const submittedDecks = Object.keys(localPreDHDataSet[commander]);
        submittedDecks.forEach( individualDecks => {
            row = table.insertRow();
            cell = row.insertCell();
            cell.innerHTML = `<a href="https://www.moxfield.com/cards/${localPreDHDataSet[commander][individualDecks]['mainCardId']}" target="_blank">${commander}</a>`;
            cell = row.insertCell();
            cell.innerHTML = submittedDecks.length;
            cell = row.insertCell();
            cell.innerHTML = localPreDHDataSet[commander][individualDecks]['mainCardId'];
            cell = row.insertCell();
            cell.innerHTML = `<a href="${localPreDHDataSet[commander][individualDecks]['publicUrl']}" target="_blank">${localPreDHDataSet[commander][individualDecks]['deckName']}</a>`;
        });
    })
}

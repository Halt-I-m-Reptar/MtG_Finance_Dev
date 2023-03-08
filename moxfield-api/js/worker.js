const startDataFetch = () => {
    prepDisplayDuringLoad();
    fetchPreDHDeckLists();
}

const buildOutput = (deckList) => {
    buildTableTag();
    builtDisplayTable(deckList['data']);
    displayLoadIcon();
}

const buildTableTag = () => {
    const tableHead = '<table id="displayDeckData" class="displayDeckData"><thead><tr><th>Commander</th><th>Deck Name</th><th>Deck URL</th><th>Main Card Id</th>';
    const tableTail = '</tr></thead><tbody id="cardDisplayTable"></tbody></table>';
    setDataDisplay( `${tableHead}${tableTail}` );
}

const builtDisplayTable = (deckData) => {
    const table = getElementById("displayDeckData");
    let cell;
    let row;

    deckData.forEach( (deckInList) => {
        fetchCommanderData(deckInList['mainCardId'])
            .then(commanderJson => commanderJson )
            .then(commanderJson => {
                row = table.insertRow();
                cell = row.insertCell();
                cell.innerHTML = `<a href="https://www.moxfield.com/cards/${deckInList['mainCardId']}" target="_blank">${commanderJson['card']['name']}</a>`;
                cell = row.insertCell();
                cell.innerHTML = deckInList['name'];
                cell = row.insertCell();
                cell.innerHTML = `<a href="${deckInList['publicUrl']}" target="_blank">${deckInList['publicUrl']}</a>`;
                cell = row.insertCell();
                cell.innerHTML = deckInList['mainCardId'];
            });
    })

}
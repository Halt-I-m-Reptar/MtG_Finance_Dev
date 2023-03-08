const startDataFetch = () => {
    prepDisplayDuringLoad();
    fetchPreDHDeckLists();
}

const buildOutput = (json) => {
    console.log(json);
    //buildTableTag();
    //builtDisplayTable(searchResults['data'], individualCardData['card']['name']);
}

const buildTableTag = () => {
    const tableHead = '<table id="displayDeckData" class="displayDeckData"><thead><tr><th>Main Card Id</th><th>Deck Name</th><th>Deck URL</th><th>Commander</th>';
    const tableTail = '</tr></thead><tbody id="cardDisplayTable"></tbody></table>';
    setDataDisplay( `${tableHead}${tableTail}` );
}

const builtDisplayTable = (deckData, commander) => {
    const table = getElementById("displayDeckData");
    let cell;
    let row;

    deckData.forEach( (deckInList) => {
        row = table.insertRow();
        cell = row.insertCell();
        cell.innerHTML = deckInList['mainCardId'];
        cell = row.insertCell();
        cell.innerHTML = deckInList['name'];
        cell = row.insertCell();
        cell.innerHTML = `<a href="${deckInList['publicUrl']}" target="_blank">${deckInList['publicUrl']}</a>`;
        cell = row.insertCell();
        cell.innerHTML = `<a href="https://www.moxfield.com/cards/${deckInList['mainCardId']}" target="_blank">${commander}</a>`;
    })

}
const startDataFetch = (format) => {
    window.moxfieldFormat = format;
    prepDisplayDuringLoad();
    fetchDeckLists();
}

const buildOutput = () => {
    displayLoadIcon();
    writeContentToDisplay('Deck Lists Gathered:');
    buildTableTag();
    builtDisplayTable();
}

const buildTableTag = () => {
    const tableHead = '<table id="displayDeckData" class="displayDeckData"><thead><tr><th>Commander</th><th>Submitted Decks</th><th>Main Card Id</th>';
    const tableMid = buildTableMid();
    const tableTail = '<th>Deck Name</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';
    setDataDisplay( `${tableHead}${tableMid}${tableTail}` );
}

const builtDisplayTable = () => {
    const table = getElementById("displayDeckData");
    const commanderVariantDataSet = Object.entries(window.commanderVariantDataSet).sort( (firstEntry,secondEntry) => Object.keys(secondEntry[1]).length - Object.keys(firstEntry[1]).length);
    let cell;
    let row;

    commanderVariantDataSet.forEach( commanderData => {
        const commanderCard = commanderData[0];
        const submittedDeckList = commanderData[1];
        const submittedDeckListKeys = Object.keys(submittedDeckList);

        submittedDeckListKeys.forEach( individualDecks => {
            row = table.insertRow();
            cell = row.insertCell();
            cell.innerHTML = `<a href="https://www.moxfield.com/cards/${submittedDeckList[individualDecks]['mainCardId']}" target="_blank">${commanderCard}</a>`;
            cell = row.insertCell();
            cell.innerHTML = `${submittedDeckListKeys.length}`;
            cell = row.insertCell();
            cell.innerHTML = submittedDeckList[individualDecks]['mainCardId'];
            customDisplayByFormat(cell, row, submittedDeckList[individualDecks]);
            cell = row.insertCell();
            cell.innerHTML = `<a href="${submittedDeckList[individualDecks]['publicUrl']}" target="_blank">${submittedDeckList[individualDecks]['deckName']}</a>`;
        });
    })
}

const buildTableMid = () => {
    const formatToCellsMap = {
        predh: '',
        oathbreaker: '<th>Signature Spell</th><th>Signature Spell Id</th>'
    }

    return formatToCellsMap[window.moxfieldFormat] || '';
}

const customDisplayByFormat = (cell, row, individualDeckData) => {
    const customDisplay = {
        oathbreaker: function(cell, row, individualDeckData) {
            cell = row.insertCell();
            cell.innerHTML = `<a href="https://www.moxfield.com/cards/${individualDeckData['signatureSpellsId']}" target="_blank">${individualDeckData['signatureSpells']}</a>`;
            cell = row.insertCell();
            cell.innerHTML = `${individualDeckData['signatureSpellsId']}`;
        }
    }

    if ( customDisplay.hasOwnProperty(window.moxfieldFormat) ) { customDisplay[window.moxfieldFormat](cell, row, individualDeckData); }
}

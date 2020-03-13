function filterWorker() {
    var filterList = cleanFilter(getFilters());
    writeToDisplay("Filtering your data.");
    loaderDisplay();
    filterTable(filterList);
}

function getFilters() {
    return document.getElementById("cardNames").value.split("\n");
}

function cleanFilter(filterList) {
    return filterList.map(cardName => cardName.replace(/\W/g,'').toLowerCase());
}

function cleanCkCardName(card) {
    return card.replace(/\W/g,'').toLowerCase();
}

async function filterTable(filterList) {
    var rows = ckData.reduce( (buildStr, curStr) => {
        return buildStr += filterList.includes(cleanCkCardName(curStr.name)) ? '<tr><td>'+curStr.id+'</td><td>'+curStr.sku+'</td><td>'+curStr.url+'</td><td class="cardName">'+curStr.name+'</td><td>'+curStr.edition+'</td><td>'+curStr.is_foil+'</td><td>'+curStr.price_retail+'</td><td>'+curStr.qty_retail+'</td><td>'+curStr.price_buy+'</td><td>'+curStr.qty_buying+'</td></tr>' : '';
    }, '');
    await sleep(1000);
    writeTable(rows);
}

async function clearFilers() {
    writeToDisplay("Resetting data display.");
    loaderDisplay();
    await sleep(1000);
    createTable(ckData);
}
const jsonWorker = () => {
    toggleGetPrices();
    writeToDisplay("Gathering and collating all inventory from CK.");
    loaderDisplay();
    curlRequest();
}

const setCKData = (json) => {
    enableCardDataDisplayButtons();
    updateAPITimestamp(json.meta.created_at);
    createAndShapeCKData(json);
    loaderDisplay();
    writeToDisplay("CK inventory has been gathered, you can now filter your data.");
}

const updateAPITimestamp = (timestamp) => {
    const slugStatus = checkSlug() ? 'CK API' : 'Backup Slug';
    document.getElementById("repriceTimestamp").innerHTML = `<br /><strong> ${slugStatus} Last Updated:</strong> ${timestamp}`;
}

const displayData = (ckData) => {
    loaderDisplay();
    createTable();
    writeToTable(ckData);
}

const createTable = () => document.getElementById("listDisplay").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>CK Id</th><th>SKU</th><th>Buy/Sell URLs</th><th>Card Name</th><th>Variation</th><th>Set</th><th>Foil</th><th>Retail Price</th><th>Retail Quantity</th><th>Buy Price</th><th>Buy Quantity</th><th>Buy %</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';

const writeToTable = (ckCardData) => {
    const table = document.getElementById("displayData");
    let cell;
    let row;
    ckCardData.forEach( cardById => {
        if (!showZeros() && cardById['qty_buying'] === 0) { return; }
        row = table.insertRow();
        Object.keys(cardById).forEach( (cardDataKey, cardDataIndex) => {
            cell = row.insertCell(cardDataIndex);
            switch (cardDataKey) {
                case 'url':
                    cell.className = "";
                    cell.innerHTML = createCardUrls(cardById[cardDataKey], cardById['name']);
                    break;
                case 'name':
                    cell.className = "cardName";
                    cell.innerHTML = cardById[cardDataKey];
                    break;
                case 'is_foil':
                    cell.className = cardById[cardDataKey] === 'true' ? "isFoil" : "";
                    cell.innerHTML = cardById[cardDataKey];
                    break;
                case 'price_retail':
                    cell.className = "retailPrice";
                    cell.innerHTML = cardById[cardDataKey];
                    break;
                case 'price_buy':
                    cell.className = "buyPrice";
                    cell.innerHTML = cardById[cardDataKey];
                    break;
                case 'qty_buying':
                    cell.className = cardById[cardDataKey] === 0 ? "warning" : "";
                    cell.innerHTML = cardById[cardDataKey];
                    break;
                default:
                    cell.className = "";
                    cell.innerHTML = cardById[cardDataKey];
            }
        })
        const retailBuyPricePercent = ((cardById['price_buy'] / cardById['price_retail']) * 100).toFixed(2)
        cell = row.insertCell();
        cell.innerHTML = ` ${ retailBuyPricePercent } `;
        cell.className = setBuyPercentBackgroundColor(retailBuyPricePercent);
    });
}

const createCardUrls = (retailURL, name) => `<a href="https://www.cardkingdom.com/${retailURL}" target="_blank">Buy ${name}</a> | <a href="https://www.cardkingdom.com/purchasing/mtg_singles?search=header&filter%5Bname%5D=${name}" target="_blank">Sell ${name}</a>`;

const setBuyPercentBackgroundColor = (retailBuyPricePercent) => {
    if ( retailBuyPricePercent >= 70 ) { return "highBuyPrice";}
    if ( retailBuyPricePercent >= 65 ) { return "decentBuyPrice"; }
    if ( retailBuyPricePercent < 60 ) { return "lowBuyPrice"; }
    return "retailPrice";
}

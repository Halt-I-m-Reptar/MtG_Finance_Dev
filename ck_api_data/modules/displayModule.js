const jsonWorker = () => {
    toggleGetPrices();
    writeToDisplay("Gathering and collating all inventory from CK.");
    loaderDisplay();
    curlRequest();
    enableCardDataDisplayButtons();
}

const startDisplayOutput = (json) => {
    updateAPITimestamp(json.meta.created_at);
    createCKData(json);
    loaderDisplay();
    writeToDisplay("CK inventory has been gathered, you can now filter your data.");
}

const createCKData = (json) => json.data.forEach(data => {
    ckData[cleanCkCardName(data.name)] = ckData[cleanCkCardName(data.name)] || [];
    ckData[cleanCkCardName(data.name)][data.id] = data;
} );

const updateAPITimestamp = (timestamp) => document.getElementById("repriceTimestamp").innerHTML = "<br /><strong>CK API Last Updated:</strong> "+timestamp;

const displayData = (ckData) => {
    loaderDisplay();
    createTable();
    writeToTable(ckData);
}

const createTable = () => document.getElementById("listDisplay").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>CK Id</th><th>SKU</th><th>URL</th><th>Card Name</th><th>Variation</th><th>Set</th><th>Foil</th><th>Retail Price</th><th>Retail Quantity</th><th>Buy Price</th><th>Buy Quantity</th><th>Buy %</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';

const writeToTable = (ckCardData) => {
    const table = document.getElementById("displayData");
    let cell;
    let row;
    ckCardData.forEach( cardById => {
        if (!showZeros() && cardById['qty_buying'] === 0) { return; }
        row = table.insertRow();
        Object.keys(cardById).forEach( (cardDataKey, cardDataIndex) => {
            cell = row.insertCell(cardDataIndex);
            cell.innerHTML = cardById[cardDataKey];
            switch (cardDataKey) {
                case 'name':
                    cell.className = "cardName";
                    break;
                case 'is_foil':
                    cell.className = cardById[cardDataKey] === 'true' ? "isFoil" : "";
                    break;
                case 'price_retail':
                    cell.className = "retailPrice";
                    break;
                case 'price_buy':
                    cell.className = "buyPrice";
                    break;
                case 'qty_buying':
                    cell.className = cardById[cardDataKey] === 0 ? "warning" : "";
                    break;
                default:
                    cell.className = "";
            }
        })
        const retailBuyPricePercent = ((cardById['price_buy'] / cardById['price_retail']) * 100).toFixed(2)
        cell = row.insertCell();
        cell.innerHTML = ` ${ retailBuyPricePercent } `;
        cell.className = setBuyPercentBackgroundColor(retailBuyPricePercent);
    });
}

const setBuyPercentBackgroundColor = (retailBuyPricePercent) => {
    if ( retailBuyPricePercent >= 65 ) { return "buyPrice"; }
    if ( retailBuyPricePercent < 60 ) { return "warning"; }
    return "retailPrice";
}

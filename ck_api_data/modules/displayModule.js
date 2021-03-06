const jsonWorker = () => {
    document.getElementById("getPrices").disabled = true;
    writeToDisplay("Gathering and collating all inventory from CK.");
    loaderDisplay();
    curlRequest();
}

const startDisplayOutput = (json) => {
    updateAPITimestamp(json.meta.created_at);
    createCKData(json);
    loaderDisplay();
    writeToDisplay("CK inventory has been gathered, you can now filter your data.");
}

const createCKData = (json) => json.data.forEach(data => ckData[data.id] = data);

const updateAPITimestamp = (timestamp) => document.getElementById("repriceTimestamp").innerHTML = "<br /><strong>CK API Last Updated:</strong> "+timestamp;

const displayData = (ckData) => {
    loaderDisplay();
    createTable();
    writeToTable(ckData.sort());
}

const createTable = () => document.getElementById("listDisplay").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>CK Id</th><th>SKU</th><th>URL</th><th>Card Name</th><th>Variation</th><th>Set</th><th>Foil</th><th>Retail Price</th><th>Retail Quantity</th><th>Buy Price</th><th>Buy Quantity</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';

const writeToTable = (ckCardData) => {
    const table = document.getElementById("displayData");
    let cell;
    let row;
    ckCardData.forEach( (cardArr) => {
        row = table.insertRow();
        Object.keys(cardArr).forEach( (cardDataKey, index) => {
            cell = row.insertCell(index);
            cell.innerHTML = cardArr[cardDataKey];
            switch (index) {
                case 3:
                    cell.className = "cardName";
                    break;
                case 6:
                    cell.className = cardArr[cardDataKey] === 'true' ? "isFoil" : "";
                    break;
                case 7:
                    cell.className = "retailPrice";
                    break;
                case 9:
                    cell.className = "buyPrice";
                    break;
                case 10:
                    cell.className = cardArr[cardDataKey] === 0 ? "warning" : "";
                    break;
                default:
                    cell.className = "";
            }
        });
    });
}

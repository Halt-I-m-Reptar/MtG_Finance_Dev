function jsonWorker() {
    document.getElementById("getPrices").disabled = true;
    writeToDisplay("Gathering and collating all inventory from CK");
    curlRequest();
    //readableOutput(getJson());
}

function readableOutput(json) {
    json.data.forEach(data => ckData[data.id] = data);
    createTable(ckData);
}

function createTable(ckData) {
    writeTable(createRows(ckData));
}

function createRows(ckData) {
    return ckData.reduce( (row, cardData)  => {
        return row += '<tr><td>'+cardData.id+'</td><td>'+cardData.sku+'</td><td>'+cardData.url+'</td><td class="cardName">'+cardData.name+'</td><td>'+cardData.edition+'</td><td>'+cardData.is_foil+'</td><td>'+cardData.price_retail+'</td><td>'+cardData.qty_retail+'</td><td>'+cardData.price_buy+'</td><td>'+cardData.qty_buying+'</td></tr>'
    }, '');
}

function writeTable(rows) {
    var display = document.getElementById("listDisplay");
    display.innerHTML += '<table id="displayData" class="displayData"><thead><tr><th>CK Id</th><th>SKU</th><th>Url</th><th>Name</th><th>Edition</th><th>Foil</th><th>Retail Price</th><th>Retail Quantity</th><th>Buy Price</th><th>Buy Quantity</th></tr></thead><tbody id="cardDisplayTable">'+rows+'</tbody></table>';
}
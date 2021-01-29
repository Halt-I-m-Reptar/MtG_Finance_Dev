function jsonWorker() {
    document.getElementById("getPrices").disabled = true;
    writeToDisplay("Pulling buylist data from The Mythic Store.");
    createTable();
    curlWorker();
    document.getElementById("getPrices").disabled = false;
}

function parseVariants(json) {
    console.log(json);
    var cardBuylistArr = json.map(buylistElement => {
        return buylistElement.variants.map(variants => {
            return variants.cardBuylistTypes.filter(type => type.buyPrice > 0).map(type => {
                return {'cardName': buylistElement.cardName,'type': type.type, 'variantName': variants.variantName, 'buyPrice': type.buyPrice, 'creditBuyPrice': type.creditBuyPrice, 'canPurchaseOverstock': type.canPurchaseOverstock, 'creditOverstockBuyPrice': type.creditOverstockBuyPrice,
                    'maxPurchaseQuantity': type.maxPurchaseQuantity, 'overStockBuyPrice': type.overStockBuyPrice, 'storeSellPrice': type.storeSellPrice, 'multiplier': variants.multiplier, 'set': buylistElement.setName, 'game': buylistElement.game}
            });
        });
    });
    readableOutput(cardBuylistArr);
}

function createTable() {
    document.getElementById("listDisplay").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Name</th><th>Set</th><th>Foil</th><th>Retail Price</th><th>Buy Price Cash</th><th>Buy Price Credit</th><th>Buy Quantity</th><th>Can Buy Overstock</th><th>Overstock Cash Price</th><th>Overstock Credit Price</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';
}

function readableOutput(json) {
    console.log(json);
    //writeTable(createRows(json));
    createRows(json)
}

/*function createRows(tmsData) {
    return tmsData.reduce( (row, allCardVariants)  => {
        return row += allCardVariants.reduce( (row, conditions) => {
            return row += conditions.reduce( (row, cardData) => {
                console.log(cardData);
                return row += '<tr><td class="cardName">'+cardData.cardName+'</td><td>'+cardData.set+'</td><td>'+cardData.type+'</td><td class="retailPrice">'+cardData.storeSellPrice+'</td><td class="buyPrice">'+cardData.buyPrice+'</td><td>'+cardData.creditBuyPrice+'</td><td>'+cardData.maxPurchaseQuantity+'</td><td>'+cardData.canPurchaseOverstock+'</td><td>'+cardData.overStockBuyPrice+'</td><td>'+cardData.creditOverstockBuyPrice+'</td></tr>'
            }, '' )
        }, '');
    }, '');
}

function writeTable(rows) {
    document.getElementById("listDisplay").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Name</th><th>Set</th><th>Foil</th><th>Retail Price</th><th>Buy Price Cash</th><th>Buy Price Credit</th><th>Buy Quantity</th><th>Can Buy Overstock</th><th>Overstock Cash Price</th><th>Overstock Credit Price</th></tr></thead><tbody id="cardDisplayTable">'+rows+'</tbody></table>';
}*/

function createRows(tmsData) {
    var table = document.getElementById("displayData");
    tmsData.forEach(allCardVariants  => {
        allCardVariants.forEach( conditions => {
            conditions.forEach( cardData => {
                var row = table.insertRow(1);
                console.log(cardData);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);
                var cell8 = row.insertCell(7);
                var cell9 = row.insertCell(8);
                var cell10 = row.insertCell(9);
                cell1.innerHTML = cardData.cardName;
                cell1.className = "cardName";
                cell2.innerHTML = cardData.set;
                cell3.innerHTML = cardData.type;
                cell4.innerHTML = cardData.storeSellPrice;
                cell4.className = "retailPrice";
                cell5.innerHTML = cardData.buyPrice;
                cell5.className = "buyPrice";
                cell6.innerHTML = cardData.creditBuyPrice;
                cell7.innerHTML = cardData.maxPurchaseQuantity;
                cell8.innerHTML = cardData.canPurchaseOverstock;
                cell9.innerHTML = cardData.overStockBuyPrice;
                cell10.innerHTML = cardData.creditOverstockBuyPrice;
            });
        });
    });
}

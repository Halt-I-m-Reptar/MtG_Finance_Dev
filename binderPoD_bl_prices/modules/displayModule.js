function jsonWorker() {
    toggleGetPrices();
    writeToDisplay("Pulling buylist data from The Mythic Store.");
    createTable();
    curlWorker();
    toggleGetPrices();
}

function toggleGetPrices() {
    document.getElementById("getPrices").disabled = !document.getElementById("getPrices").disabled;
}

function parseVariants(json, storeName) {
    var cardBuylistArr = json.map(buylistElement => {
        return buylistElement.variants.map(variants => {
            return variants.cardBuylistTypes.filter(type => (!zeroFilterStatus() && type.buyPrice) || (zeroFilterStatus() && type.maxPurchaseQuantity > 0)).map(type => {
                return {'storeName': storeName, 'cardName': buylistElement.cardName,'type': type.type, 'variantName': variants.variantName, 'buyPrice': type.buyPrice, 'creditBuyPrice': type.creditBuyPrice, 'canPurchaseOverstock': type.canPurchaseOverstock, 'creditOverstockBuyPrice': type.creditOverstockBuyPrice,
                    'maxPurchaseQuantity': type.maxPurchaseQuantity, 'overStockBuyPrice': type.overStockBuyPrice, 'storeSellPrice': type.storeSellPrice, 'multiplier': variants.multiplier, 'set': buylistElement.setName, 'game': buylistElement.game}
            });
        });
    });
    readableOutput(cardBuylistArr);
}

function createTable() {
    document.getElementById("listDisplay").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Store Name</th><th>Name</th><th>Set</th><th>Foil</th><th>Condition</th><th>Retail Price</th><th>Buy Price Cash</th><th>Buy Price Credit</th><th>Buy Quantity</th><th>Can Buy Overstock</th><th>Overstock Cash Price</th><th>Overstock Credit Price</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';
}

function readableOutput(json) {
    createRows(json)
}

function createRows(tmsData) {
    var table = document.getElementById("displayData");
    tmsData.forEach(allCardVariants  => {
        allCardVariants.forEach( conditions => {
            conditions.forEach( cardData => {
                var row = table.insertRow(1);
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
                var cell11 = row.insertCell(10);
                var cell12 = row.insertCell(11);
                cell1.innerHTML = cardData.storeName;
                // \\
                cell2.innerHTML = cardData.cardName;
                cell2.className = "cardName";
                // \\
                cell3.innerHTML = cardData.set;
                cell4.innerHTML = cardData.type;
                cell5.innerHTML = cardData.variantName;
                // \\
                cell6.innerHTML = cardData.storeSellPrice;
                cell6.className = "retailPrice";
                // \\
                cell7.innerHTML = cardData.buyPrice;
                cell7.className = "buyPrice";
                // \\
                cell8.innerHTML = cardData.creditBuyPrice;
                // \\
                cell9.innerHTML = cardData.maxPurchaseQuantity;
                cell9.className = cardData.maxPurchaseQuantity > 0 ? "" : "warning";
                // \\
                cell10.innerHTML = cardData.canPurchaseOverstock;
                cell11.innerHTML = cardData.overStockBuyPrice;
                cell12.innerHTML = cardData.creditOverstockBuyPrice;
            });
        });
    });
}

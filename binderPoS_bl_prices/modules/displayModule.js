function jsonWorker() {
    toggleGetPrices();
    writeToDisplay("Pulling buylist data from The Mythic Store.");
    createTable();
    curlWorker();
    toggleGetPrices();
}

const toggleGetPrices = () => document.getElementById("getPrices").disabled = !document.getElementById("getPrices").disabled;

const createTable = () => document.getElementById("listDisplay").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Store Name</th><th>Game</th><th>Item Name</th><th>Set</th><th>Type/Foil</th><th>Condition</th><th>Retail Price</th><th>Condition Multiplier</th><th>Buy Price Cash</th><th>Buy Price Credit</th><th>Max Buy Quantity</th><th>Can Buy Overstock</th><th>Overstock Cash Price</th><th>Overstock Credit Price</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';

function parseVariants(json, storeName, storeUrl) {
    let cardBuylistArr = json.map(buylistElement => {
        return buylistElement.variants.map(({cardBuylistTypes, multiplier, variantName}) => {
            //changing type.buyPrice to type.maxPurchaseQuantity filters out 0 qty but does not allow for viewing of historic buylist numbers
            return cardBuylistTypes.filter(type => (type.buyPrice && !zeroFilterStatus()) || (zeroFilterStatus() && type.maxPurchaseQuantity > 0)).map(type => {
                return {'storeName': storeName, 'game': buylistElement.game, 'itemName': buylistElement.cardName,'set': buylistElement.setName, 'type': type.type, 'condition': variantName,
                    'retailPrice': '<a href="https://www.'+storeUrl+'/search?page=1&q='+buylistElement.cardName+'" target="_blank">'+type.storeSellPrice+'</a>',
                    'conditionMultiplier': multiplier, 'buyPrice': type.buyPrice, 'creditBuyPrice': type.creditBuyPrice,'maxPurchaseQuantity': type.maxPurchaseQuantity,
                    'canPurchaseOverstock': type.canPurchaseOverstock, 'creditOverstockBuyPrice': type.creditOverstockBuyPrice, 'overStockBuyPrice': type.overStockBuyPrice}
            });
        }).filter(arr => arr.length > 0);
    });
    createRows(cardBuylistArr);
}

function createRows(tmsData) {
    const table = document.getElementById("displayData");
    let cardDataKeys;
    let cell;
    let row;
    tmsData.forEach(allCardVariants  => {
        allCardVariants.forEach( conditions => {
            conditions.forEach( cardData => {
                cardDataKeys = Object.keys(cardData);
                row = table.insertRow();
                cardDataKeys.forEach((keyName,index) => {
                    cell = row.insertCell(index);
                    cell.innerHTML = cardData[cardDataKeys[index]];
                    switch (index) {
                        case 2:
                            cell.className = "cardName";
                            break;
                        case 6:
                            cell.className = "retailPrice";
                            break;
                        case 8:
                            cell.className = "buyPrice";
                            break;
                        case 10:
                            cell.className = cardData.maxPurchaseQuantity > 0 ? "" : "warning";
                            break;
                        default:
                            cell.className = "";
                    }
                });
            });
        });
    });
}

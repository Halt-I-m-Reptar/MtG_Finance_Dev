const displayWorker = () => {
    writeTableHeader();
    startPull(readTextArea());
}

const writeTableHeader = () => document.getElementById("listDisplay").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Card Name</th><th>Set</th><th>Variant</th><th>Condition</th><th>isFoil</th><th>Retail Price</th><th>Retail Quantity</th><th>Buy Price</th><th>Trade Price</th><th>Buy Quantity</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';

const readTextArea = () => document.getElementById("cardNames").value.split("\n");

const startPull = (cardArr) => {
    const interval = 1000;
    let promise = Promise.resolve();
    cardArr.forEach( cardName => {
        promise = promise.then(function () {
            curlRequest(cardName);
            return new Promise(function (resolve) {
                setTimeout(resolve, interval);
            });
        });
    });
};

const createDataPoints = (json) => {
    console.log(json);
    const cardArr = json.map( cardVariantList => {
        return cardVariantList.doclist.docs.map(cardVariation => {
            return {
                "name": cardVariation.simple_title,
                "set": cardVariation.magic_edition_sort,
                "variant": cardVariation.display_title.split(cardVariation.simple_title)[1].replace('- ','').trim(),
                "condition": cardVariation.condition,
                "isFoil": cardVariation.card_style[0],
                "retailPrice": cardVariation.price,
                "retailQty": cardVariation.quantity,
                "buyPrice": cardVariation.buy_price,
                "tradePrice": cardVariation.trade_price,
                "buyQty": cardVariation.buy_list_quantity
            }
        });
    });
    generateOutput(cardArr);
}

const generateOutput = (cardList) => {
    console.log(cardList);
    const table = document.getElementById("displayData");
    let row;
    let cell;
    cardList.forEach(cardBySet => {
        cardBySet.forEach( cardArr => {
            row = table.insertRow();
            Object.keys(cardArr).forEach( (cardDataKey, index) => {
                cell = row.insertCell(index);
                cell.innerHTML = cardArr[cardDataKey];
                switch (index) {
                    case 0:
                        cell.className = "cardName";
                        break;
                    case 4:
                        if (cardArr[cardDataKey].toLowerCase().includes('foil')) {cell.className = "isFoil";}
                        break;
                    case 5:
                        cell.className = "retailPrice";
                        break;
                    case 7:
                        cell.className = "buyPrice";
                        break;
                    case 9:
                        cell.className = cardArr[cardDataKey] > 0 ? "" : "warning";
                        break;
                    default:
                        cell.className = "";
                }
            });
        })
    });
}

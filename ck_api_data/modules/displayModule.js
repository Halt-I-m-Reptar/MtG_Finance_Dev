const displayCardDataWorker = (filteredCardDataToDisplay) => {
    displayLoadIcon();
    createOutputTable();
    writeCardsToTable(filteredCardDataToDisplay);
}

const createOutputTable = () => document.getElementById("listDisplay").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>CK Id</th><th>SKU</th><th>Buy/Sell URLs</th><th>Card Name</th><th>Variation</th><th>Set</th><th>Foil</th><th>Retail Price</th><th>Retail Quantity</th><th>Buy Price</th><th>Buy Quantity</th><th>Buy %</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';

const writeCardsToTable = (filteredCardDataToDisplay) => {
    const table = document.getElementById("displayData");
    let cell;
    let row;
    filteredCardDataToDisplay.forEach( individualCardListings => {
            if (!showZeros() && individualCardListings['qty_buying'] === 0) { return; }
            row = table.insertRow();
            Object.keys(individualCardListings).forEach( (cardById, cardDataIndex) => {
                cell = row.insertCell(cardDataIndex);
                switch (cardById) {
                    case 'url':
                        cell.className = "";
                        cell.innerHTML = createCardUrls(individualCardListings[cardById], individualCardListings['name']);
                        break;
                    case 'name':
                        cell.className = "cardName";
                        cell.innerHTML = individualCardListings[cardById];
                        break;
                    case 'is_foil':
                        cell.className = individualCardListings[cardById] === 'true' ? "isFoil" : "";
                        cell.innerHTML = individualCardListings[cardById];
                        break;
                    case 'price_retail':
                        cell.className = "retailPrice";
                        cell.innerHTML = individualCardListings[cardById];
                        break;
                    case 'price_buy':
                        cell.className = "buyPrice";
                        cell.innerHTML = individualCardListings[cardById];
                        break;
                    case 'qty_buying':
                        cell.className = individualCardListings[cardById] === 0 ? "warning" : "";
                        cell.innerHTML = individualCardListings[cardById];
                        break;
                    default:
                        cell.className = "";
                        cell.innerHTML = individualCardListings[cardById];
                }
            });
            const retailBuyPricePercent = ((individualCardListings['price_buy'] / individualCardListings['price_retail']) * 100).toFixed(2)
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

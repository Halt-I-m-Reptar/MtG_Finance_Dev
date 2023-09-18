const displayCardDataWorker = (filteredCardDataToDisplay) => {
    displayLoadIcon();
    createOutputTable();
    writeCardsToTable(filteredCardDataToDisplay);
}

const createOutputTable = () => setListDomInnerHTML('listDisplay','<table id="displayData" class="displayData"><thead><tr><th>CK Id</th><th>SKU</th><th>Buy/Sell URLs</th><th>Card Name</th><th>Variation</th><th>Set</th><th>Foil</th><th>Retail Price</th><th>Retail Quantity</th><th>Buy Price</th><th>Buy Quantity</th><th>Buy %</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>');

const writeCardsToTable = (filteredCardDataToDisplay) => {
    const table = getElementById("displayData");
    let cell;
    let row;
    filteredCardDataToDisplay.forEach( individualCardListings => {
            if (!getCheckedValue('showZeros') && individualCardListings['qty_buying'] === 0) { return; }
            row = table.insertRow();
            row.addEventListener('click', (elem) => setBackgroundColor( Array.from(elem.target.parentNode.getElementsByTagName('td')) ) );
            Object.keys(individualCardListings).forEach( (cardAttribute, cardAttributeIndex) => {
                cell = row.insertCell(cardAttributeIndex);
                switch (cardAttribute) {
                    case 'url':
                        cell.className = "";
                        cell.innerHTML = createCardUrls(individualCardListings[cardAttribute], individualCardListings['name']);
                        break;
                    case 'name':
                        cell.className = "cardName";
                        cell.innerHTML = individualCardListings[cardAttribute];
                        break;
                    case 'is_foil':
                        cell.className = individualCardListings[cardAttribute] === 'true' ? "isFoil" : "";
                        cell.innerHTML = individualCardListings[cardAttribute];
                        break;
                    case 'price_retail':
                        cell.className = "retailPrice";
                        cell.innerHTML = individualCardListings[cardAttribute];
                        break;
                    case 'price_buy':
                        cell.className = "buyPrice";
                        cell.innerHTML = individualCardListings[cardAttribute];
                        break;
                    case 'qty_buying':
                        cell.className = individualCardListings[cardAttribute] === 0 ? "warning" : "";
                        cell.innerHTML = individualCardListings[cardAttribute];
                        break;
                    case 'retailBuyPricePercent':
                        cell.className = setBuyPercentBackgroundColor(individualCardListings[cardAttribute]);
                        cell.innerHTML = individualCardListings[cardAttribute];
                        break;
                    default:
                        cell.className = "";
                        cell.innerHTML = individualCardListings[cardAttribute];
                }
            });
    });
}

const createCardUrls = (retailURL, name) => `<a href="https://www.cardkingdom.com/${retailURL}" target="_blank">Buy ${name}</a> | <a href="https://www.cardkingdom.com/purchasing/mtg_singles?search=header&filter%5Bname%5D=${name}" target="_blank">Sell ${name}</a>`;

const setBuyPercentBackgroundColor = (retailBuyPricePercent) => {
    if ( retailBuyPricePercent >= 70 ) { return "highBuyPrice";}
    if ( retailBuyPricePercent >= 65 ) { return "decentBuyPrice"; }
    if ( retailBuyPricePercent < 60 ) { return "lowBuyPrice"; }
    return "retailPrice";
}

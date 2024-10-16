const displayCardDataWorker = (filteredCardDataToDisplay) => {
    displayLoadIcon();
    setListDomInnerHTML('listDisplay',`<table id="displayData" class="displayData"><thead><tr><th>CK Id</th><th>SKU</th><th>Buy/Sell URLs</th><th>Card Name</th><th>Variation</th><th>Set</th><th>Foil</th><th>Retail Price</th><th>Retail Quantity</th><th>Buy Price</th><th>Buy Quantity</th><th>Buy %</th><th>Buy Price Credit</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>`);
    writeFilteredCardsToTable(filteredCardDataToDisplay);
}

const writeFilteredCardsToTable = (filteredCardDataToDisplay) => {
    const table = getElementById("displayData");
    let cell;
    let row;
    filteredCardDataToDisplay.forEach( individualCardListings => {
            if (!getCheckedValue('showZeros') && individualCardListings['qty_buying'] === 0) { return; }
            row = table.insertRow();
            row.addEventListener('click', (elem) => setBackgroundColor( Array.from(elem.target.parentNode.getElementsByTagName('td')) ) );
            Object.keys(individualCardListings).forEach( (cardAttribute) => {
                cell = row.insertCell();
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

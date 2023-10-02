const hotlistDisplayWorker = (filteredCardDataToDisplay) => {
    setListDomInnerHTML('listDisplay', `<table id="displayData" class="displayData"><thead><tr><th>CK Id</th><th>Image URI</th><th>Set</th><th>Retail Price</th><th>Buy Price</th><th>Sale Price</th><th>Primary Category Id</th><th>Border Colors</th><th>Display Style</th><th>Buy/Sell URLs</th><th>Edition</th><th>Edition Slug</th><th>model</th><th>retailBuyPricePrecent</th>
</tr></thead><tbody id="cardDisplayTable"></tbody></table>`);
    writeHotlistToTable(filteredCardDataToDisplay);
}

const writeHotlistToTable = (filteredCardDataToDisplay) => {
    const table = getElementById("displayData");
    let cell;
    let row;
    Object.keys(filteredCardDataToDisplay).forEach( individualCardName => {
        row = table.insertRow();
        row.addEventListener('click', (elem) => setBackgroundColor( Array.from(elem.target.parentNode.getElementsByTagName('td')) ) );
        const itemNumber = Object.keys( filteredCardDataToDisplay[individualCardName] );
        Object.keys(filteredCardDataToDisplay[individualCardName][itemNumber]).forEach( (cardAttribute, cardAttributeIndex) => {
            cell = row.insertCell(cardAttributeIndex);
            cell.innerHTML = filteredCardDataToDisplay[individualCardName][itemNumber][cardAttribute];
            /*switch (cardAttribute) {
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
            }*/
        });
    });
}

/*
    TODO: Update the display output
 */

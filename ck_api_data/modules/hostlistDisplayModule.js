const hotlistDisplayWorker = (filteredCardDataToDisplay) => {
    setListDomInnerHTML('listDisplay', `<table id="displayData" class="displayData"><thead><tr><th>CK Id</th><th>Card Name</th><th>Retail Price</th><th>Buy Price</th><th>Buy/Sell URLs</th><th>Set</th><th>retailBuyPricePrecent</th>
</tr></thead><tbody id="cardDisplayTable"></tbody></table>`);
    writeHotlistToTable( sortedHostList(filteredCardDataToDisplay) );
}

const sortedHostList = (filteredCardDataToDisplay) => {
    return Object.keys(filteredCardDataToDisplay).sort().reduce( (cardObject,cardName) => {
        cardObject[cardName] = filteredCardDataToDisplay[cardName];
        return cardObject;
    }, {} )
}

const writeHotlistToTable = (filteredCardDataToDisplay) => {
    const attributesToSkip = ['border_color','display_style','edition_slug','image_uri','model','price_sale','primary_category_id'];
    const table = getElementById("displayData");
    let cell;
    let row;
    Object.keys(filteredCardDataToDisplay).forEach( individualCardName => {
        row = table.insertRow();
        row.addEventListener('click', (elem) => setBackgroundColor( Array.from(elem.target.parentNode.getElementsByTagName('td')) ) );
        const itemNumber = Object.keys( filteredCardDataToDisplay[individualCardName] );
        Object.keys(filteredCardDataToDisplay[individualCardName][itemNumber]).forEach( (cardAttribute) => {
            if ( attributesToSkip.includes(cardAttribute) ) { return; }
            cell = row.insertCell();
            cell.innerHTML = filteredCardDataToDisplay[individualCardName][itemNumber][cardAttribute];
            switch (cardAttribute) {
                case 'uri':
                    cell.className = "";
                    cell.innerHTML = createCardUrls( filteredCardDataToDisplay[individualCardName][itemNumber][cardAttribute], filteredCardDataToDisplay[individualCardName][itemNumber]['name'] );
                    break;
                case 'name':
                    cell.className = "cardName";
                    cell.innerHTML = filteredCardDataToDisplay[individualCardName][itemNumber][cardAttribute];
                    break;
                case 'price':
                    cell.className = "retailPrice";
                    cell.innerHTML = filteredCardDataToDisplay[individualCardName][itemNumber][cardAttribute];
                    break;
                case 'price_buy':
                    cell.className = "buyPrice";
                    cell.innerHTML = filteredCardDataToDisplay[individualCardName][itemNumber][cardAttribute];
                    break;
                case 'retailBuyPricePercent':
                    cell.className = setBuyPercentBackgroundColor( filteredCardDataToDisplay[individualCardName][itemNumber][cardAttribute] );
                    cell.innerHTML = filteredCardDataToDisplay[individualCardName][itemNumber][cardAttribute];
                    break;
                default:
                    cell.className = "";
                    cell.innerHTML = filteredCardDataToDisplay[individualCardName][itemNumber][cardAttribute];
            }
        });
    });
}

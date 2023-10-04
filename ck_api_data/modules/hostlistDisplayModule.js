const hotlistDisplayWorker = (filteredCardDataToDisplay) => {
    setListDomInnerHTML('listDisplay', `<table id="displayData" class="displayData"><thead><tr><th>CK Id</th><th>Card Name</th><th>Retail Price</th><th>Buy Price</th><th>Buy/Sell URLs</th><th>Set</th><th>Model</th><th>Buy %</th><th>Buy Price Credit</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>`);
    writeHotlistToTable( sortedHostList(filteredCardDataToDisplay) );
}

const sortedHostList = (filteredCardDataToDisplay) => {
    return Object.keys(filteredCardDataToDisplay).map(currentCard => filteredCardDataToDisplay[currentCard])
        .reduce((acc, currentCard) => {
            currentCard.map(cardData => acc.push(cardData))
            return acc;
        }, []).sort( (firstCard, second) => {
            const firstCardName = firstCard.name.toUpperCase();
            const secondCardName = second.name.toUpperCase();
            if (firstCardName > secondCardName) { return 1;}
            if (firstCardName < secondCardName) { return -1;}
            return 0;
    });
}

const writeHotlistToTable = (filteredCardDataToDisplay) => {
    const table = getElementById("displayData");
    let cell;
    let row;
    Object.values(filteredCardDataToDisplay).forEach( cardElement => {
        row = table.insertRow();
        row.addEventListener('click', (elem) => setBackgroundColor( Array.from(elem.target.parentNode.getElementsByTagName('td')) ) );
        Object.keys(cardElement).forEach( (cardAttribute) => {
            if (attributesToSkip(cardAttribute)) { return; }
            cell = row.insertCell();
            cell.innerHTML = cardElement[cardAttribute];
            switch (cardAttribute) {
                case 'uri':
                    cell.className = "";
                    cell.innerHTML = createCardUrls(cardElement[cardAttribute], cardElement.name);
                    break;
                case 'name':
                    cell.className = "cardName";
                    cell.innerHTML = cardElement[cardAttribute];
                    break;
                case 'price':
                    cell.className = "retailPrice";
                    cell.innerHTML = cardElement[cardAttribute];
                    break;
                case 'price_buy':
                    cell.className = "buyPrice";
                    cell.innerHTML = cardElement[cardAttribute];
                    break;
                case 'model':
                    cell.className = cardElement[cardAttribute] === 'mtg_foil' ? "isFoil" : "";
                    cell.innerHTML = cardElement[cardAttribute];
                    break;
                case 'retailBuyPricePercent':
                    cell.className = setBuyPercentBackgroundColor(cardElement[cardAttribute]);
                    cell.innerHTML = cardElement[cardAttribute];
                    break;
                default:
                    cell.className = "";
                    cell.innerHTML = cardElement[cardAttribute];
            }
        });
    });
}

const attributesToSkip = (cardAttribute) => ['border_color','display_style','edition_slug','image_uri','price_sale','primary_category_id'].includes(cardAttribute);

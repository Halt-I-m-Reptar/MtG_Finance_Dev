const setBackgroundColor = ( row ) => row.forEach( cell => cell.style.backgroundColor = cell.style.backgroundColor === '' ? 'darkorange' : '')
const attributesToSkip = ( cardAttribute ) => ['border_color','display_style','edition_slug','image_uri','price_sale','primary_category_id'].includes( cardAttribute );
const classNameMap = {
    name: "cardName",
    price: "retailPrice",
    price_buy: "buyPrice",
    price_retail: "retailPrice"
};

const setCellClassName = (cardElement, cardAttribute) => {
    if (cardAttribute === 'model') return cardElement[cardAttribute] === 'mtg_foil' ? "isFoil" : "";
    if (cardAttribute === 'retailBuyPricePercent') return setBuyPercentBackgroundColor(cardElement[cardAttribute]);
    if (cardAttribute === 'is_foil') return cardElement[cardAttribute] === 'true' ? "isFoil" : "";
    if (cardAttribute === 'qty_buying') return cardElement[cardAttribute] === 0 ? "warning" : "";
    return classNameMap[cardAttribute] || "";
};

const addDataToTable = ( table, cardElement ) => {
    let cell;
    let row;
    row = table.insertRow();
    row.addEventListener('click', (elem) => setBackgroundColor( Array.from(elem.target.parentNode.getElementsByTagName('td')) ) );
    Object.keys( cardElement ).forEach( (cardAttribute) => {
        if (attributesToSkip(cardAttribute)) { return; }
        cell = row.insertCell();
        cell.innerHTML = [ 'uri', 'url' ].includes(cardAttribute) ? createCardUrls( cardElement[cardAttribute], cardElement.name ) : cardElement[cardAttribute];
        cell.className = setCellClassName( cardElement, cardAttribute );
    });
}

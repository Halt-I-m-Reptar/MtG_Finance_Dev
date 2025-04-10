const setBackgroundColor = ( row ) => row.forEach( cell => cell.style.backgroundColor = cell.style.backgroundColor === '' ? 'darkorange' : '')
const attributesToSkip = ( cardAttribute ) => ['border_color','display_style','edition_slug','image_uri','price_sale','primary_category_id'].includes( cardAttribute );

const setCellClassName = ( cardElement, cardAttribute ) => {
    let className;

    switch ( cardAttribute )  {
        case 'name':
            className = "cardName";
            break;
        case 'price':
            className = "retailPrice";
            break;
        case 'price_buy':
            className = "buyPrice";
            break;
        case 'model':
            className = cardElement[ cardAttribute ] === 'mtg_foil' ? "isFoil" : "";
            break;
        case 'retailBuyPricePercent':
            className = setBuyPercentBackgroundColor( cardElement[ cardAttribute ] );
            break;
        case 'is_foil':
            className = cardElement[ cardAttribute ] === 'true' ? "isFoil" : "";
            break;
        case 'price_retail':
            className = "retailPrice";
            break;
        case 'qty_buying':
            className = cardElement[ cardAttribute ] === 0 ? "warning" : "";
            break;
        default:
            className = "";
    }

    return className;
}

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

const hotlistDisplayWorker = (filteredCardDataToDisplay) => {
    setListDomInnerHTML('listDisplay', `<table id="displayData" class="displayData"><thead><tr><th>CK Id</th><th>Card Name</th><th>Retail Price</th><th>Buy Price</th><th>Buy/Sell URLs</th><th>Set</th><th>Model</th><th>Buy %</th><th>Buy Price Credit</th>
</tr></thead><tbody id="cardDisplayTable"></tbody></table>`);
    writeHotlistToTable( sortedHostList(filteredCardDataToDisplay) );
    //writeHotlistToTable( (sortedHostList(dummyData) );

}

const sortedHostList = (filteredCardDataToDisplay) => {
    return Object.keys(filteredCardDataToDisplay).sort().reduce( (cardObject,cardName) => {
        cardObject[cardName] = filteredCardDataToDisplay[cardName];
        return cardObject;
    }, {} )
}

const writeHotlistToTable = (filteredCardDataToDisplay) => {
    const table = getElementById("displayData");
    let cell;
    let row;
    Object.keys(filteredCardDataToDisplay).forEach( cardName => {
        Object.keys(filteredCardDataToDisplay[cardName]).forEach( (ckItemId) => {
            row = table.insertRow();
            row.addEventListener('click', (elem) => setBackgroundColor( Array.from(elem.target.parentNode.getElementsByTagName('td')) ) );
            Object.keys(filteredCardDataToDisplay[cardName][ckItemId]).forEach( (cardAttribute) => {
                if (attributesToSkip(cardAttribute)) { return; }
                cell = row.insertCell();
                cell.innerHTML = filteredCardDataToDisplay[cardName][ckItemId][cardAttribute];
                switch (cardAttribute) {
                    case 'uri':
                        cell.className = "";
                        cell.innerHTML = createCardUrls(filteredCardDataToDisplay[cardName][ckItemId][cardAttribute], filteredCardDataToDisplay[cardName][ckItemId]['name']);
                        break;
                    case 'name':
                        cell.className = "cardName";
                        cell.innerHTML = filteredCardDataToDisplay[cardName][ckItemId][cardAttribute];
                        break;
                    case 'price':
                        cell.className = "retailPrice";
                        cell.innerHTML = filteredCardDataToDisplay[cardName][ckItemId][cardAttribute];
                        break;
                    case 'price_buy':
                        cell.className = "buyPrice";
                        cell.innerHTML = filteredCardDataToDisplay[cardName][ckItemId][cardAttribute];
                        break;
                    case 'model':
                        cell.className = filteredCardDataToDisplay[cardName][ckItemId][cardAttribute] === 'mtg_foil' ? "isFoil" : "";
                        cell.innerHTML = filteredCardDataToDisplay[cardName][ckItemId][cardAttribute];
                        break;
                    case 'retailBuyPricePercent':
                        cell.className = setBuyPercentBackgroundColor(filteredCardDataToDisplay[cardName][ckItemId][cardAttribute]);
                        cell.innerHTML = filteredCardDataToDisplay[cardName][ckItemId][cardAttribute];
                        break;
                    default:
                        cell.className = "";
                        cell.innerHTML = filteredCardDataToDisplay[cardName][ckItemId][cardAttribute];
                }
            });
        });
    });
}

const attributesToSkip = (cardAttribute) => ['border_color','display_style','edition_slug','image_uri','price_sale','primary_category_id'].includes(cardAttribute);

const dummyData = {
    academymanufactor:  {
        246370: {
            border_color: "black",
            buy_price_credit: "4.94",
            display_style: "black",
            edition: "Modern Horizons 2",
            edition_slug: "modern-horizons-2",
            id: 246370,
            image_uri: "magic-the-gathering/modern-horizons-2/academy-manufactor-24422",
            model: "mtg_card",
            name: "Academy Manufactor",
            price: "7.49",
            price_buy: "3.80",
            price_sale: null,
            primary_category_id: 3209,
            retailBuyPricePercent: "50.73",
            uri: "mtg/modern-horizons-2/academy-manufactor"
        },
        1001: {
            border_color: "black",
            buy_price_credit: "4.94",
            display_style: "black",
            edition: "Modern Horizons 2",
            edition_slug: "modern-horizons-2",
            id: 246370,
            image_uri: "magic-the-gathering/modern-horizons-2/academy-manufactor-24422",
            model: "mtg_card",
            name: "Academy Manufactor",
            price: "7.49",
            price_buy: "3.80",
            price_sale: null,
            primary_category_id: 3209,
            retailBuyPricePercent: "50.73",
            uri: "mtg/modern-horizons-2/academy-manufactor"
        }
    },
    bigdumb:  {
        2002: {
            border_color: "black",
            buy_price_credit: "4.94",
            display_style: "black",
            edition: "Modern Horizons 2",
            edition_slug: "modern-horizons-2",
            id: 246370,
            image_uri: "magic-the-gathering/modern-horizons-2/academy-manufactor-24422",
            model: "mtg_card",
            name: "Academy Manufactor",
            price: "7.49",
            price_buy: "3.80",
            price_sale: null,
            primary_category_id: 3209,
            retailBuyPricePercent: "50.73",
            uri: "mtg/modern-horizons-2/academy-manufactor"
        }
    }
}

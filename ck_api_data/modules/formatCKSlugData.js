let ckCardDataFromSlug = {};

const createAndShapeCKData = (ckListJson, itemList) => {
    ckCardDataFromSlug[itemList] = [];
    ckListJson.forEach(cardData => {
        ckCardDataFromSlug[itemList][cleanCkCardName(cardData.name)] = ckCardDataFromSlug[itemList][cleanCkCardName(cardData.name)] || [];
        ckCardDataFromSlug[itemList][cleanCkCardName(cardData.name)][cardData.id] = {};
            Object.keys(cardData).forEach( cardDataPoint => {
                if ( dataElementsToSkip(cardDataPoint) ) { return; }
                ckCardDataFromSlug[itemList][cleanCkCardName(cardData.name)][cardData.id][cardDataPoint] = cardData[cardDataPoint];
            });
        ckCardDataFromSlug[itemList][cleanCkCardName(cardData.name)][cardData.id]['retailBuyPricePercent'] = createBuyPercentage( cardData['price_buy'] , cardData['price_retail'] || cardData['price'] );
        ckCardDataFromSlug[itemList][cleanCkCardName(cardData.name)][cardData.id]['buy_price_credit'] = createCreditBuyPrice( cardData['price_buy']  );
    });
    if ( itemList === 'hotlist') { addBuylistData(); }
};

const verifyAndShapeCKDataSet = (ckListJson, timestamp = null, itemList, buylistClick) => {
    if ( timestamp ) {
        updateAPITimestamp(timestamp['created_at']);
    }
    if ( !ckListJson.length ) {
        showDataError(`<div class="warningText">There was an issue gathering the data from Card Kingdom.<br />Try again or uncheck "Use Live Slug".</div>`);
        return;
    }
    createAndShapeCKData(ckListJson, itemList);
    changeCardDataButtonDisplay(false);
    setListDomInnerHTML('listDisplay',`CK inventory has been gathered, you can now process the data.`);
    if ( buylistClick ) { displayLoadIcon(); } // necessary because of how the filter card section flows
    if ( itemList === 'hotlist' ) { hotlistDisplayWorker( ckCardDataFromSlug[itemList] ); }
}

const updateAPITimestamp = (timestamp) => {
    const slugInUse = getCheckedValue('whichSlug') ? 'CK API' : 'Backup Slug';
    document.getElementById("repriceTimestamp").innerHTML = `<br /><strong> ${slugInUse} Last Updated:</strong> ${timestamp}`;
}

const dataElementsToSkip = (keyToCheck) => ['scryfall_id'].includes(keyToCheck);

const addBuylistData = () => {
    Object.keys( ckCardDataFromSlug.hotlist ).forEach( cardsInList => {
        const cardIds = Object.keys(ckCardDataFromSlug.hotlist[cardsInList]);
        cardIds.forEach( individualId => {
            if ( !ckCardDataFromSlug.buylist[cardsInList] ) {
                setHotlistData({ cardsInList: cardsInList, individualId: individualId, qty_buying: 0, qty_retail: 0, sku: 'N/A'} );
                return;
            }
            if ( !ckCardDataFromSlug.buylist[cardsInList][individualId] ) {
                setHotlistData({ cardsInList: cardsInList, individualId: individualId, qty_buying: 0, qty_retail: 0, sku: 'N/A'} );
                return;
            }
            const buylistData = ckCardDataFromSlug.buylist[cardsInList][individualId];
            setHotlistData( { cardsInList:cardsInList, individualId: individualId, qty_buying: buylistData['qty_buying'], qty_retail: buylistData['qty_retail'], sku: buylistData['sku'] })
            /*
                        const cardName = cardElement.name;
            const cardId = cardElement.id;
            //console.log( ckCardDataFromSlug.buylist[cardName][cardId]['sku'] );
            console.log( `${cardName} - ${cardId}` );
             */
        })
    })
}

const setHotlistData = (args) => {
    const { cardsInList, individualId, qty_buying, qty_retail, sku } = args;
    ckCardDataFromSlug.hotlist[cardsInList][individualId]['qty_buying'] = qty_buying;
    ckCardDataFromSlug.hotlist[cardsInList][individualId]['qty_retail'] = qty_retail;
    ckCardDataFromSlug.hotlist[cardsInList][individualId]['sku'] = sku;
}

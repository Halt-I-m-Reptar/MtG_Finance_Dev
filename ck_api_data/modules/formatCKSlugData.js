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
    })
};

const verifyAndShapeCKDataSet = (ckListJson, timestamp = null, itemList) => {
    if ( timestamp ) {
        updateAPITimestamp(timestamp['created_at']);
    }
    if ( !ckListJson.length ) {
        showDataError(`<div class="warningText">There was an issue gathering the data from Card Kingdom.<br />Try again or uncheck "Use Live Slug".</div>`);
        return;
    }
    createAndShapeCKData(ckListJson, itemList);
    displayLoadIcon();
    if ( itemList === 'buylist') {
        enableCardDataDisplayButtons();
        setListDomInnerHTML('listDisplay',`CK inventory has been gathered, you can now process the data.`);
    } else {
        hotlistDisplayWorker( ckCardDataFromSlug[itemList] );
    }
}

const updateAPITimestamp = (timestamp) => {
    const slugInUse = getCheckedValue('whichSlug') ? 'CK API' : 'Backup Slug';
    document.getElementById("repriceTimestamp").innerHTML = `<br /><strong> ${slugInUse} Last Updated:</strong> ${timestamp}`;
}

const dataElementsToSkip = (keyToCheck) => ['scryfall_id'].includes(keyToCheck);

function showDataError(displayText) {
    displayLoadIcon();
    setListDomInnerHTML('listDisplay', displayText);
}

const createBuyPercentage = (buyPrice, sellPrice) => ((buyPrice / sellPrice) * 100).toFixed(2);

let ckCardDataFromSlug = [];

const createAndShapeCKData = (jsonReturn) => jsonReturn.data.forEach(cardData => {
    ckCardDataFromSlug[cleanCkCardName(cardData.name)] = ckCardDataFromSlug[cleanCkCardName(cardData.name)] || [];
    ckCardDataFromSlug[cleanCkCardName(cardData.name)][cardData.id] = {};
    Object.keys(cardData).forEach( cardDataPoint => {
        if ( dataElementsToSkip(cardDataPoint) ) { return; }
        ckCardDataFromSlug[cleanCkCardName(cardData.name)][cardData.id][cardDataPoint] = cardData[cardDataPoint];
    });
    ckCardDataFromSlug[cleanCkCardName(cardData.name)][cardData.id]['retailBuyPricePercent'] = ((cardData['price_buy'] / cardData['price_retail']) * 100).toFixed(2);
} );

const verifyAndShapeCKDataSet = (ckListJson) => {
    console.log(ckListJson);
    if ( ckListJson.data ) {
        updateAPITimestamp(ckListJson.meta['created_at']);
        if (!ckListJson.data.length) {
            setListDomInnerHTML('listDisplay', `<div class="warningText">There was an issue gathering the data from Card Kingdom.<br />Try again or uncheck "Use Live Slug".</div>`);
            displayLoadIcon();
            return;
        }
    }
    if ( ckListJson.list ) {
        if (!ckListJson.list.length) {
            setListDomInnerHTML('listDisplay', `<div class="warningText">There was an issue gathering the data from Card Kingdom.<br />Try again or uncheck "Use Live Slug".</div>`);
            displayLoadIcon();
            return;
        }
    }
    enableCardDataDisplayButtons();
    createAndShapeCKData(ckListJson);
    displayLoadIcon();
    setListDomInnerHTML('listDisplay',`CK inventory has been gathered, you can now process the data.`);
}

const updateAPITimestamp = (timestamp) => {
    const slugInUse = getCheckedValue('whichSlug') ? 'CK API' : 'Backup Slug';
    document.getElementById("repriceTimestamp").innerHTML = `<br /><strong> ${slugInUse} Last Updated:</strong> ${timestamp}`;
}

const dataElementsToSkip = (keyToCheck) => ['scryfall_id'].includes(keyToCheck);

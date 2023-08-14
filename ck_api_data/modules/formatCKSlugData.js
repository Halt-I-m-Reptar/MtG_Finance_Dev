let ckCardDataFromSlug = [];

const createAndShapeCKData = (jsonReturn) => jsonReturn.data.forEach(cardData => {;
    ckCardDataFromSlug[cleanCkCardName(cardData.name)] = ckCardDataFromSlug[cleanCkCardName(cardData.name)] || [];
    ckCardDataFromSlug[cleanCkCardName(cardData.name)][cardData.id] = {};
    Object.keys(cardData).forEach( key => {
        if ( ['scryfall_id'].includes(key) ) { return; }
        ckCardDataFromSlug[cleanCkCardName(cardData.name)][cardData.id][key] = cardData[key];
    });
    ckCardDataFromSlug[cleanCkCardName(cardData.name)][cardData.id]['retailBuyPricePercent'] = ((cardData['price_buy'] / cardData['price_retail']) * 100).toFixed(2);
} );

const verifyAndShapeCKDataSet = (json) => {
    if (!json.data.length) {
        setListDomInnerHTML('listDisplay',`<div class="warningText">There was an issue gathering the data from Card Kingdom.<br />Try again or uncheck "Use Live Slug".</div>`);
        displayLoadIcon();
        return;
    }
    enableCardDataDisplayButtons();
    updateAPITimestamp(json.meta['created_at']);
    createAndShapeCKData(json);
    displayLoadIcon();
    setListDomInnerHTML('listDisplay',`CK inventory has been gathered, you can now process the data.`);
}

const updateAPITimestamp = (timestamp) => {
    const slugInUse = getCheckedValue('whichSlug') ? 'CK API' : 'Backup Slug';
    document.getElementById("repriceTimestamp").innerHTML = `<br /><strong> ${slugInUse} Last Updated:</strong> ${timestamp}`;
}

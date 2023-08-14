let ckCardDataFromSlug = [];

const createAndShapeCKData = (jsonReturn) => jsonReturn.data.forEach(data => {
    console.log(data.name);
    ckCardDataFromSlug[cleanCkCardName(data.name)] = ckCardDataFromSlug[cleanCkCardName(data.name)] || [];
    ckCardDataFromSlug[cleanCkCardName(data.name)][data.id] = data;
    ckCardDataFromSlug[cleanCkCardName(data.name)][data.id]['retailBuyPricePercent'] = ((data['price_buy'] / data['price_retail']) * 100).toFixed(2);
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

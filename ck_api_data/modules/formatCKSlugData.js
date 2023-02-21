let ckCardDataFromSlug = [];

const createAndShapeCKData = (json) => json.data.forEach(data => {
    ckCardDataFromSlug[cleanCkCardName(data.name)] = ckCardDataFromSlug[cleanCkCardName(data.name)] || [];
    ckCardDataFromSlug[cleanCkCardName(data.name)][data.id] = data
} );

const createCKDataSet = (json) => {
    if (!json.data.length) {
        writeContentToDisplay(`<div class="warningText">There was an issue gathering the data from CardKingom. <br />Try again or uncheck the "Use Live Slug" text box.</div>`);
        displayLoadIcon();
        return;
    }
    enableCardDataDisplayButtons();
    updateAPITimestamp(json.meta['created_at']);
    createAndShapeCKData(json);
    displayLoadIcon();
    writeContentToDisplay(`CK inventory has been gathered, you can now filter your data.`);
}

const updateAPITimestamp = (timestamp) => {
    const slugInUse = slugChoice() ? 'CK API' : 'Backup Slug';
    document.getElementById("repriceTimestamp").innerHTML = `<br /><strong> ${slugInUse} Last Updated:</strong> ${timestamp}`;
}

const getTopCardsByColorWorker = () => {
    resetDisplay();
    const cardColor = getCardColorValue();
    writeContentToDisplay(`Gathering the top ${ getCardColorText() } cards.`);
    displayLoadIcon();
    curlRequest( shapeCurlURL('top', cardColor), 'topCardsByColor' );
}

const getTopCommandersByColorWorker = () => {
    resetDisplay();
    const cardColor = getCommanderColorValue();
    writeContentToDisplay(`Gathering the top ${ getCardColorText() } cards.`);
    displayLoadIcon();
    curlRequest( shapeCurlURL('commanders', cardColor), 'topCommandersByColor' );
}

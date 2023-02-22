const getTopCardsWorker = () => {
    resetDisplay();
    const cardType = getCardTypeValue()
    writeContentToDisplay(`Gathering the top ${cardType}.`);
    displayLoadIcon();
    curlRequest( shapeCurlURL('top', cardType), 'type' );
}

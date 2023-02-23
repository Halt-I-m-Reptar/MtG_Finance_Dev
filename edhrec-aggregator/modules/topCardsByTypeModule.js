const getTopCardsWorker = () => {
    const cardType = getCardTypeValue();
    prepDisplayDuringLoad(cardType);
    prepCurlRequest('top', cardType, 'topCardsByType' );
}

const getTopCardsByColorWorker = () => {
    prepDisplayDuringLoad(`${getCardColorText()} cards.`);
    prepCurlRequest('top', getCardColorValue(), 'topCardsByColor' );
}

const getTopCommandersByColorWorker = () => {
    prepDisplayDuringLoad(`${getCardColorText()} cards.`);
    prepCurlRequest('commanders', getCommanderColorValue(), 'topCommandersByColor' );
}

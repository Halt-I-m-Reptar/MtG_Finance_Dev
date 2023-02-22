const getTopCardsByMonthWorker = () => {
    resetDisplay();
    writeContentToDisplay(`Gathering the top cards.`);
    displayLoadIcon();
    curlRequest( shapeCurlURL('top', 'month'), 'topCards' );
}

const getTopCommandersByMonthWorker = () => {
    resetDisplay();
    writeContentToDisplay(`Gathering the top commanders.`);
    displayLoadIcon();
    curlRequest( shapeCurlURL('commanders', 'month'), 'topCommanders' );
}

/*
top cards by type
    date breakout is contained in the same object

top cards by color (w, u, b, r, g, colorless, multi)
https://json.edhrec.com/pages/top/w.json
*/

const getTopCardsByColorWorker = () => {
    resetDisplay();
    const cardColor = getCardColorValue();
    writeContentToDisplay(`Gathering the top ${ getCardColorText() } cards.`);
    displayLoadIcon();
    curlRequest( shapeCurlURL('top', cardColor), 'color' );
}

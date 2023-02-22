/*
top cards by type
    date breakout is contained in the same object
https://json.edhrec.com/pages/top/creatures.json
https://json.edhrec.com/pages/top/instants.json
https://json.edhrec.com/pages/top/sorceries.json
https://json.edhrec.com/pages/top/artifacts.json
https://json.edhrec.com/pages/top/enchantments.json
https://json.edhrec.com/pages/top/planeswalkers.json
https://json.edhrec.com/pages/top/lands.json

top cards by color (w, u, b, r, g, colorless, multi)
https://json.edhrec.com/pages/top/w.json
*/

const getTopCardsWorker = () => {
    resetDisplay();
    writeContentToDisplay(`Gathering the top ${getCartTypeValue()}.`);
    displayLoadIcon();
    console.log( shapeCurlURL() );
}

const shapeCurlURL = () => `https://json.edhrec.com/pages/top/${ getCartTypeValue() }.json`;

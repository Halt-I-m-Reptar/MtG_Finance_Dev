function createCardUrls(retailURL, name) {
    return `<a href="https://www.cardkingdom.com/${retailURL}" target="_blank">Buy ${name}</a> | <a href="https://www.cardkingdom.com/purchasing/mtg_singles?search=header&filter%5Bname%5D=${name}" target="_blank">Sell ${name}</a>`;
}

function createBuyPercentage(buyPrice, sellPrice) {
    return ((buyPrice / sellPrice) * 100).toFixed(2)
}

function createCreditBuyPrice(buyPrice) {
    return (buyPrice * 1.3).toFixed(2);
}

function setBuyPercentBackgroundColor(retailBuyPricePercent) {
    if ( retailBuyPricePercent >= 70 ) { return "highBuyPrice";}
    if ( retailBuyPricePercent >= 60 ) { return "decentBuyPrice"; }
    if ( retailBuyPricePercent >= 52 ) { return "lowBuyPrice"; }
    if ( retailBuyPricePercent < 52 ) { return "belowFifty"; }
    return "retailPrice";
}

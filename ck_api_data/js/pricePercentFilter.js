const showHighPercentCards = async (listToFilter) => {
    displayLoadIcon();
    setListDomInnerHTML('listDisplay',"<strong>Gathering cards with a high buylist ratio. This may take some time.</strong>");
    const cardArr = await filterCardsByPercent(ckCardDataFromSlug[listToFilter]);
    if ( cardArr.length ) {
        displayCardDataWorker(cardArr);
    } else {
        displayLoadIcon();
        setListDomInnerHTML('listDisplay',"<strong>No cards matched your criteria. Try reducing the buylist percent difference.</strong>");
    }
}

const filterCardsByPercent = async (buylist) => {
    const sortOption = getElementValueById('buylistPercentDiffSort');
    const showVariation = getCheckedValue('showVariations');
    const showFoils = getCheckedValue('showFoils');
    const priceBanding = getCheckedValue('priceBanding');
    const showOoS = getCheckedValue('showOutOfStock');
    const buyPriceBand = priceBanding ? returnPriceBand() : [];

    return await Object.values(buylist).map( currentCardById => currentCardById ).reduce( (acc, currentCard) => {
        Object.values(currentCard).filter( individualCard => {
            if ( individualCard['retailBuyPricePercent'] > +getElementValueById('buylistPercentDiff') && individualCard['qty_buying'] > 0 ) {
                if ( !showVariation && individualCard['variation'].length > 0 ) { return; }
                // when user elects to show variants, adds foil variants to the array
                if ( showVariation && individualCard['variation'].length > 0 && individualCard['is_foil'] === 'true') {
                    acc.push( individualCard );
                    return;
                }
                if ( !showFoils && individualCard['is_foil'] === 'true' ) { return; }
                if ( priceBanding &&
                    !( individualCard['retailBuyPricePercent'] >= buyPriceBand[0] && individualCard['retailBuyPricePercent'] <= buyPriceBand[1] )
                ) { return; }
                if ( showOoS && individualCard['qty_retail'] > 0) { return;}
                acc.push( individualCard );
            }
        });
        return acc;
    }, []).sort( (firstCard, secondCard) => secondCard[sortOption] - firstCard[sortOption] );
}


const returnPriceBand = () => {
    const buypriceDiff = +getElementValueById('buylistPercentDiff')

    // Adding 1 to the upper limit makes the range inclusive of the decimal values (e.g., 50-51 includes 50.9)
    const buyPriceBands = {
        50: [0, 51],
        55: [51, 56],
        60: [56, 61],
        65: [61, 66],
        70: [66, 71],
        75: [76, 100]
    }

    return buyPriceBands[buypriceDiff];
}

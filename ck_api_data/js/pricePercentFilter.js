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

    return await Object.values(buylist).map( currentCardById => currentCardById ).reduce( (acc, currentCard) => {
        Object.values(currentCard).filter( individualCard => {
            if ( individualCard['retailBuyPricePercent'] > +getElementValueById('buylistPercentDiff') && individualCard['qty_buying'] > 0 ) {
                if ( showVariation === false && individualCard['variation'].length > 0 ) { return; }
                // when user elects to show variants, adds foil variants to the array
                if ( showVariation === true && individualCard['variation'].length > 0 && individualCard['is_foil'] === 'true') {
                    acc.push( individualCard );
                    return;
                }
                if ( showFoils === false && individualCard['is_foil'] === 'true' ) { return; }
                acc.push( individualCard );
            }
        });
        return acc;
    }, []).sort( (firstCard, secondCard) => secondCard[sortOption] - firstCard[sortOption] );
}

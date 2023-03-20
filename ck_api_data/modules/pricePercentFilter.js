const showHighPercentCards = () => {
    setListDomInnerHTML('listDisplay',"<strong>Gathering cards with a high buylist ratio. This may take some time.</strong>");
    displayLoadIcon();
    const cardArr = filterCardsByPercent();
    displayLoadIcon();
    createOutputTable();
    writeCardsToTable(cardArr);
}

const filterCardsByPercent = () => {
    const buylistPercentDiff = +getElementValueById('buylistPercentDiff');
    //const filteredCardList = [];

    /*Object.keys(ckCardDataFromSlug).forEach( cardName => {
            setListDomInnerHTML('listDisplay',`<strong>Working on a card ${ckCardDataFromSlug[cardName]}</strong>`);
            ckCardDataFromSlug[cardName].forEach( currentCardById => {
                if ( currentCardById['retailBuyPricePercent'] > buylistPercentDiff && currentCardById['qty_buying'] > 0 ) { filteredCardList.push( ckCardDataFromSlug[cardName][currentCardById['id']] ) }
            })
    });
     */
    const filteredCardList = Object.keys(ckCardDataFromSlug).map( cardName => ckCardDataFromSlug[cardName] ).filter( currentCardById => {
        console.log( currentCardById );
        if ( currentCardById['retailBuyPricePercent'] > buylistPercentDiff && currentCardById['qty_buying'] > 0 ) { filteredCardList.push( ckCardDataFromSlug[currentCardById['name']][currentCardById['id']] ) }
        return;
        /*setListDomInnerHTML('listDisplay',`<strong>Working on a card ${ckCardDataFromSlug[cardName]}</strong>`);
        ckCardDataFromSlug[cardName].forEach( currentCardById => {
            if ( currentCardById['retailBuyPricePercent'] > buylistPercentDiff && currentCardById['qty_buying'] > 0 ) { filteredCardList.push( ckCardDataFromSlug[cardName][currentCardById['id']] ) }
        })*/
    });

    console.log(filteredCardList);
return filteredCardList;
}


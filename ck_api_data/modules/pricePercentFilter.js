const showHighPercentCards = () => {
    setListDomInnerHTML('listDisplay',"<strong>Gathering cards with a high buylist ratio. This may take some time.</strong>");
    displayLoadIcon();
    const cardArr = filterCardsByPercent(Object.keys(ckCardDataFromSlug));
    displayLoadIcon();
    //createOutputTable();
    //writeCardsToTable(cardArr);
}

const filterCardsByPercent = (cardNameArray) => {
    const buylistPercentDiff = +getElementValueById('buylistPercentDiff');
    const filteredCardList = [];
    //const promises = [];

    /*cardNameArray.forEach( cardName => {
            setListDomInnerHTML('listDisplay',`<strong>Working on a card</strong>`);
            ckCardDataFromSlug[cardName].forEach( currentCardById => {
                if ( currentCardById['retailBuyPricePercent'] > buylistPercentDiff && currentCardById['qty_buying'] > 0 ) { filteredCardList.push( ckCardDataFromSlug[cardName][currentCardById['id']] ) }
            })
    });*/

    cardNameArray.map( cardName => ckCardDataFromSlug[cardName] ).filter( currentCardByName => {
        //setListDomInnerHTML('listDisplay',`<strong>Working on a card</strong>`);
        currentCardByName.forEach( currentCardById => {
            if ( currentCardById['retailBuyPricePercent'] > buylistPercentDiff && currentCardById['qty_buying'] > 0) {
                console.log(currentCardById['name']);
                //filteredCardList.push( ckCardDataFromSlug[cardData['name']][cardData['id']] );
            }
        })
        //setListDomInnerHTML('listDisplay',`<strong>Working on a card</strong>`);
        //return ckCardDataFromSlug[cardName]
    });

    console.log(filteredCardList);
return filteredCardList;
}


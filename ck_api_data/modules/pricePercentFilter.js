const showHighPercentCards = async () => {
    displayLoadIcon();
    setListDomInnerHTML('listDisplay',"<strong>Gathering cards with a high buylist ratio. This may take some time.</strong>");
    const cardArr = await filterCardsByPercent();
    displayLoadIcon();
    createOutputTable();
    writeCardsToTable(cardArr);
}

const filterCardsByPercent = async () => {
    return await Object.values(ckCardDataFromSlug).map( currentCardById => currentCardById ).reduce( (acc, currentCard) => {
       Object.values(currentCard).filter( individualCard => {
           if (individualCard['retailBuyPricePercent'] > +getElementValueById('buylistPercentDiff') && individualCard['qty_buying'] > 0) {
               acc.push( individualCard );
           }
       });
       return acc;
    }, []);
}
const filterCardInputListWorker = () => {
    setListDomInnerHTML('listDisplay',"<strong>Filtering your data.</strong>");
    displayLoadIcon();
    displayCardDataWorker( filterCKData(cleanFilterCardsNames(getCardListToFilter())) );
}

const getCardListToFilter = () => Array.from( new Set( document.getElementById("cardNames").value.trim().split("\n") ));

const cleanFilterCardsNames = (filterList) => filterList.map(cardName => cleanCkCardName(cardName));

const filterCKData = (filterList) => {
    return filterList.filter( currentCard => ckCardDataFromSlug[currentCard] ).map( currentCard => ckCardDataFromSlug[currentCard] ).reduce( (acc, currentCard) => {
        currentCard.forEach( card => {
            acc.push(card);
        });
        return acc;
    },[]);
}

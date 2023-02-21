const filterCardInputListWorker = () => {
    clearDisplayData();
    writeContentToDisplay("Filtering your data.");
    displayLoadIcon();
    displayCardDataWorker( filterCKData(cleanFilterCardsNames(getCardListToFilter())) );
}

const getCardListToFilter = () => document.getElementById("cardNames").value.split("\n");

const cleanFilterCardsNames = (filterList) => filterList.map(cardName => cleanCkCardName(cardName));

const filterCKData = (filterList) => {
    return filterList.filter( currentCard => ckCardDataFromSlug[currentCard] ).map( currentCard => ckCardDataFromSlug[currentCard] ).reduce( (acc, currentCard) => {
        currentCard.forEach( card => {
            acc.push(card);
        });
        return acc;
    },[]);
}

const filterCardInputListWorker = (itemList) => {
    setListDomInnerHTML('listDisplay',"<strong>Filtering your data.</strong>");
    displayLoadIcon();
    const filteredCardList = filterCKData( cleanFilterCardsNames(getCardListToFilter()), itemList );
    if ( filteredCardList.length ) { displayCardDataWorker( filteredCardList ); }
    else {
        showDataError("<span id='warningText'><strong>No results returned, please enter cards to filter and checking your spelling.</strong></span>");
    }
}

const getCardListToFilter = () => Array.from( new Set( document.getElementById("cardNames").value.trim().split("\n") ));

const cleanFilterCardsNames = (filterList) => filterList.map(cardName => cleanCkCardName(cardName));

const filterCKData = (filterList, itemList) => {
    return filterList.filter( currentCard => ckCardDataFromSlug[itemList][currentCard] ).map( currentCard => ckCardDataFromSlug[itemList][currentCard] )
            .reduce( (acc, currentCard) => {
                currentCard.map( cardData => acc.push(cardData) )
                return acc;
        },[]);
}

const filterCardInputListWorker = () => {
    setListDomInnerHTML('listDisplay',"<strong>Filtering your data.</strong>");
    displayLoadIcon();
    const filteredCardList = filterCKData(cleanFilterCardsNames(getCardListToFilter()));
    if ( filteredCardList.length ) { displayCardDataWorker( filteredCardList ); }
    else {
        displayLoadIcon();
        setListDomInnerHTML('listDisplay',"<span id='warningText'><strong>No resuls returned, please enter cards to filter and checking your spelling.</strong></span>");
    }
}

const getCardListToFilter = () => Array.from( new Set( document.getElementById("cardNames").value.trim().split("\n") ));

const cleanFilterCardsNames = (filterList) => filterList.map(cardName => cleanCkCardName(cardName));

const filterCKData = (filterList) => {
    return filterList.filter( currentCard => ckCardDataFromSlug[currentCard] ).map( currentCard => ckCardDataFromSlug[currentCard] ).reduce( (acc, currentCard) => {
        currentCard.map( cardData => acc.push(cardData) )
        return acc;
    },[]);
}

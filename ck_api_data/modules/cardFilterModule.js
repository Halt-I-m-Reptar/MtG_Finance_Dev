const filterCardInputListWorker = () => {
    setListDomInnerHTML('listDisplay',"<strong>Filtering your data.</strong>");
    displayLoadIcon();
    const filteredCardList = filterCKData(cleanFilterCardsNames(getCardListToFilter()));
    if ( filteredCardList.length ) { displayCardDataWorker( filteredCardList ); }
    else {
        displayLoadIcon();
        setListDomInnerHTML('listDisplay',"<strong>Please enter cards to filter.</strong>");
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

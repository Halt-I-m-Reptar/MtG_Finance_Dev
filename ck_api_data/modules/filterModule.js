const filterWorker = () => {
    writeToDisplay("Filtering your data.");
    loaderDisplay();
    filterTable(cleanFilter(getFilters()));
}

const getFilters = () => document.getElementById("cardNames").value.split("\n");

const cleanFilter = (filterList) => filterList.map(cardName => cardName.replace(/\W/g,'').toLowerCase());

const cleanCkCardName = (card) => card.replace(/\W/g,'').toLowerCase();

/*
    CK sorts cards by SKU and those SKUs are not in MtG Chronolical order
    To "fix" this and enable easier data display, we sort the output display
    alphabetically by card name.
 */
const filterTable = (filterList) => {
    const filteredCardList = ckData.filter( curCard => filterList.includes(cleanCkCardName(curCard.name) ));
    displayData(filteredCardList.sort( (firstCard, secondCard) => (firstCard.name > secondCard.name) ? 1 : ((secondCard.name > firstCard.name) ? -1 : 0)));
}

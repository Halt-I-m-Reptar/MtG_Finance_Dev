const filterWorker = () => {
    writeToDisplay("Filtering your data.");
    loaderDisplay();
    filterTable(cleanFilter(getFilters()));
}

const getFilters = () => document.getElementById("cardNames").value.split("\n");

const cleanFilter = (filterList) => filterList.map(cardName => cleanCkCardName(cardName));

const filterTable = (filterList) => {
    const filteredCardList = filterList.filter( currentCard => ckData[currentCard] ).map( currentCard => ckData[currentCard] );
    displayData(filteredCardList);
}

const cleanCkCardName = (card) => card.replace(/\W/g,'').toLowerCase();

const createAndShapeCKData = (json) => json.data.forEach(data => {
    ckData[cleanCkCardName(data.name)] = ckData[cleanCkCardName(data.name)] || [];
    ckData[cleanCkCardName(data.name)][data.id] = data
} );

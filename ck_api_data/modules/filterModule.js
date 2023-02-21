const filterWorker = () => {
    writeToDisplay("Filtering your data.");
    loaderDisplay();
    filterTable(cleanFilter(getFilters()));
}

const getFilters = () => document.getElementById("cardNames").value.split("\n");

const cleanFilter = (filterList) => filterList.map(cardName => cardName.replace(/\W/g,'').toLowerCase());

const filterTable = (filterList) => {
    const filteredCardList = ckData.filter( currentCard => filterList.includes(currentCard.name.replace(/\W/g,'').toLowerCase()) );
    displayData(sortFilteredDataByName(filteredCardList));
}

const cleanCkCardName = (card) => card.replace(/\W/g,'').toLowerCase();

const createAndShapeCKData = (json) => json.data.forEach (data => ckData[data.id] = data );

const sortFilteredDataByName = (cardData) => cardData.sort( (a,b) => {
    if ( a.name < b.name) { return -1; }
    if ( a.name > b.name) { return 1; }
    return 0;
});

//possibly unnecessary in the long run
const sortFilteredDataById = (cardData) => cardData.sort( (a,b) => a.id - b.id )

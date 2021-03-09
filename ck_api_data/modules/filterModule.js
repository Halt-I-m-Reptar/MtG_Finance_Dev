const filterWorker = () => {
    const filterList = cleanFilter(getFilters());
    writeToDisplay("Filtering your data.");
    loaderDisplay();
    filterTable(filterList);
}

const getFilters = () => document.getElementById("cardNames").value.split("\n");

const cleanFilter = (filterList) => filterList.map(cardName => cardName.replace(/\W/g,'').toLowerCase());

const cleanCkCardName = (card) => card.replace(/\W/g,'').toLowerCase();

const clearFilers= () => document.getElementById("listDisplay").innerHTML = '';

const filterTable = (filterList) => {
    const filteredCardList = ckData.filter( curCard => filterList.includes(cleanCkCardName(curCard.name) ));
    displayData(filteredCardList.sort());
}

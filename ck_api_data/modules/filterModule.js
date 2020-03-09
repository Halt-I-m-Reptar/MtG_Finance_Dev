function filterWorker() {
    var filterList = cleanFilter(getFilters());
    filterTable(filterList);
}

function getFilters() {
    return document.getElementById("cardNames").value.split("\n");
}

function cleanFilter(filterList) {
    return filterList.map(cardName => cardName.replace(/\W/g,'').toLowerCase());
}

function cleanCkCardName(card) {
    return card.replace(/\W/g,'').toLowerCase();
}

function filterTable(filterList) {
    Array.from(document.getElementsByClassName("cardName")).forEach(name => {
        if (!filterList.includes(cleanCkCardName(name.innerText))) { name.parentNode.style= "display:none"; }
    });
}
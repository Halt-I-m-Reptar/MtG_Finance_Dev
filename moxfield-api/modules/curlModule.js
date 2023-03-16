const fetchDeckLists = (format) => {
    const url= `https://api2.moxfield.com/v2/decks/search?pageNumber=1&pageSize=64&sortType=updated&sortDirection=Descending&fmt=${format}&board=mainboard`;

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => createDataSet(result))
        .catch(error => writeError(error))
}

const fetchCommanderData = (cardId) => {
    const url = `https://api2.moxfield.com/v2/cards/details/${cardId}`;

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => writeError(error));
}

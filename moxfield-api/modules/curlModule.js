const fetchDeckLists = () => {
    const url= `https://api2.moxfield.com/v2/decks/search?pageNumber=1&pageSize=64&sortType=updated&sortDirection=Descending&fmt=${window.moxfieldFormat}&board=mainboard`;

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => createDataSet(result))
        .catch(error => writeError(error))
}

const fetchDeckData = (deckDataPoints) => {
    const url = moxfieldUrlMap(deckDataPoints['cardId'], deckDataPoints['publicId']);

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => writeError(error));
}

const moxfieldUrlMap = (cardId, publicId) => {
    const urlMap = {
        predh: `https://api2.moxfield.com/v2/cards/details/${cardId}`,
        oathbreaker: `https://api2.moxfield.com/v2/decks/all/${publicId}`
    }

    return urlMap[window.moxfieldFormat] || null;
}
